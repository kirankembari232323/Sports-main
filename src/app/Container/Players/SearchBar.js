import React, { Fragment } from 'react';
import './Players.css'

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem",};
  return (
      <Fragment className="searchBar">
            <input 
            className="searchBar"
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"search Player"}
            onChange={(e) => setKeyword(e.target.value)}
            />
    </Fragment>
  );
}

export default SearchBar
