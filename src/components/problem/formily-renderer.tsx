"use client";
import React, { useMemo } from "react";
import { createForm, onFormValuesChange } from "@formily/core";
import { FormProvider, createSchemaField, ISchema } from "@formily/react";
import { Form } from "antd";
import { CustomInput, CustomMutiSelect, CustomSelect, CustomTextarea } from "@/components/problem/formily-items"; // 导入自定义组件
import { debounce } from "lodash";
import { Button } from "../ui/button";
import ActionBar from "./action-bar";
import { request } from "@/lib/request";
import jsYaml from "js-yaml";
import { useRequest } from "ahooks";
import useRealtimeRecordDetail from "@/hooks/useRecordDetailConn";
import { STATUS_ENUM } from "@/constants/judge-status";
import { loginGuard } from "@/lib/login-guard";

const PID = window.location.pathname.split("/")[2];
const CACHE_KEY = `answers-${PID}`;

const form = createForm({
  effects() {
    onFormValuesChange(
      debounce((form) => {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(form.values));
      }, 100)
    );
  },
  initialValues: JSON.parse(window.localStorage.getItem(CACHE_KEY) || "{}"),
});

const SchemaField = createSchemaField({
  components: {
    FormItem: Form.Item,
    CustomSelect,
    CustomTextarea,
    CustomInput,
    CustomMutiSelect,
  },
});

export interface OptionType {
  label: string;
  value: string;
}

export type Property = {
  type: string;
  title: string;
  enum?: OptionType[];
  strong?: string;
  "x-decorator": string;
  "x-component": string;
};

export interface FormilySchema extends ISchema {
  type: "object";
  properties: {
    [key: string]: Property;
  };
}

interface FormilySchemaProps {
  schema: FormilySchema;
  pid: string;
}

const FormilyRenderer: React.FC<FormilySchemaProps> = ({ schema, pid }) => {
  const [isJudging, setIsJudging] = React.useState(false);

  const { run: handleSubmit, data: rid } = useRequest(
    async () => {
      let rid: string | undefined;
      await loginGuard(async () => {
        setIsJudging(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ans: Record<string, any> = {};
        const data = form.values;
        for (const key in data) {
          if (schema.properties[key].type === "string") {
            ans[key] = data[key];
            continue;
          }
          let choices = data[key];
          if (!Array.isArray(choices)) choices = [choices];
          choices = choices.map((choice: number) => String.fromCharCode(65 + choice));
          ans[key] = choices;
        }
        rid = await request.post(
          `/p/${pid}/submit` as "/p/{pid}/submit",
          {
            lang: "_",
            code: jsYaml.dump(ans),
          },
          { transformData: (data) => data.data.rid }
        );
      });
      return rid;
    },
    {
      manual: true,
    }
  );

  const rdoc = useRealtimeRecordDetail(rid);

  const answerText = useMemo(() => {
    if (!rdoc || rdoc._id !== rid) return null;
    switch (rdoc.status) {
      case STATUS_ENUM.STATUS_WAITING:
      case STATUS_ENUM.STATUS_JUDGING:
      case STATUS_ENUM.STATUS_COMPILING:
        setIsJudging(true);
        return null;
      case STATUS_ENUM.STATUS_ACCEPTED:
        setIsJudging(false);
        return <span className="text-success">回答正确</span>;
      case STATUS_ENUM.STATUS_WRONG_ANSWER:
        setIsJudging(false);
        return <span className="text-fail">回答错误</span>;
      default:
        setIsJudging(false);
        return <span className="text-fail">系统错误</span>;
    }
  }, [rdoc, rid]);

  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <SchemaField schema={schema} />
        <div className="flex flex-wrap gap-2">
          <div>
            <Button
              loading={isJudging}
              onClick={() => {
                if (isJudging) return;
                handleSubmit();
              }}
            >
              确认提交
            </Button>
            <span className="px-4 text-[16px]">{answerText}</span>
          </div>
          <ActionBar pid={pid} />
        </div>
      </Form>
    </FormProvider>
  );
};
export default FormilyRenderer;
