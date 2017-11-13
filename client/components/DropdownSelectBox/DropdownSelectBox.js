import React, {Component} from 'react';

import './dropdown-select-box.scss'
import Ionicon from 'react-ionicons'

class DropdownSelectBox extends Component {
    constructor() {
        super();
        this.state = {
            selectedEl: null,
            isCollapsed: true
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    toggleCollapse() {
        this.setState({isCollapsed: !this.state.isCollapsed})
    }


    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({isCollapsed: true});
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

    onItemClickHandler(selectedEl) {
        this.setState({selectedEl});
        this.setState({isCollapsed: true});
        this.props.clickHandler({
            id: this.props.id,
            selectedEl: selectedEl
        });
    }

    render() {
        return (
            <div className={"dropdown-select-box " + this.props.className} ref={this.setWrapperRef}>
                {this.props.label ? <label>{this.props.label}</label> : null}
                <button onClick={this.toggleCollapse.bind(this)}>
                    <span>{this.state.selectedEl !== null ? this.state.selectedEl.label_eng : "Select option..."}</span>
                    <div className="toggle-btn">
                        <Ionicon className="icon" color="#385A7C"
                                 icon="ion-chevron-down"/>
                    </div>
                </button>
                <ul className={this.state.isCollapsed ? "collapsed" : ""}>
                    {this.props.values.map((el) =>
                        <li className={el === this.state.selectedEl ? "selected" : ""} onClick={(e) => this.onItemClickHandler(el)} key={el.id}>{el.label_eng}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default DropdownSelectBox;