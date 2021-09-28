const React = require('react');

const { CreationFormDialog } = require('../base/dialogs/creation.jsx');
const { PriorityFilterDialog } = require('../base/dialogs/filter/priority.jsx');
const { StatusFilterDialog } = require('../base/dialogs/filter/status.jsx');


/** Tasks page dialogs. */
class TasksDialogs extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <StatusFilterDialog choices={ CHOISES.task.status }
                            activeValues={ this.props.filters.status }/>
        <PriorityFilterDialog choices={ CHOISES.task.priority }
                              activeValues={ this.props.filters.priority }/>
        <CreationFormDialog />
      </div>
    );
  }
}


module.exports = {
  TasksDialogs: TasksDialogs,
};
