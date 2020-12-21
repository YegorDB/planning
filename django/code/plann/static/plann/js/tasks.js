$(document).ready(function() {
  const CHOISES = JSON.parse(RAW_CHOISES);

  $.ajax({
    url: '/api/1.0/user_tasks/',
  })
  .done((data) => {
    for (let task of data) {
      let taskItem = document.createElement('div');
      $(taskItem).addClass('tasks-stack-item');

      let taskItemName = document.createElement('div');
      $(taskItemName).addClass('tasks-stack-cell tasks-stack-cell-name');
      let taskItemNameText = document.createElement('div');
      $(taskItemNameText).addClass('tasks-stack-cell-name-text');
      $(taskItemNameText).text(task.name);
      if (task.description && task.description != '') {
        $(taskItemNameText).append(`
          <div class="tasks-stack-item-description" title="${task.description}">
            <div>i</div>
          </div>
        `);
      }
      $(taskItemName).append(taskItemNameText);
      $(taskItem).append(taskItemName);

      let taskItemPriority = document.createElement('div');
      $(taskItemPriority).addClass('tasks-stack-cell tasks-stack-cell-priority');
      $(taskItemPriority).text(CHOISES.task.priority[task.priority]);
      $(taskItem).append(taskItemPriority);

      let taskItemStatus = document.createElement('div');
      $(taskItemStatus).addClass('tasks-stack-cell tasks-stack-cell-status');
      $(taskItemStatus).text(CHOISES.task.status[task.status]);
      $(taskItem).append(taskItemStatus);

      $('#tasks-stack-items').append(taskItem);
    }

    console.log('data', data);
  });
});
