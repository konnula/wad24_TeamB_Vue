<template>
    <main>
        <div class="common"> <br>
            <h1>Posts</h1>
            <Post/>

            <button class="resetButton" v-on:click="ResetLikes">Reset Likes</button>
        </div>
    </main>
</template>

<script>

import Post from '@/components/Post.vue';

export default	{
    name: "PostView",
    components:{
        Post
    },
    data:function(){
        return{}
    },
    methods:{
        ResetLikes(){
            this.$store.commit("ResetLikes")
        }
    }
}

</script>

<style>

.common {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
}

.resetButton {
    background-color: papayawhip;
}

.resetButton:hover {
    filter: drop-shadow(0px 0px 20px aqua);
}

</style>