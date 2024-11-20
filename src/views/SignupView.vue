<template>
  <div class="signup">
    <Signup/>
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from '@/components/Signup.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'SignupView',
  components: {
    Header,
    Signup
  }
}
</script>