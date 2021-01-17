const { TasksStack } = require('./stack');
const { TasksStatusChangingDialog, TasksStatusFilterDialog, TasksPriorityFilterDialog } = require('./dialog');
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
  new TasksStack;
  new TasksStatusChangingDialog;
  new TasksStatusFilterDialog;
  new TasksPriorityFilterDialog;
  new TasksCreation;

  $('.dialog-window').on('click', function(e) {
    $(this).removeClass('dialog-window-open');
  });
  $('.dialog-window-content').on('click', function(e) {
    e.stopPropagation();
  });
});
