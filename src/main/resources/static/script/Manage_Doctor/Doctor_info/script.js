function toggleContent() {
    var mainContent = document.getElementById("mainContent");
    var updateContent = document.getElementById("updateContent");

    if (mainContent.style.display === "none") {
        mainContent.style.display = "block";
        updateContent.style.display = "none";
    } else {
        mainContent.style.display = "none";
        updateContent.style.display = "block";
    }
}

//getData
fetch("http://localhost:8080/api/doctor/info?doctorID=" + sessionStorage.getItem('doctorID'))
    .then(response => response.json())
    .then(data => {
        addInfo(data);
        addInfoUpdate(data);
    })
    .catch(err => alert(err));

function addInfo(doctor) {
    document.querySelector('.name').innerText = doctor.fullName;
    document.querySelector('.yearOfBirth').innerText = doctor.yearOfBirth;
    document.querySelector('.phoneNumber').innerText = doctor.phoneNumber;
    document.querySelector('.address').innerText = doctor.address;
    document.querySelector('#university').innerText = doctor.university;
    document.querySelector('#departmentName').innerText = doctor.departmentName;
    document.querySelector('#major').innerText = doctor.major;
    console.log(doctor);
}
function addInfoUpdate(doctor) {
    document.querySelector('#name-in-update').value = doctor.fullName;
    document.querySelector('#yearOfBirth-in-update').value = doctor.yearOfBirth;
    document.querySelector('#phoneNumber-in-update').value = doctor.phoneNumber;
    document.querySelector('#address-in-update').value = doctor.address;
    document.querySelector('#university-in-update').value = doctor.university;
    document.querySelector('#departmentName-in-update').value = doctor.departmentName;
    document.querySelector('#major-in-update').value = doctor.major;
}

let updateBtn = document.getElementById('update');
updateBtn.addEventListener('click', () => {
    let doctorUpdate = {
        id: sessionStorage.getItem('doctorID'),
        phoneNumber: document.querySelector('#phoneNumber-in-update').value,
        address: document.querySelector('#address-in-update').value,
        university: document.querySelector('#university-in-update').value,
        departmentName: document.querySelector('#departmentName-in-update').value,
        major: document.querySelector('#major-in-update').value
    }
    fetch("http://localhost:8080/api/doctor/update", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorUpdate)
    })
        .then(response => response.json())
        .then(data => {
            document.querySelector('#phoneNumber-in-update').innerText = doctorUpdate.phoneNumber;
            document.querySelector('#address-in-update').innerText = doctorUpdate.address;
            document.querySelector('#university').innerText = doctorUpdate.university;
            document.querySelector('#departmentName').innerText = doctorUpdate.departmentName;
            document.querySelector('#major').innerText = doctorUpdate.major;
            alert("Cập nhật thành công :)")
        })
        .catch(err => alert(err));
})