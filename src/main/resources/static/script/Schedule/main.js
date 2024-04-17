username = sessionStorage.getItem('Username');
if (username !== "" && username != null) {
    document.querySelector('.header .login-btn a').innerText = username;
}
else {
    document.querySelector('.header .login-btn a').innerText = "Tài khoản";
}

let doctorID = '';
if (sessionStorage.getItem('userID') != null) {
    doctorID = sessionStorage.getItem('userID');
}
else {
    doctorID = '12:28:55.491058900';
}
// Thêm task
function addTask(taskObj, date, patient) {
    const week = document.querySelector('.week');

    const weekDay = week.children[date - 1];

    const taskLists = weekDay.querySelector('.task-lists');

    const task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML =
        `<div class="task__short-description">
            <h3 class="task__name">${taskObj.name}</h3>
            <p class="task__location">${taskObj.location}</p>
            <p class="task__day">${taskObj.day}</p>
            <p class="task__time">${taskObj.from} - ${taskObj.to}</p>
        </div>
        <div class="task__detail">
            <div class="head">
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
        </div>`
    //Add eventListener for task
    task.addEventListener('click', function(event) {
        const detailTasks = document.querySelectorAll('.task__detail');
        for (const item of detailTasks) {
            if (item.classList.contains('appear')) {
                item.classList.remove('appear');
            }
        }
        const taskDetail = task.querySelector('.task__detail');
        taskDetail.classList.add('appear');

        if (event.target.closest('.detail__close')) {
            taskDetail.classList.remove('appear');
        }
        if (event.target.closest('.task__problem')) {
            if(confirm('Bạn có chắc muốn đổi lịch không?')) {
                alert('Yêu cầu của bạn đang chờ xử lí');
            }
        }
        if(event.target.closest('.patient-info')) {
            sessionStorage.setItem("newPatient", 'false')
            sessionStorage.setItem("IdPatientInfo", taskObj.patientID);
            window.location.href = "/patient/info";
        }
    })
    taskLists.appendChild(task);
}

// Đảo ngược 1 chuỗi
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

//Lấy lịch trình từ database
//Parameter nameDoctor lấy từ tài khoản đang đăng nhập
function loadSchedule() {
    fetch("http://localhost:8080/schedule/list?doctorID=" + doctorID)
        .then(response => response.json())
        .then(data => {
            //data ~ Tuần
            for (let index = 0; index < data.length; index++) {
                //data[index] ~ Thứ trong tuần
                data[index].sort((task, otherTask) => {
                    let result = 0;
                    const dateTask = new Date(reverse(task.day));
                    const dateOtherTask = new Date(reverse(otherTask.day));
                    if (dateTask < dateOtherTask) {
                        result = -1;
                    }
                    else if (dateTask > dateOtherTask) {
                        result = 1;
                    }
                    else if (stringToTime(task.to) < stringToTime(otherTask.from)){
                        result = -1;
                    }
                    else {
                        result = 1;
                    }
                    return result;
                });
                for (let task of data[index]) {
                    let date = index + 1;
                    let today = new Date();
                    let taskDay = new Date(reverse(task.day));
                    if (taskDay < today) {
                        continue;
                    }
                    addTask(task, date, "");
                }
            }
        })
        .catch(err => console.log(err));
}

loadSchedule();