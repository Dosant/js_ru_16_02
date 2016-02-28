import React, { Component } from 'react'
import CommentList from './CommentList'
import toggleOpen from './mixins/toggleOpen'
import hover from './mixins/hover'

const Article = React.createClass({
    mixins: [hover, toggleOpen],

    componentDidMount() {
        console.log('---', this.refs.container);
    },

    render() {
        return (
            <div ref="container" onMouseOver={this.onHover} onMouseOut={this.offHover}>
                <a href = "#" onClick = {this.select} >select</a>
                {this.getTitle()}
                {this.getHover()}
                {this.getBody()}
            </div>
        )
    },

    getTitle() {
        const { title } = this.props.article
        const selectedStyle = this.props.selected ? {color: 'red'} : null;
        return  (
            <h3 style = {selectedStyle} onClick={this.toggleOpen}>
                {title}
            </h3>
        )
    },

    getBody() {
        if (!this.state.isOpen) return null
        const {article} = this.props
        return (
            <div>
                <p>{article.body}</p>
                <CommentList comments = {article.comments || []} />
            </div>
        )
    },

    select(ev) {
        ev.preventDefault()
        this.props.select()
    }
})

export default Article