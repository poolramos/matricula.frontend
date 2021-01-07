/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");
const {
  courses,
  users,
  professors,
  parents,
  students,
  documentTypes,
  reservations,
  stages,
  turns,
} = mockData;
const data = JSON.stringify({
  courses,
  users,
  professors,
  parents,
  students,
  documentTypes,
  reservations,
  stages,
  turns,
});

const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
