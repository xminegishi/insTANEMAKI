import axios from 'axios'

export default function (paths, dest, success, error) {
  $.ajax("/_upspin", {
    method: "POST",
    data: {
      key: page.key,
      method: "copy",
      paths: paths,
      dest: dest
    },
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
