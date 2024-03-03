const $ = require('jquery-browserify');
const React = require('react');
const { BaseDialog, DialogWrapper } = require('../base.jsx');


/** Tags search input. */
class TagsSearchInput extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);
    this._searchTimeout = null;
    this._handleChange = this._handleChange.bind(this);
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <input
          onChange={ this._handleChange }
          placeholder="Tags search"
          className="tags-search-input" />
      </div>
    );
  }

  /**
   * Change handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleChange(event) {
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => {
      $(document).trigger({
        type: 'setTagsSearch',
        value: $(event.target).val(),
      });
    }, 500);
  }
}


/** Tags search results item. */
class TagsSearchResultsItem extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div
        onClick={ this._handleClick }
        className="tags-search-results-item" >
        { this.props.tagName }
      </div>
    );
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClick(event) {
    $(document).trigger({
      type: 'addFilterTag',
      tagId: this.props.tagId,
      tagName: this.props.tagName,
    });
  }
}


/** Tags search results. */
class TagsSearchResults extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

    this._getTagsData();
  }

  /** Component did update logic. */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.search != prevProps.search) {
      this._getTagsData();
    }
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="tags-search-results" >
        {
          this.state.items.length > 0 ? (
            this.state.items
            .map(item =>
              <TagsSearchResultsItem
                tagId={ item.id }
                tagName={ item.name }
                key={ item.id }
              />
            )
          ) : 'No tags found.'
        }
      </div>
    );
  }

  /**
   * Get tags data.
   * @private
   */
  _getTagsData() {
    if (this.props.search === null || this.props.search === '') {
      return;
    }

    $.ajax({
      url: URLS.tags,
      data: {
        search: this.props.search,
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
}


/** Tags search. */
class TagsSearch extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this._handleSetTagsSearch = this._handleSetTagsSearch.bind(this);
  }

  /** Component did mount logic. */
  componentDidMount() {
    $(document).on('setTagsSearch', this._handleSetTagsSearch);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    $(document).off('setTagsSearch', this._handleSetTagsSearch);
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div>
        <TagsSearchInput />
        <TagsSearchResults search={ this.state.search } />
      </div>
    );
  }

  /**
   * Set search handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleSetTagsSearch(event) {
    this.setState({
      search: event.value,
    });
  }
}


/** Selected tags item. */
class SelectedTagsItem extends React.Component {

  /** Creation. */
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div
        onClick={ this._handleClick }
        className="selected-tags-item" >
        { this.props.tagName }
      </div>
    );
  }

  /**
   * Click handler.
   * @private
   * @param {Event} event - DOM event.
   */
  _handleClick(event) {
    $(document).trigger({
      type: 'removeFilterTag',
      tagId: this.props.tagId,
    });
  }
}


/** Selected tags. */
class SelectedTags extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="selected-tags" >
        {Object.entries(this.props.values).map(([tagId, tagName]) =>
          <SelectedTagsItem
            tagId={ tagId }
            tagName={ tagName }
            key={ tagId }
          />
        )}
      </div>
    );
  }
}


/** Tags filter dialog window logic. */
class TagsFilterDialog extends BaseDialog {

  /**
   * Render dialog window.
   * @returns {React.Element}
   */
  render() {
    return (
      <DialogWrapper opened={ this.state.opened } >
        <TagsSearch />
        <SelectedTags values={ this.props.values }/>
      </DialogWrapper >
    );
  }

  /** Component did mount logic. */
  componentDidMount() {
    super.componentDidMount();
    $(document).on('filterTagsStart', this._handleOpen);
  }

  /** Component will unmount logic. */
  componentWillUnmount() {
    super.componentWillUnmount();
    $(document).off('filterTagsStart', this._handleOpen);
  }
}


module.exports = { TagsFilterDialog };
