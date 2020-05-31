const express = require('express');
const router = express.Router();
 const bcrypt = require('bcryptjs');

 const jwt = require('jsonwebtoken');
 const config = require('config');

const User = require('../../models/User');

router.post('/', (req,res) => {
    const { name,email,password } = req.body;

    if (!name||!email||!password) {
        return res.status(400).json({ msg: "Lütfen tüm alanları doldurunuz!"});
    }

    User.findOne({email}).then(user => {
        if (user) {
            return res.status(400).json({ ms: 'Kullanıcı zaten mevcut'});
        }
        const newUser = new User({
            name,
            email,
            password,
        });

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;
                newUser.save().then(
                    user => {

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

                        
                    });
            });
        })


    })
});


router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      if (!users) throw Error('No users exist');
      res.json(users);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
});



module.exports = router;