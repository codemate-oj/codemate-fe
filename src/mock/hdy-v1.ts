import { defineMock } from "@alova/mock";

export default defineMock({
  "/p": () => {
    return {
      pdocs: [
        {
          assign: [],
          _id: "6647a2c0b48c522b76d6af1d",
          owner: 2,
          domainId: "system",
          docType: 10,
          docId: 482,
          title: "【深基1.例2】简单的分苹果",
          tag: [],
          hidden: false,
          nSubmit: 0,
          nAccept: 0,
          pid: "J0001",
          config: "type: remote_judge\nsubType: srqc\ntarget: srqc/J0001\ntime: 1000ms\nmemory: 256MB\n",
        },
        {
          assign: [],
          _id: "6647a2c0b48c522b76d6af37",
          owner: 2,
          domainId: "system",
          docType: 10,
          docId: 508,
          title: "【深基1.例3】简单的分苹果 2",
          tag: [],
          hidden: false,
          nSubmit: 0,
          nAccept: 0,
          pid: "J0002",
          config: "type: remote_judge\nsubType: srqc\ntarget: srqc/J0002\ntime: 1000ms\nmemory: 256MB\n",
        },
        {
          assign: [
            "邀请码@【赛事题库】-【粤港澳信息学创新大赛】-【C++赛项】-【初中组】@1",
            "邀请码@【赛事题库】-【粤港澳信息学创新大赛】-【创意程序开发闯关竞赛】-【C++甲组】@1",
            "邀请码@【赛事题库】-【粤港澳信息学创新大赛】-【创意程序开发闯关竞赛】-【C++乙组】@1",
            "邀请码@【赛事题库】-【粤港澳信息学创新大赛】-【C++赛项】-【小学组】@1",
          ],
          _id: "6647a2c0b48c522b76d6af42",
          owner: 2,
          domainId: "system",
          docType: 10,
          docId: 519,
          title: "【深基1.例9】圆的计算",
          tag: [],
          hidden: false,
          nSubmit: 0,
          nAccept: 0,
          pid: "J0003",
          config: "type: remote_judge\nsubType: srqc\ntarget: srqc/J0003\ntime: 1000ms\nmemory: 256MB\n",
        },
      ],
    };
  },
  "/p/J0003": {
    pdoc: {
      assign: [
        "邀请码@【赛事题库】-【粤港澳信息学创新大赛】-【C++赛项】-【初中组】@1",
        "邀请码@【赛事题库】-【粤港澳信息学创新大赛】-【创意程序开发闯关竞赛】-【C++甲组】@1",
        "邀请码@【赛事题库】-【粤港澳信息学创新大赛】-【创意程序开发闯关竞赛】-【C++乙组】@1",
        "邀请码@【赛事题库】-【粤港澳信息学创新大赛】-【C++赛项】-【小学组】@1",
      ],
      _id: "6647a2c0b48c522b76d6af42",
      content:
        '{"zh":"## 题目背景\\n**本题来自洛谷编写教材《深入浅出程序设计竞赛 - 基础篇》**，并带有详细的教程和讲解，点击下列链接了解本书详情。[【官方网店绝赞热卖中！】>>>](https://item.taobao.com/item.htm?id=637730514783)\\n\\n## 题目描述\\n当半径为 $r=5$，请输出圆的周长、面积和球体积。取 $\\\\pi=3.141593$。请直接使用 `cout` 输出答案，每行一个数字。\\n\\n## 输入格式\\n不需要输入。\\n\\n## 输出格式\\n请直接使用 `cout` 输出答案，每行一个数字。一共三个数字。\\n\\n"}',
      owner: 2,
      domainId: "system",
      docType: 10,
      docId: 519,
      title: "【深基1.例9】圆的计算",
      tag: [],
      hidden: false,
      nSubmit: 0,
      nAccept: 0,
      sort: "J000003",
      pid: "J0003",
      data: [
        {
          _id: "config.yaml",
          name: "config.yaml",
          size: 79,
          lastModified: "2024-05-17T18:32:32.954Z",
          etag: "L2RhdGEvZmlsZS9oeWRyby8xaXgvZXhycHEzMmxrYjh6YWVkY3kwaGhjLnlhbWw=",
        },
      ],
      config: {
        count: 0,
        memoryMin: 256,
        memoryMax: 256,
        timeMin: 1000,
        timeMax: 1000,
        type: "remote_judge",
        subType: "srqc",
        target: "srqc/J0003",
        langs: [],
      },
    },
    udoc: {
      _id: 2,
      uname: "admin",
      mail: "admin@hydro.local",
      perm: "BigInt::-1",
      role: "root",
      priv: -1,
      regat: "2024-05-17T18:30:46.229Z",
      loginat: "2024-05-23T17:11:35.737Z",
      tfa: false,
      authn: false,
    },
    psdoc: null,
    title: "【深基1.例9】圆的计算",
    solutionCount: 0,
    discussionCount: 0,
    owner_udoc: null,
    page_name: "problem_detail",
    ctdocs: [],
    htdocs: [],
  },
  "/p-list": {
    roots: [
      {
        _id: "66200c4f9cd74d3e4c931333",
        docId: "66200c4f9cd74d3e4c931333",
        title: "蓝桥杯",
        content: "蓝桥杯题单",
        parent: null,
        children: [
          {
            _id: "66200c4f9cd74d3e4c931334",
            docId: "66200c4f9cd74d3e4c931334",
            title: "1级",
            content: "蓝桥杯,1级题单",
            parent: "66200c4f9cd74d3e4c931333",
            children: [],
          },
          {
            _id: "66200c4f9cd74d3e4c931335",
            docId: "66200c4f9cd74d3e4c931335",
            title: "2级",
            content: "蓝桥杯,2级题单",
            parent: "66200c4f9cd74d3e4c931333",
            children: [],
          },
        ],
      },
      {
        _id: "66200c4e9cd74d3e4c93132b",
        docId: "66200c4e9cd74d3e4c93132b",
        title: "电子学会考级",
        content: "电子学会考级题单",
        parent: null,
        children: [
          {
            _id: "66200c4e9cd74d3e4c93132c",
            docId: "66200c4e9cd74d3e4c93132c",
            title: "1级",
            content: "电子学会考级,1级题单",
            parent: "66200c4e9cd74d3e4c93132b",
            children: [],
          },
          {
            _id: "66200c4e9cd74d3e4c93132d",
            docId: "66200c4e9cd74d3e4c93132d",
            title: "2级",
            content: "电子学会考级,2级题单",
            parent: "66200c4e9cd74d3e4c93132b",
            children: [],
          },
          {
            _id: "66200c4e9cd74d3e4c93132e",
            docId: "66200c4e9cd74d3e4c93132e",
            title: "3级",
            content: "电子学会考级,3级题单",
            parent: "66200c4e9cd74d3e4c93132b",
            children: [],
          },
        ],
      },
    ],
  },
  "/p-list/{tid}": ({ params }) => {
    const tid = params.tid;
    switch (tid) {
      case "66200c4f9cd74d3e4c931334":
        return {
          tdoc: {
            _id: "66200c4f9cd74d3e4c931334",
            docId: "66200c4f9cd74d3e4c931334",
            title: "1级",
            content: "蓝桥杯,1级题单",
            parent: "66200c4f9cd74d3e4c931333",
            children: [],
          },
          hasPermission: false,
        };
      case "66200c4f9cd74d3e4c931335":
        return {
          tdoc: {
            _id: "66200c4f9cd74d3e4c931335",
            docId: "66200c4f9cd74d3e4c931335",
            title: "2级",
            content: "蓝桥杯,2级题单",
            parent: "66200c4f9cd74d3e4c931333",
            children: [],
          },
          hasPermission: false,
        };
      case "66200c4e9cd74d3e4c93132c":
        return {
          tdoc: {
            _id: "66200c4e9cd74d3e4c93132c",
            docId: "66200c4e9cd74d3e4c93132c",
            title: "1级",
            content: "电子学会考级,1级题单",
            parent: "66200c4e9cd74d3e4c93132b",
            children: [],
          },
          hasPermission: false,
        };
      case "66200c4e9cd74d3e4c93132d":
        return {
          tdoc: {
            _id: "66200c4e9cd74d3e4c93132d",
            docId: "66200c4e9cd74d3e4c93132d",
            title: "2级",
            content: "电子学会考级,2级题单",
            parent: "66200c4e9cd74d3e4c93132b",
            children: [],
          },
          hasPermission: false,
        };
      case "66200c4e9cd74d3e4c93132e":
        return {
          tdoc: {
            _id: "66200c4e9cd74d3e4c93132e",
            docId: "66200c4e9cd74d3e4c93132e",
            title: "3级",
            content: "电子学会考级,3级题单",
            parent: "66200c4e9cd74d3e4c93132b",
            children: [],
          },
          hasPermission: false,
        };
    }
  },
  "[POST]/p/{pid}": ({ params }) => {
    const pid = params.pid;
    switch (pid) {
      case "J0001":
        return {
          hasPerm: true,
        };
      case "J0002":
        return {
          hasPerm: false,
          activation: "point",
        };
      case "J0003":
        return {
          hasPerm: false,
          activation: "group",
        };
    }
  },
  "[POST]/priv": () => {
    return { success: true, group: "赛事题库,粤港澳信息学创新大赛,创意程序开发闯关竞赛,Python甲组" };
  },
});
