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
   * Task name value.
   * @return {string} Value.
   */
  get value() {
    return this.state.value;
  }

  /**
   * Set task name value.
   * @param {string} value - Value.
   */
  set value(value) {
    this.setState({
      value: value,
    });
  }

  /**
   * Render stack item meaning name.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="tasks-stack-cell-meaning-name" >
        this.state.value
      </div>
    );
  }
}
