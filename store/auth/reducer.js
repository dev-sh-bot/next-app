import { actionTypes } from './action';

export const initState = {
    isLoggedIn: false,
    UserObj:{}
};

function reducer(state = initState, actions) {
    switch (actions.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: true },
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: false },
            };
        case actionTypes.SET_USER_OBJ:
            return {
                ...state,
                ...{ UserObj: actions.payload },
            };
        default:
            return state;
    }
}

export default reducer;
