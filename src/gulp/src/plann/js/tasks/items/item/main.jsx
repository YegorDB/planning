const React = require('react');
const { ItemMeaning } = require('./meaning.jsx');
const { ItemPriority } = require('./priority.jsx');


/** Tasks item. */
class Item extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-item" >
        <ItemPriority value={ this.props.taskData.priority } />
        <ItemMeaning name={ this.props.taskData.name } />
      </div>
    );
  }
}


module.exports = {
  Item: Item,
};
