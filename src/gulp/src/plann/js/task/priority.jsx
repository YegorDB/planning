const classNames = require('classnames');
const React = require('react');

const { TaskContentLine } = require('./content.jsx');


/** Task priority badge. */
class TaskPriorityBadge extends React.Component {

  /**
   * Creation.
   * @param {string} props.value - Task status value.
   * @param {string} props.name - Task status name.
   */
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    let className = classNames(
      'interactive',
      'task-badge',
      `task-badge-priority-${this.props.value}`,
    );

    return (
      <div className={ className } onClick={ this._handleClick } >
        { this.props.name }
      </div>
    );
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClick(event) {
    $(document).trigger('changePriorityStart');
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
      <TaskContentLine title="Priority" >
        <TaskPriorityBadge
          name={ CHOISES.task.priority[this.props.value] }
          value={ this.props.value } />
      </TaskContentLine>
    );
  }
}


module.exports = {
  TaskPriority: TaskPriority,
};
