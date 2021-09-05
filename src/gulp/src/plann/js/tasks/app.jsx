const $ = require('jquery-browserify');
const React = require('react');

const { Dialogs } = require('./dialogs/main.jsx');
const { Header } = require('./header/main.jsx');
const { Stack } = require('./stack/main.jsx');
const { WaitScreen } = require('./wait_screen.jsx');


/** Tasks page app. */
class App extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      waitScreen: false,
    };

    this._handleEnableWaitScreen = this._handleEnableWaitScreen.bind(this);
    this._handleDisableWaitScreen = this._handleDisableWaitScreen.bind(this);
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('enableWaitScreen', this._handleEnableWaitScreen);
    $(document).on('disableWaitScreen', this._handleDisableWaitScreen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('enableWaitScreen', this._handleEnableWaitScreen);
    $(document).off('disableWaitScreen', this._handleDisableWaitScreen);
  }

  /**
   * Render stack.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <Header />
        <Stack />
        <Dialogs />
        <WaitScreen enabled={ this.state.waitScreen } />
      </div>
    );
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
}


module.exports = {
  App: App,
};
