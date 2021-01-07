const CHOISES = JSON.parse(RAW_CHOISES);


$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) || this.crossDomain) return;
    let csrftokenValue = document.cookie.split("csrftoken=")[1].split("; ")[0];
    xhr.setRequestHeader("X-CSRFToken", csrftokenValue);
  }
});


/** Change status dialog window logic. */
class ChangeStatusDialog {

  /** Create. */
  constructor() {
    this._content = $('#change-status-dialog > .dialog-window-content');
    this._taskId = null;
    for (let [value, name] of Object.entries(CHOISES.task.status)) {
      let status = document.createElement('div');
      $(status).addClass([
        'change-status-dialog-item',
        `change-status-dialog-item-${value.toLowerCase()}`,
      ].join(' '));
      $(status).text(name);
      $(status).on('click', (e) => {
        this._changeValue(value);
      });
      this._content.append(status);
    }

    $('#change-status-dialog').on('click', (e) => {
      this._taskId = null;
    });
    $('#change-status-dialog').on('changeStatusStart', (e) => {
      $('#change-status-dialog').addClass('dialog-window-open');
      this._taskId = e.taskId;
    });
  }

  /**
   * Change status value.
   * @param {string} value - New status value.
   */
  _changeValue(value) {
    if (!this._taskId) return;

    $.ajax({
      url: `/api/1.0/update_task/${this._taskId}/`,
      data: JSON.stringify({
        'status': value,
      }),
      type: 'PATCH',
      contentType: 'application/json',
    })
    .done(function(taskData) {
      console.log('taskData', taskData);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('jqXHR', jqXHR);
    });

    this._taskId = null;
    $('#change-status-dialog').removeClass('dialog-window-open');
  }
}


/** Tasks stack item handle logic. */
class TasksStackItem {

  /**
   * Create.
   * @param {Object} taskData - Task data.
   * @param {integer} taskData.id - Task id.
   * @param {integer} taskData.priority - Task priority.
   * @param {string} taskData.name - Task name.
   * @param {string} taskData.status - Task status.
   * @param {string} [taskData.description] - Task description.
   */
  constructor(taskData) {
    this._id = taskData.id;
    this._priority = taskData.priority;
    this._name = taskData.name;
    this._status = taskData.status;
    this._description = taskData.description;

    this.element = document.createElement('div');
    $(this.element).addClass('tasks-stack-row');
    $('#tasks-stack-items').append(this.element);

    this._drawPriority();
    this._drawName();
    this._drawStatus();
  }

  _drawPriority() {
    let taskItemPriority = document.createElement('div');
    $(taskItemPriority).addClass('tasks-stack-cell tasks-stack-cell-priority');
    let taskItemPriorityValue = document.createElement('div');
    $(taskItemPriorityValue).addClass([
      'tasks-stack-cell-item-priority',
      `tasks-stack-cell-item-priority-${this._priority}`,
    ].join(' '));
    $(taskItemPriorityValue).attr('title', CHOISES.task.priority[this._priority]);
    $(taskItemPriority).append(taskItemPriorityValue);
    $(this.element).append(taskItemPriority);
  }

  _drawName() {
    let taskItemName = document.createElement('div');
    $(taskItemName).addClass('tasks-stack-cell tasks-stack-cell-name');
    let taskItemNameText = document.createElement('div');
    $(taskItemNameText).addClass('tasks-stack-cell-name-text');
    $(taskItemNameText).text(this._name);
    if (this._description && this._description != '') {
      $(taskItemNameText).append(`
        <div class="tasks-stack-cell-item-description" title="${this._description}">
          <div>i</div>
        </div>
      `);
    }
    $(taskItemName).append(taskItemNameText);
    $(this.element).append(taskItemName);
  }

  _drawStatus() {
    let taskItemStatus = document.createElement('div');
    $(taskItemStatus).addClass('tasks-stack-cell tasks-stack-cell-status');
    let taskItemStatusValue = document.createElement('div');
    $(taskItemStatusValue).addClass([
      'tasks-stack-cell-item-status',
      `tasks-stack-cell-item-status-${this._status.toLowerCase()}`,
    ].join(' '));
    $(taskItemStatusValue).text(CHOISES.task.status[this._status]);
    $(taskItemStatusValue).on('click', (e) => {
      $('#change-status-dialog').trigger({
        type: 'changeStatusStart',
        taskId: this._id,
      });
    });
    $(taskItemStatus).append(taskItemStatusValue);
    $(this.element).append(taskItemStatus);
  }
}


/** Tasks stack handle logic. */
class TasksStack {

  /** Create. */
  constructor() {
    this._items = {};

    $('#tasks-stack-items').on('addTask', (e) => {
      this._addTask(e.taskData);
    });

    this._getTasksData();
  }

  /**
   * Add tasks stack item.
   * @param {Object} taskData - Task data.
   * @param {integer} taskData.id - Task id.
   * @param {integer} taskData.priority - Task priority.
   * @param {string} taskData.name - Task name.
   * @param {string} taskData.status - Task status.
   * @param {string} [taskData.description] - Task description.
   */
  _addTask(taskData) {
    this._items[taskData.id] = new TasksStackItem(taskData);
  }

  _getTasksData() {
    $.ajax({
      url: '/api/1.0/user_tasks/',
    })
    .done((data) => {
      for (let taskData of data) {
        this._addTask(taskData);
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('jqXHR', jqXHR);
    });
  }
}


$(document).ready(function() {
  new TasksStack;
  new ChangeStatusDialog;

  $('#task-creation-form').submit(function(e) {
    e.preventDefault();

    let formData = new FormData(this);
    $.ajax({
      url: '/api/1.0/create_task/',
      data: JSON.stringify(Object.fromEntries(formData.entries())),
      type: 'POST',
      contentType: 'application/json',
    })
    .done(function(taskData) {
      $('#tasks-stack-items').trigger({
        type: 'addTask',
        taskData: taskData,
      });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('jqXHR', jqXHR);
    });
  });

  $('.dialog-window').on('click', function(e) {
    $(this).removeClass('dialog-window-open');
  });
  $('.dialog-window-content').on('click', function(e) {
    e.stopPropagation();
  });
});
