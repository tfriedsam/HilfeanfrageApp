var express = require('express');
var db = require('../models/database.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/register', function(req, res) {
//   console.log('Registering Device: ', req.body);
//   db.query(
//     'INSERT INTO devices(dev_id, reg_id, upddate) VALUES(${device_id}, ${registration_id}, current_timestamp)',
//     req.body
//   ).then(
//     (data) => {
//       console.log('Device Registered', data);
//       res.send(201, data);
//     },
//     (error) => {
//       console.warn('Device could not be registered: ', error)
//       res.send(400, error);
//     }
//   );
// });

// router.post('/unregister', function(req, res) {
//   console.log('Unregistering Device: ', req.body);
//   db.query(
//     'DELETE FROM devices WHERE dev_id=${device_id}',
//     req.body
//   ).then(
//     (data) => {
//       console.log('Device unregistered', data);
//       res.send(200, data);
//     },
//     (error) => {
//       console.warn('Device could not be unregistered: ', error)
//       res.send(400, error);
//     }
//   );
// });


module.exports = router;
