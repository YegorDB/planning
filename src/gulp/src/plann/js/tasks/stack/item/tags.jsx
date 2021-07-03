const $ = require('jquery-browserify');


/** Tasks stack item tag. */
class Tag extends React.Component {

  /**
   * Render stack item tag.
   * @returns {React.Element}
   */
  render() {
    return <div className="task-tag">{ this.props.value }</div>;
  }
}


/** Tasks stack item tags. */
class Tags extends React.Component {

  /**
   * Render stack item tags.
   * @returns {React.Element}
   */
  render() {
    let items = [];
    let activeTags = {};
    for (let tag of this.props.values) {
      items.push(
        <Tag value={ tag.name } key={ tag.id } />
      );
      activeTags[tag.id] = tag.name;
    }

    let onClick = (e) => {
      $(document).trigger({
        type: 'openTasksChangingDialog',
        activeTags: activeTags,
        id: this.props.id,
      });
    };

    return (
      <div className="tasks-stack-cell tasks-stack-cell-tags" >
        <div className="tasks-stack-cell-data" >
          { items }
        </div>
        <div className="tasks-stack-cell-tags-change"
             onClick={ onClick } >
          edit
        </div>
      </div>
    );
  }
}


module.exports = {
  Tags: Tags,
};
