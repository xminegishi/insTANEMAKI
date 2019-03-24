<template>
  <div id="app">
    <b-navbar fixed="top" type="dark" variant="info">
      <b-navbar-brand href="#">insTANEMAKI</b-navbar-brand>
      <b-navbar-nav class="ml-auto mr-5">
        <b-nav-item>
          <b-button @click="showUploadModal" size="sm" variant="info">
            <font-awesome-icon icon="plus" size="lg" />
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container>
      <router-view/>
      <upload></upload>
    </b-container>
  </div>
</template>

<script>
import upload from '@/components/upload'

export default {
  name: 'App',
  components: {
    upload
  },
  methods: {
    showUploadModal () {
      this.$root.$emit('bv::show::modal', 'modal-upload')
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

.navbar-brand {
  margin-left: 30px;
}
</style>
