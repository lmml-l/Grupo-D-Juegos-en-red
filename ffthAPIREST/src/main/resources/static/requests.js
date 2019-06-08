//Peticiones API REST

//Variable con la dirección IP del servidor
var IPserver = location.host;

//put del tiempo de respuesta
function putMyResponseTime(myinfo, resptime) {
    $.ajax({
        method: "PUT",
        url: 'http://'+ IPserver+ '/myinfo/' + myinfo.ip + '/resptime/',
        data: JSON.stringify(resptime),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (){
        console.log("ResponseTime: " + JSON.stringify(resptime));
    })
}

//puesta a 0 del tiempo de respuesta
function putMyRTToZero(myinfo){
    $.ajax({
        method: "PUT",
        url: 'http://'+ IPserver+ '/myinfo/' + myinfo.ip + '/resptime/',
        data: JSON.stringify(0),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("ResponseTime set to zero: " + JSON.stringify(0));
    })
}

//get del tiempo de respuesta
function getMyResponseTime(myinfo, request){
    $.ajax({
        method: 'GET',
        url: 'http://'+ IPserver+ '/myinfo/' + myinfo.ip + '/resptime/',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        request(data);
        console.log("ResponseTime: " + data)
    })
}

//eliminar jugador de la sala
function deletePlayerofRoom (nombre) {
    $.ajax({
        method: "PUT",
        url: 'http://' + IPserver + '/apodos/deletenombre',
        data: JSON.stringify(nombre),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("Nombre del jugador borrado " + nombre);
    })
}

function addMatchtoHistory(match) {
    $.ajax({
        method: "PUT",
        url: 'http://' + IPserver + '/lastmatch',
        data: JSON.stringify(match),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("Ip del jugador añadido " + JSON.stringify(match));
    })
}

//conseguir información del jugador
function getMyInfo(request) {
    $.ajax({
        method: 'GET',
        url: 'http://' + IPserver + '/myinfo',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        request(data);
        console.log("Info: " + data)
    })
}

//Conseguir apodo 
function getApodo(request,ip) {
    $.ajax({
        method: 'GET',
        url: 'http://' + IPserver + '/apodos/apodolist/'+ ip,
    }).done(function (data) {
        request(data);
        console.log("Apodo: " + data)
        console.log("IPsdsdsd: "+ip)
    })
}

//Conseguir IP propia
function getMyIP(request) {
    $.ajax({
        method: 'GET',
        url: 'https://ipapi.co/json/',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        request(data);
        console.log("IP Propia: " + data)
    })
}

//Saber estado de la conexión con el servidor
function getServerStatus(error) {
    $.ajax({
        method: 'GET',
        url: 'http://' + IPserver + '/ips/idlist',
        headers: {
            "Content-Type": "application/json"
        }
    }).fail(function (data) {
        console.log("Error: Servidor desconectado")
        error()
    })
}

//Estado del servidor
function getServerStatusCheck(checking) {
    $.ajax({
        method: 'GET',
        url: 'http://' + IPserver + '/ips/idlist',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        checking()
    })
}

//Conseguir lista de IPs
function getIPs(arraips) {
    $.ajax({
        method: 'GET',
        url: 'http://' + IPserver + '/ips/idlist',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("IPs en partida: " + data)
        arraips(data);
    })
}

function putTime(ip,id){
     $.ajax({
        method: "PUT",
        url: 'http://' + IPserver + '/ips/time/' + ip,
        data: JSON.stringify(id),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("ip tiempo" + JSON.stringify(ip));
    })
}

/////////// Nuevo Junio ////////////////

//Login (ingreso de un usuario ya registrado)
function login(myinfo,request){
     $.ajax({
        method: "PUT",
        url: 'http://'+ IPserver+ '/login/' + myinfo.name,
        data: JSON.stringify(myinfo),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log(data);
        request(data);
    })
}
//SignUp (registro de un usuario nuevo)
function signup(myinfo,request){
      $.ajax({
        method: "PUT",
        url: 'http://'+ IPserver+ '/signup/' + myinfo.name,
        data: JSON.stringify(myinfo),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log(data);
        request(data);
    })
}