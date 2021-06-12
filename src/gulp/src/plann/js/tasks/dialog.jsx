const classNames = require('classnames');


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
    let classes = classNames('dialog-window', {
      'dialog-window-open': this.state.opened,
    });

    return (
      <div className={classes}
           onClick={this.closeFunction} >
        <div className="dialog-window-content"
             onClick={(e) => { e.stopPropagation(); }} >
          {this.items}
        </div>
      </div>
    );
  }
}


/** Task status changing dialog window logic. */
class TaskStatusChangingDialogComponent extends BaseDialogComponent {

  /** Creation. */
  constructor(props) {
    super(props);
    this._taskItem = null;

    $(document).on('changeStatusStart', this.openFunction);
  }

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    return Object.entries(CHOISES.task.status).map(([value, name]) => {
      let classes = classNames(
        'tasks-stack-change-status-dialog-item',
        'tasks-stack-item-status',
        `tasks-stack-item-status-${value.toLowerCase()}`,
      );
      let onClick = (e) => {
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


/** Task status changing dialog window logic. */
class BaseTaskFilterDialogComponent extends BaseDialogComponent {

  static FILTER_NAME = null;
  static FILTER_EVENT_NAME = null;

  /**
   * Creation.
   * @param {Object} props.choices - Data choices (value - name pairs).
   */
  constructor(props) {
    super(props);
    this._entries = this._getEntries(props.choices);
    this.state = {
      ...this.state,
      activeValues: Object.keys(props.choices),
    };

    $(document).on(this.constructor.FILTER_EVENT_NAME, this.openFunction);
  }

  /**
   * Open additional function.
   * @returns {function}
   */
  get openAdditionalFunction() {
    return (e) => {
      this.setState({
        activeValues: e.activeValues,
      });
    };
  }

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    return this._entries.map(([value, name]) => {
      let inputId = `filter-checkbox-${this.constructor.FILTER_NAME}-${value.toString().toLowerCase()}`;

      return (
        <div key={value}>
          <input type="checkbox"
                 id={inputId}
                 value={value}
                 onChange={this._getItemChangeHandler(inputId, value)}
                 checked={this.state.activeValues.includes(value)}
                 className="styled-checkbox" />
          <label htmlFor={inputId} />
          <div className={this._getItemClasses(value)}
               onClick={this._getItemClickHandler(inputId)} >
            {name}
          </div>
        </div>
      );
    });
  }

  /**
   * Get entries.
   * @private
   * @param {Object} choices - Value - name pairs;
   * @return {Object[][]} Array of value - name pairs;
   */
  _getEntries(choices) {
    return Object.entries(choices);
  }

  /**
   * Get item classes.
   * @private
   * @abstract
   * @param {string} value - Choice value;
   * @return {string} Classes names;
   */
  _getItemClasses(value) {}

  /**
   * Get item click handler.
   * @private
   * @param {string} inputId - Item input id;
   * @return {function} Click handler;
   */
  _getItemClickHandler(inputId) {
    return (e) => {
      $(`#${inputId} + label`).click();
    };
  }

  /**
   * Get item change handler.
   * @private
   * @param {string} inputId - Item input id;
   * @param {string} value - Choice value;
   * @return {function} Change handler;
   */
  _getItemChangeHandler(inputId, value) {
    return (e) => {
      if (!e.target.checked) {
        this.setState((state, props) => {
          let activeValues = state.activeValues.filter(v => v != value);
          this._trigerSetFilterEvent(activeValues);
          return {activeValues: activeValues};
        });
      } else if (!this.state.activeValues.includes(value)) {
        this.setState((state, props) => {
          let activeValues = [...state.activeValues, value];
          this._trigerSetFilterEvent(activeValues);
          return {activeValues: activeValues};
        });
      }
    };
  }

  /**
   * Trigger set filter event.
   * @private
   * @param {Object[]} activeValues - Active values;
   */
  _trigerSetFilterEvent(activeValues) {
    $('#tasks-stack-items').trigger({
      type: 'setFilter',
      name: this.constructor.FILTER_NAME,
      values: activeValues,
    });
  }
}


/** Task status filter dialog window logic. */
class TaskStatusFilterDialogComponent extends BaseTaskFilterDialogComponent {

  static FILTER_NAME = 'status';
  static FILTER_EVENT_NAME = 'filterStatusStart';

  /**
   * Get item classes.
   * @private
   * @param {Object} value - Choice value;
   * @return {string} Classes names;
   */
  _getItemClasses(value) {
    return classNames(
      'tasks-stack-filter-status-dialog-item',
      'tasks-stack-item-status',
      `tasks-stack-item-status-${value.toLowerCase()}`,
    );
  }
}


/** Task priority filter dialog window logic. */
class TaskPriorityFilterDialogComponent extends BaseTaskFilterDialogComponent {

  static FILTER_NAME = 'priority';
  static FILTER_EVENT_NAME = 'filterPriorityStart';

  /**
   * Get entries.
   * @private
   * @param {Object} choices - Value - name pairs;
   * @return {Object[][]} Array of value - name pairs;
   */
  _getEntries(choices) {
    return Object.entries(choices).reverse().map(([v, n]) => [parseInt(v), n]);
  }

  /**
   * Get item classes.
   * @private
   * @param {Object} value - Choice value;
   * @return {string} Classes names;
   */
  _getItemClasses(value) {
    return classNames(
      'tasks-stack-filter-priority-dialog-item',
      `tasks-stack-item-priority-${value}`,
    );
  }
}


module.exports = {
  TaskStatusChangingDialogComponent: TaskStatusChangingDialogComponent,
  TaskStatusFilterDialogComponent: TaskStatusFilterDialogComponent,
  TaskPriorityFilterDialogComponent: TaskPriorityFilterDialogComponent,
};
