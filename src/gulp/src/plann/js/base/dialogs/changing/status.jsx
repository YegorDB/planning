const classNames = require('classnames');
const $ = require('jquery-browserify');
const React = require('react');
const { ChangingDialogItem } = require('./base.jsx');
const { BaseDialog, DialogWrapper } = require('../base.jsx');


/** Task status changing dialog item. */
class StatusChangingDialogItem extends ChangingDialogItem {

  /**
   * Creation.
   * @param {string} props.id - Task status value.
   * @param {string} props.value - Task status value.
   * @param {string} props.name - Task status name.
   */
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Render item.
   * @returns {React.Element}
   */
  render() {
    let classes = classNames(
      'task-status-dialog-item',
      `task-status-${ this.props.value.toLowerCase() }`,
    );

    return (
      <div
        className={ classes }
        onClick={ this._handleClick } >
        { this.props.name }
      </div>
    );
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClick(event) {
    this._changeTask({
      'status': this.props.value,
    });
  }
}


/** Task status changing dialog window logic. */
class StatusChangingDialog extends BaseDialog {

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    return (
      <DialogWrapper opened={ this.state.opened } >
        {
          Object.entries(CHOISES.task.status)
          .map(([value, name]) =>
            <StatusChangingDialogItem
              id={ this.props.id }
              value={ value }
              name={ name }
              key={ value } />
          )
        }
      </DialogWrapper >
    );
  }

  /** Component did mount logic. */
  componentDidMount() {
    super.componentDidMount();
    $(document).on('changeStatusStart', this._handleOpen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    super.componentWillUnmount();
    $(document).off('changeStatusStart', this._handleOpen);
  }
}


module.exports = {
  StatusChangingDialog: StatusChangingDialog,
};
