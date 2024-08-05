"use client";
import PageTitle from "@/components/common/page-title";
import NotLogin from "@/components/error/not-login";
import DetailBodyPage from "@/components/problem/detail-body-page";
import PTop from "@/components/problem/p-top";
import { ERROR_TYPE } from "@/constants/error-enum";
import { useProblemPermission } from "@/hooks/useProblemPermission";
import { HydroError, NotLoginError } from "@/lib/error";
import { getProblemType } from "@/lib/problem";
import { request } from "@/lib/request";
import type { paths } from "@/types/schema";
import { useRequest } from "ahooks";
import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";

export type ProblemDetailAPI = paths["/p/{pid}"]["get"]["responses"]["200"]["content"]["application/json"];

interface Props {
  pid: string;
  prefetchValue: ProblemDetailAPI | null;
  tid?: string;
  fromContest?: boolean;
}

const enum ErrorState {
  NotLogin,
  NotFound,
  PermissionDenied,
  Unknown = -1,
}

const App: React.FC<Props> = (props) => {
  const { pid, prefetchValue, tid, fromContest } = props;

  const [errorState, setErrorState] = useState<ErrorState | undefined>();

  const { data } = useRequest(async () => {
    if (prefetchValue) return prefetchValue;
    try {
      const response = await await request.get(`/p/${pid}` as "/p/{pid}", {
        params: {
          tid: fromContest ? tid : undefined,
        },
        transformData: (data) => {
          return data.data;
        },
      });
      return response;
    } catch (e) {
      if (e instanceof NotLoginError) {
        setErrorState(ErrorState.NotLogin);
      } else if (e instanceof HydroError) {
        switch (e.code) {
          case ERROR_TYPE.PROBLEM_NOT_FOUND_ERROR:
            setErrorState(ErrorState.NotFound);
            break;
          case ERROR_TYPE.PERMISSION_DENIED_ERROR:
            setErrorState(ErrorState.PermissionDenied);
            break;
          default:
            setErrorState(ErrorState.Unknown);
            break;
        }
      } else throw e;
    }
  }, {});

  const { runCheckProblemPermission } = useProblemPermission();

  if (errorState === ErrorState.NotLogin) {
    return (
      <div className="py-10">
        <NotLogin />
      </div>
    );
  } else if (errorState === ErrorState.NotFound) {
    return (
      <Result
        status="404"
        title="题目不存在"
        extra={
          <Button type="primary" href="/">
            返回首页
          </Button>
        }
      />
    );
  } else if (errorState === ErrorState.PermissionDenied) {
    return (
      <Result
        status="403"
        title="您没有访问该题目的权限"
        subTitle="您可以在下方尝试解锁题目"
        extra={[
          <Button key="back" href="/">
            返回首页
          </Button>,
          <Button
            key="unlock"
            type="primary"
            onClick={() => runCheckProblemPermission({ pid, assign: data?.pdoc.assign, title: data?.pdoc.title })}
          >
            解锁题目
          </Button>,
        ]}
      />
    );
  }

  return <DetailBodyPage data={data} pid={pid} />;
};

export default App;
