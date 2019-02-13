import axios from 'axios'

export default function (dir, files, success, error) {
  // For the file upload to work, we need to pass the files in as
  // a FormData object and turn off any of the pre-processing
  // jQuery might do.
  var fd = new FormData();
  fd.append("key", page.key);
  fd.append("method", "put");
  fd.append("dir", dir);
  for (var i = 0; i < files.length; i++) {
    fd.append("file"+i, files[i]);
  }
  $.ajax("/_upspin", {
    method: "POST",
    data: fd,
    contentType: false,
    processData: false,
    cache: false,
    dataType: "json",
    success: function(data) {
      if (data.Error) {
        error(data.Error);
        return;
      }
      success();
    },
    error: errorHandler(error)
  });
}
