var swiper = new Swiper(".doctor-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides:true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
  });

document.querySelector('.header .login-btn a').innerText = "Tài khoản";

username = sessionStorage.getItem('Username');
console.log(username)
if (username !== "") {
    document.querySelector('.header .login-btn a').innerText = username;
}
else {
    document.querySelector('.header .login-btn a').innerText = "Tài khoản";
}

document.querySelector(".login-btn .logout").addEventListener('click', () => {
    sessionStorage.setItem("Username", "");
    sessionStorage.setItem("jwt", "");
    window.location.href = "/";
    console.log(sessionStorage.getItem("Username"))

    console.log(sessionStorage.getItem("jwt"))
})

jwt = sessionStorage.getItem("jwt")
console.log(jwt)

function Fetch(urlGate, urlWindow) {
    console.log("dang chay dung ")
    fetch(`http://localhost:8080${urlGate}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt // Thêm JWT vào header
        },
    })
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(data => {
            console.log(data)
            if (data.status === true) {
                window.location.href = urlWindow;
            }
        })
        .catch(error => {
            alert("Bạn không có quyền truy cập")
            console.log(error)
        });
}

document.querySelector(".login-btn .user").addEventListener("click", () => {
    window.location.href = "/login";
})


// Navigate Feature Button 
document.querySelector(".patient_info").addEventListener("click", () => {
    // window.location.href = `/patient/list`;

    Fetch("/navigatePatient", "/patient/list")
    // fetch("http://localhost:8080/patient/list", {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': 'Bearer ' + jwt // Thêm JWT vào header
    //     },
    // })
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json(); // Xử lý dữ liệu JSON nếu cần
    //         } else {
    //             throw new Error('Failed to fetch data'); // Ném ra một lỗi nếu phản hồi không thành công
    //         }
    //     })
    //     .then(data => {
    //         // Xử lý dữ liệu ở đây nếu cần
    //         console.log(data);
    //         window.location.href = "/patient/list";
    //     })
    //     .catch(err => {
    //         console.error('Error:', err);
    //         // Xử lý lỗi ở đây, ví dụ hiển thị một thông báo lỗi cho người dùng
    //         alert('Failed to fetch data. Please try again later.');
    //     });
})


document.querySelector(".schedule_info").addEventListener("click", () => {
    window.location.href = "/schedule";
});

document.querySelector(".doctor_info").addEventListener("click", () => {
    // window.location.href = "/doctor/list";
    Fetch("/navigateDoctor", "/doctor/list")

})

document.querySelector(".tool_info").addEventListener("click", () => {
    // window.location.href = "/tool/form";
    Fetch("/navigateTool", "/tool/form")

})

document.querySelector(".medicine_info").addEventListener("click", () => {
    // window.location.href = "/medicine/form";
    Fetch("/navigateMedicine", "/medicine/form")

})

document.querySelector(".room").addEventListener("click", () => {
    Fetch("/navigateMedicine", "/room")
})

document.querySelector(".evaluate").addEventListener("click", () => {
    window.location.href = "/evaluate";
})

