let doctorID = sessionStorage.getItem('adminDoctorID');
loadSchedule();
let listTask;

// Thêm task
function addTask(taskObj, date) {
    const week = document.querySelector('.week');

    const weekDay = week.children[date - 1];

    const taskLists = weekDay.querySelector('.task-lists');

    const task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML = addShortDescription(taskObj);

    //Add eventListener for task
    task.addEventListener('click', function(event) {
        const detailTasks = document.querySelectorAll('.task__detail');
        for (let item of detailTasks) {
            if (item.classList.contains('appear')) {
                item.classList.remove('appear');
                item.remove();
            }
        }
        let taskDetail = document.createElement('div');
        taskDetail.classList.add('task__detail', 'appear');
        taskDetail.innerHTML = addTaskDetail(taskObj);
        task.appendChild(taskDetail);

        let closeBtn = taskDetail.querySelector('.detail__close');
        let changeScheduleBtn = taskDetail.querySelector('.task__problem');
        let deleteBtn = taskDetail.querySelector('.delete__task');
        let patientInfo = taskDetail.querySelector('.patient-info');

        closeBtn.addEventListener('click', function(event){
            event.stopPropagation();
            task.removeChild(taskDetail);
        });

        changeScheduleBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            taskDetail.remove();
            if(confirm('Bạn có chắc muốn đổi lịch không?')) {
                let changeSchedule = document.createElement('div');
                changeSchedule.classList.add('changeSchedule', 'open');
                changeSchedule.innerHTML = addChangeScheduleHTML();
                let tbody = changeSchedule.querySelector('.table-content tbody');
                let cancelBtn = changeSchedule.querySelector('.cancel');
                cancelBtn.addEventListener('click', () => {
                    changeSchedule.remove();
                })
                fetch('http://localhost:8080/schedule/change', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskObj)
                })
                    .then(response => response.json())
                    .then(data => {
                        let length = data.length;
                        if (length === 0) return false;
                        for (let index = 0; index < length; index++) {
                            let tr = document.createElement('tr');
                            tr.innerHTML = addDoctor(index + 1, data[index]);
                            tbody.appendChild(tr);
                        }
                        return true;
                    })
                    .then((haveDoctor) => {
                        if(haveDoctor) document.querySelector('body').appendChild(changeSchedule);
                        else alert("Không có bác sĩ thay thế :(");
                    })
                    .catch(err => {
                        console.log(err);
                        alert(err);
                    });
            }
        });

        deleteBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            if (confirm('Bạn có chắc chắn là muốn xóa không?')) {
                fetch("http://localhost:8080/schedule/admin/delete?doctorID=" + doctorID, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskObj)
                })
                    .then(response => response.json())
                    .then(data => {
                        task.remove();
                        alert("Xóa thành công :(");
                    })
                    .catch(err => {
                        alert(err);
                        console.log(err);
                    });
            }
        })

        patientInfo.addEventListener('click', function(event) {
            event.stopPropagation();
            sessionStorage.setItem("newPatient", 'false')
            sessionStorage.setItem("IdPatientInfo", taskObj.patientID);
            window.location.href = "/patient/info";
        })
    })
    taskLists.appendChild(task);
}

const openForm = document.querySelector('.create-btn');
openForm.addEventListener('click', function() {
    const form = document.querySelector('.form');
    form.classList.add('open');

    const closeForm = document.querySelector('.form .form__close');
    closeForm.addEventListener('click', function() {
        form.classList.remove('open');
        resetForm(form);
    })

    const submitBtn = document.querySelector('.form .submit');
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const name = document.querySelector('.form .name__value');
        const day = document.querySelector('.form .day__value');
        const date = new Date(day.value);
        const dateNum = date.getDay() == 0 ? 7 : date.getDay();


        const timeFrom = document.querySelector('.form .time__from');
        const timeTo = document.querySelector('.form .time__to');
        const time = timeFrom.value + " - " + timeTo.value;
            
        const location = document.querySelector('.form .location__value');

        const patient = document.querySelector('.form .patient__value');

        let task = {
            name: name.value,
            location: location.value,
            day: reverseString(day.value),
            from: timeFrom.value,
            to: timeTo.value,
            patientID: patient.value,
            departmentName: sessionStorage.getItem('departmentName')
        }


        form.classList.remove('open');
        resetForm(form);

        //Thêm vào database
        fetch("http://localhost:8080/schedule/admin/add?doctorID=" + doctorID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        })
            .then(response => response.json())
            .then(data => {
                alert("Thêm thành công :)");
                window.location.reload();
            })
            .catch(function(err) {
                console.log(err);
                alert(err);
            });
    })

})

function resetForm(form) {
    const name = form.querySelector('.name__value').value = '';
    const day = form.querySelector('.day__value').value = '';
    const timeFrom = form.querySelector('.time__from').value = '00:00';
    const timeTo = form.querySelector('.time__to').value = '00:00';
    const location = form.querySelector('.location__value').value = '';
    const patient = form.querySelector('.patient__value').value = '';
}

// Đảo ngược 1 chuỗi
// yyyy-mm-dd -> dd-mm-yyyy
function reverseString(str) {
    let splitStr = str.split('-');
    splitStr = splitStr.reverse();
    return splitStr.join('/');
}

function reverse(str) {
    let arr = str.split('/');
    return arr.reverse().join('/');
}

function stringToTime(str) {
    let arr = str.split(':');
    return Number.parseFloat(arr[0]) + Number.parseFloat(arr[1]) / 60;

}
//HTML
function addShortDescription(taskObj) {
    let html =
        `
        <div class="task__short-description">
            <h3 class="task__name">${taskObj.name}</h3>
            <p class="task__location">${taskObj.location}</p>
            <p class="task__day">${taskObj.day}</p>
            <p class="task__time">${taskObj.from} - ${taskObj.to}</p>
        </div>
        `
    return html;
}

function addTaskDetail(taskObj) {
    let html =
        `
        <div class="head">
            <div class="delete__task detail__icon">
                    <i class="fa-solid fa-trash"></i>
                </div>
                <div class="task__problem detail__icon">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="detail__close detail__icon">
                    <i style="font-size: 25px;" class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div class="detail">
            <h3 class="detail__name">${taskObj.name}</h3>
            <div class="detail__location">
                <div class="detail__icon">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <p>${taskObj.location}</p>
            </div>
            <div class="detail__time">
                <div class="detail__icon">
                    <i class="fa-solid fa-clock"></i>
                </div>
                <p>${taskObj.day} - ${taskObj.from} - ${taskObj.to}</p>
            </div>
            <div class="detail__patient-info">
                <div class="detail__icon">
                    <i class="fa-solid fa-user"></i>
                </div>
                <p class="patient-info">Thông tin bệnh nhân</p>
            </div>
        </div>
        `
    return html;
}

function addChangeScheduleHTML() {
    let html =
        `
        <div class="table-content">
            <table class="doctorLists">
                <caption>Bác sĩ thay thế</caption>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>SĐT</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="close">
            <button class="cancel">
                Cancel
            </button>
        </div>
        `
    return html;
}

function addDoctor(STT, doctorInfo) {
    let html =
        `
        <td>${STT}</td>
        <td>${doctorInfo.fullName}</td>
        <td>${doctorInfo.phoneNumber}</td>
        `
    return html;
}
//Lấy lịch trình từ database
//Parameter nameDoctor lấy từ tài khoản đang đăng nhập
function loadSchedule() {
    fetch("http://localhost:8080/schedule/list?doctorID=" + doctorID)
        .then(response => response.json())
        .then(data => {
            //data ~ Tuần
            for (let index = 0; index < data.length; index++) {
                //data[index] ~ Thứ trong tuần
                data[index].sort(function(task, otherTask) {
                    let result = 0;
                    const dateTask = new Date(reverse(task.day));
                    const dateOtherTask = new Date(reverse(otherTask.day));
                    if (dateTask < dateOtherTask) {
                        result = -1;
                    }
                    else if (dateTask > dateOtherTask) {
                        result = 1;
                    }
                    else {
                        let taskTime = stringToTime(task.to);
                        let otherTaskTime = stringToTime(otherTask.from);
                        if (taskTime <= otherTaskTime) {
                            result = -1;
                        }
                        else {
                            result = 1;
                        }
                    }
                    return result;
                });
                for (let task of data[index]) {
                    let date = index + 1;
                    let today = new Date();
                    let taskDay = new Date(reverse(task.day));
                    if (taskDay < today &&
                                !(today.getDate() === taskDay.getDate() &&
                                    today.getMonth() === taskDay.getMonth() &&
                                    today.getFullYear() === taskDay.getFullYear())) {
                        continue;
                    }
                    addTask(task, date);
                }
            }
        })
        .then (() => {
            listTask = document.querySelectorAll('.task');
        })
        .catch(err => {
            alert(err);
            console.log(err);
        });
}

//Search
let searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let day = document.querySelector('.search input').value;
    listTask.forEach((task) => {
        let taskDay = task.querySelector('.task__day').innerText;
        if (day && taskDay !== day) {
            task.style.display = 'none';
        }
        else {
            task.style.display = 'block';
        }
    })
})