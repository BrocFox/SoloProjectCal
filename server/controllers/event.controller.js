const Event = require('../models/event.model');

module.exports.createEvent = (req, res) => {
    Event.create(req.body)
        .then(event => res.json(event))
        .catch((err) =>{
            res.status(400).json(err)
            console.log("controller");
        });
}
module.exports.getAllEvents =  (req, res) => {
    Event.find()
        .then(allEvents => res.json(allEvents))
        .catch(err => res.json(err));
}

module.exports.getEvent = (req, res) => {
    Event.findOne({_id:req.params.id})
        .then(event => res.json(event))
        .catch(err => res.json(err));
}

module.exports.getEventByDateId = (req, res) => {
    Event.find({dateId:req.params.dateId})
        .then(event => res.json(event))
        .catch(err => res.json(err));
}

module.exports.updateEvent = (req, res) => {
    Event.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedEvent => res.json(updatedEvent))
        .catch((err) =>{
            res.status(400).json(err)
        } );
}

module.exports.deleteEvent = (req, res) => {
    Event.deleteOne({_id: req.params.id}, req.body, {new:true})
        .then(deleteConfirm  => res.json(deleteConfirm))
        .catch(err => res.json(err))
}