$(document).ready(function() {
  const CHOISES = JSON.parse(RAW_CHOISES);

  $.ajax({
    url: '/api/1.0/user_tasks/',
  })
  .done((data) => {
    let headerItem = document.createElement('div');
    let headerNames = ['Name', 'Duration', 'Priority', 'Status'];
    for (let headerName of headerNames) {
      let headerItemValue = document.createElement('div');
      $(headerItemValue).addClass('tasks-stack-cell');
      $(headerItemValue).text(headerName);
      $(headerItem).append(headerItemValue);
    }
    $('#tasks-stack').append(headerItem);

    for (let task of data) {
      let taskItem = document.createElement('div');
      $(taskItem).addClass('tasks-stack-item');

      let taskItemName = document.createElement('div');
      $(taskItemName).addClass('tasks-stack-cell');
      $(taskItemName).text(task.name);
      $(taskItem).append(taskItemName);

      let taskItemDuration = document.createElement('div');
      $(taskItemDuration).addClass('tasks-stack-cell');
      $(taskItemDuration).text(task.duration);
      $(taskItem).append(taskItemDuration);

      let taskItemPriority = document.createElement('div');
      $(taskItemPriority).addClass('tasks-stack-cell');
      $(taskItemPriority).text(CHOISES.task.priority[task.priority]);
      $(taskItem).append(taskItemPriority);

      let taskItemStatus = document.createElement('div');
      $(taskItemStatus).addClass('tasks-stack-cell');
      $(taskItemStatus).text(CHOISES.task.status[task.status]);
      $(taskItem).append(taskItemStatus);

      $('#tasks-stack').append(taskItem);
    }
  });
});
