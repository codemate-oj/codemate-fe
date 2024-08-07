import { defineMock } from "@alova/mock";

export default defineMock({
  "/p": () => {
    return {
      pdocs: [
        {
          _id: "666d42184085e919e7082cd4",
          owner: 1,
          domainId: "system",
          docType: 10,
          docId: 1,
          title: "A+B Problem",
          tag: ["系统测试"],
          hidden: false,
          nSubmit: 0,
          nAccept: 1,
          pid: "P1000",
          config: "time: 1s\nmemory: 64m\n",
          stats: {
            AC: 1,
            s100: 1,
          },
        },
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
  "/p/P1000": {
    pdoc: {
      _id: "666d42184085e919e7082cd4",
      content:
        "{\"en\":\"This is the example A+B problem.\\nIf you didn't see 'No testdata at current' message, it means file storage is working properly.\\n\\nJust write a program that reads two integers from standard input, and prints their sum to standard output.\\nFeel free to delete this problem in 'Edit' panel if you don't need this.\\n\\nClick 'Enter Online Programming Mode' to open the built-in Hydro IDE.\\n\",\"zh\":\"这是一道简单的 A+B 题目。\\n如果您没有看到“当前没有测试数据”的消息，说明文件存储功能正常运行。\\n\\n编写一个程序，从标准输入读取两个整数，并将它们的和输出到标准输出。\\n如果您不需要这道题目，可以在右侧“编辑”面板中删除它。\\n\\n点击右侧 “进入在线编程模式” 打开内置的 Hydro IDE。\\n\"}",
      owner: 1,
      domainId: "system",
      docType: 10,
      docId: 1,
      title: "A+B Problem",
      tag: ["系统测试"],
      hidden: true,
      nSubmit: 1,
      nAccept: 1,
      sort: "P001000",
      pid: "P1000",
      data: [
        {
          _id: "config.yaml",
          name: "config.yaml",
          size: 21,
          lastModified: "2024-06-15T07:26:16.879Z",
          etag: "L2RhdGEvZmlsZS9oeWRyby9mbHAvY3N2ejA5eWZ4b2Fmb2ZpdHBheDB1LnlhbWw=",
        },
        {
          _id: "1.in",
          name: "1.in",
          size: 4,
          lastModified: "2024-06-15T07:26:16.880Z",
          etag: "L2RhdGEvZmlsZS9oeWRyby9ubGIvZjJrcHowYTBtanVvdmo2ZnFjc2lqLmlu",
        },
        {
          _id: "2.in",
          name: "2.in",
          size: 4,
          lastModified: "2024-06-15T07:26:16.881Z",
          etag: "L2RhdGEvZmlsZS9oeWRyby96dHAvdnk4eXF5YWhqcjNuMGJyMThlaDBpLmlu",
        },
        {
          _id: "1.out",
          name: "1.out",
          size: 2,
          lastModified: "2024-06-15T07:26:16.880Z",
          etag: "L2RhdGEvZmlsZS9oeWRyby9maG8vdWV2c3ViNG8zdXBrcGd3bG84dHl4Lm91dA==",
        },
        {
          _id: "2.out",
          name: "2.out",
          size: 2,
          lastModified: "2024-06-15T07:26:16.882Z",
          etag: "L2RhdGEvZmlsZS9oeWRyby8wcnMvYXdxZzZzMHpxaW9wNmgxaGkweWlkLm91dA==",
        },
      ],
      config: {
        count: 0,
        memoryMin: 64,
        memoryMax: 64,
        timeMin: 1000,
        timeMax: 1000,
        type: "default",
        langs: [
          "bash",
          "c",
          "cc",
          "cc.cc98",
          "cc.cc98o2",
          "cc.cc11",
          "cc.cc11o2",
          "cc.cc14",
          "cc.cc14o2",
          "cc.cc17",
          "cc.cc17o2",
          "cc.cc20",
          "cc.cc20o2",
          "pas",
          "java",
          "kt",
          "kt.jvm",
          "py",
          "py.py2",
          "py.py3",
          "py.pypy3",
          "php",
          "rs",
          "hs",
          "js",
          "go",
          "rb",
          "cs",
          "r",
        ],
      },
      stats: {
        AC: 1,
        WA: 0,
        TLE: 0,
        MLE: 0,
        RE: 0,
        SE: 0,
        IGN: 0,
        CE: 0,
        s100: 1,
      },
    },
    udoc: {
      _id: 1,
      uname: "Hydro",
      mail: "Hydro@hydro.local",
      perm: "BigInt::-1",
      role: "root",
      priv: 4,
      regat: "2024-06-15T07:26:16.732Z",
      loginat: "2024-06-15T07:26:16.732Z",
      tfa: false,
      authn: false,
    },
    psdoc: null,
    title: "A+B Problem",
    solutionCount: 0,
    discussionCount: 0,
    owner_udoc: null,
    page_name: "problem_detail",
    ctdocs: [
      {
        _id: "666dc21597ac74f00dd27637",
        content: "test123",
        owner: 2,
        domainId: "system",
        docType: 30,
        docId: "666dc21597ac74f00dd27637",
        duration: null,
        tag: ["CODEMATE争霸赛"],
        checkinBeginAt: "2024-05-31T16:00:00.000Z",
        checkinEndAt: "2024-06-29T16:00:00.000Z",
        imageURL: null,
        needRealName: true,
        title: "测试比赛",
        rule: "acm",
        beginAt: "2024-06-30T11:00:00.000Z",
        endAt: "2024-07-01T11:00:00.000Z",
        pids: [1],
        attend: 0,
        rated: true,
        allowViewCode: true,
        assign: [],
        autoHide: true,
        lockAt: null,
        maintainer: [],
      },
    ],
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
      case "P1000":
        return {
          hasPerm: true,
        };
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
  "/record": ({ query }) => {
    // const uidOrName = params.uidOrName;
    const page = query.page;
    const pid = query.pid;
    if (pid === "P1000") {
      switch (page) {
        case 1:
          return {
            rdocs: [
              {
                _id: "666e1fcf1cd5b29804ff1d3b",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 47.946,
                memory: 10284,
                judger: 1,
                judgeAt: "2024-06-15T23:12:15.669Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666e1fcd1cd5b29804ff1d30",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 46.025999,
                memory: 10288,
                judger: 1,
                judgeAt: "2024-06-15T23:12:14.569Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666e1fcc1cd5b29804ff1d25",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 50.463,
                memory: 10136,
                judger: 1,
                judgeAt: "2024-06-15T23:12:12.965Z",
                rejudged: false,
                files: {},
              },
              {
                _id: "666e1fca1cd5b29804ff1d1a",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 49.123,
                memory: 10120,
                judger: 1,
                judgeAt: "2024-06-15T23:12:11.359Z",
                rejudged: false,
                files: {},
              },
              {
                _id: "666e1fc91cd5b29804ff1d0f",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 46.413,
                memory: 10292,
                judger: 1,
                judgeAt: "2024-06-15T23:12:09.758Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666e1fc71cd5b29804ff1d04",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 44.297,
                memory: 10284,
                judger: 1,
                judgeAt: "2024-06-15T23:12:08.141Z",
                rejudged: false,
                files: {},
              },
              {
                _id: "666e1fc51cd5b29804ff1cf9",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 48.757,
                memory: 10220,
                judger: 1,
                judgeAt: "2024-06-15T23:12:06.027Z",
                rejudged: false,
                files: {},
              },
              {
                _id: "666e1fc41cd5b29804ff1cee",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 48.575,
                memory: 10188,
                judger: 1,
                judgeAt: "2024-06-15T23:12:04.417Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666e1fc11cd5b29804ff1ce3",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 49,
                memory: 10272,
                judger: 1,
                judgeAt: "2024-06-15T23:12:02.312Z",
                rejudged: false,
                files: {},
              },
              {
                _id: "666e1fbf1cd5b29804ff1cd8",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 49.558,
                memory: 10292,
                judger: 1,
                judgeAt: "2024-06-15T23:12:00.198Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666e1fbd1cd5b29804ff1ccd",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 49.552,
                memory: 10292,
                judger: 1,
                judgeAt: "2024-06-15T23:11:58.093Z",
                rejudged: false,
                files: {},
              },
              {
                _id: "666e1fbc1cd5b29804ff1cc2",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 49.535,
                memory: 10148,
                judger: 1,
                judgeAt: "2024-06-15T23:11:56.480Z",
                rejudged: false,
                files: {},
              },
              {
                _id: "666e1fba1cd5b29804ff1cb7",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 48.425,
                memory: 10248,
                judger: 1,
                judgeAt: "2024-06-15T23:11:55.379Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666e1fb91cd5b29804ff1cac",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 49.785,
                memory: 10180,
                judger: 1,
                judgeAt: "2024-06-15T23:11:53.770Z",
                rejudged: false,
                files: {},
              },
              {
                _id: "666e1fb71cd5b29804ff1ca1",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 48.994,
                memory: 10192,
                judger: 1,
                judgeAt: "2024-06-15T23:11:52.152Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666e1fb61cd5b29804ff1c96",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 48.592,
                memory: 10288,
                judger: 1,
                judgeAt: "2024-06-15T23:11:50.546Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666e1fb31cd5b29804ff1c8b",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 46.666,
                memory: 10160,
                judger: 1,
                judgeAt: "2024-06-15T23:11:48.441Z",
                rejudged: false,
                files: {},
              },
              {
                _id: "666e01d31cd5b29804ff1c70",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 49.19,
                memory: 10248,
                judger: 1,
                judgeAt: "2024-06-15T21:04:20.051Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666e019e97ac74f00dd27661",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 47.165,
                memory: 10284,
                judger: 1,
                judgeAt: "2024-06-15T21:03:26.754Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666e00f697ac74f00dd2765c",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 44.61,
                memory: 10164,
                judger: 1,
                judgeAt: "2024-06-15T21:00:38.681Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
              {
                _id: "666dfb6c97ac74f00dd27652",
                status: 7,
                uid: 2,
                lang: "cc.cc14o2",
                pid: 1,
                domainId: "system",
                score: 0,
                time: 0,
                memory: 0,
                judger: 1,
                judgeAt: "2024-06-15T20:37:00.893Z",
                rejudged: false,
                files: {},
              },
              {
                _id: "666e1fcd1cd5b29804ff1d30",
                status: 1,
                uid: 2,
                lang: "py.py3",
                pid: 1,
                domainId: "system",
                score: 100,
                time: 46.025999,
                memory: 10288,
                judger: 1,
                judgeAt: "2024-06-21T23:12:14.569Z",
                rejudged: false,
                files: {},
                progress: 50,
              },
            ],
          };
        case 2:
          return {
            rdocs: [],
          };
      }
    }
    return {
      rdocs: [],
    };
  },
});
