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
              <button class="signup-button" v-on:click.prevent="signUp">Sign up</button>
            </div>
            <div v-if="errors.length" class="error-list"><b>Errors:</b>
            <ul>
              <li v-for="error in errors" :key="error.id"> {{ error }}</li>
            </ul>
            </div>
            <div v-else-if="success" class="signup-success"><b>Signed up successfully!</b></div>
          </form>
        </div>
  </main>
</template>

<script>
  export default {
    name: 'Signup',
    data: function() {
      return {
      email: '',
      password: '',
      errors:[],
      success: false
    }},
    methods: {
      /* Validate password */
      signUp() {
        this.errors = []
        this.success = false;
        console.log('signup is submitted');
        let error_text = ["password must be between 8-15 characters", 
        "password must include at least one uppercase alphabet character", 
        "password must include at least two lowercase alphabet characters",
        "password must include  at least one numeric value",
        "password must start with an uppercase alphabet", 
        "password must include the character '_'"]
        let error_regex = [
          /[A-Z]/, /* 1 uppercase alphabet */
          /[a-z].*[a-z]/, /* 2 lowercase alphabets */
          /[0-9]/, /* 1 numberic value */
          /^[A-Z]/, /* start with uppercase */
          /_/  /* include the character '_' */
        ]
        if (this.password.length < 8 || this.password.length > 15) 
          this.errors.push(error_text[0]);
        for (let i=0; i<error_regex.length; i++) {
          if (!error_regex[i].test(this.password))
            this.errors.push(error_text[i+1]);
        }
        if (!this.errors.length) {
          this.success = true;
          var data = {
            email: this.email,
            password: this.password,
          };
          fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
              credentials: 'include', //  Don't forget to specify this if you need cookies
              body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) => {
          console.log(data);
          this.$router.push("/");
          //location.assign("/");
          })
          .catch((e) => {
            console.log(e);
            console.log("error");
          });
        }
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
  margin: 10% 30% 10%;
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

.signup-button {
    background-color: green;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 12px;
}

.signup-button:hover {
  filter: drop-shadow(0px 0px 20px aqua);
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