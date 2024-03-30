const $ = require('jquery-browserify');
const React = require('react');
const { Item } = require('./item/main.jsx');
const { ShowMoreTasksButton } = require('./show_more_tasks_button.jsx');


/** Tasks items. */
class Items extends React.Component {

  static PAGINATION_STEP = 10;

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      offset: 0,
      items: [],
    };

    this._handleAddTask = this._handleAddTask.bind(this);
    this._handleShowMoreTasksStart = this._handleShowMoreTasksStart.bind(this);

    this._getTasksData();
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('addTask', this._handleAddTask);
    $(document).on('showMoreTasksStart', this._handleShowMoreTasksStart);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('addTask', this._handleAddTask);
    $(document).off('showMoreTasksStart', this._handleShowMoreTasksStart);
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
          this.state.items.map(data =>
            <Item taskData={ data } key={ data.id } />
          )
        }
        { this.state.offset < this.state.count && <ShowMoreTasksButton/> }
      </div>
    );
  }

  /**
   * Get tasks data.
   * @param {Object} options - Options.
   * @param {boolean} options.showMore - Show more items or not.
   * @private
   */
  _getTasksData(options) {
    options = options || {};

    $.ajax({
      url: URLS.user_tasks,
      data: {
        priority__in: this.props.filters.priority.join(','),
        status__in: this.props.filters.status.join(','),
        tags__id__in: Object.keys(this.props.filters.tags).join(','),
        search: this.props.search,
        limit: Items.PAGINATION_STEP,
        offset: options.showMore ? this.state.offset : 0,
      },
    })
    .done((data) => {
      this.setState(state => ({
        count: data.count,
        offset: state.offset + Items.PAGINATION_STEP,
        items: options.showMore ? [...state.items, ...data.items] : data.items,
      }));
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

  /**
   * Show more tasks handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleShowMoreTasksStart(event) {
    this._getTasksData({
      showMore: true,
    });
  }
}


module.exports = {
  Items: Items,
};
