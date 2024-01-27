const $ = require('jquery-browserify');
const React = require('react');


/** Tags filter button. */
class TagsFilterButton extends React.Component {

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
      <div
        onClick={ this._handleClick }
        className="button button-default filter-button header-item" >
        Tags
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
      type: 'filterTagsStart',
    });
  }
}


module.exports = { TagsFilterButton };
