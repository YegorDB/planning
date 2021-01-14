/** Tasks status changing dialog window logic. */
class TasksStatusChangingDialog {

  /** Create. */
  constructor() {
    this._taskItem = null;
    for (let [value, name] of Object.entries(CHOISES.task.status)) {
      let status = document.createElement('div');
      $(status).addClass([
        'change-status-dialog-item',
        'tasks-stack-item-status',
        `tasks-stack-item-status-${value.toLowerCase()}`,
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

    WAIT_SCREEN.enable();
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
      WAIT_SCREEN.disable();
    });

    $('#change-status-dialog').removeClass('dialog-window-open');
  }
}


/** Base tasks filter dialog window logic. */
class BaseTasksFilterDialog {

  /**
   * Create.
   * @param {Object} options - Options.
   * @param {Array} options.entries - Data choices ([value, name]).
   * @param {string} options.dialogWindowId - Dom dialog window id.
   * @param {string} options.filterName - Filter name.
   * @param {string} options.filterEventName - Filter event name.
   * @param {string} options.itemsClasses - Choices items classes.
   */
  constructor(options) {
    this._activeValues = [];

    for (let [value, name] of options.entries) {
      let wrapper = document.createElement('div');
      $(`${options.dialogWindowId} > .dialog-window-content`).append(wrapper);

      let inputId = `filter-checkbox-${options.filterName}-${value}`.toLowerCase();
      let input = document.createElement('input');
      $(input).attr('type', 'checkbox');
      $(input).attr('id', inputId);
      $(input).attr('value', value);
      $(input).addClass('styled-checkbox');
      $(input).on('change', (e) => {
        if (!$(input).prop('checked')) {
          this._activeValues = this._activeValues.filter(v => v != value);
        } else if (!this._activeValues.includes(value)) {
          this._activeValues.push(value);
        }
        $('#tasks-stack-items').trigger({
          type: 'setFilter',
          name: options.filterName,
          values: this._activeValues,
        })
      });
      $(options.dialogWindowId).on(options.filterEventName, (e) => {
        $(input).prop('checked', e.activeValues.includes(value));
      });
      $(wrapper).append(input);

      let label = document.createElement('label');
      $(label).attr('for', inputId);
      $(wrapper).append(label);

      let item = document.createElement('div');
      $(item).addClass(this._getItemClasses(value));
      $(item).text(name);
      $(item).on('click', (e) => {
        $(input).click();
      });
      $(wrapper).append(item);
    }

    $(options.dialogWindowId).on(options.filterEventName, (e) => {
      $(options.dialogWindowId).addClass('dialog-window-open');
      this._activeValues = e.activeValues;
    });
  }

  /**
   * Get item classes.
   * @abstract
   * @param {Object} value - Choice value;
   * @return {string[]} Classes names;
   */
  _getItemClasses(value) {}
}


/** Tasks status filter dialog window logic. */
class TasksStatusFilterDialog extends BaseTasksFilterDialog {

  /** Create. */
  constructor() {
    super({
      entries: Object.entries(CHOISES.task.status),
      dialogWindowId: '#filter-status-dialog',
      filterName: 'status',
      filterEventName: 'filterStatusStart',
    });
  }

  /**
   * Get item classes.
   * @param {Object} value - Choice value;
   * @return {string[]} Classes names;
   */
  _getItemClasses(value) {
    return [
      'filter-status-dialog-item',
      'tasks-stack-item-status',
      `tasks-stack-item-status-${value.toLowerCase()}`,
    ].join(' ');
  }
}


/** Tasks priority filter dialog window logic. */
class TasksPriorityFilterDialog extends BaseTasksFilterDialog {

  /** Create. */
  constructor() {
    super({
      entries: Object.entries(CHOISES.task.priority).reverse().map(([v, n]) => [parseInt(v), n]),
      dialogWindowId: '#filter-priority-dialog',
      filterName: 'priority',
      filterEventName: 'filterPriorityStart',
    });
  }

  /**
   * Get item classes.
   * @param {Object} value - Choice value;
   * @return {string[]} Classes names;
   */
  _getItemClasses(value) {
    return [
      'filter-priority-dialog-item',
      `tasks-stack-item-priority-${value}`,
    ].join(' ');
  }
}
