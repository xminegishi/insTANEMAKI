import axios from 'axios'

export default function (paths, success, error) {
  $.ajax("/_upspin", {
    method: "POST",
    data: {
      key: page.key,
      method: "rm",
      paths: paths
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
