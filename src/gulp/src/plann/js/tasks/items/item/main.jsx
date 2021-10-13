const React = require('react');
const { ItemMeaning } = require('./meaning.jsx');
const { ItemPriority } = require('./priority.jsx');
const { ItemStatus } = require('./status.jsx');


/** Tasks item. */
class Item extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <a className="task-item"
         href={ `/task/${this.props.taskData.id}/` } >
        <ItemPriority value={ this.props.taskData.priority } />
        <ItemMeaning name={ this.props.taskData.name } />
        <ItemStatus value={ this.props.taskData.status } />
      </a>
    );
  }
}


module.exports = {
  Item: Item,
};
