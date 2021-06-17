var HtmlToReactParser = require('html-to-react').Parser;


/** Creation form. */
class CreationForm extends React.Component {

  /**
   * Render form.
   * @returns {React.Element}
   */
  render() {
    let formFields = (new HtmlToReactParser).parse(
      CREATE_TASK_RAW_FORM.replaceAll(/(<input.*?)value=""/g, '$1')
    );

    return (
      <div>
        <div id="tasks-creation-header">
          <div>Create task</div>
        </div>
        <form id="tasks-creation-form">
          { formFields }
          <div id="tasks-creation-form-button-box">
            <input id="tasks-creation-form-button"
                   type="submit"
                   value="Create" />
          </div>
        </form>
      </div>
    );
  }
}


module.exports = {
  CreationForm: CreationForm,
};
