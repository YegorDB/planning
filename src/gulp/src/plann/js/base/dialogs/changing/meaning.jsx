const $ = require('jquery-browserify');
const React = require('react');
const { ChangingDialogItem } = require('./base.jsx');
const { BaseDialog, DialogWrapper, FormSubmit } = require('../base.jsx');


/** Meaning form. */
class MeaningForm extends ChangingDialogItem {

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
      <form id="change-meaning-form" onSubmit={ this._handleSubmit } >
        <div>
          <input name="name" defaultValue={ this.props.name } />
        </div>
        <div>
          <textarea name="description" defaultValue={ this.props.description } >
          </textarea>
        </div>
        <FormSubmit value="Change" />
      </form>
    );
  }

  /** Submit handler. */
  _handleSubmit(event) {
    event.preventDefault();
    this._changeTask(
      Object.fromEntries((new FormData(event.target)).entries()));
  }
}


/** Meaning changing dialog. */
class MeaningChangingDialog extends BaseDialog {

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    return (
      <DialogWrapper opened={ this.state.opened } >
        <MeaningForm
          id={ this.props.id }
          name={ this.props.name }
          description={ this.props.description } />
      </DialogWrapper >
    );
  }

  /** Component did mount logic. */
  componentDidMount() {
    super.componentDidMount();
    $(document).on('changeMeaningStart', this._handleOpen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    super.componentWillUnmount();
    $(document).off('changeMeaningStart', this._handleOpen);
  }
}


module.exports = {
  MeaningChangingDialog: MeaningChangingDialog,
};
