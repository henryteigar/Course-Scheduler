import React from 'react';

import 'client/components/SearchBox/search-box.scss';

const SearchBox = (props) => {
    return (
        <input className={props.class}
               onChange={props.changeHandler}
               onKeyPress={props.keyPressHandler}
               placeholder="Otsi aine koodi, nime, teaduskonda..."/>
    )
};

export default SearchBox;