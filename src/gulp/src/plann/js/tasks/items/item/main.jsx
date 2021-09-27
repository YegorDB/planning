const React = require('react');
const { ItemMeaning } = require('./meaning.jsx');
const { ItemPriority } = require('./priority.jsx');
const { ItemStatus } = require('./status.jsx');


/** Tasks item. */
class Item extends React.Component {

  /** Creation. */
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
      <div className="task-item"
           onClick={ this._handleClick } >
        <ItemPriority value={ this.props.taskData.priority } />
        <ItemMeaning name={ this.props.taskData.name } />
        <ItemStatus value={ this.props.taskData.status } />
      </div>
    );
  }

  _handleClick() {
    document.location.assign(`/task/${this.props.taskData.id}/`);
  }
}


module.exports = {
  Item: Item,
};
