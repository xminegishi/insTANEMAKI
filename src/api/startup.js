import axios from 'axios'

export default function (key, success, error) {
  var fd = new FormData()
  fd.append('key', key)
  fd.append('method', 'startup')
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
      if (res.data.Startup) {
        console.log(res.data)
        return
      }
      // The startup process is complete.
      success(res.data)
    })
    .catch(err => {
      error(err)
    })
}
