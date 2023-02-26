const getToken = () => {
    //ローカルストレージに保存したjwtを取り出す
    //localStorage.getItem('jwtToken');
    return 1;
};
    
    const fetchInstance = async (url, options = {}) => {
        console.log('fetchInstance');
        
        const headers = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`,
        };
    
        try {
            const response = await fetch(url, { ...options, headers });
            console.log(req);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    module.exports = {fetchInstance};
    //export default fetchInstance;
    


//使わないが一応残しておく

// const axios = require('axios').default;

// const getToken = ()=>{ 
//     localStorage.getItem('token');
// }

// //複数のリクエスト処理でも共通化している部分があれば、インスタンス化する方がいいらしい

// const axiosInstance = axios.create({
//     baseURL: 'https://localhost:3000',
// });

// //APIを叩く前にこの処理を行う

// axiosInstance.interceptors.request.use(function (config) {
//     // リクエストが送信される前の処理
//     return {
//         config,
//         headers:{
//             'Content-Type': 'application/json',
//             authorization: `Bearer ${getToken()}`,   //リクエストヘッダーにJWTをつけてサーバーに渡す
//         }
//     };
// }, function (error) {
//     // リクエスト エラーの処理
//     return Promise.reject(error);
// });

// axiosInstance.interceptors.response.use(function (response) {
//     // ステータスコードが 2xx の範囲にある場合、この関数が起動します
//     // リクエスト データの処理
//     return response;
// }, function (error) {
//     // ステータスコードが 2xx の範囲外の場合、この関数が起動します
//     // リクエスト エラーの処理
//     return Promise.reject(error);
// });

// export default axiosInstance;