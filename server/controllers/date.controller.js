const Date = require('../models/date.model');

module.exports.createDate = (req, res) => {
    Date.create(req.body)
        .then(date => res.json(date))
        .catch((err) =>{
            res.status(400).json(err)
        } );
}

module.exports.getAllDates =  (req, res) => {
    Date.find()
        .then(allDates => res.json(allDates))
        .catch(err => res.json(err));
}

module.exports.getDate = (req, res) => {
    Date.findOne({_id:req.params.id})
        .then(date => res.json(date))
        .catch(err => res.json(err));
}

module.exports.getDateByDate = (req, res) => {
    Date.findOne({date:req.params.date})
        .then(dates => res.json(dates))
        .catch(err => res.json(err));
}

module.exports.updateDate = (req, res) => {
    Date.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedDate => res.json(updatedDate))
        .catch((err) =>{
            res.status(400).json(err)
        } );
}

module.exports.deleteDate = (req, res) => {
    Date.deleteOne({_id: req.params.id}, req.body, {new:true})
        .then(deleteConfirm  => res.json(deleteConfirm))
        .catch(err => res.json(err))
}
