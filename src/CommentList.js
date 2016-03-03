import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import { addComment } from './actions/comments'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        articleId: PropTypes.any.isRequired
    };

    state = {
        isOpen: false,
        addCommentText: ""
    }

    render() {
        const { isOpen } = this.state
        const actionText = isOpen ? 'hide comments' : 'show comments'

        const comments = this.props.comments.map((comment) => <li key={comment.id}><Comment comment = {comment}/></li>)
        const commentInput = (
            <span>
                <input type="text" value={this.state.addCommentText} onChange={this.handleAddCommentTextChange}/>
                <button onClick={this.handleAddComment}>Add comment</button>
            </span>
        )
        const commentBlock = (
          <div>
              {commentInput}
              <ul>{comments}</ul>
          </div>
        );
        return (
            <div>
                <a href = "#" onClick = {this.toggleOpen}>{actionText}</a>
                <ul>{isOpen ? commentBlock : null}</ul>
            </div>
        )
    }

    toggleOpen = (ev) => {
        ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleAddComment = (ev) => {
        const commentText = this.state.addCommentText;
        if (commentText) {
            //Логику генерации id в AC
            const comment = {id: Date.now(), text: commentText}

            addComment({articleId: this.props.articleId, comment: comment});
        }
    }

    handleAddCommentTextChange = (ev) => {
        this.setState({
            addCommentText: ev.target.value
        })
    }
}

export default CommentList
