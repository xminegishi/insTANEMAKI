import axios from 'axios'

export default function (key, path, files, success, error) {
  var fd = new FormData()
  fd.append('key', key)
  fd.append('method', 'put')
  fd.append('dir', path)
  for (var i = 0; i < files.length; i++) {
    fd.append('file' + i, files[i])
  }
  // console.log(fd)
  axios({
    method: 'POST',
    url: '/_upspin',
    data: fd,
    responseType: 'json',
    config: {headers: {'Content-Type': 'multipart/form-data'}}
  })
    .then(res => {
      if (res.data.Error) {
        error(res.data.Error)
        return
      }
      success()
    })
    .catch(err => {
      error(err)
    })
}
