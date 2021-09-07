const React = require('react');


/** Tasks item. */
class Item extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-item" >
        { this.props.taskData.name }
      </div>
    );
  }
}


module.exports = {
  Item: Item,
};
