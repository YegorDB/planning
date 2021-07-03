const classNames = require('classnames');
const React = require('react');


/** Tasks stack item meaning name. */
class Name extends React.Component {

  /**
   * Render stack item meaning name.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="tasks-stack-cell-meaning-name" >
        { this.props.value }
      </div>
    );
  }
}


/** Tasks stack item meaning description. */
class Decsription extends React.Component {

  /**
   * Whether show component or not.
   * @returns {boolean}
   */
  get showed() {
    return this.props.value && this.props.value != '';
  }

  /**
   * Render stack item meaning description.
   * @returns {React.Element}
   */
  render() {
    let classes = classNames('tasks-stack-cell-meaning-description', {
      'tasks-stack-cell-meaning-description-show': this.showed,
    });

    return (
      <div className={classes}
           title={ this.showed ? this.props.value : '' } >
        <div>i</div>
      </div>
    );
  }
}


/** Tasks stack item meaning. */
class Meaning extends React.Component {

  /**
   * Render stack item meaning.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="tasks-stack-cell tasks-stack-cell-meaning" >
        <div className="tasks-stack-cell-data" >
          <div className="tasks-stack-cell-meaning-wrapper" >
            <Name value={ this.props.name } />
            <Decsription value={ this.props.description } />
          </div>
        </div>
      </div>
    );
  }
}


module.exports = {
  Meaning: Meaning,
};
