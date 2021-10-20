const classNames = require('classnames');
const React = require('react');


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
      <div className="task-content-item-line" >
        <div>
          <h2>{ 'Priority' }</h2>
        </div>
        <TaskPriorityBadge
          name={ CHOISES.task.priority[this.props.value] }
          value={ this.props.value } />
      </div>
    );
  }
}


module.exports = {
  TaskPriority: TaskPriority,
};
