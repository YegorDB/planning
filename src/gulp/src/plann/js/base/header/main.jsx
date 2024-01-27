const React = require('react');

const { CreationButton } = require('./creation_button.jsx');
const { Logo } = require('./logo.jsx');
const { PriorityFilterButton } = require('./priority_filter_button.jsx');
const { ResetButton } = require('./reset_button.jsx');
const { Search } = require('./search.jsx');
const { StatusFilterButton } = require('./status_filter_button.jsx');
const { TagsFilterButton } = require('./tags_filter_button.jsx');


/** Header filers. */
class HeaderFilers extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div id="header-filters" >
        <PriorityFilterButton />
        <StatusFilterButton />
        <TagsFilterButton />
      </div>
    );
  }
}


/** Header. */
class Header extends React.Component {

  /**
   * Render.
   * @returns {React.Element}
   */
  render() {
    return (
      <div id="header" >
        <Logo />
        <CreationButton />
        {
          this.props.withFilters ?
          <HeaderFilers /> :
          null
        }
        {
          this.props.withSearch ?
          <Search /> :
          null
        }
        {
          this.props.withFilters || this.props.withSearch ?
          <ResetButton /> :
          null
        }
      </div>
    );
  }
}


module.exports = {
  Header: Header,
};
