// Thêm task
function addTask(taskObj, date, patient) {
    console.log(taskObj);
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
        else if (event.target.closest('.delete__task')) {
            if (confirm('Bạn có chắc chắn là muốn xóa không?')) {
                fetch("http://localhost:8080/schedule/delete?doctorName=hailam", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskObj),
                })
                    .then(response => response.json())
                    .then(data => {
                         console.log(data);
                        task.remove();
                        alert("Xóa thành công :(");
                    })
                    .catch(err => console.log(err));
            }
        }
        else if(event.target.closest('.patient-info')) {
            sessionStorage.setItem("newPatient", false)
            sessionStorage.setItem("IdPatientInfo", taskObj.patientID);
            window.location.href = "/patient/info";
        }
        // else if ()
    })
    taskLists.appendChild(task);
}

const openForm = document.querySelector('.create-btn');
openForm.addEventListener('click', function() {
    const form = document.querySelector('.form');
    form.classList.add('open');

    const closeForm = form.querySelector('.form__close');
    closeForm.addEventListener('click', function() {
        form.classList.remove('open');
        const name = form.querySelector('.name__value').value = '';
        const day = form.querySelector('.day__value').value = '';
        const timeFrom = form.querySelector('.time__from').value = '';
        const timeTo = form.querySelector('.time__to').value = '';
        const location = form.querySelector('.location__value').value = '';
        const patient = form.querySelector('.patient__value').value = '';
    })

    const submitBtn = form.querySelector('.submit');
    submitBtn.addEventListener('click', function(event) {
        const name = form.querySelector('.name__value');
        const day = form.querySelector('.day__value');
        const date = new Date(day.value);
        const dateNum = date.getDay() == 0 ? 7 : date.getDay();


        const timeFrom = form.querySelector('.time__from');
        const timeTo = form.querySelector('.time__to');
        const time = timeFrom.value + " - " + timeTo.value;
            
        const location = form.querySelector('.location__value');

        const patient = form.querySelector('.patient__value');

        let task = {
            name: name.value,
            location: location.value,
            day: reverseString(day.value),
            from: timeFrom.value,
            to: timeTo.value,
            patientID: patient.value
        }


        form.classList.remove('open');
        name.value = '';
        day.value = '';
        timeFrom.value = '';
        timeTo.value = '';
        location.value = '';
        patient.value = '';

        //Thêm vào database
        fetch("http://localhost:8080/schedule/add?doctorName=hailam", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then(response => response.json())
            .then(data => {
                if (date >= new Date()) {
                    addTask(data, dateNum, "");
                }
                alert("Thêm thành công :)")
            })
            .catch(err => console.log(err));
    })

})

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

//Lấy lịch trình từ database
//Parameter nameDoctor lấy từ tài khoản đang đăng nhập
function loadSchedule() {
    fetch("http://localhost:8080/schedule/list?doctorName=hailam")
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