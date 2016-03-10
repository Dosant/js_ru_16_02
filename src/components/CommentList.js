import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from './../HOC/toggleOpen'
import { addComment, loadComments } from './../actions/comment'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object,

        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    state = {
        comment: '',
        loading: true
    }

    componentWillReceiveProps(newProps) {
        const { id } = newProps.article

        if (newProps.isOpen && !newProps.article.commentsLoaded && !newProps.article.commentsLoading) {
            loadComments({ articleId: id });
        }

        if (newProps.article.commentsLoaded) {
            this.setState({loading: false});
        }
    }


    render() {
        const { isOpen, toggleOpen } = this.props;
        const actionText = isOpen ? 'hide comments' : 'show comments';

        return (
            <div>
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article, isOpen } = this.props;
        if (!isOpen) return null;
        let commentList = [];
        if (this.props.article.commentsLoaded) {
            commentList = article.getRelation('comments').map(comment => <li key={comment.id}><Comment comment = {comment}/></li>)
            if (commentList.length === 0) {
                commentList.push(<li>No Comments Yet</li>);
            }

        }

        return (
            <div>
                {article.commentsLoaded ? <ul>{commentList}</ul> : <h4>Loading</h4>}
                <input value = {this.state.comment} onChange = {this.commentChange}/>
                <a href = "#" onClick = {this.submitComment}>add comment</a>
            </div>
        )
    }

    commentChange = (ev) => {
        this.setState({
            comment: ev.target.value
        })
    }

    submitComment = (ev) => {
        ev.preventDefault()
        addComment(this.state.comment, this.props.article.id)
        this.setState({
            comment: ''
        })
    }

    toggleOpen = (ev) => {
        ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default toggleOpen(CommentList)