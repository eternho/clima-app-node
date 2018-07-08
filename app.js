/*
Aplicación para visualizar en consola la temporatura de un sitio a través de sus coordenadas en latitud y longitud

1) Instalación de axios => npm install axios --save
2) Imprimir en consola lo que el API arroje con la dirección ingresada en consola
	https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ

	Al ejecutar la app se puede observar al final del contenido lo siguiente:
	data: { results: [ [Object] ], status: 'OK' } }

	El objeto data contiene dos items results y status

3) Utilizar la fúnción JSON.stringify utilizando como argumento undefined y espaciado y ver salida
La salida del comando es la siguiente

$ node app -d riobamba
riobamba
[
  {
    "address_components": [
      {
        "long_name": "Riobamba",
        "short_name": "Riobamba",
        "types": [
          "locality",
          "political"
        ]
      },
      {
        "long_name": "Chimborazo Province",
        "short_name": "Chimborazo Province",
        "types": [
          "administrative_area_level_1",
          "political"
        ]
      },
      {
        "long_name": "Ecuador",
        "short_name": "EC",
        "types": [
          "country",
          "political"
        ]
      }
    ],
    "formatted_address": "Riobamba, Ecuador",
    "geometry": {
      "bounds": {
        "northeast": {
          "lat": -1.6193237,
          "lng": -78.6159753
        },
        "southwest": {
          "lat": -1.7128395,
          "lng": -78.6992741
        }
      },
      "location": {
        "lat": -1.6635508,
        "lng": -78.654646
      },
      "location_type": "APPROXIMATE",
      "viewport": {
        "northeast": {
          "lat": -1.6193237,
          "lng": -78.6159753
        },
        "southwest": {
          "lat": -1.7128395,
          "lng": -78.6992741
        }
      }
    },
    "place_id": "ChIJgSkHWyWo05ERmd8_Cs0Jhcs",
    "types": [
      "locality",
      "political"
    ]
  }
]

4) Delpunto 3, ubicar location y formatted_address e imprimir en consola
"formatted_address": "Riobamba, Ecuador",
"location": {
        "lat": -1.6635508,
        "lng": -78.654646

5) Optimizar el punto 4 separando el app en ficheros adicionales

6) Sacar el clima para el lugar encontrado en 5

 */

/* _________________________________________________________________________________
   2) Imprimir en consola lo que el API arroje con la dirección ingresada en consola

const axios = require('axios');

//argumento a obtener desde línea de comando
const argv = require('yargs').options({
	direccion: {
		alias: 'd',
		desc: 'Dirección de la ciudad para obtener el clima',
		demand: true
	}
}).argv;

console.log(argv.direccion);

//convierte la URL en una dirección amigable
let encodedUrl = encodeURI(argv.direccion)

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`)
	.then(resp => {
		//console.log(resp); // muestra toda la salida de la API
		//console.log(resp.data); // muestra elobjeto data (results y status)
		console.log(resp.data.results); // muestra el objeto results
		console.log(resp.data.status); // muestra elobjeto status
	})
	.catch(e => console.log('Error!!!', e));

 */

/* _______________________________________________________________________________________________
3) Utilizar la fúnción JSON.stringify utilizando como argumento undefined y espaciado y ver salida

const axios = require('axios');

//argumento a obtener desde línea de comando
const argv = require('yargs').options({
	direccion: {
		alias: 'd',
		desc: 'Dirección de la ciudad para obtener el clima',
		demand: true
	}
}).argv;

console.log(argv.direccion);

//convierte la URL en una dirección amigable
let encodedUrl = encodeURI(argv.direccion)

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`)
	.then(resp => {
		console.log(JSON.stringify(resp.data.results, undefined, 2)); // muestra el objeto results
	})
	.catch(e => console.log('Error!!!', e));


 */

/*______________________________________________________________________
4) Delpunto 3, ubicar location y formatted_address e imprimir en consola
"formatted_address": "Riobamba, Ecuador",
"location": {
        "lat": -1.6635508,
        "lng": -78.654646

const axios = require('axios');

//argumento a obtener desde línea de comando
const argv = require('yargs').options({
  direccion: {
    alias: 'd',
    desc: 'Dirección de la ciudad para obtener el clima',
    demand: true
  }
}).argv;


//convierte la URL en una dirección amigable
let encodedUrl = encodeURI(argv.direccion);

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`)
  .then(resp => {
    let location = resp.data.results[0].formatted_address;
    let coors = resp.data.results[0].geometry.location;
    //console.log(JSON.stringify(resp.data.results[0], undefined, 2)); // muestra el objeto results
    console.log(`Dirección: ${location}`);
    console.log(`Latitud: ${coors.lat}`);
    console.log(`Longitud: ${coors.lng}`);
  })
  .catch(e => console.log('Error!!!', e));
 */

/*__________________________________________________________
  5) Optimizar el punto 4 separando el app en ficheros adicionales

app.js
======

const lugar = require('./lugar/lugar');

//argumento a obtener desde línea de comando
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

lugar.getLocation(argv.direccion)
    .then(resp => console.log(resp))
    .catch(e => console.log(e));

lugar.js
========
const axios = require('axios');

const getLocation = async(direccion) => {
    //convierte la URL en una dirección amigable
    let encodedUrl = encodeURI(direccion);
    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`)

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No hay resultados para la ciudad ${direccion}`);
    }

    let location = resp.data.results[0].formatted_address;
    let coors = resp.data.results[0].geometry.location;

    return {
        direccion: location,
        lat: coors.lat,
        lng: coors.lng
    }
}

module.exports = {
    getLocation
}

*/

/*_____________________________________________
6) Sacar el clima para el lugar encontrado en 5 OPENWEATHER
 */

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

//argumento a obtener desde línea de comando
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

let getInfo = async(direccion) => {
    try {
        let coors = await lugar.getLocation(direccion); //getLocation arroja una promesa y puede ser utilizada con aync-await
        let temp = await clima.getClima(coors.lat, coors.lng); //getClima arroja una promesa y puede ser utilizada con aync-await
        return `El clima en ${coors.direccion} es ${temp}`;
    } catch (error) {
        return `No se pudo determinar el clima para ${direccion}`;
    }
}

getInfo(argv.direccion)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e));