const { TasksStack } = require('./stack');
const { TasksStatusChangingDialog, TasksStatusFilterDialog, TasksPriorityFilterDialog } = require('./dialog');
const { TasksCreation } = require('./creation');



class TasksStatusChangingDialogComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      taskItem: null,
    };

    this._click = (e) => {
      this.setState({ taskItem: null });
    };

    this._changeStatusStart = (e) => {
      $('#change-status-dialog').addClass('dialog-window-open');
      this.setState({ taskItem: e.taskItem });
    };
  }

  componentDidMount() {
    $('#change-status-dialog').on('click', this._click);
    $('#change-status-dialog').on('changeStatusStart', this._changeStatusStart);
  }

  componentWillUnmount() {
    $('#change-status-dialog').off('click', this._click);
    $('#change-status-dialog').off('changeStatusStart', this._changeStatusStart);
  }

  render() {
    return Object.entries(CHOISES.task.status).map((s) =>
      <div className={`
             tasks-stack-change-status-dialog-item
             tasks-stack-item-status
             tasks-stack-item-status-${s[0].toLowerCase()}
           `}
           onClick={(e) => { this._changeValue(s[0]); }}>
        {s[1]}
      </div>
    );
  }

  /**
   * Change status value.
   * @param {string} value - New status value.
   */
  _changeValue(value) {
    if (!this._taskItem) return;

    WAIT_SCREEN.enable();
    $.ajax({
      url: URLS.update_task.replace(/\d+\/$/, `${this._taskItem.id}/`),
      data: JSON.stringify({
        'status': value,
      }),
      type: 'PATCH',
      contentType: 'application/json',
    })
    .done((taskData) => {
      this._taskItem.status.value = value;
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log('jqXHR', jqXHR);
    })
    .always(() => {
      this._taskItem = null;
      WAIT_SCREEN.disable();
    });

    $('#change-status-dialog').removeClass('dialog-window-open');
  }
}



window.CHOISES = JSON.parse(RAW_CHOISES);
window.URLS = JSON.parse(RAW_URLS);
window.WAIT_SCREEN = {
  enabled: false,
  enable() {
    $('#wait-screen').addClass('wait-screen-enabled');
    this.enabled = true;
  },
  disable() {
    $('#wait-screen').removeClass('wait-screen-enabled');
    this.enabled = false;
  },
};


$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) || this.crossDomain) return;
    let csrftokenValue = document.cookie.split("csrftoken=")[1].split("; ")[0];
    xhr.setRequestHeader("X-CSRFToken", csrftokenValue);
  }
});


$(document).ready(function() {
  new TasksStack;
  new TasksStatusChangingDialog;
  new TasksStatusFilterDialog;
  new TasksPriorityFilterDialog;
  new TasksCreation;

  $('.dialog-window').on('click', function(e) {
    $(this).removeClass('dialog-window-open');
  });
  $('.dialog-window-content').on('click', function(e) {
    e.stopPropagation();
  });
});
