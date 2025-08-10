import axios from "axios";

const API = axios.create({
	baseURL: "https://www.googleapis.com/books/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

export default API;
