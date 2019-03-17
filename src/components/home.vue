<template>
  <div id="home">
    <div class="row" v-if="loaded">
      <div class="col-md-4" v-if="entry.Name.includes('/instanemaki')" v-for="entry in entries" :key=entry.Time>
        <img :src="imgSource(entry)" width=100%>
      </div>
    </div>
    <div id="message" v-else>
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
import startup from '../api/startup'
import list from '../api/list'

export default {
  name: 'top',
  data () {
    return {
      msg: '',
      page: {
        username: '',
        path: '',
        key: ''
      },
      validity: false,
      loaded: false,
      entries: null
    }
  },
  // props: {
  //   _key: {
  //     type: String,
  //     default: ''
  //   }
  // },
  mounted () {
    var loc = window.location
    var keyPrefix = '#key='
    var storage = window.localStorage
    var storageKey = 'upspin-ui-key'

    if (loc.hash.startsWith(keyPrefix)) {
      this.page.key = loc.hash.slice(keyPrefix.length)
      storage.setItem(storageKey, this.page.key)
      loc.hash = ''
    } else if (storage.getItem(storageKey)) {
      // Got key from local storage.
      this.page.key = storage.getItem(storageKey)
    } else {
      // No key found.
      this.msg = 'No request key in browser URL.\n\n' +
        'To use the Upspin browser, click the URL\n' +
        'that it printed to the console.\n\n' +
        'It will look something like\n' +
        'http://localhost:8000/#key=3f0cf1e29...\n' +
        'but with a different hash.'
      return
    }

    this.validity = false
    this.msg = 'Wait while we check the validity of your Upspin account and check connectivity to your directory server.'

    startup(this.page, this.startupSuccess, this.error)
  },
  methods: {
    startupSuccess (data) {
      this.page.username = data.UserName
      this.page.path = data.LeftPath + '/instanemaki'
      this.validity = true
      this.msg = 'Loading files...'
      list(this.page, this.listSuccess, this.error)
    },
    listSuccess (entries) {
      this.msg = 'Load completed.'
      this.entries = entries
      this.loaded = true
      // console.log(entries)
    },
    error (err) {
      alert(err)
      this.msg = 'An error occurred. Please try again.'
    },
    imgSource (entry) {
      return entry.Name + '?token=' + entry.FileToken
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home {
  width: 100%;
  height: 100%;
}

#message {
  width: 100%;
  height: 100%;
  display: table;
}
#message p {
  display: table-cell;
  vertical-align: middle;
}

div.row {
  margin: 15px;
}

div.col-md-4 {
  padding: 15px;
}
</style>
