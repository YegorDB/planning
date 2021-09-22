const React = require('react');

const { TaskName } = require('./name.jsx');


/** Tasks page app. */
class App extends React.Component {

  /**
   * Render app.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <TaskName value={ TASK_DATA.name } />
      </div>
    );
  }
}


module.exports = {
  App: App,
};
