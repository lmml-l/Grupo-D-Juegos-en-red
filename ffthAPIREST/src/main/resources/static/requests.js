
//Añadir informacion propia
function putMyInfo(myinfo) {
    $.ajax({
        method: "PUT",
        url: 'http://localhost:8080/myinfo/' + myinfo.ip,
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
        url: 'http://localhost:8080/ips/id',
        data: JSON.stringify(ip),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("Ip del jugador añadido " + JSON.stringify(ip));
    })
}

function getMyInfo(request) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/myinfo',
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
        url: 'http://localhost:8080/apodos/apodolist/'+ ip,
    }).done(function (data) {
        request(data);
        console.log("Apodo: " + data)
        console.log("IPsdsdsd: "+ip)
    })
}

//Conseguir ip del rival
function getRivalIp(mymatch) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/FightForTheHood/',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        request(data);
        console.log("IP Rival: " + data)
    })
}

//Conseguir IP propia
function getMyIP(request) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/ip/myip',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        request(data);
        console.log("IP Propia: " + data)
    })
}

//Conseguir lista de apodos
function getListaApodos(request) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/FightForTheHood/',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        request(data);
        console.log("Listado Últimos Jugadores: " + data)
    })
}

//Conseguir lista de IPs
function getIPs(arraips) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/ips/idlist',
    }).done(function (data) {
        console.log("IPs en partida: " + data)
        console.log(data)
        arraips(data);
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
