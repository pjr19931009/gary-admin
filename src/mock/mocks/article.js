const Mock = require("mockjs");
const Random = Mock.Random;

Random.extend({});

const data = Mock.mock({
  "list|30": [
    {
      "id|+1": 0,
      author: "@first",
      "readings|100-10000": 100,
      date: "@datetime",
      sentence: "@sentence",
      title: "@title"
    }
  ]
});
// 输出结果
// console.log(JSON.stringify(data, null, 4));

export default [
  {
    url: "/article/list",
    type: "get",
    response: config => {
      return {
        code: 200,
        data: data,
      };
    }
  }
];
