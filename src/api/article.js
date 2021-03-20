import request from "utils/request";

export function getArticleList() {
  return request.get("/article/list");
}

// export function getUserInfo(query) {
//   return request.get("/user/info", { params: query });
// }
