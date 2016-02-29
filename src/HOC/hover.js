import React, { Component } from 'react'

export default function (CustomComponent) {
    return class extends Component {
        state = {
            isHover: false
        }

        render() {
            //не менять html структуру в HOC
            return (
                <div onMouseOver = {this.onHover} onMouseOut = {this.offHover}>
                    <CustomComponent
                        {...this.state}
                        {...this.props}
                        {...{getHoverText: this.getHoverText}}
                    />
                </div>)
        }

        onHover = () => {
            this.setState({
                isHover: true
            })
        }

        offHover = () => {
            this.setState({
                isHover: false
            })
        }

        getHoverText = () => {
            const hoverEl = <span>Hover</span>
            return (this.state.isHover ? hoverEl  : null)
        }
    }
}
