const React = require('react');


const { PriorityChangingDialog } = require('../base/dialogs/changing/priority.jsx');
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
        <PriorityChangingDialog id={ this.props.id } />
        <StatusChangingDialog id={ this.props.id } />
        <TagsChangingDialog id={ this.props.id } values={ this.props.tags } />
        <CreationFormDialog />
      </div>
    );
  }
}


module.exports = {
  TaskDialogs: TaskDialogs,
};
