/**
 * Created by insomniahl on 16/9/5.
 */
$("#submit-id").on("click", function () {
    var data = {
        username: $("#id_username").val().trim(),
        password: $("#id_password").val().trim()
    };

    $.ajax({
        type: "post",
        url: "http://tk.jetcloudtech.com/backendLogin/",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: data,
        success: function (res, statues, xhr) {
            if (typeof res === 'string') {
                res = JSON.parse(res)
            }
            if (res["is_active"] && res["is_staff"]) {
                sessionStorage.setItem("pk", res["pk"]);
                window.location.href = "index.html";
            } else if (res["status"]) {
                alert(res["status"]);
            } else {
                alert("登录失败,请重试!");
            }
        },
        error: function (err) {
            alert("登录失败,请重试!");
        }
    })
});

$("#id_password").on("keypress", function (e) {
    if (e.keyCode == "13") {
        $("#submit-id").trigger("click");
    }
});