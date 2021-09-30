const classNames = require('classnames');
const React = require('react');


/** Wait screen. */
class WaitScreen extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      enable: false,
    };

    this._handleEnable = this._handleEnable.bind(this);
    this._handleDisable = this._handleDisable.bind(this);
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    let classes = classNames({
      'wait-screen-enabled': this.state.enable,
    });
    return <div id="wait-screen" className={ classes } ></div>;
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('enableWaitScreen', this._handleEnable);
    $(document).on('disableWaitScreen', this._handleDisable);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('enableWaitScreen', this._handleEnable);
    $(document).off('disableWaitScreen', this._handleDisable);
  }

  /**
   * Enable handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleEnable(event) {
    this.setState({
      enable: true,
    });
  }

  /**
   * Disable handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleDisable(event) {
    this.setState({
      enable: false,
    });
  }
}


module.exports = {
  WaitScreen: WaitScreen,
};
