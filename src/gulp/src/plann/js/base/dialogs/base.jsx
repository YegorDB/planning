const classNames = require('classnames');
const React = require('react');


/** Base dialog logic. */
class BaseDialog extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = { opened: false };

    this._handleOpen = this._handleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('closeDialogWindow', this._handleClose);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('closeDialogWindow', this._handleClose);
  }

  /**
   * Open handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleOpen(event) {
    this.setState({ opened: true });
  }

  /**
   * Close handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClose(event) {
    this.setState({ opened: false });
  }
}


/** Dialog wrapper logic. */
class DialogWrapper extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    let className = classNames('dialog-window', {
      'dialog-window-open': this.props.opened,
    });

    return (
      <div className={ className }
           onClick={ this._handleClick } >
        <div className="dialog-window-content"
             onClick={(e) => { e.stopPropagation(); }} >
          { this.props.children }
        </div>
      </div>
    );
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClick(event) {
    $(document).trigger('closeDialogWindow');
  }
}


module.exports = {
  BaseDialog: BaseDialog,
  DialogWrapper: DialogWrapper,
};
