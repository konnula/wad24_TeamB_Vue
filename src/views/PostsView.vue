<template>
    <main>
        <div>
            <h1>Posts</h1>
            <Post/>
            <button class="resetButton" v-on:click="ResetLikes">Reset Likes</button>
            <button class="resetButton" v-on:click="DeletePosts">Delete all posts</button>
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
            fetch(`http://localhost:3000/api/resetlikes`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
            })
            .catch((e) => {
                console.log(e);
            })
            location.reload();
        }
    }
}

</script>

<style>

.resetButton {
    background-color: #008CBA;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 12px;
}

.resetButton:hover {
    filter: drop-shadow(0px 0px 20px aqua);
}


</style>