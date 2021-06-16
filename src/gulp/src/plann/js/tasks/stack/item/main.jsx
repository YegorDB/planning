const { Priority } = require('./priority.jsx');
const { Meaning } = require('./meaning.jsx');
const { Status } = require('./status.jsx');


/** Tasks stack item. */
class Item extends React.Component {

  /**
   * Creation.
   * @param {Object} props.taskData - Task data.
   * @param {integer} props.taskData.id - Task id.
   * @param {integer} props.taskData.priority - Task priority.
   * @param {string} props.taskData.name - Task name.
   * @param {string} props.taskData.status - Task status.
   * @param {string} [props.taskData.description] - Task description.
   */
  constructor(props) {
    super(props);
    this.id = props.taskData.id;
    this.state = {
      priority: props.taskData.priority,
      name: props.taskData.name,
      description: props.taskData.description,
      status: props.taskData.status,
    };
  }

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="tasks-stack-row" >
        <Priority value={ this.state.priority } />
        <Meaning name={ this.state.name }
                 description={ this.state.description } />
        <Status value={ this.state.status }
                taskItem={ this } />
      </div>
    );
  }
}


module.exports = {
  Item: Item,
};
