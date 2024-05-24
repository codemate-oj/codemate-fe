import { Button, ButtonProps } from "antd";

const LinkBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button className="hover:!text-primary" {...props} type="link">
      {children}
    </Button>
  );
};
export default LinkBtn;
