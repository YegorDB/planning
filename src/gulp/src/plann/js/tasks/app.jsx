const $ = require('jquery-browserify');
const React = require('react');

const { TasksDialogs } = require('./dialogs.jsx');
const { Items } = require('./items/main.jsx');
const { Header } = require('../base/header/main.jsx');
const { WaitScreen } = require('../../../base/js/base/wait_screen.jsx');


/** Tasks page app. */
class App extends React.Component {

  static FILTER_PRIORITY = 'priority';
  static FILTER_STATUS = 'status';
  static FILTER_TAGS = 'tags';
  static ALL_FILTERS = [
    App.FILTER_PRIORITY,
    App.FILTER_STATUS,
    App.FILTER_TAGS,
  ];

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      filters: this._getInitialFiltersData(),
      search: '',
    };

    this._handleSetFilter = this._handleSetFilter.bind(this);
    this._handleSetSearch = this._handleSetSearch.bind(this);
    this._handleAddFilterTag = this._handleAddFilterTag.bind(this);
    this._handleRemoveFilterTag = this._handleRemoveFilterTag.bind(this);
    this._handleResetFiltersAndSearch = this._handleResetFiltersAndSearch.bind(this);
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('setFilter', this._handleSetFilter);
    $(document).on('setSearch', this._handleSetSearch);
    $(document).on('addFilterTag', this._handleAddFilterTag);
    $(document).on('removeFilterTag', this._handleRemoveFilterTag);
    $(document).on('resetFiltersAndSearch', this._handleResetFiltersAndSearch);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('setFilter', this._handleSetFilter);
    $(document).off('setSearch', this._handleSetSearch);
    $(document).off('addFilterTag', this._handleAddFilterTag);
    $(document).off('removeFilterTag', this._handleRemoveFilterTag);
    $(document).off('resetFiltersAndSearch', this._handleResetFiltersAndSearch);
  }

  /**
   * Render app.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <Header withFilters={ true } withSearch={ true } />
        <div id="content" >
          <Items
            filters={ this.state.filters }
            search={ this.state.search } />
        </div>
        <TasksDialogs filters={ this.state.filters } />
        <WaitScreen />
      </div>
    );
  }

  /**
   * Set filter values by specific stack item data name.
   * @private
   * @param {string} name - Stack item data name.
   * @param {Array} values - Possible stack item data values.
   */
  _setFilter(name, value) {
    if (!App.ALL_FILTERS.includes(name)) {
      throw Error(`Wrong filter item data name "${name}".`);
    }
    if (!Array.isArray(value)) {
      throw Error('Values argument has to be an array.');
    }
    this.setState(state => ({
      filters: {
        ...state.filters,
        [name]: value,
      },
    }));
  }

  /**
   * Set filter handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleSetFilter(event) {
    this._setFilter(event.name, event.values);
  }

  /**
   * Set search handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleSetSearch(event) {
    this.setState({
      search: event.value,
    });
  }

  /**
   * Add filter tag handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleAddFilterTag(event) {
    this.setState(state => ({
      filters: {
        ...state.filters,
        tags: {
          ...state.filters.tags,
          [event.tagId]: event.tagName,
        },
      },
    }));
  }

  /**
   * Remove filter tag handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleRemoveFilterTag(event) {
    this.setState(state => ({
      filters: {
        ...state.filters,
        tags: Object.fromEntries(
          Object.entries(state.filters.tags)
          .filter(([tag_id, _]) => tag_id != event.tagId)
        ),
      },
    }));
  }

  /**
   * Reset filters and search data.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleResetFiltersAndSearch(event) {
    this.setState({
      filters: this._getInitialFiltersData(),
      search: '',
    });
  }

  /**
   * Get initial filters data.
   * @private
   * @returns {Object}
   */
  _getInitialFiltersData() {
    return {
      [App.FILTER_PRIORITY]: (
        Object.keys(CHOISES.task.priority).map(p => parseInt(p))
      ),
      [App.FILTER_STATUS]: (
        Object.keys(CHOISES.task.status).map(p => parseInt(p))
      ),
      [App.FILTER_TAGS]: {},
    };
  }
}


module.exports = {
  App: App,
};
