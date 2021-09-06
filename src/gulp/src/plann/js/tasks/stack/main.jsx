const $ = require('jquery-browserify');
const React = require('react');
const { Item } = require('./item/main.jsx');


/** Tasks stack. */
class Stack extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };

    this._handleChangeTask = this._handleChangeTask.bind(this);
    this._handleAddTask = this._handleAddTask.bind(this);

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
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('changeTask', this._handleChangeTask);
    $(document).off('addTask', this._handleAddTask);
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
    for (let key of Object.keys(this.props.filters)) {
      items = items.filter(item => this.props.filters[key].includes(item[key]));
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
}


module.exports = {
  Stack: Stack,
};
