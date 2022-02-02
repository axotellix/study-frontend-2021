
// [ IMPORTS ]
import axios from 'axios'


// [ MAIN ]
const api = {
    server: 'https://web-nuxt-api-axotellix.vercel.app',
    routes: {

        // [ GET requests ]
        GET: {
            dynamic: {
                article_id: 1,
            },

            articles: ctx => "/api/articles/",
            article:  ctx => "/api/articles/" + ctx?.routes?.GET?.dynamic?.article_id,
            comments: ctx => `/api/articles/${ctx?.routes?.GET?.dynamic?.article_id}/comments/`,
        },

        // [ POST requests ]
        POST: {
            dynamic: {
                article_id: 1,
                name: 'username',
                comment: 'comment',
            },

            comments: ctx => `/api/articles/${ctx?.routes?.POST?.dynamic?.article_id}/comments?name=${ctx?.routes?.POST?.dynamic.name}&comment=${ctx?.routes?.POST?.dynamic.comment}`
        }

    },
    config: {
        mode: "no-cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Method": "no-cors",
        }
    },

    //@ define > GET method 
    get: async function( route, dynamic_data = {} ) {

        // update > dynamic data in routes
        this.routes.GET.dynamic = dynamic_data

        // define > request params
        let endpoint = this.server + this.routes.GET[route](this)
        let config = this.config

        // send > request
        let req = await axios.get(endpoint, { config })
        return req.data.data

    },

    //@ define > GET method 
    post: async function(route, dynamic_data ) {
        
        // update > dynamic data in routes
        this.routes.POST.dynamic = dynamic_data

        // define > request params
        let endpoint = this.server + this.routes.POST[route](this)
        let config = this.config

        // send > request
        let req = await axios.post(endpoint, { config })

        return req;

    }
 
};

export default api;