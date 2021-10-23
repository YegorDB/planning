const React = require('react');

const {
  TaskContentLine, TaskContentWrapper, TaskContentLineTitleSecond,
} = require('./content.jsx');


/** Task dates. */
class TaskDatetimes extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <TaskContentLine title="Datetimes" />
        <TaskContentWrapper>
          <TaskContentLine
            title="Creation2"
            TaskContentLineTitleClass={ TaskContentLineTitleSecond } >
            <p>{ (new Date(this.props.creation)).toLocaleString() }</p>
          </TaskContentLine>
        </TaskContentWrapper>
      </div>
    );
  }
}


module.exports = {
  TaskDatetimes: TaskDatetimes,
};
