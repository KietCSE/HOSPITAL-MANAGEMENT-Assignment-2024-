let Count = 0;
document.querySelector(".import form .submit").addEventListener("click", function () {
    let form;
    let Medicine_Obj;
    try {
        form = document.querySelector(".import form");
        if (document.querySelector('.import input[type="checkbox"]').checked) {
            let fileInput = document.querySelector('.import input[type="file"]');
            let file = fileInput.files[0];
            let reader = new FileReader();
            if (file === null) {
                throw "Please choose a image";
            }
            if (file.size > 1000000) {
                throw "File size is too large";
            }
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                throw "File type is not supported";
            }
            reader.readAsDataURL(file);

            Medicine_Obj = {
                ID: makeID(),
                Name: form.querySelector('input[name = "Name"]').value,
                Amount: form.querySelector('input[name = "Amount"]').value,
                Date: form.querySelector('input[name = "Date"]').value,
                Validated: form.querySelector('input[name = "Validated"]').value,
                Latest_Export: "N/A",
                Img: reader.result,
                Type: form.querySelector('input[name = "Type"]').value,
                Classify: form.querySelector('input[name = "Classify"]').value,
                Uses: form.querySelector('textarea[name = "Uses"]').value,
                N_Uses: form.querySelector('textarea[name = "N_Uses"]').value
            };
            if (Medicine_Obj.Type === "" || Medicine_Obj.Classify === "" || Medicine_Obj.Uses === "" || Medicine_Obj.N_Uses === "") {
                throw "Please fill all the fields";
            }
        }
        else {
            Medicine_Obj = {
                ID: makeID(),
                Name: form.querySelector('input[name = "Name"]').value,
                Amount: form.querySelector('input[name = "Amount"]').value,
                Date: form.querySelector('input[name = "Date"]').value,
                Validated: form.querySelector('input[name = "Validated"]').value,
                Latest_Export: null,
                // Img: "N/A",
                // Type: "N/A",
                // Description: "N/A",
                // Uses: "N/A",
                // N_Uses: "N/A"
            };
        }
        if (Medicine_Obj.Name === "" || Medicine_Obj.Amount === "" || Medicine_Obj.Date === "" || Medicine_Obj.Validated === "") {
            throw "Please fill all the fields";
        }
        if (isNaN(parseInt(Medicine_Obj.Amount))) {
            throw "Amount must be a number";
        }
        if (parseInt(Medicine_Obj.Amount) < 0) {
            throw "Amount must be greater than 0";
        }
        console.log(Medicine_Obj);
    } catch (error) {
        alert(error);
        return
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

    fetch("/api/medicine/add", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Medicine_Obj)
    }).then(response => {
        if (response.ok) {
            alert("Post Success");
            console.log("Success");
        } else {
            alert("Post Fail")
            console.log("Failed");
        }
    });
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
    let Name_Input = document.querySelector(".export form input[name='Name_Export']").value;
    let MID = document.querySelector(".export form input[name='ID_M']").value;
    let Export_Amount = document.querySelector(".export form input[name='Amount_Export']").value;
    let Date_Export = document.querySelector(".export form input[name='Date_Export']").value;

    let table = document.querySelector(".table tbody");
    let rows = table.querySelectorAll("tr");
    let found = false;
    let NewAmount;
    for (let i = 0; i < rows.length; i++) {
        let cols = rows[i].querySelectorAll("td");

        if (cols[2].textContent === Name_Input && cols[1].textContent === MID) {
            found = true;
            if (cols[3].textContent >= Export_Amount) {
                NewAmount = cols[3].textContent = parseInt(cols[3].textContent) - parseInt(Export_Amount);
                cols[5].textContent = Date_Export;
            } else {
                alert("Không đủ thuốc");
                return;
            }
        }
    }
    if (found === false) {
        alert("Không có thuốc trong danh sách");
        return;
    }
    fetch(`/api/medicine/update/${MID}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            MID: MID,
            Amount: NewAmount,
            Date: Date_Export
        })
    }).then(response => {
        if (response.ok) {
            alert("Post Success");
            console.log("Success");
        } else {
            alert("Post Fail")
            console.log("Failed");
        }
    });
});