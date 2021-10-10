const classNames = require('classnames');
const React = require('react');
const { FilterDialogItemBadge, FilterDialog } = require('./base.jsx');


/** Task status filter dialog item badge logic. */
class StatusFilterDialogItemBadge extends React.Component {

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    let className = classNames(
      'task-status-dialog-item',
      'task-status-dialog-item-filter',
      `task-status-${ this.props.value.toLowerCase() }`,
    );

    return (
      <FilterDialogItemBadge
        name={ this.props.name }
        inputId={ this.props.inputId }
        className={ className } />
    );
  }
}


/** Task status filter dialog window logic. */
class StatusFilterDialog extends React.Component {

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    return (
      <FilterDialog
        filterName="status"
        filterEventName="filterStatusStart"
        entries={ Object.entries(this.props.choices) }
        ItemBadgeClass={ StatusFilterDialogItemBadge }
        activeValues={ this.props.activeValues }
      />
    );
  }
}


module.exports = {
  StatusFilterDialog: StatusFilterDialog,
};
