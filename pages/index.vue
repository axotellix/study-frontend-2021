
<!-- [ PAGE: HOME ] -->
<template>
<main class = 'home'>

    <h1 class = 'page-title'>All articles ({{ this.articles.length }})</h1>
    
    <!-- article -->
    <ul class = 'articles'>
        <li v-for="article in articles" :key="article.id"><router-link :to="'/articles/' + article.id"><Article :article="article" /></router-link></li>
    </ul>

</main>
</template>


<!-- [ SCRIPTS ] -->
<script>
// [ System ]
import api from '../api/api.js'

// [ Components ]
import Article from '@/components/Article'

export default {
    // [ Component name ]
    name: 'Home',

    // [ Child components ]
    components: {
        Article
    },

    head() {
        return {
            link: [
                { rel: "stylesheet", href: "/css/app.css" } 
            ]
        }
    },

    data() {
        return {
            articles: [1, 2, 3, 4]
        }
    },

    async mounted() {

        // fetch > articles
        this.articles = await api.get('articles')

    }
}
</script>
