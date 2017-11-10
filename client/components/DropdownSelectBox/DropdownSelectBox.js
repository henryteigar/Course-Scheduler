import React, {Component} from 'react';

import './dropdown-select-box.scss'
import Ionicon from 'react-ionicons'

class DropdownSelectBox extends Component {
    constructor() {
        super();
        this.state = {
            selectedValue: null,
            isCollapsed: true
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    toggleCollapse() {
        this.setState({isCollapsed: !this.state.isCollapsed})
    }

    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            //alert('You clicked outside of ' + this.props.name);
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    render() {
        return (
            <div className="dropdown-select-box" ref={this.setWrapperRef}>
                <button onClick={this.toggleCollapse.bind(this)}>Selected item</button>
                <ul className={this.state.isCollapsed ? "collapsed" : ""}>
                    <li>Option 1</li>
                    <li>Option 2</li>
                </ul>
            </div>
        );
    }
}

export default DropdownSelectBox;