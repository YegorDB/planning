/** Draw tasks diagram scale. */
function drawScale() {
  let ctx = document.getElementById("scale").getContext("2d");

  ctx.fillStyle = "black";
  ctx.beginPath();
  for (let hour = 0; hour < 24; hour++) {
    let x = hour * 60 + 1;

    ctx.moveTo(x, 0);
    ctx.lineTo(x, 10);

    for (let minute = 10; minute < 60; minute += 10) {
      ctx.moveTo(x + minute, 5);
      ctx.lineTo(x + minute, 10);
    }
  }

  ctx.stroke();
}


$(document).ready(function() {
  $.ajax({
    url: '/api/1.0/user_tasks/',
  })
  .done((data) => {
    $('#tasks-box').text(JSON.stringify(data));
  });

  drawScale();
});
