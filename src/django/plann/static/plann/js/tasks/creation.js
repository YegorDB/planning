/** Tasks creation handle logic. */
class TasksCreation {

  /** Create. */
  constructor() {
    $('#task-creation-form').submit((e) => {
      e.preventDefault();
      this._addTask();
    });
  }

  /** Add task. */
  _addTask() {
    let formData = new FormData($('#task-creation-form')[0]);
    $.ajax({
      url: '/api/1.0/create_task/',
      data: JSON.stringify(Object.fromEntries(formData.entries())),
      type: 'POST',
      contentType: 'application/json',
    })
    .done((taskData) => {
      $('#tasks-stack-items').trigger({
        type: 'addTask',
        taskData: taskData,
      });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log('jqXHR', jqXHR);
    });
  }
}
