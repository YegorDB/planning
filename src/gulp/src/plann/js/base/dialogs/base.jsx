const classNames = require('classnames');
const React = require('react');


/** Base dialog logic. */
class BaseDialogComponent extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = { opened: false };

    this._handleOpen = this._handleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    return [];
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
      <div className={ classes }
           onClick={ this._handleClose } >
        <div className="dialog-window-content"
             onClick={(e) => { e.stopPropagation(); }} >
          { this.items }
        </div>
      </div>
    );
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
    this._openAdditionalFunction(event);
  }

  /**
   * Close handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClose(event) {
    this.setState({ opened: false });
    this._closeAdditionalFunction(event);
  }

  /**
   * Open additional.
   * @private
   * @param {Event} event - DOM event.
   */
  _openAdditionalFunction(event) {}

  /**
   * Close additional.
   * @private
   * @param {Event} event - DOM event.
   */
  _closeAdditionalFunction(event) {}
}


module.exports = {
  BaseDialogComponent: BaseDialogComponent,
};
