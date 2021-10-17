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
    for (let k of Object.keys(this.props.filters)) {
      if (this.props.filters[k].join() !== prevProps.filters[k].join()) {
        this._getTasksData();
        return;
      }
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
        priority__in: this.props.filters.priority,
        status__in: this.props.filters.status,
      },
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
