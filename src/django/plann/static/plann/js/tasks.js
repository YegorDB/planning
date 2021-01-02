const CHOISES = JSON.parse(RAW_CHOISES);


$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) || this.crossDomain) return;
    let csrftokenValue = document.cookie.split("csrftoken=")[1].split("; ")[0];
    xhr.setRequestHeader("X-CSRFToken", csrftokenValue);
  }
});


/**
 * Draw tasks stack item.
 * @param {Object} task - Task data.
 * @param {integer} task.priority - Task priority.
 * @param {string} task.name - Task name.
 * @param {string} task.status - Task status.
 * @param {string} [task.description] - Task description.
 */
function drawTask(task) {
  let taskItem = document.createElement('div');
  $(taskItem).addClass('tasks-stack-row');

  let taskItemPriority = document.createElement('div');
  $(taskItemPriority).addClass('tasks-stack-cell tasks-stack-cell-priority');
  let taskItemPriorityValue = document.createElement('div');
  $(taskItemPriorityValue).addClass([
    'tasks-stack-cell-item-priority',
    `tasks-stack-cell-item-priority-${task.priority}`,
  ].join(' '));
  $(taskItemPriorityValue).attr('title', CHOISES.task.priority[task.priority]);
  $(taskItemPriority).append(taskItemPriorityValue);
  $(taskItem).append(taskItemPriority);

  let taskItemName = document.createElement('div');
  $(taskItemName).addClass('tasks-stack-cell tasks-stack-cell-name');
  let taskItemNameText = document.createElement('div');
  $(taskItemNameText).addClass('tasks-stack-cell-name-text');
  $(taskItemNameText).text(task.name);
  if (task.description && task.description != '') {
    $(taskItemNameText).append(`
      <div class="tasks-stack-cell-item-description" title="${task.description}">
        <div>i</div>
      </div>
    `);
  }
  $(taskItemName).append(taskItemNameText);
  $(taskItem).append(taskItemName);

  let taskItemStatus = document.createElement('div');
  $(taskItemStatus).addClass('tasks-stack-cell tasks-stack-cell-status');
  let taskItemStatusValue = document.createElement('div');
  $(taskItemStatusValue).addClass([
    'tasks-stack-cell-item-status',
    `tasks-stack-cell-item-status-${task.status.toLowerCase()}`,
  ].join(' '));
  $(taskItemStatusValue).text(CHOISES.task.status[task.status]);
  $(taskItemStatus).append(taskItemStatusValue);
  $(taskItem).append(taskItemStatus);

  $('#tasks-stack-items').append(taskItem);
}


$(document).ready(function() {
  $.ajax({
    url: '/api/1.0/user_tasks/',
  })
  .done((data) => {
    for (let task of data) {
      drawTask(task);
    }

    console.log('data', data);
  });

  $('#task-creation-form').submit(function(e) {
    e.preventDefault();

    let formData = new FormData(this);
    $.ajax({
      url: '/api/1.0/create_task/',
      data: JSON.stringify(Object.fromEntries(formData.entries())),
      type: 'POST',
      contentType: 'application/json',
    })
    .done(function(task) {
      drawTask(task);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('jqXHR', jqXHR);
    });
  });
});
