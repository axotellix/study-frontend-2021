
<!-- [ COMPONENT: ARTICLE > Home ] -->
<template>
    <div class="article">
        <div class="article-cover"><img :src="'/img/articles/' + this.article.preview_image" alt="article cover"></div>
        <p class = 'article-info'>
            <span class = 'article-name'>{{ this.article.title }}</span>
            <span class = 'article-date'>{{ this.article.date }}</span>
        </p>
        <div class = 'article-icon'>&#8250;</div>
    </div>
</template>


<!-- [ SCRIPTS ] -->
<script>
export default {
    // [ Component name ]
    name: 'Article',

    props: ['article'],
}
</script>
