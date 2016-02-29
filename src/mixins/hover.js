import React, { Component } from 'react'

//кроме isHover нужно сохранять текст
export default {
    getInitialState() {
        return {
            isHover: false
        }
    },
    onHover: function () {
        this.setState({
            isHover: true
        })
    },
    offHover: function () {
        this.setState({
            isHover: false
        })
    },
    getHover : function() {
        const hoverEl = <span>Hover</span>
        return (this.state.isHover ? hoverEl  : null)
    }
}
