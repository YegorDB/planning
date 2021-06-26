const classNames = require('classnames');


/** Tasks stack item priority. */
class Priority extends React.Component {

  /**
   * Render stack item priority.
   * @returns {React.Element}
   */
  render() {
    let classes = classNames(
      'tasks-stack-cell',
      'tasks-stack-cell-priority',
    );
    let valueClasses = classNames(
      'tasks-stack-item-priority',
      `tasks-stack-item-priority-${this.props.value}`,
    );

    return (
      <div className={classes} >
        <div className="tasks-stack-cell-data" >
          <div className={valueClasses}
               title={ CHOISES.task.priority[this.props.value] } >
            {this.items}
          </div>
        </div>
      </div>
    );
  }
}


module.exports = {
  Priority: Priority,
};
