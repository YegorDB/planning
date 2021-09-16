const $ = require('jquery-browserify');
const React = require('react');
const { Item } = require('./item/main.jsx');


/** Tasks items. */
class Items extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };

    this._getTasksData();
  }

  /**
   * Items.
   * @returns {Object[]} Stack items data.
   */
  get items() {
    return this._sort(this._filter(Object.values(this.state.items)));
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
}


module.exports = {
  Items: Items,
};