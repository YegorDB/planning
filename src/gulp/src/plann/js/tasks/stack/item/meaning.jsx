const classNames = require('classnames');


/** Tasks stack item meaning name. */
class Name extends React.Component {

  /**
   * Creation.
   * @param {integer} props.value - Task name value.
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  /**
   * Render stack item meaning name.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="tasks-stack-cell-meaning-name" >
        { this.state.value }
      </div>
    );
  }
}


/** Tasks stack item meaning description. */
class Decsription extends React.Component {

  /**
   * Creation.
   * @param {integer} props.value - Task description value.
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  get showed() {
    return this.state.value && this.state.value != '';
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
           title={ this.showed ? this.state.value : '' } >
        <div>i</div>
      </div>
    );
  }
}


/** Tasks stack item meaning. */
class Meaning extends React.Component {

  /**
   * Creation.
   * @param {string} props.name - Task name value.
   * @param {string} [props.decsription] - Task decsription value.
   */
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      decsription: props.decsription,
    };
  }

  /**
   * Render stack item meaning.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="tasks-stack-cell tasks-stack-cell-meaning" >
        <div className="tasks-stack-cell-meaning-wrapper" >
          <Name value={ this.state.name } />
          <Decsription value={ this.state.decsription } />
        </div>
      </div>
    );
  }
}


module.exports = {
  Meaning: Meaning,
};
