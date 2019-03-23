import axios from 'axios'

export default function (key, path, success, error) {
  var fd = new FormData()
  fd.append('key', key)
  fd.append('method', 'list')
  fd.append('path', path)
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
      success(res.data.Entries)
    })
    .catch(err => {
      error(err)
    })
}
