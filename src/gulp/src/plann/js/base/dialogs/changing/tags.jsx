const $ = require('jquery-browserify');
const React = require('react');
const { ChangingDialogItem } = require('./base.jsx');
const { BaseDialog, DialogWrapper } = require('../base.jsx');


/** Tags form. */
class TagsForm extends ChangingDialogItem {

  /** Creation. */
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  /**
   * Render form.
   * @returns {React.Element}
   */
  render() {
    return (
      <form
        id="change-tags-form"
        onSubmit={ this._handleSubmit } >
        <div>
          <select
            name="tags"
            defaultValue={ this.props.values }
            multiple >
            {
              Object.keys(TAGS)
              .map(id =>
                <option
                  value={ id }
                  key={ id } >
                  { TAGS[id] }
                </option>
              )
            }
          </select>
        </div>
        <div
          className="form-submit-button-box">
          <input
            className="button-default"
            type="submit"
            value="Change" />
        </div>
      </form>
    );
  }

  /** Submit handler. */
  _handleSubmit(event) {
    event.preventDefault();
    this._changeTask({
      'tags': (new FormData(event.target)).getAll('tags'),
    });
  }
}


/** Tags changing dialog. */
class TagsChangingDialog extends BaseDialog {

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    return (
      <DialogWrapper opened={ this.state.opened } >
        <TagsForm
          id={ this.props.id }
          values={ this.props.values } />
      </DialogWrapper >
    );
  }

  /** Component did mount logic. */
  componentDidMount() {
    super.componentDidMount();
    $(document).on('changeTagsStart', this._handleOpen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    super.componentWillUnmount();
    $(document).off('changeTagsStart', this._handleOpen);
  }
}


module.exports = {
  TagsChangingDialog: TagsChangingDialog,
};
