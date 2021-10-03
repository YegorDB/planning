const classNames = require('classnames');
const $ = require('jquery-browserify');
const React = require('react');
const { BaseDialogComponent } = require('../base.jsx');


/** Task priority changing dialog item. */
class PriorityChangingDialogItem extends React.Component {

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
      'task-priority-dialog-item',
      `task-priority-${ this.props.value.toLowerCase() }`,
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
        'priority': this.props.value,
      }),
      type: 'PATCH',
      contentType: 'application/json',
    })
    .done((taskData) => {
      $(document).trigger({
        type: 'changePriority',
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


/** Task priority changing dialog window logic. */
class PriorityChangingDialog extends BaseDialogComponent {

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    return Object.entries(CHOISES.task.priority).map(([value, name]) => {
      return <PriorityChangingDialogItem
              id={ this.props.id }
              value={ value }
              name={ name }
              key={ value } />;
    });
  }

  /** Component did mount logic. */
  componentDidMount() {
    super.componentDidMount();
    $(document).on('changePriorityStart', this._handleOpen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    super.componentWillUnmount();
    $(document).off('changePriorityStart', this._handleOpen);
  }
}


module.exports = {
  PriorityChangingDialog: PriorityChangingDialog,
};
