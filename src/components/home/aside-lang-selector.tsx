"use client";
import React from "react";
import FixedSelect, { FixedSelectOptions } from "../common/fixed-select";
import { useUrlParamState } from "@/hooks/useUrlParamState";

interface Props {
  options: FixedSelectOptions[];
}

const AsideLangSelector: React.FC<Props> = ({ options }) => {
  const [lang, setLang] = useUrlParamState("lang");
  return <FixedSelect options={options} onSelect={(lang) => setLang(lang)} defaultSelectedValue={lang} />;
};

export default AsideLangSelector;
