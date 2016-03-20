import $ from 'jquery'

export function loadForArticle({ articleId }) {
    return $.get(`/api/comment?article=${articleId}`)
}

export function loadAllComments () {
    return $.get('/api/comment');
}

export function loadComments({offset, limit}) {
    return $.get('/api/comment?offset=' + offset + '&limit=' + limit);
}
