
<!-- [ PAGE: HOME ] -->
<template>
<div class="article-comments">

    <!-- form: send comment -->
    <form @submit.prevent="addComment" class = 'form-add-comment'>
        <div class="input-box">
            <input type="text" v-model="name" name = 'name' placeholder = 'Your name ...' />
            <button>send</button>
        </div>
        <textarea type="text" v-model="comment" name = 'comment' placeholder = 'enter comment ...'></textarea>
    </form>

    <!-- comments list -->
    <ul class = 'comments-list'>
        <li class = 'comment' v-for="comment in comments" :key="comment.id">
            <h5 class = 'username'>{{ comment.user_name }}</h5>
            <p class = 'comment-text'>{{ comment.comment }}</p>
        </li>
    </ul>

</div>
</template>


<!-- [ SCRIPTS ] -->
<script>
// [ System ]
import api from '../api/api.js'

export default {
    // [ Component name ]
    name: 'ArticleComments',

    // [ imported props ]
    props: ['article_id'],

    data() {
        return {
            comments: {},
            name: '',
            comment: '',
        }
    },

    methods: {
        addComment() {
            api.post('comments', { name: this.name, comment: this.comment, article_id: this.article_id })
        }
    },

    // [ hooks ] 
    async mounted() {

        // fetch > articles
        let article_id = this.article_id
        let comments  = await api.get('comments', { article_id })
        this.comments = comments

    },
}
</script>
