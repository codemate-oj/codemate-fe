import { Button } from "antd";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface FixedSelectOptions {
  value: string;
  label: string;
  children?: FixedSelectOptions[];
}

interface FixedSelectProps {
  options: FixedSelectOptions[];
  onSelect?: (value: string) => void;
  slotRender?: (isChildren?: boolean, isChildrenExpend?: boolean) => React.ReactElement;
}
const SelectItem = ({
  label,
  isSelected,
  isChildren,
  onClick,
  slotRender,
  isChildrenExpend,
}: {
  label: string;
  isSelected: boolean;
  isChildrenExpend?: boolean;
  isChildren?: boolean;
  onClick?: () => void;
  slotRender?: (isChildren?: boolean, isChildrenExpend?: boolean) => React.ReactElement;
}) => {
  const renderDefaultSlot = () => {
    return (
      <div className="absolute right-5 top-5">
        {isChildren ??
          (isChildrenExpend ? (
            <Image src={`/img/select-down.png`} alt="select-down" width={10} height={10}></Image>
          ) : (
            <Image src={`/img/select-up.png`} alt="select-down" width={10} height={10}></Image>
          ))}
      </div>
    );
  };
  return (
    <div className={"relative h-11 mt-1"}>
      <Button
        type={isSelected ? "primary" : "default"}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10rem",
          borderColor: "#FF7D37",
        }}
        onClick={onClick}
      >
        {label}
      </Button>
      {slotRender ? slotRender(isChildren, isChildrenExpend) : renderDefaultSlot()}
    </div>
  );
};

const FixedSelectGroup = ({
  i,
  isChildren,
  selected,
  setSelected,
  slotRender,
}: {
  i: FixedSelectOptions;
  isChildren?: boolean;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  slotRender?: (isChildren?: boolean, isChildrenExpend?: boolean) => React.ReactElement;
}) => {
  const [isChildrenShow, setIsChildrenShow] = useState<boolean>(true);
  const isSelected = selected === i.value;

  const handleClick = () => {
    isChildren ?? setIsChildrenShow(!isChildrenShow);
    setSelected(i.value);
  };
  return (
    <div key={i.value} className="flex flex-col ">
      <SelectItem
        label={i.label}
        isSelected={isSelected}
        isChildren={isChildren}
        onClick={handleClick}
        slotRender={slotRender}
        isChildrenExpend={isChildrenShow}
      />
      {i.children && isChildrenShow && (
        <FixedSelect options={i.children} isChildren={true} selected={selected} setSelected={setSelected}></FixedSelect>
      )}
    </div>
  );
};

const FixedSelect = ({
  options,
  isChildren,
  selected,
  setSelected,
}: FixedSelectProps & { isChildren?: boolean; selected: string; setSelected: Dispatch<SetStateAction<string>> }) => {
  return (
    <div className={isChildren ? "" : "fixed z-10 w-40 -left-5 top-45"}>
      {options.map((i, index) => (
        <FixedSelectGroup i={i} isChildren={isChildren} key={index} selected={selected} setSelected={setSelected} />
      ))}
    </div>
  );
};

const Index = (props: FixedSelectProps) => {
  const [selected, setSelected] = useState<string>("");
  useEffect(() => {
    if (props.onSelect) {
      props.onSelect(selected);
    }
  }, [selected, props]);
  return <FixedSelect {...props} selected={selected} setSelected={setSelected} />;
};

export default Index;
