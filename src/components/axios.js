import axios from "axios";




const instance = axios.create( {
  baseURL: "http://127.0.0.1:5044/tahazon-4c1f8/us-central1/api",
} );

export default instance;