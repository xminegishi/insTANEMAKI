<template>
  <b-modal @hide="hideUploadModal" @ok="submitPhotos(fileList)" centered id="modal-upload" title="Upload your photos"
  :ok-disabled="fileList.length == 0" ok-only ok-title="Upload">
    <div id="upload-photos" ref="photos">
      <div v-if="fileList.length == 0">
        <font-awesome-icon icon="images" size="7x" />
        <p>Drop here</p>
      </div>
      <b-list-group v-else>
        <b-list-group-item v-for="(file, key) in fileList" :key=key>
          <img class="preview" v-bind:ref="'preview'+parseInt(key)"/>
          {{ file.name }}
          <div class="remove-container">
            <a class="remove" v-on:click="removeFile(key)">Remove</a>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'upload',
  data () {
    return {
      fileList: []
    }
  },
  mounted () {
    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
      // For each event add an event listener that prevents the default action
      // (opening the file in the browser) and stop the propagation of the event (so no other elements open the file in the browser)
      this.$refs.photos.addEventListener(evt, function (e) {
        e.preventDefault()
        e.stopPropagation()
      }, false)
    }.bind(this))

    // Add an event listener for drop to the form
    this.$refs.photos.addEventListener('drop', function (e) {
      // Capture the files from the drop event and add them to our local files array.
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        this.fileList.push(e.dataTransfer.files[i])
      }
      this.getImagePreviews()
    }.bind(this))
  },
  methods: {
    ...mapActions([
      'submitPhotos'
    ]),
    hideUploadModal () {
      // console.log('hide modal')
      this.fileList = []
    },
    getImagePreviews () {
      // Iterate over all of the files and generate an image preview for each one.
      for (let i = 0; i < this.fileList.length; i++) {
        // Ensure the file is an image file
        if (/\.(jpe?g|png|gif|JPE?G)$/i.test(this.fileList[i].name)) {
          // Create a new FileReader object
          let reader = new FileReader()

          // Add an event listener for when the file has been loaded
          // to update the src on the file preview.
          reader.addEventListener('load', function () {
            this.$refs['preview' + parseInt(i)][0].src = reader.result
          }.bind(this), false)

          // Read the data for the file in through the reader. When it has
          // been loaded, we listen to the event propagated and set the image
          // src to what was loaded from the reader.
          reader.readAsDataURL(this.fileList[i])
        } else {
          // We do the next tick so the reference is bound and we can access it.
          this.$nextTick(function () {
            this.$refs['preview' + parseInt(i)][0].src = '/images/file.png'
          })
        }
      }
    },
    removeFile (key) {
      this.fileList.splice(key, 1)
    }
  }
}
</script>

<style scoped>
div.list-group {
  max-height: 500px;
  overflow-y: scroll;
}

div.list-group-item {
  width: 400px;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

div.list-group-item img {
  height: 100px;
}

div.remove-container{
  text-align: center;
}

div.remove-container a{
  color: red;
  cursor: pointer;
}
</style>
