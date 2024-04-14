username = sessionStorage.getItem('Username');
if (username !== "" && username != null) {
    document.querySelector('.header .login-btn a').innerText = username;
}
else {
    document.querySelector('.header .login-btn a').innerText = "Tài khoản";
}

fetch("/patient/getData", {
})
    .then(res => res.json())
    .then(data => {
        if (data.status === true) {
            console.log(data.data)

            let count1 = 0,count2 = 0,count3 = 0,count4 = 0;
            let total = 0;
            let total_customer_care = 0
            let total_service =0
            let total_attitude = 0
            let total_healthcare =0

            data.data.forEach(function(e) {
                if (e.comment_attitude !== null && e.comment_attitude !== undefined) {
                    count1++;
                    total_attitude += e.comment_attitude;
                }
                if (e.comment_customer_care !== null && e.comment_customer_care !== undefined) {
                    count2++;
                    total_customer_care += e.comment_customer_care;
                }
                if (e.comment_healthcare !== null && e.comment_healthcare !== undefined) {
                    count3++;
                    total_healthcare += e.comment_healthcare;
                }
                if (e.comment_service !== null && e.comment_service !== undefined) {
                    count4++;
                    total_service += e.comment_service;
                }
            })

            num1 = parseInt(total_attitude/count1)
            num2 = parseInt(total_customer_care/count2)
            num3 = parseInt(total_healthcare/count3)
            num4 = parseInt(total_service/count4)
            total = parseInt((num1 + num2 + num3 + num4)/4)

            document.querySelector(".customer-care .score").innerText = num2
            document.querySelector(".service .score").innerText = num4
            document.querySelector(".attitude .score").innerText = num1
            document.querySelector(".health-care .score").innerText = num3
            document.querySelector(".total-score .score").innerText = total

            displayEvaluate(".customer-care", num2)
            displayEvaluate(".service", num4)
            displayEvaluate(".attitude", num1)
            displayEvaluate(".health-care", num3)
            displayEvaluate(".total-score", total)

        }
    })
    .catch(err => console.log(err))

function displayEvaluate(father, score) {
    let evaluate = document.querySelector(father);
    if (0<= score && score < 30) {
        evaluate.querySelector(".bad").style.display = "flex"
    }
    else if (score < 70) {
        evaluate.querySelector(".normal").style.display = "flex"
    }
    else if (score < 90) {
        evaluate.querySelector(".good").style.display = "flex"
    }
    else {
        evaluate.querySelector(".very-good").style.display = "flex"
    }
}