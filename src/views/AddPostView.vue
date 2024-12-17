<template>
    <div class="A Post">
      <div id="form">
        <h3>A Post</h3>
        <label for="title">Title: </label>
        <input name="type" type="text" id="title" required v-model="post.title" />
        <label for="body">Body: </label>
        <input name="body" type="text" id="body" required v-model="post.text" />
      </div>
      <div class="container">
        <button @click.prevent="addPost" class="addPost button">Add Post</button>
        <button @click="cancelAddPost" class="cancelAddPost button">Cancel Post</button>
      </div>
    </div>
  </template>
  
  
<script>

import auth from '@/auth.js';

  export default {
    name: "Post",
    data() {
      return {
        post: {
            "title": "",
            "text": ""
        },
        authResult: auth.authenticated()
      };
    },
    mounted() {
        if (!this.authResult) {
            this.$router.push("/login");
        }
    },
    methods: {
      addPost() {
        if (!(this.post.text.trim() && this.post.title.trim())){
          return;
        }
        console.log(this.post);
        let localUserId = Number(localStorage.getItem('userId'));
        console.log("User id: " + localUserId + ", type:" + typeof(localUserId));
        if (localUserId) {
          console.log("Post request sent: " + JSON.stringify(
            {
              "title": this.post.title,
              "text": this.post.text,
              "userid": localUserId
            }
          ))
          fetch(`http://localhost:3000/api/posts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {
              "title": this.post.title.trim(),
              "text": this.post.text.trim(),
              "userid": localUserId
              }
            ),
          })
            .then((response) => {
              console.log(response.data);
              this.$router.push("/");
            })
            .catch((e) => {
              console.log(e);
            });
          } else {
            console.error("Error finding user id.");
        }
      },
      cancelAddPost() {
        this.$router.push("/")
    }
  }
}
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

  .addPost {
    background-color: green;
  }

  .cancelAddPost {
    background-color: red;
  }

  .container {
    display: flex;
    justify-content: center;
  }
  </style>