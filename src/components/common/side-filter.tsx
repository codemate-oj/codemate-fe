"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface SideFilterOptions {
  label: string;
  value: string;
}

interface SideFilterProps {
  title?: string;
  options: SideFilterOptions[];
  defaultSelectedValue?: string;
  onSelect?: (value: string) => void;
}

interface FilterItemProps {
  isTitle?: boolean;
  i: SideFilterOptions;
  isSelected?: boolean;
  setSelected?: Dispatch<SetStateAction<string>>;
  onSelect?: (value: string) => void;
  isLast?: boolean;
}

const FilterItem = ({
  isTitle = false,
  i,
  isSelected = false,
  setSelected,
  onSelect,
  isLast = false,
}: FilterItemProps): React.ReactElement => {
  const iconRender = () => {
    if (isSelected) {
      return <Image className="mr-5" src={`/img/arrow-active.png`} alt="arrow-active" height={5} width={5}></Image>;
    }
    return <Image className="mr-5" src={`/img/arrow.png`} alt="arrow" height={5} width={5}></Image>;
  };
  const handleClick = () => {
    if (isTitle) return;
    if (isSelected) {
      setSelected && setSelected("");
      onSelect && onSelect("");
      return;
    }
    setSelected && setSelected(i.value);
    onSelect && onSelect(i.value);
  };
  return (
    <>
      <div
        className={`w-40 h-12 flex justify-between items-center ${isLast ? "" : "mb-0.5"} ${isSelected ? "bg-orange-500 text-gray-100 hover:opacity-80" : "bg-gray-100"} ${isTitle ? "" : "cursor-pointer"} ${!isTitle && !isSelected ? "hover:text-orange-500" : ""}`}
        onClick={handleClick}
      >
        <div className={`ml-5 ${isTitle || isSelected ? "font-bold" : ""}`}>{i.label}</div>
        {iconRender()}
      </div>
    </>
  );
};

const SideFilter = (props: SideFilterProps) => {
  const [selected, setSelected] = useState<string>("");
  useEffect(() => {
    if (props.defaultSelectedValue && props.onSelect) {
      setSelected(props.defaultSelectedValue);
      props.onSelect(props.defaultSelectedValue);
    }
  }, [props.defaultSelectedValue]);
  return (
    <div className="flex flex-col">
      {props.title ? <FilterItem isTitle={true} i={{ label: props.title, value: "title" }} /> : null}
      {props.options.map((item, index) => {
        const isSelected = item.value === selected;
        return (
          <FilterItem
            key={item.value}
            i={item}
            isSelected={isSelected}
            setSelected={setSelected}
            onSelect={props.onSelect}
            isLast={index === props.options.length - 1}
          />
        );
      })}
    </div>
  );
};

export default SideFilter;
