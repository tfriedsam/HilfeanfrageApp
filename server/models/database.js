const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://localhost:5432/push_example");

// db.query(
//   'CREATE TABLE user(id SERIAL PRIMARY KEY, username varchar(60),  lastlogin TIMESTAMP)'
// ).then(
//   (resp) => console.log("DB created: ", resp),
//   (error) => console.warn("DB NOT created: ", error)
// );

db.query(
  'CREATE TABLE devices(id SERIAL PRIMARY KEY, dev_id VARCHAR(255), reg_id VARCHAR(255) not null, last_pos geography(POINT,4326), upddate TIMESTAMP)'
).then(
  (resp) => console.log("DB created: ", resp),
  (error) => console.warn("DB NOT created: ", error)
);

module.exports = db;