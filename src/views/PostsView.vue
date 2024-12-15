<template>
    <main>
        <button class="button" id="resetButton" v-on:click="ResetLikes">Reset Likes</button>
        <button @click.prevent="Logout" class="button" id="logoutButton">Log out</button>
        <h1>Posts</h1>
        <Post/> <!-- Post component -->
        <button class="button" id="addPostButton" v-on:click="AddPost">Add Post</button>
        <button class="button" id="resetButton" v-on:click="DeletePosts">Delete all posts</button>
    </main>
</template>

<script>

import Post from '@/components/Post.vue';
import auth from '@/auth.js';


export default	{
    name: "PostView",
    components:{
        Post
    },
    data:function(){
        return{
        postList: [],
        authResult: auth.authenticated()
    }
    },
    mounted() {
        if (!this.authResult) {
            this.$router.push("/login");
        }
        console.log("mounted");
    },
    methods:{
        Logout() {
        fetch("http://localhost:3000/auth/logout", {
            credentials: 'include', //  Don't forget to specify this if you need cookies
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log('jwt removed');
            //console.log('jwt removed:' + auth.authenticated());
            this.$router.push("/login");
        })
        .catch((e) => {
            console.log("Logout error: " + e.message);
        });
        },
        ResetLikes(){
            fetch(`http://localhost:3000/api/resetlikes`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .catch((e) => {
                console.log(e);
            })
            location.reload();
        },
        DeletePosts(){
            fetch(`http://localhost:3000/api/posts`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .catch((e) => {
                console.log(e);
            })
            location.reload();
        },
        AddPost() {
            this.$router.push("/posts/addpost");
        }
    }
}

</script>

<style scoped>
.common {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
}

.userIcon {
    max-width: 50px;
    max-height: 50px;
    border-radius: 100%;
  }

.button {
    margin: 10px 15%;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    border-radius: 12px;
}

.button:hover {
    filter: drop-shadow(0px 0px 20px aqua);
}

#resetButton {
    background-color: #008CBA;
}

#logoutButton {
    background-color: red;
}

#addPostButton {
    background-color: green;
}

</style>