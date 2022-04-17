$(function () {
    var isLogin = localStorage.getItem("isLogin");
    if (!isLogin || isLogin == "false") {
        $(".offline").show();
        $(".login").hide();
        localStorage.setItem("isLogin", false);
        window.location.href = '/user/login/index.html';
    } else {
        $(".login").show();
        $(".offline").hide();
        localStorage.setItem("isLogin", true);
    }

    $("#logout").on("click", function () {
        localStorage.removeItem("isLogin");
        window.location.href = '/user/login/index.html';
    })
})


