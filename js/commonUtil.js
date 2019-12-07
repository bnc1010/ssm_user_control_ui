var requestBody = {};

function getPermissionFromApi() {
    requestBody = {"token":localStorage.getItem("token")};
    $.ajax({
        type: "post",
        headers: {
            'Access-Token': localStorage.getItem("token")
        },
        url: "http://localhost:5050/apis/system/permission/all",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(requestBody),
        success: function (jsonmsg) {
            if (jsonmsg.code == 200) {
                localStorage.setItem("permission", JSON.stringify(jsonmsg.data));
            }
        },
        error: function (jsonmsg) {
            console.log(jsonmsg);
            if (jsonmsg.responseJSON.code == 403){
                document.location.href = './403.html';
            }
            else if (jsonmsg.responseJSON.code == 401){
                document.location.href = './login.html';
            }
            else{
                console.log(jsonmsg.responseJSON.msg);
            }
        }
    });
}

function getPermissionJSON() {
    if (localStorage.getItem("permission") == null){
        getPermissionFromApi();
    }
    return JSON.parse(localStorage.getItem('permission'));
}

function refreshPermission() {
    getPermissionFromApi();
}

function addPermission(pName,pUrl,pType) {
    requestBody = {"token":localStorage.getItem("token"), "pName":pName,"pUrl":pUrl,"pType":pType};
    $.ajax({
        type: "post",
        headers: {
            'Access-Token': localStorage.getItem("token")
        },
        url: "http://localhost:5050/apis/system/permission/add",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(requestBody),
        success: function (jsonmsg) {
            if (jsonmsg.code == 200) {
                var token = jsonmsg.data;
                localStorage.setItem("token", token);
                refreshPermission();
                document.location.reload();
            }
            else{
                console.log(jsonmsg.msg);
            }
        },
        error: function (jsonmsg) {
            console.log(jsonmsg);
            if (jsonmsg.responseJSON.code == 403){
                document.location.href = './403.html';
            }
            else if (jsonmsg.responseJSON.code == 401){
                document.location.href = './login.html';
            }
            else{
                console.log(jsonmsg.responseJSON.msg);
            }
        }
    });
}
function deletePermission(pId) {
    requestBody = {"token":localStorage.getItem("token"), "pId":pId};
    $.ajax({
        type: "post",
        headers: {
            'Access-Token': localStorage.getItem("token")
        },
        url: "http://localhost:5050/apis/system/permission/delete",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(requestBody),
        success: function (jsonmsg) {
            if (jsonmsg.code == 200) {
                refreshPermission();
                document.location.reload();
            }
            else{
                alert(jsonmsg.msg);
            }
        },
        error: function (jsonmsg) {
            console.log(jsonmsg);
            if (jsonmsg.responseJSON.code == 403){
                document.location.href = './403.html';
            }
            else if (jsonmsg.responseJSON.code == 401){
                document.location.href = './login.html';
            }
            else{
                console.log(jsonmsg.responseJSON.msg);
            }
        }
    });
}
