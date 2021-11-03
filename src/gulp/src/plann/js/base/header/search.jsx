const $ = require('jquery-browserify');
const React = require('react');


/** Search. */
class Search extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);
    this._searchTimeout = null;
    this._handleChange = this._handleChange.bind(this);
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <input
          onChange={ this._handleChange }
          placeholder="Search"
          className="search-input header-item" />
      </div>
    );
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleChange(event) {
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => {
      $(document).trigger({
        type: 'setSearch',
        value: $(event.target).val(),
      });
    }, 200);
  }
}


module.exports = {
  Search: Search,
};
