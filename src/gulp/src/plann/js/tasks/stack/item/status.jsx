const classNames = require('classnames');
const $ = require('jquery-browserify');
const React = require('react');


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
    this._handleValueClick = this._handleValueClick.bind(this);
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

    return (
      <div className="tasks-stack-cell tasks-stack-cell-status" >
        <div className="tasks-stack-cell-data" >
          <div className={ valueClasses }
               onClick={ this._handleValueClick } >
            { CHOISES.task.status[this.props.value] }
          </div>
        </div>
      </div>
    );
  }

  /**
   * Value click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleValueClick(event) {
    $(document).trigger({
      type: 'changeStatusStart',
      id: this._id,
    });
  }
}


module.exports = {
  Status: Status,
};
