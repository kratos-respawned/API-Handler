import axios from "axios";

const Instance = new axios.create({
  baseURL: "https://basictestapi.up.railway.app/",
});
export default Instance;