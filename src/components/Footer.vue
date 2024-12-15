<template>
    <footer class="footer">
      <div class="waves">
        <div class="wave" id="wave1"></div>
        <div class="wave" id="wave2"></div>
        <div class="wave" id="wave3"></div>
        <div class="wave" id="wave4"></div>
      </div>
      <ul class="social-icon">
        <li class="social-icon__item"><a class="social-icon__link" href="https://github.com/konnula/wad24_TeamB_Vue" target="_blank">
          <img class="logo-github" src="../assets/GitHub-Logo.png" alt="GitHub Logo">
        </a></li>
      </ul>
      <ul class="menu">
        <li class="menu__item"><router-link to="/" class="menu__link">Home</router-link></li>
        <li class="menu__item"><router-link to="/Login" class="menu__link">Login</router-link></li>
        <li class="menu__item"><a class="menu__link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Secret</a></li>
      </ul>
      <p>&copy;2024 WAD Team B: Triin Joon, Maksim Kelus, Herbert Konnula</p>
  </footer>
</template>
  
<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 14px;
  padding: 30px;
  background-color: #f5f5f5;
  margin: 20px auto;
  color: #777;
  border: 2px solid #ccc;
  border-radius: 15px;
  width: 100%;
  box-sizing: border-box;
}

/* Found some cool footers to use, source: https://codepen.io/alvarotrigo/pen/GRxxWdQ*/
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

img {
  width: 5%;
  height: 5%;
}

body {
  display: flex;
  background: #333;
  justify-content: flex-end;
  align-items: flex-end;
  min-height: 100vh;
}

.footer {
  position: relative;
  width: 100%;
  background: #3586ff;
  min-height: 100px;
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 150px; /* Avoid collision with the main body */
}

.social-icon, 
.menu {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
}

.social-icon__item, 
.menu__item {
  list-style: none;
}

.social-icon__link {
  font-size: 2rem;
  color: #fff;
  margin: 0 10px;
  display: inline-block;
  transition: 0.5s;
}
.social-icon__link:hover {
  transform: translateY(-10px);
}

.menu__link {
  font-size: 1.2rem;
  color: #fff;
  margin: 0 10px;
  display: inline-block;
  transition: 0.5s;
  text-decoration: none;
  opacity: 0.75;
  font-weight: 300;
}

.menu__link:hover {
  opacity: 1;
}

.footer p {
  color: #fff;
  margin: 15px 0 10px 0;
  font-size: 1rem;
  font-weight: 300;
}

.wave {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100px;
  background: url("https://i.ibb.co/wQZVxxk/wave.png");
  background-size: 1000px 100px;
}

.wave#wave1 {
  z-index: 1000;
  opacity: 1;
  bottom: 0;
  animation: animateWaves 4s linear infinite;
}

.wave#wave2 {
  z-index: 999;
  opacity: 0.5;
  bottom: 10px;
  animation: animate 4s linear infinite !important;
}

.wave#wave3 {
  z-index: 1000;
  opacity: 0.2;
  bottom: 15px;
  animation: animateWaves 3s linear infinite;
}

.wave#wave4 {
  z-index: 999;
  opacity: 0.7;
  bottom: 20px;
  animation: animate 3s linear infinite;
}

@keyframes animateWaves {
  0% {
    background-position-x: 1000px;
  }
  100% {
    background-positon-x: 0px;
  }
}

@keyframes animate {
  0% {
    background-position-x: -1000px;
  }
  100% {
    background-positon-x: 0px;
  }
}
</style>