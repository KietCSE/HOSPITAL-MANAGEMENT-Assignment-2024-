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
      <td>${doctor.fullName}</td>
      <td>${doctor.yearOfBirth}</td>
      <td>${doctor.major}</td>
      `
  row.addEventListener('click', function() {
      sessionStorage.setItem('doctorID', doctor.id);
      sessionStorage.setItem('departmentName', doctor.departmentName);
      window.location.href = '/schedule/admin';
  });

  tbody.appendChild(row);
}