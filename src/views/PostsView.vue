<template>
    <main>
        <button @click="Logout" class="logoutButton">Logout</button>
        <h1>Posts</h1>
        <div class="common">
            <Post/> <!-- Post component -->
            <div>
                <button class="resetButton" v-on:click="ResetLikes">Reset Likes</button>
                <button class="resetButton" v-on:click="DeletePosts">Delete all posts</button>
            </div>
        </div>
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
            console.log(e);
            console.log("error logout");
        });
        },
        // IncreaseLike(postId){
        //     fetch(`http://localhost:3000/api/posts/like/${postId}`, {
        //         method: "PUT",
        //         headers: {
        //         "Content-Type": "application/json",
        //         },
        //     })
        //     .then((response) => response.json())
        //     .catch((e) => {
        //         console.log(e);
        //     })
        //     const post = this.postList.find(post => post.id == postId);
        //     post.likes += 1;
        // },
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
        // fetchPosts() {
        //     fetch(`http://localhost:3000/api/posts`)
        //         .then((response) => response.json())
        //         .then((data) => (this.postList = data))
        //         .catch((err) => console.log(err.message));
        // },
        // TODO: method DeletePosts()
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

/* Posts content box */
article { 
    display: inline; /* for boxing content */
    border: 2px solid #000;   /* solid black border */
    max-inline-size: 50%; /* uses 50% of the space */
    background-color: #ebebeb; /* subtle gray background */
    padding: 20px; /* Add padding inside the box */
    margin-bottom: 20px; /* Space between the articles */
    margin-top: 20px; /* Space from top */
    border-radius: 25px;  /*  rounded box corners */
}

.like_button {
    max-width: 50px;
    max-height: 50px;
    background: transparent;
    border: none;
    
  }

  .like_button img{
    max-width: 100%;
    max-height: 100%;
    margin-top: auto;
    border-radius: 100%;
  }

  .like_button img:hover {
    background-color: inherit;
    filter: drop-shadow(0px 0px 20px aqua);
}

article {
    margin-bottom: 50px;
}

article > img {
    border-radius: 8px;
    max-width: 100%;
    height: auto;
}

article > p {
    font-family: Helvetica;
}

article > h2 {
    display: flex;
    justify-content: center;
}

article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* Style the paragraph that comes immediately after an image */
article img + p {
    font-style: italic;
    color: black;
}

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

.logoutButton {
    background-color: red;
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