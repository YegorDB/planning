const $ = require('jquery-browserify');
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

    this._changeTaskHandler = (e) => {
      this.setState(state => {
        let item = state.items[e.id];
        if (item) {
          item[e.name] = e.value;
        }
        return {items: state.items};
      });
    };
    this._addTaskHandler = (e) => {
      this.setState(state => ({
        items: {
          ...state.items,
          [e.taskData.id]: e.taskData,
        },
      }));
    };
    this._setFilterHandler = (e) => {
      this._setFilter(e.name, e.values);
    };

    this._statusFilterHandler = (e) => {
      $(document).trigger({
        type: 'filterStatusStart',
        activeValues: this.state.filters[Stack.FILTER_STATUS],
      });
    };
    this._priorityFilterHandler = (e) => {
      $(document).trigger({
        type: 'filterPriorityStart',
        activeValues: this.state.filters[Stack.FILTER_PRIORITY],
      });
    };

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
    $(document).on('changeTask', this._changeTaskHandler);
    $(document).on('addTask', this._addTaskHandler);
    $(document).on('setFilter', this._setFilterHandler);
    $('#tasks-stack-filter-status').on('click', this._statusFilterHandler);
    $('#tasks-stack-filter-priority').on('click', this._priorityFilterHandler);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('changeTask', this._changeTaskHandler);
    $(document).off('addTask', this._addTaskHandler);
    $(document).off('setFilter', this._setFilterHandler);
    $('#tasks-stack-filter-status').off('click', this._statusFilterHandler);
    $('#tasks-stack-filter-priority').off('click', this._priorityFilterHandler);
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

  /** Get tasks data. */
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
}


module.exports = {
  Stack: Stack,
};
