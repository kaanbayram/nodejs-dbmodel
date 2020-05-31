const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


const WaitingJob = require('../../models/WaitingJob');

router.get('/', (req,res) => {
    WaitingJob.find()
        .sort({date: -1})
        .then(waitingjobs => res.json(waitingjobs))
});

router.post('/', auth, (req,res) => {
    const newWaitingJob = new WaitingJob({
        formdata: req.body.formdata,
        starterid: req.body.starterid,
        activeuserid: req.body.activeuserid,
        alluserids: req.body.alluserids
    });

    newWaitingJob.save().then(waitingjob => res.json(waitingjob));
});

router.patch('/',auth, (req,res)=>{
    WaitingJob.where({_id: req.body.id}).update({activeuserid: req.body.activeuserid,formdata:req.body.formdata})
    .then(waitingjob => res.json(waitingjob))
})

router.delete('/:id',auth, (req,res) => {
    console.log(req.body.id);
   WaitingJob.findById(req.params.id)
   .then(item => item.remove().then(()=> res.json({success: true})))
   .catch(err => res.status(404).json({success:false}));
});


module.exports = router;