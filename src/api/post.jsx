import axios from "axios";
const TEST_URL="http://192.168.244.84:3500"
const WORK_URL="https://tt-lbu6.onrender.com"

export default axios.create({
    baseURL: TEST_URL
}) 