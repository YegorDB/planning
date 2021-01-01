$(document).ready(function() {
  const CHOISES = JSON.parse(RAW_CHOISES);

  $.ajax({
    url: '/api/1.0/user_tasks/',
  })
  .done((data) => {
    for (let task of data) {
      let taskItem = document.createElement('div');
      $(taskItem).addClass('tasks-stack-row');

      let taskItemPriority = document.createElement('div');
      $(taskItemPriority).addClass('tasks-stack-cell tasks-stack-cell-priority');
      let taskItemPriorityValue = document.createElement('div');
      $(taskItemPriorityValue).addClass(`tasks-stack-cell-item-priority tasks-stack-cell-item-priority-${task.priority}`);
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
      $(taskItemStatusValue).addClass(`tasks-stack-cell-item-status tasks-stack-cell-item-status-${task.status.toLowerCase()}`);
      $(taskItemStatusValue).text(CHOISES.task.status[task.status]);
      $(taskItemStatus).append(taskItemStatusValue);
      $(taskItem).append(taskItemStatus);

      $('#tasks-stack-items').append(taskItem);
    }

    console.log('data', data);
  });
});
