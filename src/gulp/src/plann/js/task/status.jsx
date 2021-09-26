const classNames = require('classnames');
const React = require('react');


/** Task status badge. */
class TaskStatusBadge extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    let className = classNames(
      'task-badge',
      `task-badge-status-${this.props.value.toLowerCase()}`,
    );

    return (
      <div className={ className } >
        { this.props.name }
      </div>
    );
  }
}


/** Task status. */
class TaskStatus extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <h2>{ 'Status' }</h2>
        <TaskStatusBadge name={ CHOISES.task.status[this.props.value] }
                         value={ this.props.value } />
      </div>
    );
  }
}


module.exports = {
  TaskStatus: TaskStatus,
};
