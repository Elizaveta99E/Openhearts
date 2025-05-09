const Staff_router = require('express');

const router = new Staff_router();


//router.post('/registration', )
//router.post('/login',)

router.get('/auth', (req, res) => {
    res.json({
        message: "Super!"
    })
})

module.exports = router