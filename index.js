const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('cross-fetch');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const res = require('express/lib/response');


// [ SYSTEM SETTINGS ]
app.set('view engine', 'ejs');  
app.use(cors());

// [ PRESETS ]
const api = path.resolve(__dirname + "\\api\\")


// [ ROUTES ]
app.get('/', function (req, res) {
    res.send('hello from root level!')
})

//@ get > all articles
app.get('/api/articles', async (request, result) => {

    // define > route
    const route = '\\articles\\articles.json'

    // fetch > data
    try {
        let file = fs.readFileSync(api + route, 'utf-8');
        result.send(JSON.parse(file));

    } catch(err) {
        console.log('error occured:', err);
    }
    
})
//@ get > single article
app.get('/api/articles/:id', async (request, result) => {

    // define > route
    const route = '\\articles\\articles.json'

    // fetch > data
    try {
        let file = fs.readFileSync(api + route, 'utf-8');
        result.send({"data": JSON.parse(file).data[request.params.id]});

    } catch(err) {
        console.log('error occured:', err);
    }
    
})

//@ get > article comments
app.get('/api/articles/:id/comments', async (request, result) => {

    // get > parameters
    const id    = request.params.id

    // define > route
    const route = '\\articles\\comments\\' + id + '.json'

    // fetch > data
    try {
        let file = fs.readFileSync(api + route, 'utf-8');
        result.send(JSON.parse(file));

    } catch(err) {
        console.log('error occured:', err);
    }

})

//@ create > new comment
app.post('/api/articles/:article_id/comments', async (request, result) => {

    // get > parameters
    const article_id = request.params.article_id
    const name    = request.query.name
    const comment    = request.query.comment

    // define > route
    const route   = `\\articles\\comments\\${article_id}.json`

    // fetch > data
    try {
        let file = fs.readFileSync(api + route, 'utf-8');
        let data = JSON.parse(file) 

        // generate > next comment id (max + 1)
        let c_id  = data.data.sort( (a, b) => parseInt(b['id']) - parseInt(a['id']) )[0]['id'] + 1

        // prepare > new comment data
        let new_comment = {
            "id": c_id,
            "created_at": new Date().toISOString(),
            "updated_at": new Date().toISOString(),
            "user_name": name,
            "comment": comment,
            "article_id": article_id
        }

        // add > comment to comments-list
        data.data.push(new_comment)
        let new_comments_list = { "data": data.data }

        // save > new comments-list
        fs.writeFileSync(api + route, JSON.stringify(new_comments_list));

        // send > result
        result.send({ "status": "OK" })
        

    } catch(err) {
        if (err.code === 'ENOENT') {

            // generate > next comment id (max + 1)
            let c_id  = 1

            // prepare > new comment data
            let new_comment = {
                "id": c_id,
                "created_at": new Date().toISOString(),
                "updated_at": new Date().toISOString(),
                "user_name": name,
                "comment": comment,
                "article_id": article_id
            }

            // add > comment to comments-list
            let new_comments_list = { "data": new_comment }

            // save > new comments-list
            fs.writeFileSync(api + route, JSON.stringify(new_comments_list));

            // send > result
            result.send({ "status": "OK" })

        }
    }
})


// [ RUN > SERVER ]
app.listen(4000);