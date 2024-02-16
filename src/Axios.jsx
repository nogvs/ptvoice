import axios from "axios";

const Axios = axios.create({
  baseURL: "https://pt-voice-api-5e159ec2007b.herokuapp.com",
});

export default Axios;
