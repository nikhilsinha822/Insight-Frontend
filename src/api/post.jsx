import axios from "axios";
const TEST_URL="http://localhost:3500"
const WORK_URL="https://tt-lbu6.onrender.com"

export default axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
}) 