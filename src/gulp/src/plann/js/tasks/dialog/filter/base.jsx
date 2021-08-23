const $ = require('jquery-browserify');
const React = require('react');
const { BaseDialogComponent } = require('../base.jsx');


/** Task status changing dialog window logic. */
class BaseFilterDialog extends BaseDialogComponent {

  static FILTER_NAME = null;
  static FILTER_EVENT_NAME = null;

  /**
   * Creation.
   * @param {Object} props.choices - Data choices (value - name pairs).
   */
  constructor(props) {
    super(props);
    this._entries = this._getEntries(props.choices);
    this.state = {
      ...this.state,
      activeValues: this._getValues(props.choices),
    };

    $(document).on(this.constructor.FILTER_EVENT_NAME, this.openFunction);
  }

  /**
   * Dialog items.
   * @returns {React.Element[]}
   */
  get items() {
    return this._entries.map(([value, name]) => {
      let inputId = `filter-checkbox-${this.constructor.FILTER_NAME}-${value.toString().toLowerCase()}`;

      return (
        <div key={value}>
          <input type="checkbox"
                 id={inputId}
                 value={value}
                 onChange={this._getItemChangeHandler(inputId, value)}
                 checked={this.state.activeValues.includes(value)}
                 className="styled-checkbox" />
          <label htmlFor={inputId} />
          <div className={this._getItemClasses(value)}
               onClick={this._getItemClickHandler(inputId)} >
            {name}
          </div>
        </div>
      );
    });
  }

  /**
   * Get entries.
   * @private
   * @param {Object} choices - Value - name pairs;
   * @return {Object[][]} Array of value - name pairs;
   */
  _getEntries(choices) {
    return Object.entries(choices);
  }

  /**
   * Get values.
   * @private
   * @param {Object} choices - Value - name pairs;
   * @return {string[]} Array of values;
   */
  _getValues(choices) {
    return Object.keys(choices);
  }

  /**
   * Get item classes.
   * @private
   * @abstract
   * @param {string} value - Choice value;
   * @return {string} Classes names;
   */
  _getItemClasses(value) {}

  /**
   * Get item click handler.
   * @private
   * @param {string} inputId - Item input id;
   * @return {function} Click handler;
   */
  _getItemClickHandler(inputId) {
    return (e) => {
      $(`#${inputId} + label`).click();
    };
  }

  /**
   * Get item change handler.
   * @private
   * @param {string} inputId - Item input id;
   * @param {string} value - Choice value;
   * @return {function} Change handler;
   */
  _getItemChangeHandler(inputId, value) {
    return (e) => {
      if (!e.target.checked) {
        this.setState(state => {
          let activeValues = state.activeValues.filter(v => v != value);
          this._trigerSetFilterEvent(activeValues);
          return {activeValues: activeValues};
        });
      } else if (!this.state.activeValues.includes(value)) {
        this.setState(state => {
          let activeValues = [...state.activeValues, value];
          this._trigerSetFilterEvent(activeValues);
          return {activeValues: activeValues};
        });
      }
    };
  }

  /**
   * Trigger set filter event.
   * @private
   * @param {Object[]} activeValues - Active values;
   */
  _trigerSetFilterEvent(activeValues) {
    $(document).trigger({
      type: 'setFilter',
      name: this.constructor.FILTER_NAME,
      values: activeValues,
    });
  }
}


module.exports = {
  BaseFilterDialog: BaseFilterDialog,
};
