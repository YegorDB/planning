const $ = require('jquery-browserify');
const React = require('react');
const { Item } = require('./item/main.jsx');


/** Tasks items. */
class Items extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      items: [],
    };

    this._handleAddTask = this._handleAddTask.bind(this);

    this._getTasksData();
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('addTask', this._handleAddTask);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('addTask', this._handleAddTask);
  }

  /** Component did update logic. */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.search != prevProps.search) {
      this._getTasksData();
      return;
    }
    if (this.props.filters.priority.join() !== prevProps.filters.priority.join()) {
      this._getTasksData();
      return;
    }
    if (this.props.filters.status.join() !== prevProps.filters.status.join()) {
      this._getTasksData();
      return;
    }
    if (Object.keys(this.props.filters.tags).join() !== Object.keys(prevProps.filters.tags).join()) {
      this._getTasksData();
      return;
    }
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-items" >
        {
          this.state.items
          .map(data =>
            <Item taskData={ data } key={ data.id } />
          )
        }
      </div>
    );
  }

  /**
   * Get tasks data.
   * @private
   */
  _getTasksData() {
    $.ajax({
      url: URLS.user_tasks,
      data: {
        priority__in: this.props.filters.priority.join(','),
        status__in: this.props.filters.status.join(','),
        tags__id__in: Object.keys(this.props.filters.tags).join(','),
        search: this.props.search,
      },
    })
    .done((data) => {
      this.setState({
        count: data.count,
        items: data.items,
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
