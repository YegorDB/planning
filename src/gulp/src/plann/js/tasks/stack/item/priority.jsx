const classNames = require('classnames');


/** Tasks stack item priority. */
class Priority extends React.Component {

  /**
   * Creation.
   * @param {integer} props.value - Task priority value.
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  /**
   * Task priority value.
   * @return {integer} Value.
   */
  get value() {
    return this.state.value;
  }

  /**
   * Set task priority value.
   * @param {integer} value - Value.
   */
  set value(value) {
    if (!Object.keys(CHOISES.task.priority).includes(value.toString())) {
      throw Error(`Wrong task priority value "${value}".`);
    }

    this.setState({
      value: value,
    });
  }

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
      `tasks-stack-item-priority-${this.state.value}`,
    );

    return (
      <div className={classes} >
        <div className={valueClasses}
             title={ CHOISES.task.priority[this.state.value] } >
          {this.items}
        </div>
      </div>
    );
  }
}


module.exports = {
  Priority: Priority,
};
