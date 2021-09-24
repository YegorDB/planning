const classNames = require('classnames');
const React = require('react');


/** Task priority badge. */
class TaskPriorityBadge extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    let className = classNames(
      'task-badge',
      `task-badge-priority-${this.props.value}`,
    );

    return (
      <div className={ className } >
        { this.props.name }
      </div>
    );
  }
}


/** Task priority. */
class TaskPriority extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <h2>{ 'Priority' }</h2>
        <TaskPriorityBadge name={ CHOISES.task.priority[this.props.value] }
                           value={ this.props.value } />
      </div>
    );
  }
}


module.exports = {
  TaskPriority: TaskPriority,
};
