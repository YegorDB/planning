const React = require('react');

const { StatusChangingDialog } = require('../base/dialogs/changing/status.jsx');
const { TagsChangingDialog } = require('../base/dialogs/changing/tags.jsx');
const { CreationFormDialog } = require('../base/dialogs/creation.jsx');


/** Task page dialogs. */
class TaskDialogs extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <StatusChangingDialog />
        <TagsChangingDialog />
        <CreationFormDialog />
      </div>
    );
  }
}


module.exports = {
  TaskDialogs: TaskDialogs,
};
