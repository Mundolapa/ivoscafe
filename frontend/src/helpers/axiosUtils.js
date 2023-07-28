import axios from 'axios';

export const axiosWithTimeout = (url, timeout = 5000, signal) => {
    const source = axios.CancelToken.source();
    if (signal) {
        signal.addEventListener('abort', () => {
            source.cancel('Operation canceled by the user.');
        });
    }

    return axios({
        method: 'get',
        url,
        timeout,
        cancelToken: source.token,
    });
};
