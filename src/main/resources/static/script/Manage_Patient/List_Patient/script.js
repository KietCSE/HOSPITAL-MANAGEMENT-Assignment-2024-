
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
    // var newtodo = document.querySelector('.container .todo-content .todo-box:last-child')
    // newtodo.addEventListener('change', ()=>{
    //     var e = newtodo.querySelector('.todo-check input')
    //     if (e.checked) {
    //         newtodo.remove()
    //         fetch(`http://localhost:8080/delete/${data.id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //             })
    //             .catch(error => {
    //                 console.error('There was an error!', error);
    //             });
    //     }
    // })
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
        list.forEach(function(e) {
            // console.log(e);
            AddPatient(e)
        })
    }
    // tim theo phong
    else if(/[a-zA-Z]/.test(content) && /\d/.test(content)) {
        list.forEach(function(e) {
            if (e.Rom === content) {
                AddPatient(e)
            }
        })
    }
    // tim theo so ID
    else if (!isNaN(content)) {
        list.forEach(function(e) {
            if (e.ID === content) {

                AddPatient(e)
            }
        })
    }
    // tim theo ten
    else {
        list.forEach(function (e) {
            if (e.name === content) {
                AddPatient(e)
            }
        })
    }
})


  