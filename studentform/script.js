// First principle:
// A student form needs 4 basic things:
// 1. Get data from inputs
// 2. Store that data somewhere
// 3. Show that data on the screen
// 4. Update the screen when data changes

const form = document.querySelector("#studentForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const searchInput = document.querySelector("#search");
const studentTable = document.querySelector("#studentTable");
const studentCount = document.querySelector("#studentCount");

const storageKey = "student-list";

let students = getStudentsFromStorage();

function getStudentsFromStorage() {
  const savedStudents = localStorage.getItem(storageKey);

  if (savedStudents === null) {
    return [];
  }

  return JSON.parse(savedStudents);
}

function saveStudentsToStorage() {
  localStorage.setItem(storageKey, JSON.stringify(students));
}

function createStudent(name, email, phone) {
  return {
    id: Date.now(),
    name: name,
    email: email,
    phone: phone
  };
}

function showStudents(studentList) {
  studentTable.innerHTML = "";
  studentCount.textContent = students.length;

  studentList.forEach((student) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;

    const emailCell = document.createElement("td");
    emailCell.textContent = student.email;

    const phoneCell = document.createElement("td");
    phoneCell.textContent = student.phone;

    const actionCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "deleteBtn";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = student.id;

    actionCell.append(deleteButton);
    row.append(nameCell, emailCell, phoneCell, actionCell);
    studentTable.append(row);
  });
}

function addStudent(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (name === "" || email === "" || phone === "") {
    alert("Please fill all fields.");
    return;
  }

  const newStudent = createStudent(name, email, phone);

  students.push(newStudent);
  saveStudentsToStorage();
  showStudents(students);

  form.reset();
  nameInput.focus();
}

function deleteStudent(studentId) {
  students = students.filter((student) => student.id !== studentId);

  saveStudentsToStorage();
  showStudents(students);
}

function searchStudents() {
  const searchText = searchInput.value.toLowerCase().trim();

  const matchingStudents = students.filter((student) => {
    const name = student.name.toLowerCase();
    const email = student.email.toLowerCase();

    return name.includes(searchText) || email.includes(searchText);
  });

  showStudents(matchingStudents);
}

form.addEventListener("submit", addStudent);

studentTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteBtn")) {
    const studentId = Number(event.target.dataset.id);
    deleteStudent(studentId);
  }
});

searchInput.addEventListener("input", searchStudents);

showStudents(students);
