const $ = require('jquery-browserify');


/** Creation button. */
class CreationButton extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    let onClickHandler = (e) => {
      $(document).trigger({
        type: 'openCreationDialog',
      });
    };
    return <div onClick={ onClickHandler }
                className="button-default" >
             Add task
           </div>;
  }
}


module.exports = {
  CreationButton: CreationButton,
};
