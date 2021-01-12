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


/** Tasks status filter dialog window logic. */
class TasksStatusFilterDialog {

  /** Create. */
  constructor() {
    this._activeValues = [];
    for (let [value, name] of Object.entries(CHOISES.task.status)) {
      let wrapper = document.createElement('div');
      $('#filter-status-dialog > .dialog-window-content').append(wrapper);

      let input = document.createElement('input');
      $(input).attr('type', 'checkbox');
      $(input).attr('value', value);
      $(input).on('change', (e) => {
        if (!$(input).prop('checked')) {
          this._activeValues = this._activeValues.filter(v => v != value);
        } else if (!this._activeValues.includes(value)) {
          this._activeValues.push(value);
        }
        $('#tasks-stack-items').trigger({
          type: 'setStatusFilter',
          values: this._activeValues,
        })
      });
      $('#filter-status-dialog').on('filterStatusStart', (e) => {
        $(input).prop('checked', e.activeValues.includes(value));
      });
      $(wrapper).append(input);

      let status = document.createElement('div');
      $(status).addClass([
        'filter-status-dialog-item',
        'tasks-stack-item-status',
        `tasks-stack-item-status-${value.toLowerCase()}`,
      ].join(' '));
      $(status).text(name);
      $(status).on('click', (e) => {
        $(input).click();
      });
      $(wrapper).append(status);
    }

    $('#filter-status-dialog').on('filterStatusStart', (e) => {
      $('#filter-status-dialog').addClass('dialog-window-open');
      this._activeValues = e.activeValues;
    });
  }
}
