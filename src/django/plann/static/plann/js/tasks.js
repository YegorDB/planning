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
    this._taskItem = null;
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
      $('#change-status-dialog > .dialog-window-content').append(status);
    }

    $('#change-status-dialog').on('click', (e) => {
      this._taskItem = null;
    });
    $('#change-status-dialog').on('changeStatusStart', (e) => {
      $('#change-status-dialog').addClass('dialog-window-open');
      this._taskItem = e.taskItem;
    });
  }

  /**
   * Change status value.
   * @param {string} value - New status value.
   */
  _changeValue(value) {
    if (!this._taskItem) return;

    $.ajax({
      url: `/api/1.0/update_task/${this._taskItem.id}/`,
      data: JSON.stringify({
        'status': value,
      }),
      type: 'PATCH',
      contentType: 'application/json',
    })
    .done((taskData) => {
      this._taskItem.status.value = value;
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log('jqXHR', jqXHR);
    })
    .always(() => {
      this._taskItem = null;
    });

    $('#change-status-dialog').removeClass('dialog-window-open');
  }
}


/** Tasks stack item priority handle logic. */
class TasksStackItemPriority {

  /**
   * Create.
   * @param {Object} item - Tasks stack item.
   * @param {integer} value - Task priority value.
   */
  constructor(item, value) {
    this._item = item;
    this._value = null;

    let cellElement = document.createElement('div');
    $(cellElement).addClass('tasks-stack-cell tasks-stack-cell-priority');
    $(this._item.element).append(cellElement);

    this._valueElement = document.createElement('div');
    $(cellElement).append(this._valueElement);

    this.value = value;
  }

  /**
   * Task priority value.
   * @return {integer} Value.
   */
  get value() {
    return this._value;
  }

  /**
   * Set task priority value.
   * @param {integer} value - Value.
   */
  set value(value) {
    if (!Object.keys(CHOISES.task.priority).includes(value.toString())) {
      throw Error(`Wrong task priority value "${value}".`);
    }

    this._value = value;

    $(this._valueElement)
    .attr('title', CHOISES.task.priority[value])
    .removeClass()
    .addClass([
      'tasks-stack-cell-item-priority',
      `tasks-stack-cell-item-priority-${value}`,
    ].join(' '));
  }
}


/** Tasks stack item status handle logic. */
class TasksStackItemStatus {

  /**
   * Create.
   * @param {Object} item - Tasks stack item.
   * @param {string} value - Task status value.
   */
  constructor(item, value) {
    this._item = item;
    this._value = null;

    let cellElement = document.createElement('div');
    $(cellElement).addClass('tasks-stack-cell tasks-stack-cell-status');
    $(this._item.element).append(cellElement);

    this._valueElement = document.createElement('div');
    $(this._valueElement).on('click', (e) => {
      $('#change-status-dialog').trigger({
        type: 'changeStatusStart',
        taskItem: this._item,
      });
    });
    $(cellElement).append(this._valueElement);

    this.value = value;
  }

  /**
   * Task status value.
   * @return {string} Value.
   */
  get value() {
    return this._value;
  }

  /**
   * Set task status value.
   * @param {string} value - Value.
   */
  set value(value) {
    if (!Object.keys(CHOISES.task.status).includes(value)) {
      throw Error(`Wrong task status value "${value}".`);
    }

    this._value = value;

    $(this._valueElement)
    .text(CHOISES.task.status[value])
    .removeClass()
    .addClass([
      'tasks-stack-cell-item-status',
      `tasks-stack-cell-item-status-${value.toLowerCase()}`,
    ].join(' '));
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
    this.element = document.createElement('div');
    $(this.element).addClass('tasks-stack-row');
    $('#tasks-stack-items').append(this.element);

    this.id = taskData.id;
    this._priority = new TasksStackItemPriority(this, taskData.priority);
    this._name = taskData.name;
    this._description = taskData.description;
    this._drawName();
    this._status = new TasksStackItemStatus(this, taskData.status);
  }

  /**
   * Task priority handler.
   * @return {Object} Handler.
   */
  get priority() {
    return this._priority;
  }

  /**
   * Task status handler.
   * @return {Object} Handler.
   */
  get status() {
    return this._status;
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
