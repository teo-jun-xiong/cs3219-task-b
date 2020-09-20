<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <a class="navbar-brand float-left" href="/">CS3219 Task B4</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/">Create Module</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/view">View Modules</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>

    <div class="fixed-bottom">
        <p class="text-center"><kbd>Done by Teo Jun Xiong</kbd><br/><kbd>GitHub repository below</kbd></p>
      <a href="https://github.com/teo-jun-xiong">
        <img src="./assets/github.png" width="60px" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
.fixed-bottom img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}
</style>
