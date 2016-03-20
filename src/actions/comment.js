import AppDispatcher from '../dispatcher'
import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, LOAD_ALL_COMMENTS, LOAD_COMMENTS } from './constants'
import { loadForArticle, loadAllComments as _loadAllComments, loadComments as _loadComments } from './api/comment'
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

export const loadCommentsForArticle = asyncAC(LOAD_COMMENTS_FOR_ARTICLE, loadForArticle)
export const loadAllComments = asyncAC(LOAD_ALL_COMMENTS, _loadAllComments)
export const loadComments = asyncAC(LOAD_COMMENTS, _loadComments)