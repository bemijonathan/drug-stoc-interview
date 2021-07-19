import axios from "axios";

console.log(process.env);

// if (process.env.NODE_ENV != 'development') {
    axios.defaults.baseURL = 'https://drug-stock-test.herokuapp.com/'
// } else {
    // axios.defaults.baseURL = 'http://localhost:8810'
// }

export default axios;
