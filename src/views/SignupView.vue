<template>
  <h1> Login/Signup </h1>
  <div class="signup">
    <Signup/>
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from '@/components/Signup.vue'

export default {
  name: 'SignupView',
  components: {
    Signup
  }
}
</script>
