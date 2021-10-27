const React = require('react');

const { MeaningChangingDialog } = require('../base/dialogs/changing/meaning.jsx');
const { PriorityChangingDialog } = require('../base/dialogs/changing/priority.jsx');
const { StatusChangingDialog } = require('../base/dialogs/changing/status.jsx');
const { TagsChangingDialog } = require('../base/dialogs/changing/tags.jsx');
const { CreationDialog } = require('../base/dialogs/creation.jsx');


/** Task page dialogs. */
class TaskDialogs extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div id="dialogs" >
        <MeaningChangingDialog
          id={ this.props.id }
          name={ this.props.name }
          description={ this.props.description } />
        <PriorityChangingDialog id={ this.props.id } />
        <StatusChangingDialog id={ this.props.id } />
        <TagsChangingDialog
          id={ this.props.id }
          values={ this.props.tags } />
        <CreationDialog />
      </div>
    );
  }
}


module.exports = {
  TaskDialogs: TaskDialogs,
};
