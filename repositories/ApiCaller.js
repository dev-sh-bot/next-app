import Axios from 'axios';
import { baseUrlNew } from './Repository';
// import {NavigationService} from '.';
// import {Store} from '../redux';
// import {AuthAction} from '../redux/Actions';
// import { base_Url } from '../constants/apibase';

// const CancelToken = Axios.CancelToken.source();
// // create the source

// Axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async ({response, ...rest}) => {
//     if (response?.status == 401) {
//       try {
//         // let {
//         //   AuthReducer: {
//         //     user: {refreshToken},
//         //   },
//         // } = Store.getState();
//         //  console.warn("401 UnAuthenticated")
//         // Axios.CancelToken();

//         Store.dispatch(AuthAction.ClearRedux());
//         // CancelToken.cancel('Network error');
//         console.log('Auth err', response);
//         Toast.show(Toast('Session Expired! Please login.'));
//         NavigationService.resetStack('AuthStack');
//         // });
//       } catch (err) {
//         console.log('Error= ===', err);
//       }
//     }
//     return response;
//   },
// );

export default class ApiCaller {
  static BearerHeaders = (token, More = {}) => {
    return {
      Authorization: 'Bearer ' + token,
      ...More,
    };
  };

  static Get = (url = '', headers = {}, customUrl = '') => {
    // this.source = CancelToken;

    console.log('API CALL===>>> GET',customUrl ? customUrl : `${baseUrlNew}${url}`)

    return Axios.get(customUrl ? customUrl : `${baseUrlNew}${url}`, {
      // cancelToken: this.source.token,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        ...headers,
      },
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Post = async (
    endPoint = '',
    body = {},
    headers = {},
    cutomUrl = '',
    // onUploadProgress = () => {},
  ) => {
    console.log('API CALL===>>> POST',endPoint ,body, headers)
    return Axios.post(cutomUrl ? cutomUrl : `${baseUrlNew}${endPoint}`, body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      },
      // onUploadProgress: progress => onUploadProgress(progress),
    });
  };

  static Put = (url = '', body = {}, headers = {}) => {
    return Axios.put(`${baseUrlNew}${url}`, body, {
      headers: {'Content-Type': 'application/json', ...headers},
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Delete = (url = '', body = {}, headers = {}) => {
    return Axios.delete(`${baseUrlNew}${url}`, {
      headers: {'Content-Type': 'application/json', ...headers},
      data: body,
    })
      .then(res => res)
      .catch(err => err.response);
  };
}
