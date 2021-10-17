const { Parser: HtmlToReactParser } = require('html-to-react');
const $ = require('jquery-browserify');
const React = require('react');
const { BaseDialog, DialogWrapper, FormSubmit } = require('./base.jsx');


/** Creation form dialog. */
class CreationForm extends React.Component {

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
      <form id="tasks-creation-form" onSubmit={ this._handleSubmit } >
        { parser.parse(CREATE_TASK_RAW_FORM) }
        <FormSubmit value="Create" />
      </form>
    );
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
      $(document).trigger('addTask');
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


/** Creation form dialog. */
class CreationDialog extends BaseDialog {

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
        <CreationForm />
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
}


module.exports = {
  CreationDialog: CreationDialog,
};
