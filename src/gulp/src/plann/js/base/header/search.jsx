const $ = require('jquery-browserify');
const React = require('react');


/** Search. */
class Search extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);
    this._id = 'search-input';
    this._searchTimeout = null;

    this._handleChange = this._handleChange.bind(this);
    this._handleResetFiltersAndSearch = this._handleResetFiltersAndSearch.bind(this);
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('resetFiltersAndSearch', this._handleResetFiltersAndSearch);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('resetFiltersAndSearch', this._handleResetFiltersAndSearch);
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <input
          id={ this._id }
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
    }, 500);
  }

  /**
   * Reset filters and search data.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleResetFiltersAndSearch(event) {
    $(`#${this._id}`).val('');
  }
}


module.exports = {
  Search: Search,
};
