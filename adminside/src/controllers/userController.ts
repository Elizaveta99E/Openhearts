import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

interface UserProfile {
  id: number;
  avatar: string;
  registrationDate: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string | null;
}

// Моковая база данных
let userProfile: UserProfile = {
  id: 1,
  avatar: 'https://avatars.mds.yandex.net/i?id=3246074037f1aa16a2c8dc4684851377ad151f13-4262069-images-thumbs&n=13',
  registrationDate: '15.05.2022',
  birthDate: '10.03.1990',
  phone: '+7 722 23 23 23',
  email: 'example@mail.ru',
  password: null
};

export const getProfile = (req: Request, res: Response) => {
  res.json(userProfile);
};

export const updateProfile = (req: Request, res: Response) => {
  const { birthDate, phone, email } = req.body;

  // Валидация
  if (!birthDate || !phone || !email) {
    return res.status(400).json({ success: false, message: 'Все поля обязательны для заполнения' });
  }

  // Обновление профиля
  userProfile = {
    ...userProfile,
    birthDate,
    phone,
    email
  };

  res.json({ success: true, user: userProfile });
};

export const setUserPassword = async (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Пароль должен содержать минимум 6 символов' });
  }

  try {
    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    userProfile.password = hashedPassword;
    res.json({ success: true });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ success: false, message: 'Ошибка при установке пароля' });
  }
};