document.addEventListener("DOMContentLoaded", function () {
  var tabLinks = document.querySelectorAll(".list-group-item");

  tabLinks.forEach(function (tabLink) {
    tabLink.addEventListener("click", function (event) {
      event.preventDefault();

      tabLinks.forEach(function (link) {
        link.classList.remove("active");
      });

      tabLink.classList.add("active");

      var targetPaneId = tabLink.getAttribute("href");

      var tabPanes = document.querySelectorAll(".tab-pane");
      tabPanes.forEach(function (pane) {
        pane.classList.remove("active", "show");
      });

      var targetPane = document.querySelector(targetPaneId);
      targetPane.classList.add("active", "show");
    });
  });
});
