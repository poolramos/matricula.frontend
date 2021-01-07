/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: "node_modules/json-server/dist",
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function (req, res, next) {
  setTimeout(next, 500);
});

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.post("/courses/", function (req, res, next) {
  const error = validateCourse(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.title); // Generate a slug for new courses.
    next();
  }
});

server.post("/parents/", function (req, res, next) {
  const error = validateParent(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.documentNumber); // Generate a slug for new parents.
    next();
  }
});

server.post("/students/", function (req, res, next) {
  const error = validateStudent(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.documentNumber); // Generate a slug for new students.
    next();
  }
});

server.post("/reservations/", function (req, res, next) {
  const error = validateReservation(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.code); // Generate a slug for new reservations.
    next();
  }
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function validateCourse(course) {
  if (!course.title) return "Title is required.";
  if (!course.professorId) return "Professor is required.";
  if (!course.category) return "Category is required.";
  return "";
}

function validateParent(parent) {
  if (!parent.documentTypeId) return "Document type is required.";
  if (!parent.documentNumber) return "Document number is required";
  if (!parent.firstName) return "First name is required";
  if (!parent.lastName) return "Last name is required";
  if (!parent.gender) return "Gender is required";
  if (!parent.address) return "Address is required";
  if (!parent.email) return "Email is required";
  if (!parent.phone) return "Phone is required";
  if (!parent.representative) return "Representative is required";
  return "";
}

function validateStudent(student) {
  if (!student.documentTypeId) return "Document type is required.";
  if (!student.documentNumber) return "Document number is required";
  if (!student.names) return "Names is required";
  if (!student.surnames) return "Surnames is required";
  if (!student.age) return "Age is required.";
  if (!student.birthday) return "Birthday is required";
  if (!student.gender) return "Gender is required";
  return "";
}

function validateReservation(reservation) {
  if (!reservation.code) return "Code is required.";
  if (!reservation.parentId) return "Parent is required.";
  if (!reservation.studentId) return "Student is required.";
  if (!reservation.stageId) return "Stage is required.";
  if (!reservation.turnId) return "Turn is required";
  return "";
}

//http://localhost:3001/courses?slug=ambientes-desarrollo-software
