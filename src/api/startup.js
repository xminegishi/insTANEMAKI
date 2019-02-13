import axios from 'axios'

export default function (page, success, error) {
  axios({
    method: 'POST',
    url: '/_upspin?' + 'key=' + page.key + '&method=startup',
    responseType: 'json'
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
