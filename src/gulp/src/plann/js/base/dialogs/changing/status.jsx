const classNames = require('classnames');
const $ = require('jquery-browserify');
const React = require('react');
const { BaseDialogComponent } = require('../base.jsx');


/** Task status changing dialog item. */
class StatusChangingDialogItem extends React.Component {

  /**
   * Creation.
   * @param {string} props.id - Task status value.
   * @param {string} props.value - Task status value.
   * @param {string} props.name - Task status name.
   */
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Render item.
   * @returns {React.Element}
   */
  render() {
    let classes = classNames(
      'task-status-dialog-item',
      `task-status-${ this.props.value.toLowerCase() }`,
    );

    return (
      <div className={ classes }
           onClick={ this._handleClick } >
        { this.props.name }
      </div>
    );
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClick(event) {
    $(document).trigger('enableWaitScreen');
    $.ajax({
      url: URLS.update_task.replace(/\d+\/$/, `${ this.props.id }/`),
      data: JSON.stringify({
        'status': this.props.value,
      }),
      type: 'PATCH',
      contentType: 'application/json',
    })
    .done((taskData) => {
      $(document).trigger({
        type: 'changeStatus',
        value: this.props.value,
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


/** Task status changing dialog window logic. */
class StatusChangingDialog extends BaseDialogComponent {

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    return Object.entries(CHOISES.task.status).map(([value, name]) => {
      return <StatusChangingDialogItem
              id={ this.props.id }
              value={ value }
              name={ name }
              key={ value } />;
    });
  }

  /** Component did mount logic. */
  componentDidMount() {
    super.componentDidMount();
    $(document).on('changeStatusStart', this._handleOpen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    super.componentWillUnmount();
    $(document).off('changeStatusStart', this._handleOpen);
  }
}


module.exports = {
  StatusChangingDialog: StatusChangingDialog,
};
