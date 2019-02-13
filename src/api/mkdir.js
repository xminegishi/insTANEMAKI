import axios from 'axios'

export default function (path, success, error) {
  $.ajax("/_upspin", {
    method: "POST",
    data: {
      key: page.key,
      method: "mkdir",
      path: path
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
