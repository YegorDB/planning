const React = require('react');

const { CreationButton } = require('./creation_button.jsx');
const { PriorityFilterButton } = require('./priority_filter_button.jsx');
const { StatusFilterButton } = require('./status_filter_button.jsx');


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
        <PriorityFilterButton />
        <StatusFilterButton />
      </div>
    );
  }
}


module.exports = {
  Header: Header,
};
