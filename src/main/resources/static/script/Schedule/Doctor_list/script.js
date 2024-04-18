username = sessionStorage.getItem('Username');
if (username !== "" && username != null) {
    document.querySelector('.header .login-btn a').innerText = username;
}
else {
    document.querySelector('.header .login-btn a').innerText = "Tài khoản";
}
fetch("http://localhost:8080/api/doctor/list")
    .then(response => response.json())
    .then(data => {
        for (let index = 0; index < data.length; index++) {
          addRow(index + 1, data[index]);
        }
    })
    .catch(err => alert(err));

function addRow(stt, doctor) {
  let tbody = document.querySelector('.table table tbody');
  let row = document.createElement('tr');
  row.innerHTML =
      `
      <td>${stt}</td>
      <td class="name">${doctor.fullName}</td>
      <td>${doctor.yearOfBirth}</td>
      <td>${doctor.major}</td>
      `
  row.addEventListener('click', function() {
      sessionStorage.setItem('adminDoctorID', doctor.id);
      sessionStorage.setItem('departmentName', doctor.departmentName);
      window.location.href = '/schedule/admin';
  });

  tbody.appendChild(row);
}

document.querySelector('.search-btn').addEventListener('click', (event) => {
    event.preventDefault();
    let doctors = document.querySelectorAll('tbody tr');
    let searchValue = document.querySelector('.search input').value.toLowerCase();
    if (searchValue) {
        for (let doctor of doctors) {
            let doctorName = doctor.querySelector('.name').innerText.toLowerCase();
            console.log(doctorName, searchValue);
            if (doctorName.search(searchValue) >= 0) doctor.style.display = 'table-row';
            else doctor.style.display = 'none';
        }
    }
    else {
        for (let doctor of doctors) {
            doctor.style.display = 'table-row'
        }
    }
})