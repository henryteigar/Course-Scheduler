import React from 'react';

import 'client/components/SearchBox/search-box.scss';

const SearchBox = (props) => {
    return (
        <input value={props.value}
               className={props.class}
               onChange={props.changeHandler}
               onKeyPress={props.keyPressHandler}
               placeholder={props.placeholder}/>
    )
};

export default SearchBox;