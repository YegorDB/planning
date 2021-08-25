const $ = require('jquery-browserify');
const React = require('react');


/** Priority filter button. */
class PriorityFilterButton extends React.Component {

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
    return <div onClick={ this._handleClick }
                className="button button-default" >
             Priorities
           </div>;
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClick(event) {
    $(document).trigger({
      type: 'filterPriorityStart',
    });
  }
}


module.exports = {
  PriorityFilterButton: PriorityFilterButton,
};
