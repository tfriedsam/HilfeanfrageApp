const settings = {
    gcm: {
        id: "AAAA45VzAy0:APA91bFZKXGUR3xerWMUkXK3wMlSqx5sj8jNPH4qLx9H4-5xV5ajgLpFA_GVizK7Z9k4FkCeiDXxrnSco6858i1rlajGDvk94mXaC55Yxowur7nMdLMQoyX6VdnijpvOI5g64hbXDdXIpDH_g5iUUaCidNI8JjAnpQ",
    },
    apn: {},
    adm: {},
    wns: {}
};

const PushNotifications = new require('node-pushnotifications');
const push = new PushNotifications(settings);

module.exports = push;