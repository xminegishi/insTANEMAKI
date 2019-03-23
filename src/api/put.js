import axios from 'axios'

export default function (key, path, files, success, error) {
  // For the file upload to work, we need to pass the files in as
  // a FormData object and turn off any of the pre-processing
  // jQuery might do.
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
    responseType: 'json'
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

  // $.ajax("/_upspin", {
  //   method: "POST",
  //   data: fd,
  //   contentType: false,
  //   processData: false,
  //   cache: false,
  //   datType: "json",
  //   success: function(data) {
  //     if (data.Error) {
  //       error(data.Error);
  //       return;
  //     }
  //     success();
  //   },
  //   error: errorHandler(error)
  // });
}
