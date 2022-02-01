
<!-- [ COMPONENT: ICO ] -->
<template>
    <svg v-if="type = 'arrow-sort-up'" class="ico" :class="this.params ? 'asc' : 'desc'">
        <use xlink:href="/img/icons/sprites.svg#arrow-sort-up"></use>
    </svg>
</template>

<script>
export default {
    // [ Component name ]
    name: 'ArticlePage',

    props: ['type', 'params']

}
</script>