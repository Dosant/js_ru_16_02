import React, { Component, PropTypes } from 'react'
import {commentStore} from '../stores'
import {loadComments} from '../actions/comment'
import Comment from './Comment'
class CommentsPage extends Component {
    constructor(props) {
        super();
        this.state = {
            comments: commentStore.getCommentsPageComments(),
            total: commentStore.getTotal(),
            limit: 5,
            offset: 0,
            currentPage: 1
        }
        setTimeout(() => {
            loadComments({offset: this.state.offset, limit: this.state.limit});
        }, 0)

    }

    componentDidMount() {
        commentStore.addChangeListener(this.change)
    }

    componentWillUnmount() {
        commentStore.removeChangeListener(this.change)
    }

    componentWillUpdate (nextProps, nextState) {
        let {offset, limit} = nextState;
        if (this.state.offset === offset)
            return;

        setTimeout(() => {
            loadComments({
                offset,
                limit
            });
        }, 0)
    }


    render() {
        console.log('---', this.props.location.query);
        return (
            <div>
                <ul>
                    {this.getCommentList()}
                </ul>
                <div>
                    {this.getPagination()}
                </div>
            </div>
        )
    }

    getCommentList = () => {
        if (this.state.comments) {
            return this.state.comments.map(comment => <li key={comment.id}><Comment comment = {comment}/></li>)
        }
        return "";
    }

    getPagination = () => {
        const pageCount = Math.floor(this.state.total/this.state.limit);
        let pages = [];

        let activeStyle = {'color': 'blue'};

        for (let i = 0; i < pageCount; i++) {
            pages.push(<button key={i+1} onClick={this.changePage.bind(this, i+1)} style={this.state.currentPage == i+1 ? activeStyle : null}>{i+1}</button>)
        }
        return pages;
    }

    changePage = (toPage) => {
        this.setState({
            offset: toPage*this.state.limit,
            currentPage: toPage,
        });
    }

    change = () => {
        this.setState({
            comments: commentStore.getCommentsPageComments(),
            total: commentStore.getTotal()
        })
    }
}

export default CommentsPage