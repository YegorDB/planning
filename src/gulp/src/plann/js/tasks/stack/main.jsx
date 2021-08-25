const $ = require('jquery-browserify');
const React = require('react');
const { Item } = require('./item/main.jsx');


/** Tasks stack. */
class Stack extends React.Component {

  static FILTER_PRIORITY = 'priority';
  static FILTER_STATUS = 'status';
  static ALL_FILTERS = [
    Stack.FILTER_PRIORITY,
    Stack.FILTER_STATUS,
  ];

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      filters: {
        [Stack.FILTER_PRIORITY]: (
          Object.keys(CHOISES.task.priority).map(p => parseInt(p))
        ),
        [Stack.FILTER_STATUS]: Object.keys(CHOISES.task.status),
      }
    };

    this._handleChangeTask = this._handleChangeTask.bind(this);
    this._handleAddTask = this._handleAddTask.bind(this);
    this._handleSetFilter = this._handleSetFilter.bind(this);

    this._getTasksData();
  }

  /**
   * Stack items.
   * @returns {Object[]} Stack items data.
   */
  get items() {
    return this._sort(this._filter(Object.values(this.state.items)));
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('changeTask', this._handleChangeTask);
    $(document).on('addTask', this._handleAddTask);
    $(document).on('setFilter', this._handleSetFilter);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('changeTask', this._handleChangeTask);
    $(document).off('addTask', this._handleAddTask);
    $(document).off('setFilter', this._handleSetFilter);
  }

  /**
   * Render stack.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        { this.items.map(data => <Item taskData={ data } key={ data.id } />) }
      </div>
    );
  }

  /**
   * Filter stack items.
   * @private
   * @param {Array} items - Tasks stack items array.
   * @return {Array} Filtered stack items.
   */
  _filter(items) {
    for (let key of Object.keys(this.state.filters)) {
      items = items.filter(item => this.state.filters[key].includes(item[key]));
    }
    return items;
  }

  /**
   * Sort stack items.
   * @private
   * @param {Array} items - Tasks stack items array.
   * @return {Array} Sorted stack items.
   */
  _sort(items) {
    return items.sort((a, b) => {
      if (a.priority > b.priority) return -1;
      if (a.priority < b.priority) return 1;
      return 0;
    });
  }

  /**
   * Get tasks data.
   * @private
   */
  _getTasksData() {
    $.ajax({
      url: URLS.user_tasks,
    })
    .done((data) => {
      let items = {};
      for (let item of data) {
        items[item.id] = item;
      }
      this.setState({
        items: items,
      });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('jqXHR', jqXHR);
    });
  }

  /**
   * Set filter values by specific stack item data name.
   * @private
   * @param {string} name - Stack item data name.
   * @param {Array} values - Possible stack item data values.
   */
  _setFilter(name, value) {
    if (!Stack.ALL_FILTERS.includes(name)) {
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
   * Change task handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleChangeTask(event) {
    this.setState(state => {
      let item = state.items[event.id];
      if (item) {
        item[event.name] = event.value;
      }
      return {items: state.items};
    });
  }

  /**
   * Add task handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleAddTask(event) {
    this.setState(state => ({
      items: {
        ...state.items,
        [event.taskData.id]: event.taskData,
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
}


module.exports = {
  Stack: Stack,
};
