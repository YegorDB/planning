const React = require('react');


const { TaskDatetimes } = require('./datetimes.jsx');
const { TaskMeaning } = require('./meaning.jsx');
const { TaskPriority } = require('./priority.jsx');
const { TaskStatus } = require('./status.jsx');
const { Tags } = require('./tags.jsx');


/** Tasks page app. */
class App extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      ...TASK_DATA,
    };
  }

  /**
   * Render app.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <TaskMeaning name={ this.state.name }
                     description={ this.state.description } />
        <div className="task-content" >
          <TaskDatetimes creation={ this.state.creation_datetime } />
          <TaskPriority value={ this.state.priority } />
          <TaskStatus value={ this.state.status } />
          <Tags values={ this.state.tags } />
        </div>
      </div>
    );
  }
}


module.exports = {
  App: App,
};
