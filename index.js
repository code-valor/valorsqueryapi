const express = require('express');
require('dotenv').config();
const axios = require('axios').default;

const app = express();

const $WEBAPISTRING = '/api/v001';

app.get($WEBAPISTRING, function(req, res) {
    res.send('working!');
});

app.get($WEBAPISTRING + '/queryserver/:ip::port', function(req, res) {
    const serverip = req.params.ip;
    const serverport = req.params.port;
    const category = req.query.c;

    axios.get(`http://${serverip}:${serverport}/${category}.json`).then((serverdata) => {
        res.json(serverdata.data);
        console.log(serverdata)
    }).catch((error) => {
        res.send({type: 'ERROR', error: error});
    });
});

const $WEBAPIPORT = process.env.webapiport || process.env.PORT;

app.listen($WEBAPIPORT, () => {
    console.log('Web API server listening on PORT ' + $WEBAPIPORT);
});
