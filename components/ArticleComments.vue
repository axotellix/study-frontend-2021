
<!-- [ PAGE: HOME ] -->
<template>
<div class="article-comments">

    <!-- form: send comment -->
    <form @submit.prevent="addComment" class = 'form-add-comment'>
        <div class="input-box">
            <input type="text" v-model="name" name = 'name' placeholder = 'Your name ...' autocomplete="off" />
            <button>send</button>
        </div>
        <textarea type="text" v-model="comment" name = 'comment' placeholder = 'enter comment ...' autocomplete="off"></textarea>
    </form>

    <!-- comments list -->
    <ul class = 'comments-list'>
        <div class="comments-sort">
            <div @click="sortComments( true )">
                <span>Sort by date:</span>
                <Ico type = 'arrow-sort-up' :params="this.sort_by_date" />
            </div>
        </div>
        <li class = 'comment' v-for="comment in comments" :key="comment.id">
            <h5 class = 'username'>{{ comment.user_name }}</h5>
            <p class = 'comment-text'>{{ comment.comment }}</p>
            <p class = 'comment-date'>
                {{ new Date(comment.created_at).toLocaleDateString("en-EN", { day: 'numeric', month: 'short', year: 'numeric' }) }}
                <span>last edited: {{ new Date(comment.updated_at).toLocaleDateString("en-EN", { day: 'numeric', month: 'short', year: 'numeric' }) }}</span>
            </p>
        </li>
    </ul>

</div>
</template>


<!-- [ SCRIPTS ] -->
<script>
// [ System ]
import api from '../api/api.js'

// [ Components ]
import Ico from '@/components/Ico'

export default {
    // [ Component name ]
    name: 'ArticleComments',

    // [ Child components]
    components: {
        Ico
    },

    // [ imported props ]
    props: ['article_id'],

    // [ Components props ]
    data() {
        return {
            comments: {},
            name: '',
            comment: '',
            sort_by_date: false
        }
    },

    // [ METHODS ] 
    methods: {
        async getComments() {
            let article_id = this.article_id
            let comments  = await api.get('comments', { article_id })
            this.comments = comments
            return new Promise(resolve => { resolve() })
        },
        async addComment() {
            await api.post('comments', { name: this.name, comment: this.comment, article_id: this.article_id })
            this.name = ''; this.comment = ''
            this.getComments().then(() => {
                this.sortComments()
            })
        },
        sortComments( change_order = false ) {

            // change > order
            if(change_order) this.sort_by_date = !this.sort_by_date
            let order = this.sort_by_date || false

            // sort > comments
            this.comments.sort(function( c1, c2 ) {
                let d1 = new Date(c1.updated_at).getTime()
                let d2 = new Date(c2.updated_at).getTime()
                return ((order + order % 2) - 1) * (d1 - d2)
            });

        }
    },

    // [ hooks ] 
    async mounted() {

        // fetch > comments
       this.getComments().then(() => {
           this.sortComments()
       })

    },
}
</script>
