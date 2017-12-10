import React, { Component } from 'react';

import 'client/components/Modal/modal.scss';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.addClickEventListenerToWindow();
    }

    addClickEventListenerToWindow() {
        window.addEventListener('click', (e) => {
            if (e.target.id === this.props.id) {
                this.closeGroupSelectModal();
            }
        });
    }

    closeGroupSelectModal() {
        const modal = document.getElementById(this.props.id);
        modal.style.display = "none";
    }

    render() {
        return (
            <div id={this.props.id} className="modal">
                <div className="modal-content">
                    <h3>{this.props.heading}</h3>
                    {this.props.showX ?
                        <span onClick={this.closeGroupSelectModal.bind(this)} className="close">&times;</span> : ""
                    }
                    {this.props.child}
                </div>
            </div>
        )
    }
}

export default Modal;