import $ from 'jquery'

export function loadCommentsByArticleId({ articleId }) {
    return $.get(`/api/comment?article=${articleId}`)
}