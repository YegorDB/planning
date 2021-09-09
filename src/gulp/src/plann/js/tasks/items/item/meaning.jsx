const React = require('react');


/** Tasks item meaning. */
class ItemMeaning extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-item-meaning">
        <div className="task-item-meaning-name">
          <div>{ this.props.name }</div>
        </div>
      </div>
    );
  }
}


module.exports = {
  ItemMeaning: ItemMeaning,
};
