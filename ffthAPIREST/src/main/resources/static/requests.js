
//Variable con la dirección IP del servidor
var IPserver = location.host;

//Añadir informacion propia
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
        console.log("Ip del jugador añadido " + JSON.stringify(ip));
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
        console.log("Ip del jugador borrado" + JSON.stringify(ip));
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

function addIptoIpConectadas(ip) {
    $.ajax({
        method: "PUT",
        url: 'http://' + IPserver + '/ips/ipconectados',
        data: JSON.stringify(ip),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("ip añadida " + JSON.stringify(ip));
    })
}

function getIpsConectadas(request) {
    $.ajax({
        method: 'GET',
        url: 'http://' + IPserver + '/ips/idlistconectadas',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        request(data);
        console.log("Info: " + data)
    })
}

function addIptoIpConectadasClear() {
    $.ajax({
        method: "PUT",
        url: 'http://' + IPserver + '/ips/ipconectadosclear',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("ips conectadas reseteadas ");
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
        console.log("IPs en partida: " + data)
        request(data);
    })
}

function putcheckReady (check) {
    $.ajax({
        method: "PUT",
        url: 'http://'+ IPserver +'/checker',
        data: check,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("Jugador listo: " + JSON.stringify(check));
    })
}

function getcheckReady(request) {
    $.ajax({
        method: 'GET',
        url: 'http://' + IPserver + '/getchecked',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("Estado del jugador: " + data)
        request();
    })
}

/*Delete item from server
function deleteItem() {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/FightForTheHood/'
    }).done(function (item) {
        console.log("Deleted item " + itemId)
    })
    */
//}
