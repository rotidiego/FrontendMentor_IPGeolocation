
let urlApiGoogle = "https://geo.ipify.org/api/v2/country,city?apiKey=at_smp6vus8af4jiMtyTF6Du79xVrefh";
let apiKeyGoogle = "at_smp6vus8af4jiMtyTF6Du79xVrefh"
let responseJson = {};
let ipSearch = "";
let mymap = null;
async function searchdirection() {
    let query = (ipSearch == "") ? "" : "&ipAddress=" + ipSearch;
    let data = {
        apiKey: apiKeyGoogle,
        domain: "www.google.com"
    }
    let body = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    let response = await fetch(urlApiGoogle + query)
    responseJson = await response.json();

    renderData();
    paintMap()
}

function renderData() {
    const location = responseJson.location.region + ", " + responseJson.location.postalCode;
    $('#ip').text(responseJson.ip)
    $('#utc').text(responseJson.location.timezone)
    $('#isp').text(responseJson.isp)
    $('#location').text(location)
}
function paintMap() {

    if(mymap != null){

        mymap.remove();
    }
    // Inicializar el mapa
    mymap = L.map('map').setView([responseJson.location.lat, responseJson.location.lng], 13);

    // Añadir capa de mapa base (por ejemplo, OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);
    // Añadir marcador
    var marker = L.marker([responseJson.location.lat, responseJson.location.lng]).addTo(mymap);
    marker.bindPopup(ipSearch==""?"location": ipSearch).openPopup();

}

$("#btnSearch").click(async function () {
    ipSearch = $('#ipAddress').val()
    await searchdirection()
})


$(document).ready(async function () {
    await searchdirection();
    paintMap();
})