const $ = require('jquery-browserify');
const React = require('react');

const { TaskContentLine, TaskContentWrapper } = require('./content.jsx');


/** Task tag. */
class Tag extends React.Component {

  /**
   * Render task tag.
   * @returns {React.Element}
   */
  render() {
    return <div className="task-tag">{ this.props.value }</div>;
  }
}


/** Task tags list. */
class TaskTagsList extends React.Component {

  /**
   * Render task tags list.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-tags" >
        {
          this.props.values
          .map(id =>
            <Tag value={ TAGS[id] } key={ id } />
          )
        }
      </div>
    );
  }
}


/** Task tags. */
class TaskTags extends React.Component {

  /**
   * Creation.
   * @param {string} props.values - Task tags ids.
   */
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Render task tags.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <TaskContentLine title="Tags" />
        <TaskContentWrapper>
          <div onClick={ this._handleClick } className="interactive" >
            {
              this.props.values.length > 0
              ? <TaskTagsList values={ this.props.values } />
              : <p>{ 'There are no tags yet ...' }</p>
            }
          </div>
        </TaskContentWrapper>
      </div>
    );
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClick(event) {
    $(document).trigger('changeTagsStart');
  }
}


module.exports = {
  TaskTags: TaskTags,
};
