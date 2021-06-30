const { BaseDialogComponent } = require('../base.jsx');


/** Tags changing dialog. */
class TagsChangingDialog extends BaseDialogComponent {

  /** Creation. */
  constructor(props) {
    super(props);
    this._allTags = JSON.parse(TAGS);
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
    let options = this._allTags.map(tag => {
      return (
        <option value={ tag.id }
                key={ tag.id }
                selected={ this.state.activeTags[tag.id] } >
          { tag.name }
        </option>
      );
    })

    return (
      <form onSubmit={ this._handleSubmit } >
        <div>
          <select name="tags" multiple >
            { options }
          </select>
        </div>
        <div>
          <input className="button-default"
                 type="submit"
                 value="Change" />
        </div>
      </form>
    );
  }

  /**
   * Open additional function.
   * @returns {function}
   */
  get openAdditionalFunction() {
    return (e) => {
      this.setState({
        activeTags: e.activeTags,
        taskId: e.id,
      });
    };
  }

  /**
   * Close additional function.
   * @returns {function}
   */
  get closeAdditionalFunction() {
    return (e) => {
      this.setState(this._initialState);
    };
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('openTasksChangingDialog', this.openFunction);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('openTasksChangingDialog', this.openFunction);
  }

  /** Submit handler. */
  _handleSubmit(event) {
    event.preventDefault();
    WAIT_SCREEN.enable();
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
        value: this._allTags.filter(tag => tagsValues.includes(tag.id.toString())),
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
      WAIT_SCREEN.disable();
    });
  }
}


module.exports = {
  TagsChangingDialog: TagsChangingDialog,
};
