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
    };

    this._opendialogHandler = (e) => {
      this.setState({
        opened: true,
        activeTags: e.activeTags,
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
    let options = Object.entries(this._allTags).map((id, name) => {
      if (this.state.activeTags[id]) {
        return <option value={ id } key={ id } selected >{ name }</option>
      }
      return <option value={ id } key={ id } >{ name }</option>
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
