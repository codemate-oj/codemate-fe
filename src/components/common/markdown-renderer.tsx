import { remark } from "remark";
import html from "remark-html";

type Props = {
  markdown: string;
};

//服务端组件支持异步
const renderMarkdown = async (markdown: string): Promise<string> => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

const ServerComponent = async ({ markdown }: Props) => {
  const htmlContent = await renderMarkdown(markdown);

  return <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ServerComponent;
