$(document).ready(function() {
  $.ajax({
    url: '/api/1.0/user_tasks/',
  })
  .done((data) => {
    $('#tasks-box').text(JSON.stringify(data));
  });
});
