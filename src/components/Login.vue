<template>
    <main>
          <div id="signup_form">
            <form autocomplete="off">
              <div class="form-group" id="email-group">
                <label for="email">Email:</label>
                <input type="email" placeholder="Email" name="email" id="email" required v-model="email">
              </div>
              <div class="form-group" id="password-group">
                <label for="password">Password:</label>
                <input type="password" placeholder="Password" name="password" id="password" required v-model="password">
              </div>
              <div>
                <button class="button" id="login-button" v-on:click.prevent="logIn">Login</button>
                <button class="button" id="signup-button" v-on:click="this.$router.push('/signup')">Sign Up</button>
              </div>
              <div v-if="errors.length" class="error-list"><b>Errors:</b>
              <ul>
                <li v-for="error in errors" :key="error.id"> {{ error }}</li>
              </ul>
              </div>
              <div v-else-if="success" class="signup-success"><b>Login successful!</b></div>
            </form>
          </div>
    </main>
  </template>
  
  <script>
    export default {
      name: 'Login',
      data: function() {
        return {
        email: '',
        password: '',
        errors:[],
        success: false
      }},
      methods: {
      logIn() {
        this.errors = [];
        var data = {
          email: this.email,
          password: this.password
        };
        // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
        fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            credentials: 'include', //  Don't forget to specify this if you need cookies
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
        if (data.error)
          this.errors.push(data.error);
        else 
          localStorage.setItem("userId", data.user_id);
        if (!this.errors.length)
          location.assign("/");
        })
        .catch((e) => {
          console.log("Login error: " + e.message);
        });
      }
    }
  }
  </script>
  
  <style scoped>

  #signup_form {
    grid-template-columns: auto auto;
    gap: 10px;
    background-color: #f5f5f5;
    flex-direction: column;
    padding: 50px;
    margin: 50px 20% 50px;
    border-radius: 50px;
  }
  
  @media (max-width: 800px){
      #signup_form {
        margin: 10% 5% 10%;
      }
  }
  
  .form-group {
    display: flex;
    align-items: center;
    gap: 20px; 
    margin-bottom: 10px;
  }
  
  #email, #password {
    flex: 1 1 100px; 
    text-align: left;
  }

  .button {
    margin: 10px 15%;
    border: none;
    color: white;
    padding: 15px 20px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    border-radius: 12px;
}

.button:hover {
    filter: drop-shadow(0px 0px 20px aqua);
}
  
#login-button {
  background-color: green;
}

#signup-button {
  background-color: #008CBA;
}
  
  
  
  
  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 3px;
  }
  
  .error-list {
    color: red;
    text-align: left;
  }
  
  .error-list > ul {
    text-align: left;
  }
  
  .signup-success {
    color: green;
  }
  
  </style>