const $ = require('jquery-browserify');
const React = require('react');


/** Search. */
class Search extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);
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
          className="header-item" />
      </div>
    );
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleChange(event) {
    $(document).trigger({
      type: 'setSearch',
      value: $(event.target).val(),
    });
  }
}


module.exports = {
  Search: Search,
};
