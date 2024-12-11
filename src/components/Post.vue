<template>
        <div class="common">
            <article v-for="post in postList" :key="post.id">
                <h2 class="title"> {{ post.title }}</h2>
                <img class="userIcon" :src="post.userLogo" alt="User Logo"> <br>
                <div> By {{ post.author }} on {{ post.createTime }}</div> <br>
                <img :src="post.imagePath" alt=""> <!-- alt empty so if does not exist image, will not display -->
                <p>{{ post.text }}</p>
                <div class="like_container">
                    <button class="like_button" v-on:click="IncreaseLike(post.id)"><img src="../assets/like_button.png" alt=""></button>
                    {{ post.likes }} likes
                </div>
            </article>
        </div>
</template>

<script>
export default{
    name: "PostComponent",
    data: function(){
        return{}
    },
    computed: {
        postList(){
            return this.$store.state.postList
        }
    },
    methods:{
        IncreaseLike(postId){
            this.$store.commit("IncreaseLike",postId)
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
</style>
