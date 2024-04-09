document.querySelectorAll(".wrapper .container .card").forEach((card) => {
    card.addEventListener("click", () => {
        let info = card.querySelector(".infor");
        if (info.style.display === "block") {
            info.style.display = "none";
            document.querySelectorAll(".wrapper .container .banner").forEach((banner) => {
                banner.style = "margin-top: 0;";
            });
        } else {
            info.style.display = "block";
            document.querySelectorAll(".wrapper .container .banner").forEach((banner) => {
                banner.style = "margin-top: 3%;";
            });
        }
    });
});