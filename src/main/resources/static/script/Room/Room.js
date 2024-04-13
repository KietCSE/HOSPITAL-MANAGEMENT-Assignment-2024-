document.querySelectorAll(".wrapper .container .card").forEach((card) => {
    card.addEventListener("click", () => {
        let info = card.querySelector(".infor");
        if (info.style.display === "block") {
            info.style.display = "none";
            document.querySelectorAll(".wrapper .container .banner").forEach((banner) => {
                banner.style = "margin-top: 0;";
            });
        } else {
            info.style.display = "block";
            document.querySelectorAll(".wrapper .container .banner").forEach((banner) => {
                banner.style = "margin-top: 3%;";
            });
        }
    });
})


// API gọi GET để lấy danh sách phòng trống.
fetch(`/api/get/list/room`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then((response) => {
    return response.json();
}).then((data) => {
    if (data.status === true) {
        console.log(data);
        let List = data.data;
        let select = document.querySelector('.wrapper .sl select[name="room"]');

        List.forEach((room) => {
            let option = document.createElement("option");
            option.value = room.rid;
            option.textContent = room.rid;
            select.appendChild(option);
            Update_Status(room)
        });
    }
});


function Update_Status(ROOM) {
    let getRoom = document.querySelectorAll('.container .card');
    console.log(getRoom);
    getRoom.forEach((room) => {

        if (room.querySelector(".card-header span").textContent === ROOM.rid) {
            fetch(`/api/checking/full/${ROOM.rid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.data === true) {
                    // Phong day
                    room.querySelector(".infor .infor-content #status").innerHTML = "Trạng thái phòng: Phòng đầy";
                    room.querySelector(".card-room").style.backgroundColor = "red";
                } else {
                    // Phong trong
                    room.querySelector(".infor .infor-content #status").innerHTML = "Trạng thái phòng: Phòng trống";
                    room.querySelector(".card-room").style.backgroundColor = "green";
                }
                // let patients = room.querySelector(".infor .infor-content #patients");
                // patients.innerHTML = "";
                // for (let i = 0; i < ROOM.list_Patients.length; i++) {
                //     let patient = document.createElement("div");
                //     patient.className = "pt";
                //     patient.innerHTML = `
                //         <p>${ROOM.patients[i].name}</p>
                //         <p>${ROOM.patients[i].phone_number}</p>
                //         <p>${ROOM.patients[i].address}</p>`;
                //     patients.appendChild(patient);
                // }

                let devices = room.querySelector(".infor .infor-content #devices");
                devices.innerHTML = "";
                for (let i = 0; i < ROOM.list_Devices.length; i++) {
                    let device = document.createElement("div");
                    device.className = "dv";
                    // device.innerHTML = `
                    //     // <p>${ROOM.devices[i].name}</p>
                    //     // <p>${ROOM.devices[i].quantity}</p>`;
                    devices.appendChild(device);
                }
            });
        }
    })
}




// // Lam sao de lay du lieu tu he thong  va hien thi len trang web tu dong moi khi co su thay doi
// // Su dung WebSocket
// // Path: src/main/java/com/example/demo/config/WebSocketConfig.java
// @Configuration
//     @EnableWebSocketMessageBroker
//     public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
//         @Override
//         public void registerStompEndpoints(StompEndpointRegistry registry) {
//             registry.addEndpoint("/ws").withSockJS();
//         }

//         @Override
//         public void configureMessageBroker(MessageBrokerRegistry registry) {
//             registry.setApplicationDestinationPrefixes("/app");
//             registry.enableSimpleBroker("/topic");
//         }
//     }
// // Path: src/main/java/com/example/demo/controller/RoomController.java
// @RestController
//     public class RoomController {
//         @Autowired
//         private RoomService roomService;

//         @MessageMapping("/rooms")
//         @SendTo("/topic/rooms")
//         public List<Room> getAllRooms() {
//             return roomService.getAllRooms();
//         }
//     }
// // Path: src/main/resources/static/script/Room/Room.js
// let stompClient = null;
// function connect() {
//     let socket = new SockJS('/ws');
//     stompClient = Stomp.over(socket);
//     stompClient.connect({}, function (frame) {
//         console.log('Connected: ' + frame);
//         stompClient.subscribe('/topic/rooms', function (rooms) {
//             showRooms(JSON.parse(rooms.body));
//         });
//     });
// }
// function showRooms(rooms) {
//     let container = document.querySelector(".container");
//     container.innerHTML = "";
//     rooms.forEach((room) => {
//         let card = document.createElement("div");
//         card.className = "card";
//         card.innerHTML = `
//             <div class="banner">
//                 <img src="/image/${room.getImage()}" alt="Room">
//             </div>
//             <div class="infor">
//                 <h3>${room.getName()}</h3>
//                 <p>${room.getDescription()}</p>
//             </div>
//         `;
//         container.appendChild(card);
//     });
// }
// connect();
// // Path: src/main/resources/static/script/Room/Room.css