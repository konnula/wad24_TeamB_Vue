<template>
  <main>
        <div id="signup_form">
          <form @submit.prevent="signUp" autocomplete="off">
            <div class="form-group" id="email-group">
              <label for="email">Email:</label>
              <input type="email" placeholder="Email" name="email" id="email" required v-model="email">
            </div>
            <div class="form-group" id="email-group">
              <label for="password">Password:</label>
              <input type="password" placeholder="Password" name="password" id="password" required v-model="password">
            </div>
            <div>
              <button id="signup-button">Sign up</button>
            </div>
            <div v-if="errors.length" class="error-list"><b>The password is not valid:</b>
            <ul>
              <li v-for="error in errors" :key="error.id"> {{ error }}</li>
            </ul>
            </div>
            <div v-else class="signup-success"><b>Signed up successfully!</b></div>
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
      errors:[]
    }},
    methods: {
      /* Validate password */
      signUp() {
        this.errors = []
        console.log('signup is submitted');
        let error_text = ["password must be between 8-15 chars", 
        "password must include at least one uppercase alphabet character", 
        "password must include at least two lowercase alphabet characters",
        "Includes at least one numeric value",
        "t should start with an uppercase alphabet", 
        " include the character '_'"]
        let error_regex = [
          //, /* 1 uppercase alphabet */
          //, /* 2 lowercase alphabets */
          //, /* 1 numberic value */
          //, /* start with uppercase */
          //  /* include the character '_' */
        ]
        if (this.password.length < 8 || this.password> 15) 
          this.errors.push(error_text[0]);
        for (let i=0; i<error_regex.length; i++) {
          if (error_regex[i].test(this.password))
            this.errors.push(error_text[i])
        }
    },
  }
}
</script>

<style scoped>
#signup_form {
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  background-color: lightyellow;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  margin: 10% 20% 10%;
  border-radius: 50px;
}

#email_text {
  grid-column: 1;
  grid-row: 1;
  text-align: right;
}
#loginEmail {
  grid-column: 2;
  grid-row: 1;
}
#password_text {
  text-align: right;
  grid-column: 1;
  grid-row: 2;
}
#loginPassword {
  grid-column: 2;
  grid-row: 2;
}

#signupButton {
  grid-column-start: 1;
  grid-column-end: 3;
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
}

.signup-success {
  color: green;
  display:none;
}

</style>