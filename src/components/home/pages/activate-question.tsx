import React from "react";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/form-input";
import store from "@/store/modal";
import { useLockFn } from "ahooks";
import { request } from "@/lib/request";

const formSchema = z.object({
  activationCode: z
    .string({
      required_error: "请输入激活码",
    })
    .length(6, {
      message: "激活码为6位",
    }),
});

const ActivateQuestion: React.FC = () => {
  const currentContext = store.currentContext.use();

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
  const [errorText, setErrorText] = React.useState("");

  const handleSubmit = useLockFn(async (values: z.infer<typeof formSchema>) => {
    setErrorText("");
    const { data } = await request.post(
      `/priv`,
      { operation: "activate", code: values.activationCode },
      {
        transformData: (data) => {
          return data;
        },
      }
    );
    if (data.success) {
      store.modalJumpTo("activate-success", {
        from: "activate-question-group",
        tid: currentContext?.tid,
        content: data.group,
      });
    } else {
      setErrorText("激活码错误");
      store.modalJumpTo("activate-error", {
        from: "activate-question-group",
        tid: currentContext?.tid,
        group: currentContext?.group,
      });
    }
  });

  const handleCustomerService = () => {
    store.modalJumpTo("customer-service");
  };

  return (
    <div>
      <div className="w-full bg-[#FF7D37] h-12 rounded-t-lg flex text-2xl pt-3 pl-3 text-white">
        <Icon icon="ic:outline-info" className="text-white text-3xl mr-3" />
        激活提醒
      </div>
      <div className="px-8 pb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-3 my-3">
              <p>亲爱的用户：</p>
              <p>该题目属于专属题库内容：</p>
              <article className="indent-3 space-y-3">
                {currentContext.group.map((item: string) => (
                  <p key={item}>{item}</p>
                ))}
              </article>
              <p>专属题库内容需要使用 以上任一【激活码】 激活后才能开始 练习。</p>
              <p>如果您已获得激活码，请直接输入。如果希望获得激活码，请联系客服。</p>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-7/12">
                <FormInput name="activationCode" type="text" placeholder="请正确输入激活码" />
                {errorText && (
                  <p className="mt-3 px-1 flex gap-x-2 items-center text-sm text-red-500">
                    <Icon inline icon="ic:baseline-error" />
                    {errorText}
                  </p>
                )}
              </div>
              <Button variant="secondary" className="w-4/12" onClick={handleCustomerService}>
                联系客服
              </Button>
            </div>
            <p className="mt-3 mb-4 px-1 flex gap-x-2 items-center text-sm text-[#FF7D37]">
              特别提醒：请注意区分字母大小写和仔细核对数字！
            </p>
            <div className="w-full flex justify-around">
              <Button className="w-4/12" type="submit">
                去提交
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ActivateQuestion;
