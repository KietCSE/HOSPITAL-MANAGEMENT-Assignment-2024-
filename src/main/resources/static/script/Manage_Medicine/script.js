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
                Date: form.querySelector('input[name="Date"]').value,
                Validated: form.querySelector('input[name="Validated"]').value,
                Latest_Export: null,
                Img_Url: null,
                Type: form.querySelector('input[name="Type"]').value,
                Classify: form.querySelector('input[name="Classify"]').value,
                Description: form.querySelector('textarea[name="Description"]').value,
                Uses: form.querySelector('textarea[name="Uses"]').value,
                N_Uses: form.querySelector('textarea[name="N_Uses"]').value
            };

            let fileInput = form.querySelector('input[type="file"]');
            if (!fileInput) {
                throw new Error("Hãy chọn ảnh thuốc");
            }
            let file = fileInput.files[0];
            if (file.size > 1024 * 1024) {
                throw new Error("Kích thước ảnh quá lớn");
            }
            if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
                throw new Error("Định dạng ảnh không hợp lệ");
            }
            let f = new FormData();
            f.append("file", file);
            let response = await fetch("/api/medicine/upload", {
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
        } else {
            let NAME = form.querySelector('input[name="Name"]').value;
            const response = await fetch(`/api/medicine/getElement/${NAME}`);
            if (!response.ok) {
                throw new Error("Không thể lấy dữ liệu từ server");
            }
            const data = await response.json();
            console.log("Received data:", data);
            if (!data || Object.keys(data).length === 0) {
                throw new Error("Thuốc không tồn tại trong database");
            } else {
                Medicine_Obj = {
                    ID: makeID(),
                    Name: data.name,
                    Amount: form.querySelector('input[name="Amount"]').value,
                    Date: form.querySelector('input[name="Date"]').value,
                    Validated: form.querySelector('input[name="Validated"]').value,
                    Latest_Export: null,
                    Type: data.type,
                    Classify: data.classify,
                    Description: data.description,
                    Uses: data.uses,
                    N_Uses: data.n_Uses
                };
            }
        }
        console.log("Medicine object created successfully:", Medicine_Obj);
        if (Object.values(Medicine_Obj).some(value => value === "")) {
            throw "Hãy điền đầy đủ thông tin";
        }
        if (isNaN(parseInt(Medicine_Obj.Amount))) {
            throw "Trường Số lượng phải là số";
        }
        if (parseInt(Medicine_Obj.Amount) < 0) {
            throw "Số lượng không thể nhỏ hơn 0";
        }
        if (isNaN(Date.parse(Medicine_Obj.Date))) {
            throw "Ngày nhập không hợp lệ";
        }
        if (isNaN(Date.parse(Medicine_Obj.Validated))) {
            throw "Ngày hết hạn không hợp lệ";
        }
        if (Date.parse(Medicine_Obj.Date) < Date.now()) {
            throw "Ngày nhập không thể nhỏ hơn ngày hiện tại";
        }
        if (Date.parse(Medicine_Obj.Validated) < Date.parse(Medicine_Obj.Date)) {
            throw "Ngày hết hạn không thể nhỏ hơn ngày nhập";
        }
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td>${Count++}</td>
        <td class="MID">${Medicine_Obj.ID}</td>
        <td class="NAME">${Medicine_Obj.Name}</td>
        <td class="AMOUNT">${Medicine_Obj.Amount}</td>
        <td class="DATE">${Medicine_Obj.Date}</td>
        <td class="DATE-EXPORT">${Medicine_Obj.Latest_Export}</td>
        <td class="VALIDATED">${Medicine_Obj.Validated}</td>
        <td class="LINK"><a href="/medicine/info/${Medicine_Obj.ID}">Info</a></td>`;
        document.querySelector("table tbody").appendChild(newRow);

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
        console.log("Post Request Success");
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
                let Medicine_Obj = data;
                Medicine_Obj.amount = NewAmount;
                Medicine_Obj.latest_Export = Date_Export;

                fetch(`/api/medicine/update/${MID}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Medicine_Obj)
                }).then(response => {
                    if (response.ok) {
                        console.log("Success");
                    } else {
                        console.log("Failed");
                        throw ("Failed");
                    }
                });

            }).catch(error => {
                console.log(error);
                throw ("Failed");
            });
        }
    } catch (error) {
        alert(error);
    }
});