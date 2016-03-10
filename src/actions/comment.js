import AppDispatcher from '../dispatcher'
import { ADD_COMMENT, LOAD_COMMENTS_BY_ARTICLEID } from './constants'
import { loadCommentsByArticleId } from './api/comment'
import { asyncAC } from './api/utils'

export function addComment(text, articleId) {
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data: {
            text,
            id: Date.now(),
            articleId
        }
    })
}

export const loadComments = asyncAC(LOAD_COMMENTS_BY_ARTICLEID, loadCommentsByArticleId)
