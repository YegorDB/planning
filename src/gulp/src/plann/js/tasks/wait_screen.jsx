const classNames = require('classnames');
const React = require('react');


/** Wait screen. */
class WaitScreen extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    let classes = classNames({
      'wait-screen-enabled': this.props.enabled,
    });
    return <div id="wait-screen" className={ classes } ></div>;
  }
}


module.exports = {
  WaitScreen: WaitScreen,
};
