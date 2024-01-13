const $ = require('jquery-browserify');
const React = require('react');


/** Reset filters and search button. */
class ResetButton extends React.Component {

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
        className="button button-default header-item" >
        Reset
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
      type: 'resetFiltersAndSearch',
    });
  }
}


module.exports = {
  ResetButton: ResetButton,
};
