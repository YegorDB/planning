const React = require('react');

const { CreationButton } = require('./creation_button.jsx');
const { PriorityFilterButton } = require('./priority_filter_button.jsx');
const { StatusFilterButton } = require('./status_filter_button.jsx');


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
        <CreationButton />
        {
          this.props.withFilters ?
          <HeaderFilers /> :
          <div></div>
        }
      </div>
    );
  }
}


module.exports = {
  Header: Header,
};