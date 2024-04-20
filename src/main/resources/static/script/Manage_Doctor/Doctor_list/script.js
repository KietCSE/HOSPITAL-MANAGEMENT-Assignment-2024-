username = sessionStorage.getItem('Username');
if (username !== "" && username != null) {
    document.querySelector('.header .login-btn a').innerText = username;
}
else {
    document.querySelector('.header .login-btn a').innerText = "Tài khoản";
}

let index;

fetch("http://localhost:8080/api/doctor/list")
    .then(response => response.json())
    .then(data => {
        for (index = 0; index < data.length; index++) {
          addRow(index + 1, data[index]);
        }
    })
    .catch(err => console.log(err));

let addDoctor = document.querySelector('.addDoctor');
let addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', function() {
    addDoctor.classList.add('open');
});

let closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click', function() {
    addDoctor.classList.remove('open');
    resetFormValue(addDoctor);
});

let submitBtn = document.querySelector('.addDoctor__submitBtn');
submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    let name = addDoctor.querySelector('.name');
    let yearOfBirth = addDoctor.querySelector('.yearOfBirth');
    let phoneNumber = addDoctor.querySelector('.phoneNumber');
    let address = addDoctor.querySelector('.address');
    let university = addDoctor.querySelector('.university');
    let departmentName = addDoctor.querySelector('.departmentName');
    let major = addDoctor.querySelector('.major');
    let doctor = {
        fullName: name.value,
        yearOfBirth: yearOfBirth.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
        university: university.value,
        departmentName: departmentName.value,
        major: major.value
    }
    fetch("http://localhost:8080/api/doctor/add", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(doctor)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            addRow(++index, data);
            alert("Thêm thành công");
            addDoctor.classList.remove('open');
            resetFormValue(addDoctor);
        })
        .catch(err => console.log(err));
});

function resetFormValue(parent) {
    let inputs = parent.querySelectorAll('input');
    inputs.forEach(input => input.value = "");
}

function addRow(stt, doctor) {
  let tbody = document.querySelector('.table table tbody');
  let row = document.createElement('tr');
  row.innerHTML =
      `
      <td>${stt}</td>
      <td class="name">${doctor.fullName}</td>
      <td>${doctor.yearOfBirth}</td>
      <td>${doctor.major}</td>
      <td class="delete">Xóa</td>
      `
  row.addEventListener('click', function() {
    sessionStorage.setItem('doctorID', doctor.id);
    window.location.href = "/doctor/info";
  });

  row.querySelector('.delete').addEventListener('click', function(event) {
      event.stopPropagation();
      fetch("http://localhost:8080/api/doctor/delete?doctorID=" + doctor.id, {
          method: 'DELETE'
      })
          .then(response => response.json())
          .then(data => {
              alert("Xóa thành công :(");
              window.location.href = "/doctor/list";
          })
          .catch(err => console.log(err));
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