document.addEventListener("DOMContentLoaded", function () {
    var tabLinks = document.querySelectorAll(".list-group-item");

    tabLinks.forEach(function (tabLink) {
        tabLink.addEventListener("click", function (event) {
            event.preventDefault();

            tabLinks.forEach(function (link) {
                link.classList.remove("active");
            });

            tabLink.classList.add("active");

            var targetPaneId = tabLink.getAttribute("href");

            var tabPanes = document.querySelectorAll(".tab-pane");
            tabPanes.forEach(function (pane) {
                pane.classList.remove("active", "show");
            });

            var targetPane = document.querySelector(targetPaneId);
            targetPane.classList.add("active", "show");
        });
    });
});

document.querySelector(".text-right .btn-primary").addEventListener("click",() =>{
    let Infomation;
    let form;

    // form = document.querySelectorAll(".form-group")


    Infomation = {
        imgurl: null,
        name: document.querySelector('.form-group input[name="name"]').value,
        phone_number: document.querySelector('.form-group input[name="phone"]').value,
        address: document.querySelector('.form-group input[name="address"]').value,
        b_day: document.querySelector('.form-group input[name="b_day"]').value,
        status: document.querySelector('.form-group textarea[name="status"]').value,
        treatment_schedule: document.querySelector('.form-group textarea[name="treatment_schedule"]').value,
        medical_history: document.querySelector('.form-group textarea[name="medical_history"]').value,
        dr: document.querySelector('.form-group select[name="dr"]').value,
        room: document.querySelector('.form-group input[name="room"]').value,
    }

    console.log(Infomation)

    fetch("/postdatainfo", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Infomation), // Chuyển đổi đối tượng JavaScript thành chuỗi JSON
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.status === true)
            alert("Đã lưu thành công")
        })
        .catch(err => console.log(err))
})