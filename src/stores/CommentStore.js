import SimpleStore from './SimpleStore'
import { ADD_COMMENT, LOAD_COMMENTS_BY_ARTICLEID, _START, _SUCCESS } from '../actions/constants'
import AppDispatcher from '../dispatcher'

class CommentStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response } = action

            switch (type) {
                case ADD_COMMENT:
                    this.add({
                        id: data.id,
                        text: data.text
                    })
                    break;

                case LOAD_COMMENTS_BY_ARTICLEID + _START:
                    this.__stores.articles.getById(data.articleId).commentsLoading = true;
                    break;

                case LOAD_COMMENTS_BY_ARTICLEID + _SUCCESS:
                    const article = this.__stores.articles.getById(data.articleId)
                    article.commentsLoading = true;
                    article.commentsLoaded = true;
                    response.forEach(this.add)
                    break;

                default:
                    return
            }

            this.emitChange()
        })
    }
}

export default CommentStore