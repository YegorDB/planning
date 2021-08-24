const $ = require('jquery-browserify');
const React = require('react');


/** Tasks stack item tag. */
class Tag extends React.Component {

  /**
   * Render stack item tag.
   * @returns {React.Element}
   */
  render() {
    return <div className="task-tag">{ this.props.value }</div>;
  }
}


/** Tasks stack item tags. */
class Tags extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this._items = [];
    this._activeTags = {};
    for (let tag of this.props.values) {
      this._items.push(
        <Tag value={ tag.name } key={ tag.id } />
      );
      this._activeTags[tag.id] = tag.name;
    }

    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Render stack item tags.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="tasks-stack-cell tasks-stack-cell-tags" >
        <div className="tasks-stack-cell-data" >
          { this._items }
        </div>
        <div className="tasks-stack-cell-tags-change"
             onClick={ this._handleClick } >
          edit
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
    $(document).trigger({
      type: 'openTasksChangingDialog',
      activeTags: this._activeTags,
      id: this.props.id,
    });
  }
}


module.exports = {
  Tags: Tags,
};
