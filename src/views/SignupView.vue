<template>
  <h1> Sign Up </h1>
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
