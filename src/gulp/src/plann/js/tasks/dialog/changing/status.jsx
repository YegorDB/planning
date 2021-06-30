const classNames = require('classnames');
const { BaseDialogComponent } = require('../base.jsx');


/** Task status changing dialog window logic. */
class StatusChangingDialog extends BaseDialogComponent {

  /** Creation. */
  constructor(props) {
    super(props);
    this._initialState = {
      taskId: null,
    };

    this.state = {
      ...this.state,
      ...this._initialState,
    };
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
      this.setState({
        taskId: e.id,
      });
    };
  }

  /**
   * Close additional function.
   * @returns {function}
   */
  get closeAdditionalFunction() {
    return (e) => {
      this.setState(this._initialState);
    };
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('changeStatusStart', this.openFunction);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('changeStatusStart', this.openFunction);
  }

  /**
   * Change status value.
   * @param {string} value - New status value.
   */
  _changeValue(value) {
    if (!this.state.taskId) return;

    WAIT_SCREEN.enable();
    $.ajax({
      url: URLS.update_task.replace(/\d+\/$/, `${this.state.taskId}/`),
      data: JSON.stringify({
        'status': value,
      }),
      type: 'PATCH',
      contentType: 'application/json',
    })
    .done((taskData) => {
      $(document).trigger({
        type: 'changeTask',
        id: this.state.taskId,
        name: 'status',
        value: value,
      });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log('jqXHR', jqXHR);
    })
    .always(() => {
      this.setState({
        opened: false,
        ...this._initialState,
      });
      WAIT_SCREEN.disable();
    });
  }
}


module.exports = {
  StatusChangingDialog: StatusChangingDialog,
};
