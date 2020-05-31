const express = require('express');
const router = express.Router();

const Wear = require('../../models/Wear');

router.get('/', (req,res) => {
    console.log('request');
    Wear.find()
        .sort({date: -1})
        .then(wears => res.json(wears))
});

router.post('/', (req,res) => {
    const newWear = new Wear({
        name: req.body.name,
        size: req.body.size
    });

    newWear.save().then(wear => res.json(wear));
});

router.delete('/:id', (req,res) => {
    console.log(req.body.id);
   Wear.findById(req.params.id)
   .then(wear => wear.remove().then(()=> res.json({success: true})))
   .catch(err => res.status(404).json({success:false}));
});


module.exports = router;