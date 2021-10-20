const React = require('react');


/** Task creation datetime. */
class TaskCreationDatetime extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-content-item-line" >
        <div>
          <h3>{ 'Creation' }</h3>
        </div>
        <div>
          <p>{ this.props.value }</p>
        </div>
      </div>
    );
  }
}


/** Task dates. */
class TaskDatetimes extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <h2>{ 'Datetimes' }</h2>
        <TaskCreationDatetime value={ this.props.creation } />
      </div>
    );
  }
}


module.exports = {
  TaskDatetimes: TaskDatetimes,
};
