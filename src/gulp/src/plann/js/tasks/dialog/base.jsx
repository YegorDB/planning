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


module.exports = {
  BaseDialogComponent: BaseDialogComponent,
};
