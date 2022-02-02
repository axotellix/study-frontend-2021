
<!-- [ PAGE: HOME ] -->
<template>
<main class = 'home'>

    <!-- page title -->
    <h1 class = 'page-title'>
        All articles ({{ this.articles.length }})

        <form action="" class="search-form">
            <input type="text" placeholder = 'search ...' v-model = 'src_query' name = 'search' autocomplete="off" />
            <Ico type = 'search' />
        </form>
    </h1>
    
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
import Ico from '@/components/Ico'

export default {
    // [ Component name ]
    name: 'Home',

    // [ Child components ]
    components: {
        Article,
        Ico
    },

    // [ Whatchers ]
    watch: { 
        src_query: function() {
            if( this.src_query ) {
                this.articles = this.$store.state.articles.filter(article => {
                    return article.title.toLowerCase().includes(this.src_query)
                })
            } else {
                this.articles = this.$store.state.articles
            }
        },
    },

    // [ Head tags ]
    head() {
        return {
            link: [
                { rel: "stylesheet", href: "/css/app.css" } 
            ]
        }
    },

    // [ Components props ]
    data() {
        return {
            articles: [1, 2, 3, 4],
            src_query: ''
        }
    },

    // [ Hooks ] 
    async mounted() {

        // fetch > articles
        this.articles = await api.get('articles')
        this.$store.commit('keep_local', this.articles)

    }
}
</script>
