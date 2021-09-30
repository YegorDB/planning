const classNames = require('classnames');
const { BaseFilterDialog } = require('./base.jsx');


/** Task priority filter dialog window logic. */
class PriorityFilterDialog extends BaseFilterDialog {

  static FILTER_NAME = 'priority';
  static FILTER_EVENT_NAME = 'filterPriorityStart';

  /**
   * Get entries.
   * @private
   * @param {Object} choices - Value - name pairs;
   * @return {Object[][]} Array of value - name pairs;
   */
  _getEntries(choices) {
    return Object.entries(choices).reverse().map(([v, n]) => [parseInt(v), n]);
  }

  /**
   * Get item classes.
   * @private
   * @param {Object} value - Choice value;
   * @return {string} Classes names;
   */
  _getItemClasses(value) {
    return classNames(
      'task-priority-dialog-item',
      'task-priority-dialog-item-filter',
      `task-priority-${value}`,
    );
  }
}


module.exports = {
  PriorityFilterDialog: PriorityFilterDialog,
};
