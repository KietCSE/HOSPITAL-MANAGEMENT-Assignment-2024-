
// Lặp qua từng phần tử <tr> và thêm sự kiện click
document.querySelector(".button .btn button").addEventListener("click", () => {
    sessionStorage.setItem("newPatient", true)
    window.location.href = "/patient/info";
});

var count = 0;
function AddPatient(data) {
    count++;
    var patient =
        `<tr>
            <td>${count}</td>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.room}</td>
            <td><span class="delete">Xóa</span></i></td> 
        </tr>`
    document.querySelector('.table .table_body tbody').insertAdjacentHTML("beforeend", patient)

    document.querySelector('.table .table_body table tbody tr:last-child').addEventListener('click', () => {
        sessionStorage.setItem("newPatient", false)
        sessionStorage.setItem("IdPatientInfo", data.id)
        // console.log(sessionStorage.getItem("IdPatientInfo"))
        window.location.href = "/patient/info";
    })

    // xoa benh nhan
    document.querySelector('.table .table_body table tbody tr:last-child span.delete').addEventListener('click', (event) => {
        event.stopPropagation()
        document.querySelector('.notification').style.visibility = 'visible';
        // nhan nut No
        document.querySelector('.notification .content-notif .no-btn').addEventListener('click', ()=>{
            document.querySelector('.notification').style.visibility = 'hidden';
        })
        // nhan nut Yes
        document.querySelector('.notification .content-notif .yes-btn').addEventListener('click', ()=>{

            fetch(`/deletePatient/${data.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === true) {
                        alert("Xoa thanh cong")
                        window.location.href = "http://localhost:8080/patient/list"
                    }
                    else alert("Xoa khong thanh cong")
                })
                .catch(err => console.log(err))
        })
    });

}

var list = null
fetch('http://localhost:8080/patient/getData')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        count = 0;
        if (data.status === true) {
            list = data.data
            data.data.forEach(function(e) {
                // console.log(e);
                AddPatient(e)
            })
        }

    })
    .catch(err => console.log(err))

document.querySelector('.search .search-btn').addEventListener('click', () => {
    count = 0;
    let content = document.querySelector('.search input').value;
    document.querySelector('.table .table_body tbody').innerHTML = ""
    if (!content) {
        console.log("ko nhap")
        list.forEach(function(e) {
            // console.log(e);
            AddPatient(e)
        })
    }
    // tim theo phong
    else if(/[a-zA-Z]/.test(content) && /\d/.test(content)) {
        console.log("phong")
        list.forEach(function(e) {
            if (e.room === content) {
                AddPatient(e)
            }
        })
    }
    // tim theo so ID
    else if (!isNaN(content)) {
        console.log("id")
        list.forEach(function(e) {
            if (e.id === content) {
                AddPatient(e)
            }
        })
    }
    // tim theo ten
    else {
        list.forEach(function (e) {
            console.log("name")
            if (e.name === content) {
                AddPatient(e)
            }
        })
    }
})



  