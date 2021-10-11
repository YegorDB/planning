const $ = require('jquery-browserify');
const React = require('react');


/** Changing dialog item. */
class ChangingDialogItem extends React.Component {

  /** Change task logic. */
  _changeTask(taskData) {
    $(document).trigger('enableWaitScreen');
    $.ajax({
      url: URLS.update_task.replace(/\d+\/$/, `${ this.props.id }/`),
      type: 'PATCH',
      data: JSON.stringify(taskData),
      contentType: 'application/json',
    })
    .done((taskData) => {
      $(document).trigger({
        type: 'changeTask',
        taskData: taskData,
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


module.exports = {
  ChangingDialogItem: ChangingDialogItem,
};
