const classNames = require('classnames');
const React = require('react');
const { FilterDialogItemBadge, FilterDialog } = require('./base.jsx');


/** Task priority filter dialog item badge logic. */
class PriorityFilterDialogItemBadge extends React.Component {

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    let className = classNames(
      'task-priority-dialog-item',
      'task-priority-dialog-item-filter',
      `task-priority-${ this.props.value }`,
    );

    return (
      <FilterDialogItemBadge
        name={ this.props.name }
        inputId={ this.props.inputId }
        className={ className } />
    );
  }
}


/** Task priority filter dialog window logic. */
class PriorityFilterDialog extends React.Component {

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    return (
      <FilterDialog
        filterName="priority"
        filterEventName="filterPriorityStart"
        entries={
          Object.entries(this.props.choices)
          .reverse()
          .map(([v, n]) => [parseInt(v), n])
        }
        ItemBadgeClass={ PriorityFilterDialogItemBadge }
        activeValues={ this.props.activeValues }
      />
    );
  }
}


module.exports = {
  PriorityFilterDialog: PriorityFilterDialog,
};
