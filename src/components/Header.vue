<template>
  <nav>
    <router-link to="/">Posts</router-link> |
    <!--<router-link to="/login">Login</router-link> | -->
    <router-link to="/contactus">Contact us</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
nav {
  text-align: center;
  font-size: 20px;
  padding: 30px;
  background-color: #f5f5f5;
  margin: 20px auto;
  color: #777;
  border: 2px solid #ccc;
  border-radius: 15px;
  width: 100%;
  box-sizing: border-box;
}

nav a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #42b983;
}

nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}
</style>