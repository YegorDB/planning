const React = require('react');


/** Logo. */
class Logo extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div id="header-logo" >
        <a href="/tasks" >
          The Tasks
        </a>
      </div>
    );
  }
}


module.exports = {
  Logo: Logo,
};
