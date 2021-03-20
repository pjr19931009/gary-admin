const Mock = require("mockjs");
import user from "./mocks/user";
import article from "./mocks/article";
import XEUtils from "utils/XEUtils";
const mocks = [...user,...article];
const parseUrl = XEUtils.parseUrl;

function XMLResponse(response) {
  return function(options) {
    const { body, type, url } = options;
    const query = parseUrl(url).searchQuery;
    const res = response({
      methods: type,
      body: JSON.parse(body),
      url: url,
      query: query
    });
    return Mock.mock(res);
  };
}

export default function() {
  for (const item of mocks) {
    Mock.mock(
      new RegExp(item.url),
      item.type || "get",
      XMLResponse(item.response)
    );
  }
}
