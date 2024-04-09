
// Lặp qua từng phần tử <tr> và thêm sự kiện click
document.querySelectorAll('.table_body tr').forEach(row => {
    row.addEventListener('click', () => {
        window.location.href = "/patient/info";
        // Thêm code xử lý sự kiện click ở đây
    });
});

document.querySelector(".button .btn button").addEventListener("click", () => {
    window.location.href = "/patient/info";
});

var count = 0;
function AddPatient(data) {
    count++;
    var patient =
        `<tr>
            <td>${count}</td>
            <td>${data.ID}</td>
            <td>${data.name}</td>
            <td>${data.Rom}</td>
            <td><span class="delete">Xóa</span></i></td> 
        </tr>`
    document.querySelector('.table .table_body tbody').insertAdjacentHTML("beforeend", patient)

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


  