const $ = require('jquery-browserify');
const React = require('react');
const { BaseDialogComponent } = require('../base.jsx');


/** Tags changing dialog. */
class TagsChangingDialog extends BaseDialogComponent {

  /** Creation. */
  constructor(props) {
    super(props);
    this._initialState = {
      activeTags: {},
      taskId: null,
    };

    this.state = {
      ...this.state,
      ...this._initialState,
    };

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    let options = TAGS.map(tag => {
      return (
        <option value={ tag.id }
                key={ tag.id }
                selected={ this.state.activeTags[tag.id] } >
          { tag.name }
        </option>
      );
    })

    return (
      <form id="change-tags-form"
            onSubmit={ this._handleSubmit } >
        <div>
          <select name="tags" multiple >
            { options }
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

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('openTasksChangingDialog', this._handleOpen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('openTasksChangingDialog', this._handleOpen);
  }

  /** Submit handler. */
  _handleSubmit(event) {
    event.preventDefault();
    $(document).trigger('enableWaitScreen');
    let tagsValues = (new FormData(event.target).getAll('tags'));
    $.ajax({
      url: URLS.update_task.replace(/\d+\/$/, `${this.state.taskId}/`),
      type: 'PATCH',
      data: JSON.stringify({
        'tags': tagsValues,
      }),
      contentType: 'application/json',
    })
    .done((taskData) => {
      $(document).trigger({
        type: 'changeTask',
        id: this.state.taskId,
        name: 'tags',
        value: TAGS.filter(tag => tagsValues.includes(tag.id.toString())),
      });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log('jqXHR', jqXHR);
    })
    .always(() => {
      this.setState({
        opened: false,
        ...this._initialState,
      });
      $(document).trigger('disableWaitScreen');
    });
  }

  /**
   * Open additional.
   * @private
   * @param {Event} event - DOM event.
   */
  _openAdditionalFunction(event) {
    this.setState({
      activeTags: event.activeTags,
      taskId: event.id,
    });
  }

  /**
   * Close additional.
   * @private
   * @param {Event} event - DOM event.
   */
  _closeAdditionalFunction(event) {
    this.setState(this._initialState);
  }
}


module.exports = {
  TagsChangingDialog: TagsChangingDialog,
};
