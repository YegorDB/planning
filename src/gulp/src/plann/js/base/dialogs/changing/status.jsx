const classNames = require('classnames');
const $ = require('jquery-browserify');
const React = require('react');
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

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('changeStatusStart', this._handleOpen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('changeStatusStart', this._handleOpen);
  }

  /**
   * Change status value.
   * @param {string} value - New status value.
   */
  _changeValue(value) {
    if (!this.state.taskId) return;

    $(document).trigger('enableWaitScreen');
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
      $(document).trigger('disableWaitScreen');
    });
  }

  /**
   * Open additional.
   * @private
   * @param {Event} event - DOM event.
   */
  _openAdditionalFunction(event) {
    this.setState({
      taskId: event.id,
    });
  }

  /**
   * Close additional.
   * @private
   * @param {Event} event - DOM event.
   */
  _closeAdditionalFunction(event) {
    this.setState(this._initialState);
  }
}


module.exports = {
  StatusChangingDialog: StatusChangingDialog,
};
