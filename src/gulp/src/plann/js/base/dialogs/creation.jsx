const { Parser: HtmlToReactParser } = require('html-to-react');
const $ = require('jquery-browserify');
const React = require('react');
const { BaseDialog, DialogWrapper } = require('./base.jsx');


/** Creation form dialog. */
class CreationFormDialog extends BaseDialog {

  /** Creation. */
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    let parser = new HtmlToReactParser;
    return (
      <DialogWrapper opened={ this.state.opened } >
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
      </DialogWrapper >
    );
  }

  /** Component did mount logic. */
  componentDidMount() {
    super.componentDidMount();
    $(document).on('openCreationDialog', this._handleOpen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    super.componentWillUnmount();
    $(document).off('openCreationDialog', this._handleOpen);
  }

  /**
   * Submit handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleSubmit(event) {
    event.preventDefault();
    $(document).trigger('enableWaitScreen');
    let formData = new FormData(event.target);
    $.ajax({
      url: URLS.create_task,
      data: JSON.stringify({
        ...Object.fromEntries(formData.entries()),
        tags: formData.getAll('tags'),
      }),
      type: 'POST',
      contentType: 'application/json',
    })
    .done((taskData) => {
      $(document).trigger({
        type: 'addTask',
        taskData: taskData,
      });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log('jqXHR', jqXHR);
    })
    .always(() => {
      $(document)
      .trigger('closeDialogWindow')
      .trigger('disableWaitScreen');
    });
  }
}


module.exports = {
  CreationFormDialog: CreationFormDialog,
};
