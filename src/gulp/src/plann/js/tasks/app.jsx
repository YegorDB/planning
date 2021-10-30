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
  static ALL_FILTERS = [
    App.FILTER_PRIORITY,
    App.FILTER_STATUS,
  ];

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        [App.FILTER_PRIORITY]: (
          Object.keys(CHOISES.task.priority).map(p => parseInt(p))
        ),
        [App.FILTER_STATUS]: (
          Object.keys(CHOISES.task.status).map(p => parseInt(p))
        ),
      },
      search: '',
    };

    this._handleSetFilter = this._handleSetFilter.bind(this);
    this._handleSetSearch = this._handleSetSearch.bind(this);
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('setFilter', this._handleSetFilter);
    $(document).on('setSearch', this._handleSetSearch);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('setFilter', this._handleSetFilter);
    $(document).off('setSearch', this._handleSetSearch);
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
      throw Error(`Wrong stack item data name "${name}".`);
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
}


module.exports = {
  App: App,
};
