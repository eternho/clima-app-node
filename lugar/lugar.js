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