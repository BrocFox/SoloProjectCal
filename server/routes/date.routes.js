const DateController = require('../controllers/date.controller');

module.exports = app => {
    app.get('/api/date', DateController.getAllDates);
    app.post('/api/date', DateController.createDate);
    app.get('/api/dateById/:id', DateController.getDate);
    app.get('/api/dateByDate/:date', DateController.getDateByDate);
    app.patch('/api/date/:id', DateController.updateDate);
    app.delete('/api/date/:id', DateController.deleteDate);
}