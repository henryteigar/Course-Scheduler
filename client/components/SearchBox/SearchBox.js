import React from 'react';

import 'client/components/SearchBox/search-box.scss';

const SearchBox = (props) => {
    return (
        <input className="searchBox"
               onChange={props.updateQuery}
               onKeyPress={props.handleKeyPress}
               placeholder="Otsi aine koodi, nime, teaduskonda..."/>
    )
};

export default SearchBox;