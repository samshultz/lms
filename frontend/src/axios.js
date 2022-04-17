import axios from 'axios'
import { useDispatch } from 'react-redux';
import { getAccessToken, setAccessToken } from "./features/user"
import store from "./store"

const instance = axios.create({
    baseURL: "http://localhost:4001/api",
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
        // "X-CSRF-TOKEN": tokenizer
      }
});

instance.interceptors.request.use(
  (config) => {
    
    const {accessToken} = store.getState().user
    if (accessToken) {
      config.headers["x-access-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config;
    console.log(originalConfig)
    if(originalConfig.url !== "/auth/login" && err.response){
      // Access Token was expired
      if(err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          await instance.post("/auth/refreshToken", {refreshToken: ""}).then((tok) => {
            store.dispatch(setAccessToken(tok))
          })
            
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error)
        }
      } 
    }
    return Promise.reject(err)
  }
);

export default instance