let ID = 0;
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
        console.log(Medicine_Obj);
    } catch (error) {
        alert(error);
        return
    }

    let newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${ID++}</td>
        <td>${Medicine_Obj.ID}</td>
        <td>${Medicine_Obj.Name}</td>
        <td>${Medicine_Obj.Amount}</td>
        <td>${Medicine_Obj.Date}</td>
        <td>${Medicine_Obj.Latest_Export}</td>
        <td>${Medicine_Obj.Validated}</td>
        <td class="LINK"><a href="/medicine/info">Info</a></td>`;
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
    while(counter < 5) {
        Result += Chararacters.charAt(Math.floor(Math.random() * 100 + 1) % (Chararacters.length))
        counter++
    }
    while(counter < 8) {
        Result += Number.charAt(Math.floor(Math.random() * 100 + 1 ) % 10);
        counter++
    }
    return Result;
}

document.querySelector(".export form .submit").addEventListener("click", function () {
});