const $ = require('jquery-browserify');
const React = require('react');
const ReactDOM = require('react-dom');

const { Dialogs } = require('./dialogs/main.jsx');
const { Header } = require('./header/main.jsx');
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
    <Header />,
    document.getElementById('header')
  );

  ReactDOM.render(
    <Stack />,
    document.getElementById('tasks-stack')
  );

  ReactDOM.render(
    <Dialogs />,
    document.getElementById('dialogs')
  );
});
