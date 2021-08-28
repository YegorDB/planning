const React = require('react');

const { StatusChangingDialog } = require('./changing/status.jsx');
const { TagsChangingDialog } = require('./changing/tags.jsx');
const { CreationFormDialog } = require('./creation.jsx');
const { PriorityFilterDialog } = require('./filter/priority.jsx');
const { StatusFilterDialog } = require('./filter/status.jsx');


/** Header. */
class Dialogs extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return <div>
             <StatusChangingDialog />
             <TagsChangingDialog />
             <StatusFilterDialog choices={CHOISES.task.status} />
             <PriorityFilterDialog choices={CHOISES.task.priority} />
             <CreationFormDialog />
           </div>;
  }
}


module.exports = {
  Dialogs: Dialogs,
};
