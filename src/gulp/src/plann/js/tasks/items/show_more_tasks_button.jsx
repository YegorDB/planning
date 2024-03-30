const $ = require('jquery-browserify');
const React = require('react');


/** Show more tasks button. */
class ShowMoreTasksButton extends React.Component {

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
        className="button button-default" >
        Show more tasks
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
      type: 'showMoreTasksStart',
    });
  }
}


module.exports = {
  ShowMoreTasksButton: ShowMoreTasksButton,
};
