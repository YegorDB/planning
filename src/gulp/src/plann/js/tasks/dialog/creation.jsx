const { Parser: HtmlToReactParser } = require('html-to-react');
const { BaseDialogComponent } = require('./base.jsx');


/** Creation form dialog. */
class CreationFormDialog extends BaseDialogComponent {

  /** Creation. */
  constructor(props) {
    super(props);

    this._openCreationDialogHandler = (e) => {
      this.setState({ opened: true });
    };
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('openCreationDialog', this._openCreationDialogHandler);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('openCreationDialog', this._openCreationDialogHandler);
  }

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    let formFields = (new HtmlToReactParser).parse(CREATE_TASK_RAW_FORM);

    return (
      <div>
        <div id="tasks-creation-header">
          <div>Create task</div>
        </div>
        <form id="tasks-creation-form">
          { formFields }
          <div className="form-submit-button-box">
            <input id="tasks-creation-form-button"
                   className="button-default"
                   type="submit"
                   value="Create" />
          </div>
        </form>
      </div>
    );
  }
}


module.exports = {
  CreationFormDialog: CreationFormDialog,
};
