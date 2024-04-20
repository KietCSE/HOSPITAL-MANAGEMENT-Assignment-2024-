username = sessionStorage.getItem('Username');
if (username !== "" && username != null) {
    document.querySelector('.header .login-btn a').innerText = username;
}
else {
    document.querySelector('.header .login-btn a').innerText = "Tài khoản";
}
document.querySelectorAll(".wrapper .container .card").forEach((card) => {
    card.addEventListener("click", () => {

        let info = card.querySelector(".infor");
        if (info.style.display === "block") {
            info.style.display = "none";
            window.Animation = "slide-up";

        } else {
            info.style.display = "block";
            window.Animation = "slide";
        }
    });
})

fetch(`/api/get/All/list/room`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then((response) => {
    return response.json();
}).then((data) => {

    if (data.status === true) {
        let List = data.data;
        List.forEach((room) => {
            let ID = room.rid;

            Fetch_Device(room)
            Update_Status(room)
        });
    }
});


function Update_Status(ROOM) {
    let ID = '#' + ROOM.rid;
    let getRoom = document.querySelector(`${ID}`);

    if (getRoom) {
        fetch(`/api/checking/full/${ROOM.rid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.data === true) {
                getRoom.querySelector(".infor .infor-content #status").innerHTML = "Trạng thái phòng: Phòng đầy";
                getRoom.querySelector(".card-room").style.backgroundColor = "red";
            } else {
                getRoom.querySelector(".infor .infor-content #status").innerHTML = "Trạng thái phòng: Phòng trống";
                getRoom.querySelector(".card-room").style.backgroundColor = "green";
            }
        });
    }
}

function Fetch_Device(room) {
    fetch(`/api/devices/get/listDevice/${room.rid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {

        let D_List = data.data;

        if (D_List === null) return;

        let ID = '#' + room.rid;
        let ROOM = document.querySelector(`${ID}`);
        let Device_List = ROOM.querySelector('.infor .info-Surround .infor-content #devices table tbody')
        if (Device_List) {
            D_List.forEach((device) => {
                let deviceItem = document.createElement("tr");
                deviceItem.innerHTML =
                    `
                        <td>${device.name}</td>
                        <td>${device.id}</td>
                    `;
                Device_List.appendChild(deviceItem);
            });
        }
    }).catch(Error => {
        alert(Error);
    })
}