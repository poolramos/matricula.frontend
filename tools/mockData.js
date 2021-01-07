const courses = [
  {
    id: 1,
    title: "Ambientes de Desarrollo de Software",
    slug: "ambientes-desarrollo-software",
    professorId: 1,
    category: "Software Engineering",
  },
  {
    id: 2,
    title: "Ingeniería de Requisitos",
    slug: "ingenieria-requisitos",
    professorId: 2,
    category: "Software Engineering",
  },
  {
    id: 3,
    title: "Proceso de Ingeniería de Software",
    slug: "proceso-ingenieria-software",
    professorId: 3,
    category: "Software Engineering",
  },
  {
    id: 4,
    title: "Gestión de Proyectos de Software",
    slug: "gestion-proyectos-software",
    professorId: 4,
    category: "Software Engineering",
  },
  {
    id: 5,
    title: "Diseño y Construcción de Software",
    slug: "diseño-construccion-software",
    professorId: 1,
    category: "Software Engineering",
  },
  {
    id: 6,
    title: "Arquitectura de Software",
    slug: "arquitectura-software",
    professorId: 5,
    category: "Software Engineering",
  },
  {
    id: 7,
    title: "Big Data",
    slug: "big-data",
    professorId: 6,
    category: "Software Engineering",
  },
  {
    id: 8,
    title: "Metodología de Investigación",
    slug: "metodologia-investigacion",
    professorId: 7,
    category: "Research",
  },
  {
    id: 9,
    title: "Calidad del Proceso de Software",
    slug: "calidad-proceso-software",
    professorId: 8,
    category: "Software Engineering",
  },
  {
    id: 10,
    title: "Gestión de la Configuración y Mantenimiento de Software",
    slug: "gestion-configuracion-mantenimiento-software",
    professorId: 5,
    category: "Software Engineering",
  },
  {
    id: 11,
    title: "Seminario de Investigación I",
    slug: "seminario-investigacion-i",
    professorId: 8,
    category: "Research",
  },
  {
    id: 12,
    title: "Tecnología Cloud Computing (Electivo)",
    slug: "tecnologia-cloud-computing",
    professorId: 9,
    category: "Software Engineering",
  },
  {
    id: 13,
    title: "Desarrollo de Software para Dispositivos",
    slug: "desarrollo-software-dispositivos",
    professorId: 1,
    category: "Software Engineering",
  },
  {
    id: 14,
    title: "Fábrica de Software",
    slug: "fabrica-software",
    professorId: 10,
    category: "Software Engineering",
  },
  {
    id: 15,
    title: "Seminario de Investigación II",
    slug: "seminario-investigacion-ii",
    professorId: 11,
    category: "Research",
  },
  {
    id: 16,
    title: "Gestión de Procesos de Negocio (Electivo)",
    slug: "gestion-procesos-negocio",
    professorId: 12,
    category: "Software Engineering",
  },
];

const newCourse = {
  id: null,
  title: "",
  professorId: null,
  category: "",
};

const professors = [
  { id: 1, name: "Efrain Bautista" },
  { id: 2, name: "Wilder Inga" },
  { id: 3, name: "Amador Izarra" },
  { id: 4, name: "Elmer Zapata" },
  { id: 5, name: "Félix Santos" },
  { id: 6, name: "Luis Saavedra" },
  { id: 7, name: "Nora La Serna" },
  { id: 8, name: "Lenis Wong" },
  { id: 9, name: "Manuel Caldas" },
  { id: 10, name: "Luis Castillo" },
  { id: 11, name: "David Mauricio" },
  { id: 12, name: "Marco Rivas" },
];

const parents = [
  {
    parentId: "1",
    documentTypeId: "2",
    documentNumber: "25455454",
    slug: "25455454",
    firstName: "Javier",
    lastName: "Cahuata",
    address: "Lima",
    email: "javier.Cahuata@gmail.com",
    phone: "965367582",
    gender: "M",
    representative: "1",
  },
  {
    parentId: "2",
    documentTypeId: "1",
    documentNumber: "13434",
    slug: "13434",
    firstName: "Hugo",
    lastName: "Arzapalo",
    address: "Lima",
    email: "javier.Cahuata@gmail.com",
    phone: "965447582",
    gender: "M",
    representative: "1",
  },
];

const newParent = {
  parentId: "",
  documentTypeId: "",
  documentNumber: "",
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  phone: "",
  gender: "",
  representative: "",
};

const students = [
  {
    studentId: "1",
    documentTypeId: "1",
    documentNumber: "123456",
    slug: "123456",
    names: "Gino L.",
    surnames: "Chávez P.",
    age: "34",
    birthday: "09/01/2986",
    gender: "M",
  },
  {
    studentId: "2",
    documentTypeId: "2",
    documentNumber: "87654321",
    slug: "87654321",
    names: "Marco",
    surnames: "Arzapalo",
    age: "40",
    birthday: "09/01/1980",
    gender: "M",
  },
];

const newStudent = {
  studentId: "",
  documentTypeId: "",
  documentNumber: "",
  names: "",
  surnames: "",
  age: "",
  birthday: "",
  gender: "",
};

const users = [
  {
    userId: "1",
    documentTypeId: "1",
    documentNumber: "10173850",
    slug: "123456",
    names: "Marco",
    surnames: "Arzapalo",
    password: "123465",
    passwordConfirmation: "123465",
    email: "marzapalon@hotmail.com",
  },
];

const newUser = {
  userId: "",
  documentTypeId: "",
  documentNumber: "",
  names: "",
  surnames: "",
  password: "",
  passwordConfirmation: "",
  email: "",
};

/////Reservation
const reservations = [
  {
    reservationId: "1",
    code: "12345",
    slug: "12345",
    studentId: "1",
    parentId: "1",
    stageId: "2",
    turnId: "1",
  },
  {
    reservationId: "2",
    code: "000123",
    slug: "000123",
    studentId: "2",
    parentId: "2",
    stageId: "1",
    turnId: "2",
  },
];

const newReservation = {
  reservationId: "",
  code: "",
  studentId: "",
  parentId: "",
  stageId: "",
  turnId: "",
};

const documentTypes = [
  { id: "1", name: "DNI" },
  { id: "2", name: "C.E." },
  { id: "3", name: "Pasaporte" },
];

const stages = [
  { id: "1", name: "Primer Grado" },
  { id: "2", name: "Segundo Grado" },
  { id: "3", name: "Tercer Grado" },
  { id: "4", name: "Cuarto Grado" },
];

const turns = [
  { id: "1", name: "Mañana" },
  { id: "2", name: "Tarde" },
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  courses,
  professors,
  students,
  newStudent,
  parents,
  newParent,
  users,
  newUser,
  reservations,
  newReservation,
  documentTypes,
  stages,
  turns,
};
