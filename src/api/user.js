import request from "utils/request";

export function login(params) {
  return request.post("/user/login", params);
}

export function getUserInfo(query) {
  return request.get("/user/info", { params: query });
}
