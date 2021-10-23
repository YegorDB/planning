const React = require('react');


/** Task content line. */
class TaskContentLine extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-content-line" >
        <div>
          <h2>{ this.props.title }</h2>
        </div>
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}


module.exports = {
  TaskContentLine: TaskContentLine,
};
