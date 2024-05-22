import React from "react";
import FixedSelect, { FixedSelectOptions } from "../common/fixed-select";
import { useUrlParam } from "@/hooks/useUrl";

interface Props {
  options: FixedSelectOptions[];
}

const AsideLangSelector: React.FC<Props> = ({ options }) => {
  const [lang, setLang] = useUrlParam("lang");
  return <FixedSelect options={options} onSelect={(lang) => setLang(lang)} defaultSelectedValue={lang} />;
};

export default AsideLangSelector;
