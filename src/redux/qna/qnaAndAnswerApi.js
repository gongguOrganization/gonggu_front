import axios from "axios";

// export const insertQnaApi = (params) => {
//   return customAxios(`/qna/${params}`, "post");
// };

export const insertQnaApi = (params) => {
  return axios.post("http://localhost:8000/qna", params);
};

export const updateQnaApi = (params) => {
  return axios.put(
		"http://localhost:8000/qna",
		params,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)  
};

export const selectQnaApi = () => {
  return axios.get("http://localhost:8000/qna");
};

export const insertAnswerApi = (params) => {
  return axios.put("http://localhost:8000/qna/answer", params);
};

export const deleteAnswerApi = (params) => {
  return axios.put("http://localhost:8000/qna/answer", params);
};
