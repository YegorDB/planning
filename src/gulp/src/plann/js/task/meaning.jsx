const React = require('react');


/** Task name. */
class TaskName extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return <h1 className="task-meaning-value" >{ this.props.value }</h1>;
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
        <p className="task-meaning-value" >{ this.props.value }</p>
      </div>
    );
  }
}


/** Task meaning. */
class TaskMeaning extends React.Component {

  /**
   * Creation.
   * @param {string} props.name - Task name.
   * @param {string} props.description - Task description.
   */
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-meaning" >
        <div onClick={ this._handleClick } className="interactive" >
          <TaskName value={ this.props.name } />
          <TaskDescription value={ this.props.description } />
        </div>
      </div>
    );
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClick(event) {
    $(document).trigger('changeMeaningStart');
  }
}


module.exports = {
  TaskMeaning: TaskMeaning,
};
