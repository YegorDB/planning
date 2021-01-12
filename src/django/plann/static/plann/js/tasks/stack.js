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


/** Tasks stack item meaning name handle logic. */
class TasksStackItemMeaningName {

  /**
   * Create.
   * @param {Object} wrapper - Tasks stack item meaning wrapper.
   * @param {string} value - Task name value.
   */
  constructor(wrapper, value) {
    this._wrapper = wrapper;
    this._value = null;

    this._valueElement = document.createElement('div');
    $(this._valueElement).addClass('tasks-stack-cell-meaning-name');
    $(this._wrapper.element).append(this._valueElement);

    this.value = value;
  }

  /**
   * Task name value.
   * @return {string} Value.
   */
  get value() {
    return this._value;
  }

  /**
   * Set task name value.
   * @param {string} value - Value.
   */
  set value(value) {
    this._value = value;
    $(this._valueElement).text(value);
  }
}


/** Tasks stack item meaning description handle logic. */
class TasksStackItemMeaningDecsription {

  /**
   * Create.
   * @param {Object} wrapper - Tasks stack item meaning wrapper.
   * @param {string} value - Task description value.
   */
  constructor(wrapper, value) {
    this._wrapper = wrapper;
    this._value = null;

    this._valueElement = document.createElement('div');
    $(this._valueElement).addClass('tasks-stack-cell-meaning-description');
    $(this._valueElement).append('<div>i</div>');
    $(this._wrapper.element).append(this._valueElement);

    this.value = value;
  }

  /**
   * Task description value.
   * @return {string} Value.
   */
  get value() {
    return this._value;
  }

  /**
   * Set task description value.
   * @param {string} value - Value.
   */
  set value(value) {
    this._value = value;
    if (value && value != '') {
      $(this._valueElement).addClass('tasks-stack-cell-meaning-description-show');
      $(this._valueElement).attr('title', value);
    } else {
      $(this._valueElement).removeClass('tasks-stack-cell-meaning-description-show');
      $(this._valueElement).attr('title', '');
    }
  }
}


/** Tasks stack item meaning handle logic. */
class TasksStackItemMeaning {

  /**
   * Create.
   * @param {Object} item - Tasks stack item.
   * @param {string} name - Task name value.
   * @param {string} [decsription] - Task decsription value.
   */
  constructor(item, name, decsription) {
    this._item = item;

    let cellElement = document.createElement('div');
    $(cellElement).addClass('tasks-stack-cell tasks-stack-cell-meaning');
    $(this._item.element).append(cellElement);

    this.element = document.createElement('div');
    $(this.element).addClass('tasks-stack-cell-meaning-wrapper');
    $(cellElement).append(this.element);

    this._name = new TasksStackItemMeaningName(this, name);
    this._decsription = new TasksStackItemMeaningDecsription(this, decsription);
  }

  /**
   * Task name handler.
   * @return {Object} Handler.
   */
  get name() {
    return this._name;
  }

  /**
   * Task decsription handler.
   * @return {Object} Handler.
   */
  get decsription() {
    return this._decsription;
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
      'tasks-stack-item-status',
      `tasks-stack-item-status-${value.toLowerCase()}`,
    ].join(' '));
  }
}


/** Tasks stack item handle logic. */
class TasksStackItem {

  static FILTERED_DATA_NAMES = ['priority', 'status'];

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

    this.id = taskData.id;
    this._priority = new TasksStackItemPriority(this, taskData.priority);
    this._meaning = new TasksStackItemMeaning(this, taskData.name, taskData.description);
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
   * Task name handler.
   * @return {Object} Handler.
   */
  get name() {
    return this._meaning.name;
  }

  /**
   * Task decsription handler.
   * @return {Object} Handler.
   */
  get decsription() {
    return this._meaning.decsription;
  }

  /**
   * Task status handler.
   * @return {Object} Handler.
   */
  get status() {
    return this._status;
  }
}


/** Tasks stack handle logic. */
class TasksStack {

  /** Create. */
  constructor() {
    this._items = {};
    this._filter = {
      priority: Object.keys(CHOISES.task.priority).map(p => parseInt(p)),
      status: Object.keys(CHOISES.task.status),
    };

    $('#tasks-stack-items').on('addTask', (e) => {
      this._addTask(e.taskData);
      this._draw();
    });
    $('#tasks-stack-items').on('setStatusFilter', (e) => {
      this._setFilter('status', e.values);
    });

    $('#tasks-stack-filter-status').on('click', (e) => {
      $('#filter-status-dialog').trigger({
        type: 'filterStatusStart',
        activeValues: this._filter.status,
      });
    });

    this._getTasksData();
  }

  /**
   * Filtered and sorted stack items.
   * @yield {Object} Tacks stack item.
   */
  *[Symbol.iterator]() {
    let items = this._sortItems(this._filterItems(Object.values(this._items)));
    for (let item of items) {
      yield item;
    }
  }

  /**
   * Filter stack items.
   * @param {Array} items - Tasks stack items array.
   * @return {Array} Filtered stack items.
   */
  _filterItems(items) {
    for (let key of Object.keys(this._filter)) {
      items = items.filter(item => this._filter[key].includes(item[key].value));
    }
    return items;
  }

  /**
   * Sort stack items.
   * @param {Array} items - Tasks stack items array.
   * @return {Array} Sorted stack items.
   */
  _sortItems(items) {
    return items.sort((a, b) => {
      if (a.priority.value > b.priority.value) return -1;
      if (a.priority.value < b.priority.value) return 1;
      return 0;
    });
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

  /** Draw tasks stack items. */
  _draw() {
    $('#tasks-stack-items').empty();
    for (let item of this) {
      $('#tasks-stack-items').append(item.element);
    }
  }

  /** Get tasks data. */
  _getTasksData() {
    $.ajax({
      url: '/api/1.0/user_tasks/',
    })
    .done((data) => {
      for (let taskData of data) {
        this._addTask(taskData);
      }
      this._draw();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('jqXHR', jqXHR);
    });
  }

  /**
   * Set filter values by specific stack item data name.
   * @param {string} name - Stack item data name.
   * @param {Array} values - Possible stack item data values.
   */
  _setFilter(name, value) {
    if (!TasksStackItem.FILTERED_DATA_NAMES.includes(name)) {
      throw Error(`Wrong stack item data name "${name}".`);
    }
    if (!Array.isArray(value)) {
      throw Error('Values argument has to be an array.');
    }
    this._filter[name] = value;
    this._draw();
  }
}
