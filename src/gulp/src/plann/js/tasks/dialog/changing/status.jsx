const classNames = require('classnames');
const { BaseDialogComponent } = require('../base.jsx');


/** Task status changing dialog window logic. */
class StatusChangingDialog extends BaseDialogComponent {

  /** Creation. */
  constructor(props) {
    super(props);
    this._taskId = null;

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
      this._taskId = e.id;
    };
  }

  /**
   * Close additional function.
   * @returns {function}
   */
  get closeAdditionalFunction() {
    return (e) => {
      this._taskId = null;
    };
  }

  /**
   * Change status value.
   * @param {string} value - New status value.
   */
  _changeValue(value) {
    if (!this._taskId) return;

    WAIT_SCREEN.enable();
    $.ajax({
      url: URLS.update_task.replace(/\d+\/$/, `${this._taskId}/`),
      data: JSON.stringify({
        'status': value,
      }),
      type: 'PATCH',
      contentType: 'application/json',
    })
    .done((taskData) => {
      $(document).trigger({
        type: 'changeTask',
        id: this._taskId,
        name: 'status',
        value: taskData.status,
      });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log('jqXHR', jqXHR);
    })
    .always(() => {
      this._taskId = null;
      WAIT_SCREEN.disable();
    });

    this.setState({ opened: false });
  }
}


module.exports = {
  StatusChangingDialog: StatusChangingDialog,
};
