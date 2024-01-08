const React = require('react');

const { CreationButton } = require('./creation_button.jsx');
const { Logo } = require('./logo.jsx');
const { PriorityFilterButton } = require('./priority_filter_button.jsx');
const { StatusFilterButton } = require('./status_filter_button.jsx');
const { Search } = require('./search.jsx');


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
          <div></div>
        }
        {
          this.props.withSearch ?
          <Search /> :
          <div></div>
        }
      </div>
    );
  }
}


module.exports = {
  Header: Header,
};
