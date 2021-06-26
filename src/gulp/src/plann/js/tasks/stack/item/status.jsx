const classNames = require('classnames');


/** Tasks stack item status. */
class Status extends React.Component {

  /**
   * Creation.
   * @param {number} props.id - Task item id.
   * @param {string} props.value - Task status value.
   */
  constructor(props) {
    super(props);
    this._id = props.id;
  }

  /**
   * Render stack item status.
   * @returns {React.Element}
   */
  render() {
    let valueClasses = classNames(
      'tasks-stack-item-status',
      `tasks-stack-item-status-${this.props.value.toLowerCase()}`,
    );
    let valueOnClick = (e) => {
      $(document).trigger({
        type: 'changeStatusStart',
        id: this._id,
      });
    };

    return (
      <div className="tasks-stack-cell tasks-stack-cell-status" >
        <div className="tasks-stack-cell-data" >
          <div className={valueClasses}
               onClick={valueOnClick} >
            { CHOISES.task.status[this.props.value] }
          </div>
        </div>
      </div>
    );
  }
}


module.exports = {
  Status: Status,
};
