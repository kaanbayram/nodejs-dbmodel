const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post('/', (req,res) => {
    const { name,email,password } = req.body;
    console.log(req.body)
    if (!email||!password) {
        return res.status(400).json({ msg: "Lütfen tüm alanları doldurunuz!"});
    }

    User.findOne({email}).then(user => {
        if (!user) return res.status(400).json({ ms: 'Kullanıcı Mevcut Değil'})
        
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (!isMatch) return res.status(400).json({ msg: 'Geçersiz bilgiler' }); 

            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({
                        token,
                        user:{
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            )
        })

       


    })
});

router.get('/user', auth, (req,res) => {
    
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;