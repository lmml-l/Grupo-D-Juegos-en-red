
//Añadir informacion propia
function postMyInfo(myinfo) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/FightForTheHood/',
        data: JSON.stringify(myinfo.getIp() + myinfo.getApodo()),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("Player data  IP/Apodo: " + data);
    })
}

//Conseguir apodo 
function getApodo(mymatch, ip) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/FightForTheHood/',
        data: JSON.stringify(mymatch.getListadeapodos().get(ip)),
        processData: false, 
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("Apodo: " + data)
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
        console.log("IP Rival: " + data)
    })
}

//Conseguir IP propia
function getMyIP(request) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/FightForTheHood/',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("IP Propia: " + data)
    })
}

//Conseguir lista de apodos
function getListaApodos(mymatch) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/FightForTheHood/',
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
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
