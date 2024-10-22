let gender = "Male";
// Load JSON data
let students = [];
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    students = data;
    displayTable(students);
  });

// Function to display students in table
function displayTable(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  data.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${student.id}</td>
            <td><div class="img-container"><div><img src=${
              student.img_src
            }></div><div>${student.first_name} ${
      student.last_name
    }</div></div></td>
            <td>${student.email}</td>
            <td>${student.marks}</td>
            <td>${student.class}</td>
            <td>${student.passing ? "Passing" : "Failed"}</td>
            <td>${student.gender}</td>
        `;

    tableBody.appendChild(row);
  });
}

// Search functionality
document.getElementById("searchBar").addEventListener("input", function () {
  const searchQuery = this.value.toLowerCase();
  
  const filteredStudents = students.filter(
    (student) =>{
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
      return(
      // student.first_name.toLowerCase().includes(searchQuery) ||
      // student.last_name.toLowerCase().includes(searchQuery) ||
      student.email.toLowerCase().includes(searchQuery) ||
      fullName.includes(searchQuery))
});
  displayTable(filteredStudents);
});

// Sorting functions
function sortByName(order) {
  const sortedStudents = students.sort((a, b) => {
    const fullNameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const fullNameB = `${b.first_name} ${b.last_name}`.toLowerCase();
    if (order === "asc") {
      return fullNameA < fullNameB ? -1 : 1;
    } else {
      return fullNameA > fullNameB ? -1 : 1;
    }
  });
  displayTable(sortedStudents);
}

function sortByMarks() {
  const sortedStudents = students.sort((a, b) => a.marks - b.marks);
  displayTable(sortedStudents);
}

function showPassing() {
  const passingStudents = students.filter((student) => student.passing);
  displayTable(passingStudents);
}

function sortByClass() {
  const sortedStudents = students.sort((a, b) => a.class - b.class);
  displayTable(sortedStudents);
}

function sortByGender() {
  if (gender == "Male") {
    const maleStudents = students.filter(
      (student) => student.gender === "Female"
    );
    const filterArray = students.filter(
      (student) => student.gender != "Female"
    );
    students = [];
    students = [...maleStudents, ...filterArray];
    gender = "Female";
  } else {
    if (gender == "Female") {
      const maleStudents = students.filter(
        (student) => student.gender === "Male"
      );
      const filterArray = students.filter(
        (student) => student.gender != "Male"
      );
      students = [];
      students = [...maleStudents, ...filterArray];
      gender = "Male";
    }
  }
  displayTable(students);
}
