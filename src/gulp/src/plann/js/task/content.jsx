const React = require('react');


/** Task content line title second. */
class TaskContentLineTitleSecond extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return <h3>{ this.props.value }</h3>;
  }
}


/** Task content line title. */
class TaskContentLineTitle extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return <h2>{ this.props.value }</h2>;
  }
}


/** Task content line second. */
class TaskContentWrapper extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-content-wrapper" >
        { this.props.children }
      </div>
    );
  }
}


/** Task content line. */
class TaskContentLine extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    let Title = this.props.TaskContentLineTitleClass || TaskContentLineTitle;
    return (
      <div className="task-content-line" >
        <div>
          <Title value={ this.props.title } />
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
  TaskContentWrapper: TaskContentWrapper,
  TaskContentLineTitleSecond: TaskContentLineTitleSecond,
};
