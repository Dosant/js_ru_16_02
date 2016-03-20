import {usersStore} from '../stores'

export function checkUser (nextState, replace) {
    if (!usersStore.isLogged()) {
        replace({path: '/forbidden'});
    }
}
