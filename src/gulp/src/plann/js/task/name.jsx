const React = require('react');


/** Task name. */
class TaskName extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return <h1>{ this.props.value }</h1>;
  }
}


module.exports = {
  TaskName: TaskName,
};
