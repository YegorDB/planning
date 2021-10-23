const React = require('react');

const { TaskContentLine } = require('./content.jsx');


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
        <TaskContentLine title="Creation" >
          <p>{ (new Date(this.props.creation)).toLocaleString() }</p>
        </TaskContentLine>
      </div>
    );
  }
}


module.exports = {
  TaskDatetimes: TaskDatetimes,
};
