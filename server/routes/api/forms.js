const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


const Form = require('../../models/Form');

router.get('/', auth,(req,res) => {
    Form.find()
        .sort({date: -1})
        .then(forms => res.json(forms))
});

router.post('/', auth, (req,res) => {
    const newForm = new Form({
        formdata: req.body.formdata
    });

    newForm.save().then(form => res.json(form));
});

router.delete('/:id',auth, (req,res) => {
    console.log(req.body.id);
   Form.findById(req.params.id)
   .then(form => item.remove().then(()=> res.json({success: true})))
   .catch(err => res.status(404).json({success:false}));
});


module.exports = router;