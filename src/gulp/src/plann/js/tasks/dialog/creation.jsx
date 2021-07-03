const { Parser: HtmlToReactParser } = require('html-to-react');
const { BaseDialogComponent } = require('./base.jsx');


/** Creation form dialog. */
class CreationFormDialog extends BaseDialogComponent {

  /** Creation. */
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    let parser = new HtmlToReactParser;

    return (
      <div>
        <div id="tasks-creation-header" >
          <div>Create task</div>
        </div>
        <form id="tasks-creation-form"
              onSubmit={ this._handleSubmit } >
          { parser.parse(CREATE_TASK_RAW_FORM) }
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

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('openCreationDialog', this.openFunction);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('openCreationDialog', this.openFunction);
  }

  /** Submit handler. */
  _handleSubmit(event) {
    event.preventDefault();
    WAIT_SCREEN.enable();
    let formData = new FormData(event.target);
    let tagsValues = formData.getAll('tags');
    $.ajax({
      url: URLS.create_task,
      data: JSON.stringify({
        ...Object.fromEntries(formData.entries()),
        tags: tagsValues,
      }),
      type: 'POST',
      contentType: 'application/json',
    })
    .done((taskData) => {
      $(document).trigger({
        type: 'addTask',
        taskData: {
          ...taskData,
          tags: TAGS.filter(tag => tagsValues.includes(tag.id.toString())),
        },
      });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log('jqXHR', jqXHR);
    })
    .always(() => {
      this.setState({
        opened: false,
      });
      WAIT_SCREEN.disable();
    });
  }
}


module.exports = {
  CreationFormDialog: CreationFormDialog,
};
