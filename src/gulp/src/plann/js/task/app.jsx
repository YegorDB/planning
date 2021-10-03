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


    this._handleChangePriority = this._handleChangePriority.bind(this);
    this._handleChangeStatus = this._handleChangeStatus.bind(this);
    this._handleChangeTags = this._handleChangeTags.bind(this);
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
        <TaskDialogs id={ this.state.id } tags={ this.state.tags } />
        <WaitScreen />
      </div>
    );
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('changePriority', this._handleChangePriority);
    $(document).on('changeStatus', this._handleChangeStatus);
    $(document).on('changeTags', this._handleChangeTags);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('changePriority', this._handleChangePriority);
    $(document).off('changeStatus', this._handleChangeStatus);
    $(document).off('changeTags', this._handleChangeTags);
  }

  /**
   * Change priority handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleChangePriority(event) {
    this.setState({
      priority: event.value,
    });
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

  /**
   * Change tags handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleChangeTags(event) {
    this.setState({
      tags: event.values,
    });
  }
}


module.exports = {
  App: App,
};
