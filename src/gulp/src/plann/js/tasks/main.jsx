const $ = require('jquery-browserify');
const React = require('react');
const ReactDOM = require('react-dom');
const { CreationButton } = require('./creation_button.jsx');
const { StatusChangingDialog } = require('./dialog/changing/status.jsx');
const { TagsChangingDialog } = require('./dialog/changing/tags.jsx');
const { CreationFormDialog } = require('./dialog/creation.jsx');
const { PriorityFilterDialog } = require('./dialog/filter/priority.jsx');
const { StatusFilterDialog } = require('./dialog/filter/status.jsx');
const { Stack } = require('./stack/main.jsx');
const { WaitScreen } = require('./wait_screen.jsx');


$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) || this.crossDomain) return;
    let csrftokenValue = document.cookie.split("csrftoken=")[1].split("; ")[0];
    xhr.setRequestHeader("X-CSRFToken", csrftokenValue);
  }
});


$(document).ready(function() {
  window.WAIT_SCREEN = ReactDOM.render(
    <WaitScreen />,
    document.getElementById('wait-screen')
  );

  ReactDOM.render(
    <Stack />,
    document.getElementById('tasks-stack-items')
  );

  ReactDOM.render(
    <StatusChangingDialog />,
    document.getElementById('change-status-dialog')
  );
  ReactDOM.render(
    <TagsChangingDialog />,
    document.getElementById('change-tags-dialog')
  );
  ReactDOM.render(
    <StatusFilterDialog choices={CHOISES.task.status} />,
    document.getElementById('filter-status-dialog')
  );
  ReactDOM.render(
    <PriorityFilterDialog choices={CHOISES.task.priority} />,
    document.getElementById('filter-priority-dialog')
  );

  ReactDOM.render(
    <CreationButton />,
    document.getElementById('creation-button')
  );
  ReactDOM.render(
    <CreationFormDialog />,
    document.getElementById('creation-dialog')
  );
});
