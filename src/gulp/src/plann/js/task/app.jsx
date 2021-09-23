const React = require('react');


const { TaskDatetimes } = require('./datetimes.jsx');
const { TaskMeaning } = require('./meaning.jsx');


/** Tasks page app. */
class App extends React.Component {

  /**
   * Render app.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <TaskMeaning name={ TASK_DATA.name }
                     description={ TASK_DATA.description } />
        <TaskDatetimes creation={ TASK_DATA.creation_datetime } />
      </div>
    );
  }
}


module.exports = {
  App: App,
};
