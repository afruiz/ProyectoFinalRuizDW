
//FETCH ---> INSERTAR WEATHER MAP DE LAS CIUDADES EN OPENWEATHERMAP.ORG + GEOLOCALIZACION


let btn_cotizar = document.getElementById("btn_cotizar");
btn_cotizar.addEventListener("click" , cotizarVuelo );


function cotizarVuelo(){

    let salida = document.getElementById("salida").value;
    let llegada = document.getElementById("llegada").value;
    let turista = document.getElementById("turista");
    let business = document.getElementById("business");

    let categoria = "";
    
    if(turista.checked){
        categoria = "turista";
    }
    else if(business.checked){
        categoria = "business";
    }

    if(salida == llegada){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Los aeropuertos de salida y llegada son iguales.',
            footer: '<a href="./index.html">Volver</a>'
          })
          
    }
    else{
    let precio = 10000;
    precio = Number(fee_salida(salida) * precio);
    precio = Number(precio + fee_llegada(llegada) * precio);
    let costo_categoria = obtener_categoria(categoria);      
    precio = Number( precio + costo_categoria * precio);    
        
    let div_resultado = document.getElementById("contenedor_resultado");  
    div_resultado.innerHTML = `<h2 class="link">El precio de su vuelo es de ${precio} por persona.</h2>
                                <a class="link" href="./pages/reservas.html">Reservar Vuelo<a/>
                                <a class="link" href="./index.html">Cotizar otro vuelo<a/>`; 

    
    localStorage.setItem("salida" , salida);
    localStorage.setItem("llegada" , llegada);
    localStorage.setItem("categoria" , categoria);
    localStorage.setItem("precio" , precio);
    }
}

function fee_salida(salida){

    let costo_salida;

    switch(salida){
        case 'bariloche' : costo_salida = 1.9; break;
        case 'buenos aires' : costo_salida = 1.1; break;
        case 'tucuman' : costo_salida = 1.8; break;
    }
    return costo_salida;
}

function fee_llegada(llegada){

    let costo_llegada;

    switch(llegada){
        case 'bariloche' : costo_llegada = 1.6;
        case 'buenos aires' : costo_llegada = 1.2;
        case 'tucuman' : costo_llegada = 1.9;
    }
    return costo_llegada;
}

function obtener_categoria(categoria){

    return (categoria === 'turista')?1.2:1.9;
}

let key = "285c9cbf11b1bcb416c5ddaf116caf2d";
let contenedor_api = document.getElementById("div_api");
fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&units=metric&lang=es&appid="+key)
    .then(response => response.json())
    .then(data => {
        contenedor_api.innerHTML = `<h3>Buenos Aires:</h3>
                                    <p>Temperatura: ${data.main.temp}°C</p>
                                    <p>Sensación térmica: ${data.main.feels_like}°C</p>
                                    <p>Humedad: ${data.main.humidity}%</p>
                                    <p>Viento: ${data.wind.speed} km/h</p>
                                    <p>${data.weather[0].description}</p>`
    })

let contenedor_api_dos = document.getElementById("div_api_dos");
fetch("https://api.openweathermap.org/data/2.5/weather?q=Bariloche&units=metric&lang=es&appid="+key)
    .then(response => response.json())
    .then(data => {
        contenedor_api_dos.innerHTML = `<h3>Bariloche:</h3>
                                    <p>Temperatura: ${data.main.temp}°C</p>
                                    <p>Sensación térmica: ${data.main.feels_like}°C</p>
                                    <p>Humedad: ${data.main.humidity}%</p>
                                    <p>Viento: ${data.wind.speed} km/h</p>
                                    <p>${data.weather[0].description}</p>`
    })

let contenedor_api_tres = document.getElementById("div_api_tres");
fetch("https://api.openweathermap.org/data/2.5/weather?q=Tucuman&units=metric&lang=es&appid="+key)
    .then(response => response.json())
    .then(data => {
            contenedor_api_tres.innerHTML = `<h3>Tucumán:</h3>
                                        <p>Temperatura: ${data.main.temp}°C</p>
                                        <p>Sensación térmica: ${data.main.feels_like}°C</p>
                                        <p>Humedad: ${data.main.humidity}%</p>
                                        <p>Viento: ${data.wind.speed} km/h</p>
                                        <p>${data.weather[0].description}</p>`
    })
  