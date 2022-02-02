
<!-- [ PAGE: HOME ] -->
<template>
<main class = 'article-page'>

    <!-- article: titles -->
    <router-link to = "/" class = 'nav wide'>
        <h1 class = 'page-title'>
            <Ico type = 'arrow-go-back' />
            Article page
        </h1>
    </router-link>
    <h2 class = 'article-title'><span>article:</span> {{ this.article.title }}</h2>
    <p  class = 'article-date'><span>published:</span> {{ this.article.date }}</p>

    <!-- article: cover -->
    <div class = 'article-cover' >
        <img :src="'/img/articles/' + this.article.preview_image" alt="">
    </div>
    
    <!-- article: content -->
    <div class="article-text">
        <p v-html="renderHTML(this.article.desc)"></p>
    </div>

    <!-- article: comments -->
    <ArticleComments :article_id="this.$route.params.id" />

</main>
</template>


<!-- [ SCRIPTS ] -->
<script>
// [ System ]
import api from '../../api/api.js'

// [ Components ]
import ArticleComments from '@/components/ArticleComments'

export default {
    // [ Component name ]
    name: 'ArticlePage',

    // [ Child components ]
    components: {
        ArticleComments
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
            article: {},
            comments: {}
        }
    },

    methods: {
        renderHTML( text ) {
            return `<span> ${text} </span>`
        }
    },

    async mounted() {
        // fetch > articles
        let article_id = this.$route.params.id - 1;
        let articles = await api.get('articles', { article_id })
        this.article = articles[article_id]
    }
}
</script>
