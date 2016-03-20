import SimpleStore from './SimpleStore'
import { LOGIN } from '../actions/constants'
import AppDispatcher from '../dispatcher'

class UserStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response, error } = action

            switch (type) {
                case LOGIN:
                    this.currentUser = data.username
                    break;

                default: return
            }

            this.emitChange()
        })
    }

    isLogged() {
        return !!this.currentUser
    }
}

export default UserStore/**
 * Created by roman on 3/18/16.
 */
