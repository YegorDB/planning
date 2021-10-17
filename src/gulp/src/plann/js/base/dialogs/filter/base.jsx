const $ = require('jquery-browserify');
const React = require('react');
const { BaseDialog, DialogWrapper } = require('../base.jsx');


/** Task filter dialog item input logic. */
class FilterDialogItemInput extends React.Component {

  /**
   * Creation.
   * @param {string} props.value - Task filter dialog item value.
   * @param {string} props.inputId - Task filter dialog item input id.
   * @param {string[]} props.activeValues - Task filter dialog active values.
   * @param {string[]} props.filterName - Task filter name.
   */
  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }

  /**
   * Render dialog item input.
   * @returns {React.Element}
   */
  render() {
    return (
      <input
        type="checkbox"
        id={ this.props.inputId }
        value={ this.props.value }
        onChange={ this._handleChange }
        checked={ this.props.activeValues.includes(this.props.value) }
        className="styled-checkbox" />
    );
  }

  /**
   * Change handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleChange(event) {
    if (!event.target.checked) {
      this._trigerSetFilterEvent(
        this.props.activeValues
        .filter(v => v != this.props.value)
      );
    } else if (!this.props.activeValues.includes(this.props.value)) {
      this._trigerSetFilterEvent([...this.props.activeValues, this.props.value]);
    }
  }

  /**
   * Trigger set filter event.
   * @private
   * @param {Object[]} activeValues - Active values;
   */
  _trigerSetFilterEvent(activeValues) {
    $(document).trigger({
      type: 'setFilter',
      name: this.props.filterName,
      values: activeValues,
    });
  }
}


/** Task filter dialog item badge logic. */
class FilterDialogItemBadge extends React.Component {

  /**
   * Creation.
   * @param {string} props.name - Task filter dialog item name.
   * @param {string} props.className - Task filter dialog item class name.
   * @param {string} props.inputId - Task filter dialog item input id.
   */
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Render dialog item badge.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className={ this.props.className } onClick={ this._handleClick } >
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
    $(`#${ this.props.inputId } + label`).click();
  }
}


/** Task filter dialog item logic. */
class FilterDialogItem extends React.Component {

  /**
   * Render dialog item.
   * @returns {React.Element}
   */
  render() {
    let inputId = (
      `filter-checkbox-${ this.props.filterName }-${ this.props.value }`
    );
    return (
      <div>
        <FilterDialogItemInput
          value={ this.props.value }
          inputId={ inputId }
          activeValues={ this.props.activeValues }
          filterName={ this.props.filterName } />
        <label htmlFor={ inputId } />
        <this.props.ItemBadgeClass
          name={ this.props.name }
          value={ this.props.value }
          inputId={ inputId } />
      </div>
    );
  }
}


/** Task status changing dialog window logic. */
class FilterDialog extends BaseDialog {

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    return (
      <DialogWrapper opened={ this.state.opened } >
        {
          this.props.entries
          .map(([value, name]) =>
            <FilterDialogItem
              key={ value }
              name={ name }
              value={ value }
              activeValues={ this.props.activeValues }
              filterName={ this.props.filterName }
              ItemBadgeClass={ this.props.ItemBadgeClass }
            />
          )
        }
      </DialogWrapper >
    );
  }

  /** Component did mount logic. */
  componentDidMount() {
    super.componentDidMount();
    $(document).on(this.props.filterEventName, this._handleOpen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    super.componentWillUnmount();
    $(document).off(this.props.filterEventName, this._handleOpen);
  }
}


module.exports = {
  FilterDialogItemBadge: FilterDialogItemBadge,
  FilterDialog: FilterDialog,
};
