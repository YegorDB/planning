const classNames = require('classnames');
const { BaseFilterDialog } = require('./base.jsx');


/** Task status filter dialog window logic. */
class StatusFilterDialog extends BaseFilterDialog {

  static FILTER_NAME = 'status';
  static FILTER_EVENT_NAME = 'filterStatusStart';

  /**
   * Get item classes.
   * @private
   * @param {Object} value - Choice value;
   * @return {string} Classes names;
   */
  _getItemClasses(value) {
    return classNames(
      'task-status-dialog-item',
      'task-status-dialog-item-filter',
      `task-status-${value.toLowerCase()}`,
    );
  }
}


module.exports = {
  StatusFilterDialog: StatusFilterDialog,
};
