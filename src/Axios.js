import axios from "axios";

const Instance = new axios.create({
  baseURL: "https://basicapi.up.railway.app",
});
export default Instance;