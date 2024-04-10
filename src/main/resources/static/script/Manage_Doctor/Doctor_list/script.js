// Lặp qua từng phần tử <tr> và thêm sự kiện click

fetch("http://localhost:8080/api/doctor/list")
    .then(response => response.json())
    .then(data => {
        for (let index = 0; index < data.length; index++) {
          addRow(index + 1, data[index]);
        }
    })
    .catch(err => console.log(err));

function addRow(stt, doctor) {
  let tbody = document.querySelector('.table table tbody');
  let row = document.createElement('tr');
  row.innerHTML =
      `
      <td>${stt}</td>
      <td>${doctor.doctorName}</td>
      <td>${doctor.yearOfBirth}</td>
      <td>${doctor.major}</td>
      `
  row.addEventListener('click', function(event) {
    sessionStorage.setItem('doctorNameCode', doctor.doctorNameCode);
    window.location.href = "/doctor/info";
  });

  tbody.appendChild(row);
}
