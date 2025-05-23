const express = require('express');
const router = express.Router();
const { Staff, User, StaffRole } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', searchField = 'all', sort = 'От А-Я' } = req.query;
    const offset = (page - 1) * limit;

    // Настройка поиска
    const searchConditions = {};
    if (search) {
      if (searchField === 'name') {
        searchConditions.name = { [Op.iLike]: `%${search}%` };
      } else {
        searchConditions[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { phone: { [Op.iLike]: `%${search}%` } },
          { '$user.mail$': { [Op.iLike]: `%${search}%` } },
          { '$staffRole.name$': { [Op.iLike]: `%${search}%` } }
        ];
      }
    }

    // Настройка сортировки
    let order = [];
    switch (sort) {
      case 'От Я-А':
        order = [['name', 'DESC']];
        break;
      case 'Самые молодые':
        order = [['birthday', 'DESC']];
        break;
      case 'Самые взрослые':
        order = [['birthday', 'ASC']];
        break;
      default: // 'От А-Я'
        order = [['name', 'ASC']];
    }

    const { count, rows } = await Staff.findAndCountAll({
      where: searchConditions,
      include: [
        { model: User, as: 'users', required: false },
        { model: StaffRole, as: 'StaffRole', required: false }
      ],
      order,
      limit: parseInt(limit),
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      staff: rows,
      totalPages,
      currentPage: parseInt(page),
      totalCount: count
    });
} catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
  
});

module.exports = router;