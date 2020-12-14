$(document).ready(function() {
  const CHOISES = JSON.parse(RAW_CHOISES);

  $.ajax({
    url: '/api/1.0/user_tasks/',
  })
  .done((data) => {
    for (let task of data) {
      let taskItem = document.createElement('div');
      $(taskItem).addClass('tasks-box-item');

      let taskItemName = document.createElement('div');
      $(taskItemName).addClass('tasks-box-item-value');
      $(taskItemName).text(task.name);
      $(taskItem).append(taskItemName);

      let taskItemDuration = document.createElement('div');
      $(taskItemDuration).addClass('tasks-box-item-value');
      $(taskItemDuration).text(task.duration);
      $(taskItem).append(taskItemDuration);

      let taskItemPriority = document.createElement('div');
      $(taskItemPriority).addClass('tasks-box-item-value');
      $(taskItemPriority).text(CHOISES.task.priority[task.priority]);
      $(taskItem).append(taskItemPriority);

      let taskItemStatus = document.createElement('div');
      $(taskItemStatus).addClass('tasks-box-item-value');
      $(taskItemStatus).text(CHOISES.task.status[task.status]);
      $(taskItem).append(taskItemStatus);

      $('#tasks-box').append(taskItem);
    }
  });
});
