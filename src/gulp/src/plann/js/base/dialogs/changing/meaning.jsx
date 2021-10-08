const $ = require('jquery-browserify');
const React = require('react');
const { BaseDialogComponent } = require('../base.jsx');


/** Meaning form. */
class MeaningForm extends React.Component {

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
      <form id="change-meaning-form"
            onSubmit={ this._handleSubmit } >
        <div>
          <input name="name" defaultValue={ this.props.name } />
        </div>
        <div>
          <textarea name="description" defaultValue={ this.props.description } >
          </textarea>
        </div>
        <div className="form-submit-button-box">
          <input className="button-default"
                 type="submit"
                 value="Change" />
        </div>
      </form>
    );
  }

  /** Submit handler. */
  _handleSubmit(event) {
    event.preventDefault();
    $(document).trigger('enableWaitScreen');
    $.ajax({
      url: URLS.update_task.replace(/\d+\/$/, `${ this.props.id }/`),
      type: 'PATCH',
      data: JSON.stringify(
        Object.fromEntries((new FormData(event.target)).entries())
      ),
      contentType: 'application/json',
    })
    .done((taskData) => {
      $(document).trigger({
        type: 'changeTask',
        taskData: {
          name: taskData.name,
          description: taskData.description,
        },
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


/** Meaning changing dialog. */
class MeaningChangingDialog extends BaseDialogComponent {

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    return <MeaningForm
            id={ this.props.id }
            name={ this.props.name }
            description={ this.props.description } />;
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
