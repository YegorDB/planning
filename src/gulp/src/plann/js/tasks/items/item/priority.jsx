const React = require('react');


/** Tasks item priority value. */
class ItemPriorityValue extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-item-priority-value" >
        <div className={ `task-item-priority-value-${this.props.value}` } ></div>
      </div>
    );
  }
}


/** Tasks item priority. */
class ItemPriority extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    let values = [];
    for (let i = 0; i < this.props.value + 1; i++) {
      values.push(<ItemPriorityValue value={ this.props.value } key={ i } />);
    }

    return (
      <div className="task-item-priority">
        <div className="task-item-priority-values"
             title={ CHOISES.task.priority[this.props.value] } >
          { values }
        </div>
      </div>
    );
  }
}


module.exports = {
  ItemPriority: ItemPriority,
};
