/** Base dialog logic. */
class BaseDialogComponent extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = { opened: false };
  }

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    return [];
  }

  /**
   * Open function.
   * @returns {function}
   */
  get openFunction() {
    return (e) => {
      this.setState({ opened: true });
      (this.openAdditionalFunction)(e)
    }
  }

  /**
   * Open additional function.
   * @returns {function}
   */
  get openAdditionalFunction() {
    return (e) => {};
  }

  /**
   * Close function.
   * @returns {function}
   */
  get closeFunction() {
    return (e) => {
      this.setState({ opened: false });
      (this.closeAdditionalFunction)(e)
    }
  }

  /**
   * Close additional function.
   * @returns {function}
   */
  get closeAdditionalFunction() {
    return (e) => {};
  }

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    let classes = [
      'dialog-window',
      (this.state.opened ? 'dialog-window-open' : ''),
    ].join(' ').trim();

    return (
      <div className={classes} onClick={this.closeFunction} >
        <div className="dialog-window-content" >
          {this.items}
        </div>
      </div>
    );
  }
}


/** Tasks status changing dialog window logic. */
class TasksStatusChangingDialogComponent extends BaseDialogComponent {

  /** Creation. */
  constructor(props) {
    super(props);
    this._taskItem = null;

    $('#change-status-dialog').on('changeStatusStart', this.openFunction);
  }

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    return Object.entries(CHOISES.task.status).map((data) => {
      let [value, name] = data;
      let classes = [
        'tasks-stack-change-status-dialog-item',
        'tasks-stack-item-status',
        `tasks-stack-item-status-${value.toLowerCase()}`,
      ].join(' ');
      let onClick = (e) => {
        e.stopPropagation();
        this._changeValue(value);
      };
      return <div className={classes} onClick={onClick} key={value} >{name}</div>;
    });
  }

  /**
   * Open additional function.
   * @returns {function}
   */
  get openAdditionalFunction() {
    return (e) => {
      this._taskItem = e.taskItem;
    };
  }

  /**
   * Close additional function.
   * @returns {function}
   */
  get closeAdditionalFunction() {
    return (e) => {
      this._taskItem = null;
    };
  }

  /**
   * Change status value.
   * @param {string} value - New status value.
   */
  _changeValue(value) {
    if (!this._taskItem) return;

    WAIT_SCREEN.enable();
    $.ajax({
      url: URLS.update_task.replace(/\d+\/$/, `${this._taskItem.id}/`),
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

    this.setState({ opened: false });
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
      'tasks-stack-filter-status-dialog-item',
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
      'tasks-stack-filter-priority-dialog-item',
      `tasks-stack-item-priority-${value}`,
    ].join(' ');
  }
}


module.exports = {
  TasksStatusChangingDialogComponent: TasksStatusChangingDialogComponent,
  TasksStatusFilterDialog: TasksStatusFilterDialog,
  TasksPriorityFilterDialog: TasksPriorityFilterDialog,
};
