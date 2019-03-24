<template>
  <div class="home">
    <div class="row" v-if="entryLoaded">
      <div v-show="!imageLoading" class="col-md-4" v-if="checkEntry(entry)" v-for="entry in entries" :key=entry.Time>
        <img :src="imgSource(entry)" v-on:load="loaded" v-on:dblclick="showDeleteModal(entry)" width=100%>
      </div>
      <b-modal @hide="hideDeleteModal" @ok="deletePhoto(selectedImage)" id="modal-delete" title="Delete selected photo" ok-title="Delete">
        <div class="rm-item" v-if="selectedImage">
          <img :src="imgSource(selectedImage)">
        </div>
      </b-modal>
    </div>
    <div class="message" v-else>
      <p>{{ msg }}</p>
    </div>
    <loading :active.sync="imageLoading" :is-full-page="false" color="#5bc0de" loader="dots"></loading>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'top',
  // props: {
  //   _key: {
  //     type: String,
  //     default: ''
  //   }
  // },
  components: {
    Loading
  },
  data () {
    return {
      loadedCounter: 0,
      selectedImage: null
    }
  },
  mounted () {
    var loc = window.location
    var keyPrefix = '#key='
    var storage = window.localStorage
    var storageKey = 'upspin-ui-key'

    if (loc.hash.startsWith(keyPrefix)) {
      this.$store.commit('setKey', loc.hash.slice(keyPrefix.length))
      storage.setItem(storageKey, this.page.key)
      loc.hash = ''
    } else if (storage.getItem(storageKey)) {
      // Got key from local storage.
      this.$store.commit('setKey', storage.getItem(storageKey))
    } else {
      // No key found.
      this.$store.commit('setMsg', 'No request key in browser URL.\n\n' +
        'To use the Upspin browser, click the URL\n' +
        'that it printed to the console.\n\n' +
        'It will look something like\n' +
        'http://localhost:8000/#key=3f0cf1e29...\n' +
        'but with a different hash.')
      return
    }
    this.$store.commit('setMsg', 'Wait while we check the validity of your Upspin account and check connectivity to your directory server.')
    this.checkValidity()
  },
  computed: {
    ...mapState([
      'page',
      'entries',
      'msg',
      'entryLoaded',
      'imageLoading'
    ])
  },
  methods: {
    ...mapActions([
      'checkValidity',
      'deletePhoto'
    ]),
    imgSource (entry) {
      return entry.Name + '?token=' + entry.FileToken
    },
    checkEntry (entry) {
      if (entry.Name.includes('/instanemaki')) {
        return true
      } else {
        this.loaded()
        return false
      }
    },
    loaded () {
      this.loadedCounter++
      if (this.loadedCounter >= this.entries.length) {
        this.loadedCounter = 0
        this.$store.commit('setImageLoading', false)
      }
    },
    showDeleteModal (entry) {
      // console.log(entry)
      this.selectedImage = entry
      this.$root.$emit('bv::show::modal', 'modal-delete')
    },
    hideDeleteModal () {
      this.selectedImage = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.home {
  padding-top: 70px;
  width: 100%;
  height: 100vh;
}

div.message {
  width: 100%;
  height: 100%;
  display: table;
}
div.message p {
  display: table-cell;
  vertical-align: middle;
}

div.row {
  margin: 15px;
}

div.col-md-4 {
  padding: 15px;
}

div.rm-item {
  width: 400px;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

div.rm-item img {
  height: 100px;
}
</style>
