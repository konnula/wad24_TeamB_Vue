<template>
    <div class="Edit Post">
      <div id="form">
        <h3>A Post</h3>
        <label for="title">Title: </label>
        <input name="type" type="text" id="title" required v-model="post.title" />
        <label for="body">Body: </label>
        <input name="body" type="text" id="body" required v-model="post.text" />
      </div>
      <div class="container">
        <button @click="updatePost" class="updatePost button">Update Post</button>
        <button @click="deletePost" class="deletePost button">Delete Post</button>
      </div>
    </div>
  </template>
  
  
<script>

import auth from '@/auth.js';

  export default {
    name: "EditPostView",
    data() {
      return {
        post: {
            "id": "",
            "title": "",
            "text": "",
            "userid": 0,
        },
        authResult: auth.authenticated()
      };
    },
    mounted() {
        if (!this.authResult) {
            this.$router.push("/login");
        }
      this.fetchPost(this.$route.params.id);
    },
    methods: {
      fetchPost(id) {
        fetch(`http://localhost:3000/api/posts/${id}`)
          .then((response) => response.json())
          .then((data) => (this.post = data))
          .catch((err) => console.error(err.message));
      },
      updatePost() {
        let localUserId = Number(localStorage.getItem('userId'));
        fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
                "id": this.post.id,
                "title": "(Edited) "+ this.post.title.replace("(Edited)","").trim(),
                "text": this.post.text.trim(),
                "userid": localUserId
            }
          ),
        })
          .then((response) => {
            console.log(response);
            this.$router.push("/");
          })
          .catch((e) => {
            console.log(e);
          });
      },
      deletePost() {
        fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            console.log(response.data);
            this.$router.push("/");
          })
          .catch((e) => {
            console.log(e);
          });
      },
    }
  };
  </script>
  
  <style scoped>
  #form {
    max-width: 420px;
    margin: 30px auto;
    background: rgb(167, 154, 154);
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  h3 {
    text-align: center;
    color: rgb(8, 110, 110);
  }
  label {
    color: rgb(8, 110, 110);
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid white;
    color: blue;
  }
  .button {
    margin: 10px 5%;
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

  .updatePost {
    background-color: green;
  }

  .deletePost {
    background-color: red;
  }
  .container {
    display: flex;
    justify-content: center;
  }
  </style>