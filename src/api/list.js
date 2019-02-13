import axios from 'axios'

export default function (page, success, error) {
  axios({
    method: 'POST',
    url: '/_upspin?' + 'key=' + page.key + '&method=list' + '&path=' + page.path,
    responseType: 'json'
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
