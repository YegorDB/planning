const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const WEEK_DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];


/**
 * Draw tasks diagram scale month.
 * @param {Date} date - Date instance.
 */
function drawScaleMonth(date) {
  let scaleMonthBox = document.getElementById('scale-month');
  let monthText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  monthText.setAttribute('x', 0);
  monthText.setAttribute('y', 10);
  monthText.classList.add('scale-numbers-text');
  monthText.textContent = MONTHS[date.getMonth()];
  scaleMonthBox.appendChild(monthText);
}


/**
 * Draw tasks diagram scale day.
 * @param {Date} date - Date instance.
 */
function drawScaleDay(date) {
  let scaleDayBox = document.getElementById('scale-day');
  let dayText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  dayText.setAttribute('x', 0);
  dayText.setAttribute('y', 10);
  dayText.classList.add('scale-numbers-text');
  let weekDay = WEEK_DAYS[date.getDay()];
  let monthDay = date.getDate().toString();
  if (monthDay.length == 1) {
    monthDay = `0${monthDay}`;
  }
  dayText.textContent = `${monthDay} (${weekDay})`;
  scaleDayBox.appendChild(dayText);
}


/** Draw tasks diagram scale numbers. */
function drawScaleNumbers() {
  let scaleNumbersBox = document.getElementById('scale-numbers');
  for (let hour = 0; hour < 24; hour++) {
    let hourText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    hourText.setAttribute('x', hour * 40 + 2);
    hourText.setAttribute('y', 10);
    hourText.classList.add('scale-numbers-text');
    let hourVisible = hour.toString();
    if (hourVisible.length == 1) {
      hourVisible = `0${hourVisible}`;
    }
    hourText.textContent = hourVisible;
    scaleNumbersBox.appendChild(hourText);
  }
}


/** Draw tasks diagram scale linear. */
function drawScaleLinear() {
  let ctx = document.getElementById('scale-linear').getContext('2d');

  ctx.fillStyle = 'black';
  ctx.beginPath();
  for (let hour = 0; hour < 24; hour++) {
    let x = hour * 40 + 1;

    ctx.moveTo(x, 0);
    ctx.lineTo(x, 10);

    for (let minute = 15; minute < 60; minute += 15) {
      ctx.moveTo(x + minute / 15 * 10, 5);
      ctx.lineTo(x + minute / 15 * 10, 10);
    }
  }

  ctx.stroke();
}


/** Draw tasks diagram scale. */
function drawScale() {
  let date = new Date();

  drawScaleMonth(date);
  drawScaleDay(date);
  drawScaleNumbers();
  drawScaleLinear();
}


$(document).ready(function() {
  $.ajax({
    url: '/api/1.0/user_tasks/',
  })
  .done((data) => {
    // $('#tasks-box').text(JSON.stringify(data));
  });

  drawScale();
});
