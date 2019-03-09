//Variable con la dirección IP del servidor
var IPserver = location.host;

//Añadir informacion propia
/*
function putMyInfo(myinfo) {
    $.ajax({
        method: "PUT",
        url: 'http://'+ IPserver+ '/myinfo/' + myinfo.ip,
        data: JSON.stringify(myinfo),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("Player data  IP/Apodo: " + JSON.stringify(myinfo));
    })
}
*/

function putMyResponseTime(myinfo, resptime) {
    $.ajax({
        method: "PUT",
        url: 'http://'+ IPserver+ '/myinfo/' + myinfo.ip + '/resptime/',
        data: JSON.stringify(resptime),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("ResponseTime: " + JSON.stringify(resptime));
    })
}

function putMyRTToZero(myinfo) {
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

function getMyResponseTime(myinfo, request) {
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

function addPlayertoRoom (ip) {
    $.ajax({
        method: "PUT",
        url: 'http://'+ IPserver +'/ips/id',
        data: JSON.stringify(ip),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("Ip del jugador añadido " + ip);
    })
}

function deletePlayerofRoom (ip) {
    $.ajax({
        method: "PUT",
        url: 'http://' + IPserver + '/ips/deleteid',
        data: JSON.stringify(ip),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("Ip del jugador borrado" + ip);
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
        url: 'http://' + IPserver + '/historial',
        headers: {
            "Content-Type": "application/json"
        }
    }).fail(function (data) {
        console.log("Error: Servidor desconectado")
        error()
    })
}

function getServerStatusCheck(checking) {
    $.ajax({
        method: 'GET',
        url: 'http://' + IPserver + '/historial',
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

function getHistorial(request) {
    $.ajax({
        method: 'GET',
        url: 'http://' + IPserver + '/historial',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("Historial: " + data)
        request(data);
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

function login(myinfo){
     $.ajax({
        method: "PUT",
        url: 'http://'+ IPserver+ '/login/' + myinfo.name,
        data: JSON.stringify(myinfo),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("Player data  IP/Apodo/Contrasena: " + JSON.stringify(myinfo));
    })
}
