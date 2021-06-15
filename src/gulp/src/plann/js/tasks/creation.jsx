/** Creation form. */
class CreationForm extends React.Component {

  /**
   * Render form.
   * @returns {React.Element}
   */
  render() {
    return (
      <div id="tasks-creation">
        <div id="tasks-creation-header">
          <div>Create task</div>
        </div>
        <form id="tasks-creation-form">
          <div class="form-group ">
            <div class="tasks-creation-item-label">
              <label>name</label>
            </div>
            <input id="task-creation-form-name"
                   name="name"
                   class="form-control"
                   type="text"
                   value="" >
          </div>
          <div class="form-group ">
            <div class="tasks-creation-item-label">
              <label>description</label>
            </div>
            <textarea id="task-creation-form-description"
                      name="description"
                      class="form-control">
            </textarea>
          </div>
          <div class="form-group ">
            <div class="tasks-creation-item-label">
              <label>priority</label>
            </div>
            <select id="task-creation-form-priority"
                    class="form-control"
                    name="priority">
              <option value="0">Not set</option>
              <option value="1">Low</option>
              <option value="2">Normal</option>
              <option value="3">High</option>
              <option value="4">Critical</option>
            </select>
          </div>
          <div id="tasks-creation-form-button-box">
            <input id="tasks-creation-form-button"
                   type="submit"
                   value="Create">
          </div>
        </form>
      </div>
    );
  }
}


module.exports = {
  CreationForm: CreationForm,
};
