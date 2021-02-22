<template>
  <div>
    <div class="grid-container">
        <h1 class="grid-item" id="bigText">F-DMCA</h1>
        <div class="grid-item"></div>
        <h5 class="grid-item" id="login">
          <router-link :to="{name: 'login'}">Login</router-link>
        </h5>
    </div>
    <LandingPageContent />
  </div>
</template>

<script>
import LandingPageContent from './layout/LandingPageContent.vue';

// Rout for Login with Twitch
import Login from './Login.vue';
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default {
    name: "LandPage",
    components: {
    LandingPageContent,
  },
}

</script>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
  }
  .grid-item {
    vertical-align: center;
    text-align: center;
  }
  #login {
    text-align: right;
    font-size: 20px;
    color: #fff;
    padding-right: 20px;
    text-decoration: none;
  }
  #loginStyle {
    text-decoration: none;
    color: #fff;
  }
  #bigText {
    font-size: 40px;
    border: 2px solid #FFF;
    width: 180px;
    color: #fff;
  }
</style>
