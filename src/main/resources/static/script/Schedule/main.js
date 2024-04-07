// Thêm task
function addTask({
    name = '',
    location = '',
    date = 1,
    day = '',
    time = '',
    patient = ''
}) {
    const week = document.querySelector('.week');

    const weekDay = week.children[date - 1];

    const taskLists = weekDay.querySelector('.task-lists');

    const task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML =
        `<div class="task__short-description">
            <h3 class="task__name">${name}</h3>
            <p class="task__location">${location}</p>
            <p class="task__day">${day}</p>
            <p class="task__time">${time}</p>
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
                <h3 class="detail__name">${name}</h3>
                <div class="detail__location">
                    <div class="detail__icon">
                        <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <p>${location}</p>
                </div>
                <div class="detail__time">
                    <div class="detail__icon">
                        <i class="fa-solid fa-clock"></i>
                    </div>
                    <p>${day} - ${time}</p>
                </div>
                <div class="detail__patient-info">
                    <div class="detail__icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <p class="patient-info">Thông tin bệnh nhân</p>
                </div>
            </div>
        </div>`
    task.addEventListener('click', {

    })
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
                alert('Yêu cầu của bạn đang chờ xử lí?');
            }
        }
        else if (event.target.closest('.delete__task')) {
            if (confirm('Bạn có chắc chắn là muốn xóa không?')) {
                task.remove();
            }
        }
        else if(event.target.closest('.patient-info')) {
            window.location.href = "../Manage_Patient/List_Patient/index.html";
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

        addTask({
            name: name.value,
            location: location.value,
            date: dateNum,
            day: reverseString(day.value),
            time: time,
            patient: patient.value
        });
    
        form.classList.remove('open');
        name.value = '';
        day.value = '';
        timeFrom.value = '';
        timeTo.value = '';
        location.value = '';
        patient.value = '';
        detailTask();
    })

})

// Đảo ngược 1 chuỗi
function reverseString(str) {
    let splitStr = str.split('-');
    splitStr = splitStr.reverse();
    return splitStr.join('-');
}

//Lấy lịch trình từ database
//Parameter nameDoctor lấy từ tài khoản đang đăng nhập
fetch("http://localhost:8080/schedule/list?nameDoctor=tranlam")
    .then(respone => respone.json())
    .then(data => {
        //data ~ Tuần
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            //data[index] ~ Thứ trong tuần
            console.log(index);
            for (let task of data[index]) {
                let date = index + 1;
                addTask({
                    name: task.name,
                    location: task.location,
                    date: date,
                    day: task.day,
                    time: task.from + " - " + task.to,
                    patient: ""
                })
            }
        }
    })
    .catch(err => console.log(err));