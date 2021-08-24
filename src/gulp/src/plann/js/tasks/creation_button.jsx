const $ = require('jquery-browserify');
const React = require('react');


/** Creation button. */
class CreationButton extends React.Component {

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
                className="button-default" >
             Add task
           </div>;
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClick(event) {
    $(document).trigger({
      type: 'openCreationDialog',
    });
  }
}


module.exports = {
  CreationButton: CreationButton,
};
