let Count = 0;
document.querySelector(".import form .submit").addEventListener("click", async function () {
    let form;
    let Medicine_Obj;
    try {
        form = document.querySelector(".import form");
        if (document.querySelector('.import input[type="checkbox"]').checked) {

            Medicine_Obj = {
                ID: makeID(),
                Name: form.querySelector('input[name="Name"]').value,
                Amount: form.querySelector('input[name="Amount"]').value,
                Img_Url: null,
                Type: form.querySelector('input[name="Type"]').value,
                Classify: form.querySelector('input[name="Classify"]').value,
                Description: form.querySelector('textarea[name="Description"]').value,
                Uses: form.querySelector('textarea[name="Uses"]').value,
                N_Uses: form.querySelector('textarea[name="N_Uses"]').value,
                Validated: form.querySelector('input[name="Validated"]').value,
                History: {
                    Day_Input: form.querySelector('input[name="Date"]').value,
                    Export_Date: []
                },
            };
            {
                let fileInput = form.querySelector('input[type="file"]');
                if (!fileInput) {
                    throw new Error("Hãy chọn ảnh thuốc");
                }
                let file = fileInput.files[0];

                if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
                    throw new Error("Định dạng ảnh không hợp lệ");
                }
                let f = new FormData();
                f.append("file", file);
                let response = await fetch("/api/Image", {
                    method: "POST",
                    body: f
                });
                if (!response.ok) {
                    throw new Error("Không thể upload ảnh lên server");
                }
                else {
                    console.log("Tải ảnh thành công");
                    let data = await response.text();
                    console.log("Received data:", data);
                    Medicine_Obj.Img_Url = data;
                }
                if (Object.values(Medicine_Obj).some(value => value === "")) {
                    throw "Hãy điền đầy đủ thông tin";
                }
            }
        } else {
            let NAME = form.querySelector('input[name="Name"]').value;
            const response = await fetch(`/api/medicine/getElement/${NAME}`);
            if (!response.ok) {
                throw new Error("Không thể lấy dữ liệu từ server");
            }

            let data = await response.json();
            if (data.status === false) {
                throw new Error(data.message);
            } else {
                console.log(data.data);
                Medicine_Obj = {
                    ID: makeID(),
                    Name: data.data.name,
                    Amount: form.querySelector('input[name="Amount"]').value,
                    Validated: form.querySelector('input[name="Validated"]').value,
                    Type: data.data.type,
                    Classify: data.data.classify,
                    Description: data.data.description,
                    Uses: data.data.uses,
                    N_Uses: data.data.n_Uses,
                    Img_Url: data.data.img_Url,

                    History: {
                        Day_Input: form.querySelector('input[name="Date"]').value,
                        Export_Date: [],
                    },
                };
            }
        }
        if (Object.values(Medicine_Obj).some(value => value === "")) {
            throw "Hãy điền đầy đủ thông tin";
        }
        if (isNaN(parseInt(Medicine_Obj.Amount))) {
            throw "Trường Số lượng phải là số";
        }
        if (parseInt(Medicine_Obj.Amount) < 0) {
            throw "Số lượng không thể nhỏ hơn 0";
        }
        if (isNaN(Date.parse(Medicine_Obj.History.Day_Input))) {
            throw "Ngày nhập không hợp lệ";
        }
        if (isNaN(Date.parse(Medicine_Obj.Validated))) {
            throw "Ngày hết hạn không hợp lệ";
        }
        if (Date.parse(Medicine_Obj.History.Day_Input) < Date.now()) {
            throw "Ngày nhập không thể nhỏ hơn ngày hiện tại";
        }
        if (Date.parse(Medicine_Obj.Validated) < Date.parse(Medicine_Obj.History.Day_Input)) {
            throw "Ngày hết hạn không thể nhỏ hơn ngày nhập";
        }
        const postResponse = await fetch("/api/medicine/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Medicine_Obj)
        });
        if (!postResponse.ok) {
            throw new Error("Không thể thêm dữ liệu vào server");
        }
        let data = await postResponse.json();
        if (data.status === false) {
            throw new Error(data.message);
        }
        console.log(data.message);

        let newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td>${Count++}</td>
        <td class="MID">${Medicine_Obj.ID}</td>
        <td class="NAME">${Medicine_Obj.Name}</td>
        <td class="AMOUNT">${Medicine_Obj.Amount}</td>
        <td class="DATE">${Medicine_Obj.History.Day_Input}</td>
        <td class="DATE-EXPORT">null</td>
        <td class="VALIDATED">${Medicine_Obj.Validated}</td>
        <td class="LINK"><a href="/medicine/info/${Medicine_Obj.ID}">TT Sản phẩm</a></td>
        <td class="DELETE">Xóa</td>`;
        document.querySelector("table tbody").appendChild(newRow);
    } catch (error) {
        console.error("Error:", error);
        alert(error);
    }
});

document.querySelector('.import input[type="checkbox"]').addEventListener("click", function () {
    if (document.querySelector('.import input[type="checkbox"]').checked) {
        document.querySelector('.import .Info').style.display = "block";
    } else {
        document.querySelector('.import .Info').style.display = "none";
    }
});

function makeID() {
    let Result = '';
    let Chararacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let Number = '0123456789';
    let counter = 0;
    while (counter < 5) {
        Result += Chararacters.charAt(Math.floor(Math.random() * 100 + 1) % (Chararacters.length))
        counter++
    }
    while (counter < 8) {
        Result += Number.charAt(Math.floor(Math.random() * 100 + 1) % 10);
        counter++
    }
    return Result;
}

document.querySelector(".form .search button").addEventListener("click", function () {
    let input = document.querySelector(".form .search input").value;
    if (input !== "") {
        let table = document.querySelector(".table tbody");
        let rows = table.querySelectorAll("tr");
        for (let i = 0; i < rows.length; i++) {
            let cols = rows[i].querySelectorAll("td");
            let found = false;
            for (let j = 0; j < cols.length; j++) {
                if (cols[j].textContent === input) {
                    found = true;
                    break;
                }
            }
            if (found) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
    else {
        let table = document.querySelector(".table tbody");
        let rows = table.querySelectorAll("tr");
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.display = "";
        }
    }
});

document.querySelector(".export form .submit").addEventListener("click", function () {
    try {
        let Name_Input = document.querySelector(".export form input[name='Name_Export']").value;
        let MID = document.querySelector(".export form input[name='ID_M']").value;
        let Export_Amount = document.querySelector(".export form input[name='Amount_Export']").value;
        let Date_Export = document.querySelector(".export form input[name='Date_Export']").value;
        let table = document.querySelector(".table tbody");
        let rows = table.querySelectorAll("tr");
        let found = false;
        let NewAmount;

        if (parseInt(Export_Amount) <= 0) {
            throw ("Số lượng xuất không thể nhỏ hơn hoặc bằng 0");
        }

        for (let i = 0; i < rows.length; i++) {
            let cols = rows[i].querySelectorAll("td");

            if (cols[2].textContent === Name_Input && cols[1].textContent === MID) {

                if (Date.parse(Date_Export) < Date.parse(cols[4].textContent)) {
                    throw ("Ngày xuất không thể nhỏ hơn ngày nhập");
                }
                found = true;
                if (parseInt(cols[3].textContent) >= parseInt(Export_Amount)) {
                    NewAmount = cols[3].textContent = parseInt(cols[3].textContent)
                        - parseInt(Export_Amount);
                    cols[5].textContent = Date_Export;
                } else {
                    throw ("Không đủ thuốc");
                }
            }
        }
        if (found === false) {
            throw ("Không có thuốc trong danh sách");
        }
        else {
            fetch(`/api/medicine/get/${MID}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    console.log("Success");
                    return response.json();
                } else {
                    console.log("Failed");
                    throw ("Failed");
                }
            }).then(data => {
                console.log(data.data);

                if(data.status === false) throw new Error(data.message);

                let Medicine_Obj = data.data;
                Medicine_Obj.amount = NewAmount;
                Medicine_Obj.history.export_Date.push(Date_Export);

                fetch(`/api/medicine/update/${MID}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Medicine_Obj)
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw ("Failed");
                    }
                }).then(data => {
                    if(!data.status) throw new Error(data.message);
                    console.log(data.message);
                });
            })
        }
    } catch (error) {
        alert(error);
    }
});



fetch("/api/medicine/getAllMedicine")
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Không thể lấy dữ liệu từ server");
        }
    }).then(data => {
        console.log( (data.length === 0) ? "Không có dữ liệu" : "");
        for (let i = 0; i < data.length; i++) {
            let Medicine_Obj = data[i];
            let newRow = document.createElement('tr');
            let Latest_Export = Medicine_Obj.history.export_Date.length > 0 ? Medicine_Obj.history.export_Date[Medicine_Obj.history.export_Date.length - 1] : "null";

            newRow.innerHTML = `
            <td>${Count++}</td>
            <td class="MID">${Medicine_Obj.id}</td>
            <td class="NAME">${Medicine_Obj.name}</td>
            <td class="AMOUNT">${Medicine_Obj.amount}</td>
            <td class="DATE">${Medicine_Obj.history.day_Input}</td>
            <td class="DATE-EXPORT">${Latest_Export}</td>
            <td class="VALIDATED">${Medicine_Obj.validated}</td>
            <td class="LINK"><a href="/medicine/info/${Medicine_Obj.id}">TT Sản phẩm</a></td>
            <td class="DELETE">Xóa</td>`;
            document.querySelector("table tbody").appendChild(newRow);
        }
    }).catch(error => {
        console.error("Lỗi:", error);
    });

document.querySelector('.table tbody').addEventListener("click", async function (event) {
    if (event.target.classList.contains("DELETE")) {
        let row = event.target.parentNode;
        let MID = row.querySelector(".MID").textContent;

        fetch(`/api/medicine/delete/${MID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(!response.ok) {
                throw new Error("Không thể xóa thông tin");
            }
            return response.json();
        }).then( data =>{
            if(data.status === false) {
              throw new Error(data.message);
            }
            else {
                console.log("Xóa thông tin thành công");
            }
        }).catch(Error =>{
            alert(Error)
        });
        row.remove();
    }
});
