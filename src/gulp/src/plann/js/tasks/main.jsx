const { TasksStack } = require('./stack');
const { TasksStatusChangingDialog, TasksStatusFilterDialog, TasksPriorityFilterDialog } = require('./dialog');
const { TasksCreation } = require('./creation');



class TasksStatusChangingDialogComponent extends React.Component {

  constructor(props) {
    super(props);
    this._taskItem = null;

    this.state = { opened: false };

    this._click = (e) => {
      this._taskItem = null;
    };

    this._changeStatusStart = (e) => {
      this.setState({ opened: true });
      this._taskItem = e.taskItem;
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
    let items = Object.entries(CHOISES.task.status).map((data) => {
      let [value, name] = data;
      let classes = [
        'tasks-stack-change-status-dialog-item',
        'tasks-stack-item-status',
        `tasks-stack-item-status-${value.toLowerCase()}`,
      ].join(' ');
      let onClick = (e) => {
        this._changeValue(value);
      };
      return <div className={classes} onClick={onClick} key={value}>{name}</div>;
    });

    let classes = [
      'dialog-window',
      (this.state.opened ? 'dialog-window-open' : ''),
    ].join(' ').trim();

    return (
      <div className={classes}>
        <div className="dialog-window-content">
          {items}
        </div>
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

    this.setState({ opened: false });
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
  // new TasksStatusChangingDialog;
  new TasksStatusFilterDialog;
  new TasksPriorityFilterDialog;
  new TasksCreation;

  ReactDOM.render(
    <TasksStatusChangingDialogComponent />,
    document.getElementById('change-status-dialog')
  );

  $('.dialog-window').on('click', function(e) {
    $(this).removeClass('dialog-window-open');
  });
  $('.dialog-window-content').on('click', function(e) {
    e.stopPropagation();
  });
});
