const $ = require('jquery-browserify');
const React = require('react');
const { Item } = require('./item/main.jsx');


/** Tasks items. */
class Items extends React.Component {

  static STATUS_SORT_DATA = {
    'IP': 3,
    'NS': 2,
    'DN': 1,
    'CL': 0,
  };

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };

    this._handleAddTask = this._handleAddTask.bind(this);

    this._getTasksData();
  }

  /**
   * Items.
   * @returns {Object[]} Stack items data.
   */
  get items() {
    return this._sort(this._filter(Object.values(this.state.items)));
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('addTask', this._handleAddTask);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('addTask', this._handleAddTask);
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-items" >
        { this.items.map(data => <Item taskData={ data } key={ data.id } />) }
      </div>
    );
  }

  /**
   * Filter items.
   * @private
   * @param {Array} items - Tasks items array.
   * @return {Array} Filtered items.
   */
  _filter(items) {
    for (let key of Object.keys(this.props.filters)) {
      items = items.filter(item => this.props.filters[key].includes(item[key]));
    }
    return items;
  }

  /**
   * Sort items.
   * @private
   * @param {Array} items - Tasks items array.
   * @return {Array} Sorted items.
   */
  _sort(items) {
    return (
      items
      .sort((a, b) => {
        if (a.priority > b.priority) return -1;
        if (a.priority < b.priority) return 1;
        return 0;
      })
      .sort((a, b) => {
        a = Items.STATUS_SORT_DATA[a.status];
        b = Items.STATUS_SORT_DATA[b.status];
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      })
    );
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
  Items: Items,
};
