const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('cross-fetch');
const path = require('path');
const fs = require('fs');
const axios = require('axios');


// [ SYSTEM SETTINGS ]
app.set('view engine', 'ejs');  
app.use(cors());

// [ PRESETS ]
const api   = path.resolve(__dirname + "\\api\\")
console.log(api);
const front = 'https://final-axotellix.vercel.app/'


// [ ROUTES ]
app.get('/', function (req, res) {
    res.send('hello from root level!')
})

// get > all articles
app.get('/api/articles', async (request, result) => {

    const route = '\\articles\\articles.json'

    try {
        let file = fs.readFileSync(api + route, 'utf-8');
        result.send(JSON.parse(file));

    } catch(err) {
        console.log('error occured:', err);
    }
    
})
// get > single article
app.get('/api/articles/:id', async (request, result) => {

    const route = '\\articles\\articles.json'

    try {
        let file = fs.readFileSync(api + route, 'utf-8');
        result.send({"data": JSON.parse(file).data[request.params.id]});

    } catch(err) {
        console.log('error occured:', err);
    }
    
})

// get > article comments
app.get('/api/articles/:id/comments/', async (request, result) => {

    const id    = request.params.id
    const route = '\\articles\\comments\\' + id + '.json'

    try {
        let file = fs.readFileSync(api + route, 'utf-8');
        result.send(JSON.parse(file));

    } catch(err) {
        console.log('error occured:', err);
    }

})

// create > new comment
app.post('/api/articles/:article_id/comments/:name/:comment', async (request, result) => {

    const route = '\\articles\\articles.json'

    try {
        let file = fs.readFileSync(api + route, 'utf-8');
        result.send(JSON.parse(file));

    } catch(err) {
        console.log('error occured:', err);
    }
    
})




app.listen(4000);