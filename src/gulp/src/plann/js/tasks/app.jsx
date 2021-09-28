const $ = require('jquery-browserify');
const React = require('react');

const { TasksDialogs } = require('./dialogs.jsx');
const { Items } = require('./items/main.jsx');
const { Header } = require('./header/main.jsx');
const { WaitScreen } = require('./wait_screen.jsx');


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
      waitScreen: false,
      filters: {
        [App.FILTER_PRIORITY]: (
          Object.keys(CHOISES.task.priority).map(p => parseInt(p))
        ),
        [App.FILTER_STATUS]: Object.keys(CHOISES.task.status),
      }
    };

    this._handleEnableWaitScreen = this._handleEnableWaitScreen.bind(this);
    this._handleDisableWaitScreen = this._handleDisableWaitScreen.bind(this);
    this._handleSetFilter = this._handleSetFilter.bind(this);
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('enableWaitScreen', this._handleEnableWaitScreen);
    $(document).on('disableWaitScreen', this._handleDisableWaitScreen);
    $(document).on('setFilter', this._handleSetFilter);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('enableWaitScreen', this._handleEnableWaitScreen);
    $(document).off('disableWaitScreen', this._handleDisableWaitScreen);
    $(document).off('setFilter', this._handleSetFilter);
  }

  /**
   * Render app.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <Header />
        <Items filters={ this.state.filters } />
        <TasksDialogs filters={ this.state.filters } />
        <WaitScreen enabled={ this.state.waitScreen } />
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
   * Enable wait screen handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleEnableWaitScreen(event) {
    this.setState({
      waitScreen: true,
    });
  }

  /**
   * Disable wait screen handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleDisableWaitScreen(event) {
    this.setState({
      waitScreen: false,
    });
  }

  /**
   * Set filter handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleSetFilter(event) {
    this._setFilter(event.name, event.values);
  }
}


module.exports = {
  App: App,
};
