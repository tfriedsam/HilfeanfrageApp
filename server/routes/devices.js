var express = require('express');
var db = require('../models/database.js');
var push = require('../models/push.js');
var router = express.Router();

function createGCMPush() {
  return {
    collapseKey: data.collapseKey || 'test',
    priority: data.priority || '0',
    contentAvailable: data.contentAvailable || false,
    delayWhileIdle: data.delayWhileIdle || false, // Deprecated from Nov 15th 2016 (will be ignored)
    timeToLive: data.expiry - Math.floor(Date.now() / 1000) || data.timeToLive || 28 * 86400,
    restrictedPackageName: data.restrictedPackageName || 'de.prounix.examplemaps',
    dryRun: data.dryRun || false,
    data: data.custom || {},
    notification: {
        title: data.title || 'My Test!', // Android, iOS (Watch)
        body: data.body || 'Dies ist ein Test', // Android, iOS
        // icon: data.icon, // Android
        // sound: data.sound, // Android, iOS
        // badge: data.badge, // iOS
        // tag: data.tag, // Android
        // color: data.color, // Android
        // click_action: data.clickAction || data.category, // Android, iOS
        // body_loc_key: data.locKey, // Android, iOS
        // body_loc_args: data.locArgs, // Android, iOS
        // title_loc_key: data.titleLocKey, // Android, iOS
        // title_loc_args: data.titleLocArgs, // Android, iOS
    }
  };
}

/* GET home page. */
/* GET users listing. */
router.get('/', function(req, res, next) {
  db.manyOrNone('select * from devices').then(
    (data) => {
      res.json(data);
    },
    (error) => {
      console.warn("could not get devices: ", req.body, error);
      res.json(400, {error: error});
    }
  );
});

router.get('/:id', function(req, res, next) {
  db.oneOrNone(
    'SELECT * FROM devices WHERE dev_id=${id}',
    {id: req.params.id}
  ).then(
    (data) => {
      res.json(data);
    },
    (error) => {
      console.warn("could not get devices: ", req.body, error);
      res.json(400, {error: error});
    }
  );
});

router.post('/', function(req, res) {
  db.query(
    'INSERT INTO devices(dev_id, reg_id, upddate) VALUES(${device_id}, ${registration_id}, current_timestamp)',
    req.body
  ).then(
    (data) => {
      res.send(201, data);
    },
    (error) => {
      console.warn('Device could not be registered: ', req.body, error);
      res.send(400, error);
    }
  );
});

router.put('/:id', function(req, res, next) {
  db.query(
    "UPDATE devices SET last_pos=ST_GeogFromText('POINT(${lat} ${long})'), upddate = current_timestamp WHERE dev_id=${id}",
    {
      id: req.params.id,
      long: req.body.longitude,
      lat: req.body.latitude
    }
  ).then(
    (data) => {
      res.json(data);
    },
    (error) => {
      console.warn("could not update devices: ", req.body, error);
      res.json(400, {error: error});
    }
  );
});

router.delete('/:id', function(req, res) {
  console.log('Unregistering Device: ', req.body);
  db.query(
    'DELETE FROM devices WHERE dev_id=${id}', {id: req.params.id}
  ).then(
    (data) => {
      res.send(200, data);
    },
    (error) => {
      console.warn('Device could not be unregistered: ', error)
      res.send(400, error);
    }
  );
});

router.get('/:id/nearby', function(req, res) {
  console.log('get distance: ', req.params);
  db.query(`
    SELECT *, ST_Distance(ref.last_pos, d.last_pos)
    FROM devices d,
         (SELECT dev_id, last_pos FROM devices WHERE dev_id=$<id>) ref
    WHERE d.last_pos IS NOT NULL
      AND ST_DWithin(ref.last_pos, d.last_pos, $<meters>)
      AND d.dev_id <> ref.dev_id`,
    {
      id: req.params.id,
      meters: req.query.within
    }
  ).then(
    (data) => {
      res.send(200, data);
    },
    (error) => {
      console.warn('Could not find nearby devices : ', error)
      res.send(400, error);
    }
  );
});

router.post('/:id/hello', function(req, res) {
  db.manyOrNone(`
    SELECT *, ST_Distance(ref.last_pos, d.last_pos)
    FROM devices d,
         (SELECT dev_id, last_pos FROM devices WHERE dev_id=$<id>) ref
    WHERE d.last_pos IS NOT NULL
      AND ST_DWithin(ref.last_pos, d.last_pos, $<meters>)
      AND d.dev_id <> ref.dev_id`,
    {
      id: req.params.id,
      within: req.query.within
    }
  ).then(
    (data) => {
      if(data.length > 0){
        let msg = createGCMPush();
        let regIds = data.map((v) => v.reg_id);
        push.send(regIds, data);
        res.send(200, `Erfolgreich ${data.length} angefragt.`);
      } else {
        res.send(200, "Kein Gerät in der Nähe.");
      }
    },
    (error) => {
      console.warn('Could not find nearby devices : ', error)
      res.send(400, error);
    }
  );
});

module.exports = router;