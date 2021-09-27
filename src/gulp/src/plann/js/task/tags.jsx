const $ = require('jquery-browserify');
const React = require('react');


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
class TagsList extends React.Component {

  /**
   * Render task tags.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="task-tags" >
        {
          this.props.values
          .map(tag => <Tag value={ tag.name } key={ tag.id } />)
        }
      </div>
    );
  }
}


/** Task tags. */
class Tags extends React.Component {

  /**
   * Render task tags.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <h2>{ 'Tags' }</h2>
        {
          this.props.values.length > 0
          ? <TagsList values={ this.props.values } />
          : <p>{ 'There are no tags yet ...' }</p>
        }
      </div>
    );
  }
}


module.exports = {
  Tags: Tags,
};
