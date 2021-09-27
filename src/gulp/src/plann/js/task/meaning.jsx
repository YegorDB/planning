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


/** Task description. */
class TaskDescription extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <p>{ this.props.value }</p>
      </div>
    );
  }
}


/** Task meaning. */
class TaskMeaning extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-meaning">
        <TaskName value={ this.props.name } />
        <TaskDescription value={ this.props.description } />
      </div>
    );
  }
}


module.exports = {
  TaskMeaning: TaskMeaning,
};
