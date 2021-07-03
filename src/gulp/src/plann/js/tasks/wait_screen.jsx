const classNames = require('classnames');
const React = require('react');


/** Wait screen. */
class WaitScreen extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
    };
  }

  enable() {
    this.setState({ enabled: true });
  }

  disable() {
    this.setState({ enabled: false });
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    let classes = classNames({
      'wait-screen-enabled': this.state.enabled,
    });
    return <div className={ classes } ></div>;
  }
}


module.exports = {
  WaitScreen: WaitScreen,
};
