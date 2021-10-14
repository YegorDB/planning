const classNames = require('classnames');
const React = require('react');


/** Tasks item status. */
class ItemStatus extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    let className = classNames(
      'task-item-status',
      `task-item-status-${this.props.value.toLowerCase()}`,
    );

    return (
      <div
        className={ className }
        title={ CHOISES.task.status[this.props.value] } >
      </div>
    );
  }
}


module.exports = {
  ItemStatus: ItemStatus,
};
