const $ = require('jquery-browserify');
const React = require('react');
const { Item } = require('./item/main.jsx');


/** Tasks items. */
class Items extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

    this._handleAddTask = this._handleAddTask.bind(this);

    this._getTasksData();
  }

  /**
   * Items.
   * @returns {Object[]} Stack items data.
   */
  get items() {
    return this._filter(this.state.items);
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
   * Get tasks data.
   * @private
   */
  _getTasksData() {
    $.ajax({
      url: URLS.user_tasks,
    })
    .done((data) => {
      this.setState({
        items: data,
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
    this._getTasksData();
  }
}


module.exports = {
  Items: Items,
};
