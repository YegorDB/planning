const $ = require('jquery-browserify');
const React = require('react');
const { BaseDialogComponent } = require('../base.jsx');


/** Tags form. */
class TagsForm extends React.Component {

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
      <form id="change-tags-form"
            onSubmit={ this._handleSubmit } >
        <div>
          <select name="tags" defaultValue={ this.props.values } multiple >
            {
              Object.keys(TAGS).map(id => {
                return (
                  <option
                    value={ id }
                    key={ id } >
                    { TAGS[id] }
                  </option>
                );
              })
            }
          </select>
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
    let values = (new FormData(event.target)).getAll('tags');
    $.ajax({
      url: URLS.update_task.replace(/\d+\/$/, `${ this.props.id }/`),
      type: 'PATCH',
      data: JSON.stringify({
        'tags': values,
      }),
      contentType: 'application/json',
    })
    .done((taskData) => {
      $(document).trigger({
        type: 'changeTags',
        values: values,
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


/** Tags changing dialog. */
class TagsChangingDialog extends BaseDialogComponent {

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    console.log('this.props.values', this.props.values);
    return <TagsForm id={ this.props.id } values={ this.props.values } />;
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
