const React = require('react');


const { TaskDatetimes } = require('./datetimes.jsx');
const { TaskDialogs } = require('./dialogs.jsx');
const { TaskMeaning } = require('./meaning.jsx');
const { TaskPriority } = require('./priority.jsx');
const { TaskStatus } = require('./status.jsx');
const { TaskTags } = require('./tags.jsx');
const { WaitScreen } = require('../../../base/js/base/wait_screen.jsx');


/** Tasks page app. */
class App extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      ...TASK_DATA,
    };

    this._handleChangeStatus = this._handleChangeStatus.bind(this);
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
          <TaskTags values={ this.state.tags } />
        </div>
        <TaskDialogs id={ this.state.id } />
        <WaitScreen />
      </div>
    );
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('changeStatus', this._handleChangeStatus);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('changeStatus', this._handleChangeStatus);
  }

  /**
   * Change status handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleChangeStatus(event) {
    this.setState({
      status: event.value,
    });
  }
}


module.exports = {
  App: App,
};
