<template>
  <div id="app">
    <header>
      <b-navbar type="dark" variant="info">
        <b-navbar-brand href="#">insTANEMAKI</b-navbar-brand>
        <b-navbar-nav class="mr-5">
          <b-nav-item>
            <font-awesome-icon icon="plus" size="lg" />
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </header>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  height: 7vh;
}
.navbar {
  height: 100%;
}
.navbar-brand {
  margin-left: 30px;
}

.container {
  height: 93vh;
}
</style>
