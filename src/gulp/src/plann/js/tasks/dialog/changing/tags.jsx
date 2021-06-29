const { BaseDialogComponent } = require('../base.jsx');


/** Tags changing dialog. */
class TagsChangingDialog extends BaseDialogComponent {

  /** Creation. */
  constructor(props) {
    super(props);
    this._allTags = JSON.parse(TAGS);

    this.state = {
      ...this.state,
      activeTags: {},
      taskId: null,
    };

    this._opendialogHandler = (e) => {
      this.setState({
        opened: true,
        activeTags: e.activeTags,
        taskId: e.id,
      });
    };
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('openTasksChangingDialog', this._opendialogHandler);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('openTasksChangingDialog', this._opendialogHandler);
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
      <form>
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
}


module.exports = {
  TagsChangingDialog: TagsChangingDialog,
};
