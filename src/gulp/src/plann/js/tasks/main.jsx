const { Stack } = require('./stack/main.jsx');
const { StatusChangingDialog } = require('./dialog/changing/status.jsx');
const { StatusFilterDialog } = require('./dialog/filter/status.jsx');
const { PriorityFilterDialog } = require('./dialog/filter/priority.jsx');
const { TasksCreation } = require('./creation');


window.CHOISES = JSON.parse(RAW_CHOISES);
window.URLS = JSON.parse(RAW_URLS);
window.WAIT_SCREEN = {
  enabled: false,
  enable() {
    $('#wait-screen').addClass('wait-screen-enabled');
    this.enabled = true;
  },
  disable() {
    $('#wait-screen').removeClass('wait-screen-enabled');
    this.enabled = false;
  },
};


$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) || this.crossDomain) return;
    let csrftokenValue = document.cookie.split("csrftoken=")[1].split("; ")[0];
    xhr.setRequestHeader("X-CSRFToken", csrftokenValue);
  }
});


$(document).ready(function() {
  new TasksCreation;

  ReactDOM.render(
    <Stack />,
    document.getElementById('tasks-stack-items')
  );

  ReactDOM.render(
    <StatusChangingDialog />,
    document.getElementById('change-status-dialog')
  );
  ReactDOM.render(
    <StatusFilterDialog choices={CHOISES.task.status} />,
    document.getElementById('filter-status-dialog')
  );
  ReactDOM.render(
    <PriorityFilterDialog choices={CHOISES.task.priority} />,
    document.getElementById('filter-priority-dialog')
  );
});
