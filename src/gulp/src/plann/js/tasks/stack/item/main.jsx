const { Priority } = require('./priority.jsx');
// const { Meaning } = require('./meaning.jsx');
// const { Status } = require('./status.jsx');


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
    this._data = props.taskData;
  }

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="tasks-stack-row" >
        <Priority value={ this._data.priority } />
        // <Meaning name={ this._data.name }
        //          description={ this._data.description } />
        // <Status value={ this._data.status } />
      </div>
    );
  }
}


module.exports = {
  Item: Item,
};
