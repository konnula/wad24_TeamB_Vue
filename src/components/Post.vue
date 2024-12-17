<template>
        <div class="common">
            <div class = "post" v-for="post in postList" :key="post.id">
                <article class="userArticle" v-if="this.userId == post.userid" v-on:click="this.$router.push(`/post/${post.id}`)">
                    <h2 class="title"> {{ post.title }}</h2>
                    <!--<img class="userIcon" :src="post.userLogo" alt=""> <br>-->
                    <div> By <b> You ({{ post.author }})</b> on {{ post.time.split("T")[0] }} </div> <br>
                    <!--<img :src="post.imagePath" alt=""> --><!-- alt empty so if does not exist image, will not display -->
                    <p>{{ post.text }}</p>
                    <div class="like_container">
                        <button class="like_button" v-on:click="IncreaseLike(post.id, $event)"><img src="../assets/like_button.png" alt=""></button>
                        {{ post.likes }} likes
                    </div>
                </article>
                <article v-else>
                    <h2 class="title"> {{ post.title }}</h2>
                    <!--<img class="userIcon" :src="post.userLogo" alt=""> <br>-->
                    <div> By <b>{{ post.author }}</b> on {{ post.time.split("T")[0] }}</div> <br>
                    <!--<img :src="post.imagePath" alt=""> --><!-- alt empty so if does not exist image, will not display -->
                    <p>{{ post.text }}</p>
                    <div class="like_container">
                        <button class="like_button" v-on:click="IncreaseLike(post.id, $event)"><img src="../assets/like_button.png" alt=""></button>
                        {{ post.likes }} likes
                    </div>
                </article>
            </div>
        </div>
</template>

<script>
export default{
    name: "PostComponent",
    data: function(){
        return{
            postList: [],
            userId: 0
        }
    },
    // computed: {
    //     postList(){
    //         return this.$store.state.postList
    //     }
    // },
    methods:{
        IncreaseLike(postId, event){
                        if (event) {
                event.stopPropagation(); // Prevent the click from bubbling to <article>
            }
            fetch(`http://localhost:3000/api/posts/like/${postId}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .catch((e) => {
                console.log(e);
            })
            const post = this.postList.find(post => post.id == postId);
            post.likes += 1;
        },
        fetchPosts() {
            fetch(`http://localhost:3000/api/posts`)
                .then((response) => response.json())
                .then((data) => (this.postList = data))
                .catch((err) => console.log(err.message));
        },
    },
    mounted() {
        this.fetchPosts();
        if (localStorage.getItem('userId'))
            this.userId = Number(localStorage.getItem('userId'));
        console.log("mounted " + this.userId);
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

/* Posts content box */
.post {
    display: inline; /* for boxing content */
    inline-size: 80%; /* uses 50% of the space */
    margin-bottom: 5px; /* Space between the articles */
}

article { 
    border: 2px solid #000;   /* solid black border */
    background-color: #ebebeb; /* subtle gray background */
    padding: 20px; /* Add padding inside the box */
    border-radius: 25px;  /*  rounded box corners */
}

.userArticle {
    background-color: lightblue;
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
</style>
