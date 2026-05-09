const form = document.querySelector("#studentForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const searchInput = document.querySelector("#search");
const studentTable = document.querySelector("#studentTable");
const studentCount = document.querySelector("#studentCount");

let students = [];

function renderStudents(studentList = students) {
  studentTable.innerHTML = "";
  studentCount.textContent = students.length;

  studentList.forEach((student) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const phoneCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    nameCell.textContent = student.name;
    emailCell.textContent = student.email;
    phoneCell.textContent = student.phone;

    deleteButton.className = "deleteBtn";
    deleteButton.type = "button";
    deleteButton.dataset.id = student.id;
    deleteButton.textContent = "Delete";

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

  if (!name || !email || !phone) {
    alert("Please fill all fields.");
    return;
  }

  const student = {
    id: Date.now(),
    name,
    email,
    phone
  };

  students.push(student);
  renderStudents();
  form.reset();
  nameInput.focus();
}

function deleteStudent(id) {
  students = students.filter((student) => student.id !== id);
  renderStudents();
}

function searchStudents() {
  const searchValue = searchInput.value.toLowerCase().trim();

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchValue) ||
      student.email.toLowerCase().includes(searchValue)
    );
  });

  renderStudents(filteredStudents);
}

form.addEventListener("submit", addStudent);

studentTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteBtn")) {
    deleteStudent(Number(event.target.dataset.id));
  }
});

searchInput.addEventListener("input", searchStudents);

renderStudents();
