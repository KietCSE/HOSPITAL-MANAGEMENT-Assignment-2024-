// const container = document.getElementById("container");
// const registerBtn = document.getElementById("register");
// const loginBtn = document.getElementById("login");
//
// registerBtn.addEventListener("click", () => {
//   container.classList.add("active");
// });
//
// loginBtn.addEventListener("click", () => {
//   container.classList.remove("active");
// });

// ---------------------------------------------------------------------------------------------------
const error =  document.getElementById("error");

document.getElementById("account").addEventListener("click", ()=>{
    error.innerText = ""
})

document.getElementById("password").addEventListener("click", ()=>{
    error.innerText = ""
})

document.getElementById("login-btn").addEventListener("click", ()=>{
    event.preventDefault();
    console.log("Loading")
    let acc = document.getElementById("account").value;
    let pwd = document.getElementById("password").value;

    sessionStorage.setItem('Username', acc);

    let data = {
        account: acc,
        password: pwd
    }

    console.log(data)

    // load du lieu de dang nhap
    fetch(`http://localhost:8080/checkaccount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Chuyển đổi đối tượng JavaScript thành chuỗi JSON
    })
        .then(res => res.json())
        .then(data => {

            if (data.status === true) {
                sessionStorage.setItem('doctorID', data.id)
                sessionStorage.setItem('jwt', data.code)
                window.location.href = "http://localhost:8080"
            }
            else {
                console.log("Sai")
                error.innerText = "Tai khoan hoac mat khau khong dung"
            }
        })
        .catch(err => console.log(err))

})
