const { Priority } = require('./priority.jsx');
const { Meaning } = require('./meaning.jsx');
const { Status } = require('./status.jsx');


/** Tasks stack item. */
class Item extends React.Component {

  /**
   * Render stack item.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="tasks-stack-row" >
        <Priority value={ this.props.taskData.priority } />
        <Meaning name={ this.props.taskData.name }
                 description={ this.props.taskData.description } />
        <Status value={ this.props.taskData.status }
                id={ this.props.taskData.id } />
      </div>
    );
  }
}


module.exports = {
  Item: Item,
};
