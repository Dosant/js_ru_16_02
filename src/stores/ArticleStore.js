import SimpleStore from './SimpleStore'
import { DELETE_ARTICLE, ADD_COMMENT } from '../actions/constants'
import AppDispatcher from '../dispatcher'

class ArticleStore extends SimpleStore {
    constructor(stores, initialStore) {
        super(stores, initialStore)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data } = action
            switch (type) {
                case DELETE_ARTICLE:
                    this.delete(data.id)
                    break;

                case ADD_COMMENT:
                    AppDispatcher.waitFor([stores.comments.dispatchToken]);
                    this.AddCommentId(data.articleId, data.comment.id);
                    break;

                default: return
            }

            this.emitChange()
        })
    }

    AddCommentId = (articleId, commentId) => {
       let article = this.__items.find((item) => {return item.id === articleId});
       if (!article.comments) {
           article.comments = [commentId];
       } else {
           article.comments.push(commentId);
       }
    }
}

export default ArticleStore