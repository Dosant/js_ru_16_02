import SimpleStore from './SimpleStore'
import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, LOAD_ALL_COMMENTS, LOAD_COMMENTS, _SUCCESS, _FAIL, _START } from '../actions/constants'
import AppDispatcher from '../dispatcher'
import { loadAllComments } from '../actions/comment'


class CommentStore extends SimpleStore {
    constructor(...args) {
        super(...args)

        this.commentsPageComments = [];
        this.total = 0;

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response } = action

            switch (type) {
                case ADD_COMMENT:
                    this.add({
                        id: data.id,
                        text: data.text
                    })
                    break;

                case LOAD_COMMENTS_FOR_ARTICLE + _SUCCESS:
                    response.forEach(this.add)
                    break

                case LOAD_ALL_COMMENTS + _START:
                    this.allCommentsLoading = true
                    break;

                case LOAD_ALL_COMMENTS + _SUCCESS:
                    response.records.forEach(this.add);
                    this.allCommentsLoaded = true;
                    break;

                case LOAD_COMMENTS + _START:
                    this.commentsPageComments = [];
                    break;

                case LOAD_COMMENTS + _SUCCESS:
                    this.total = response.total;
                    this.commentsPageComments = response.records;
                    break;



                default: return
            }

            this.emitChange()
        })
    }

    getOrLoadAll() {
        if (this.allCommentsLoaded) {
            return this.getAll();
        } else {
            if (!this.allCommentsLoading)
                loadAllComments()
        }
    }

    getCommentsPageComments() {
        return this.commentsPageComments;
    }

    getTotal () {
        return this.total;
    }

}

export default CommentStore