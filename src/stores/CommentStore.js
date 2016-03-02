/**
 * Created by antondosov on 02.03.16.
 */
import SimpleStore from './SimpleStore'
import { ADD_COMMENT } from '../actions/constants'
import AppDispatcher from '../dispatcher'

class CommentStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data } = action
            switch (type) {
                case ADD_COMMENT:
                    this.add(data.comment)
                    break;

                default: return
            }

            this.emitChange()
        })
    }
}

export default CommentStore