const $ = require('jquery-browserify');
const React = require('react');
const ReactDOM = require('react-dom');

const { App } = require('./app.jsx');


$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) || this.crossDomain) return;
    let csrftokenValue = document.cookie.split("csrftoken=")[1].split("; ")[0];
    xhr.setRequestHeader("X-CSRFToken", csrftokenValue);
  }
});


$(document).ready(function() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
