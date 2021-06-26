/** Tasks stack item tag. */
class Tag extends React.Component {

  /**
   * Render stack item tag.
   * @returns {React.Element}
   */
  render() {
    return <div>{ this.props.value }</div>;
  }
}


/** Tasks stack item tags. */
class Tags extends React.Component {

  /**
   * Render stack item tags.
   * @returns {React.Element}
   */
  render() {
    let items = this.props.values.map(tag => (
      <Tag value={ tag.name } key={ tag.id } />
    ));
    return (
      <div className="tasks-stack-cell tasks-stack-cell-tags" >
        <div className="tasks-stack-cell-data" >
          { items }
        </div>
      </div>
    );
  }
}


module.exports = {
  Tags: Tags,
};
