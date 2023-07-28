const EventController = require('../controllers/event.controller');

module.exports = app => {
    app.get('/api/event', EventController.getAllEvents);
    app.get('/api/event/:id', EventController.getEvent);
    app.get('/api/eventByDateId/:dateId', EventController.getEventByDateId);
    app.post('/api/event', EventController.createEvent);
    app.patch('/api/event/:id', EventController.updateEvent);
    app.delete('/api/event/:id', EventController.deleteEvent);
}