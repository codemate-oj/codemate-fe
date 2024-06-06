import React, { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { getNames, registerLocale } from "@dior/i18n-iso-countries";
import zhCN from "@dior/i18n-iso-countries/langs/zh.json";
import { getPrefectures, getProvinces } from "china-region";
import { Select } from "antd";
import { CommonFormItemProps } from "./form-item-wrapper";

interface Option {
  value: string;
  label: string;
}

// 国家列表
registerLocale(zhCN);
const countryChoices: Option[] = Object.entries(getNames("zh")).map(([code, name]) => ({
  label: name,
  value: code,
}));

// 国内区域列表
const provinceChoices: Option[] = getProvinces().map((item) => ({
  value: item.code,
  label: item.name,
  children: getPrefectures(item.code).map((item) => ({
    value: item.code,
    label: item.name,
  })),
}));
const getCityChoices = (province?: string): Option[] => {
  if (!province) return [];
  return getPrefectures(province).map((item) => ({
    value: item.code,
    label: item.name,
  }));
};

interface IProps {
  value?: string[]; // [国家, 地区]
  onChange?: (value: string[]) => void;
}

const LocationSelect = React.forwardRef<HTMLDivElement, IProps>(({ value = ["CN"], onChange }, ref) => {
  const [province, setProvince] = useState<string>();
  const [city, setCity] = useState<string>();

  const cities = useMemo(() => getCityChoices(province), [province]);

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className="flex w-full gap-x-2" ref={ref}>
      <div className="flex-1">
        <Select
          className="w-full"
          showSearch
          placeholder="国家/地区"
          optionFilterProp="children"
          filterOption={filterOption}
          options={countryChoices}
          value={value[0]}
          onChange={(value) => {
            setProvince(undefined);
            setCity(undefined);
            onChange?.([value]);
          }}
        />
      </div>
      {value[0] === "CN" && (
        <>
          <div className="flex-1">
            <Select
              className="w-full"
              showSearch
              placeholder="省级行政区"
              optionFilterProp="children"
              filterOption={filterOption}
              options={provinceChoices}
              value={province}
              onChange={(v) => {
                setProvince((prev) => {
                  if (prev === v) {
                    onChange?.([value[0], v]);
                    return;
                  }
                  setCity(undefined);
                  return v;
                });
              }}
            />
          </div>
          {cities.length > 0 && (
            <div className="flex-1">
              <Select
                className="w-full"
                showSearch
                placeholder="市级行政区"
                options={cities}
                value={city}
                onChange={(v) => {
                  setCity(v);
                  onChange?.([value[0], v]);
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
});
LocationSelect.displayName = "LocationSelect";

interface FormLocationSelectProps extends Omit<CommonFormItemProps, "children"> {}

export const FormLocationSelect: React.FC<FormLocationSelectProps> = ({
  name,
  label,
  description,
  addressDescription,
  required,
  wrapperClassName,
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", wrapperClassName)}>
          {label && (
            <FormLabel className={cn(required && "after:ml-0.5 after:text-red-500 after:content-['*']")}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <LocationSelect {...field} />
          </FormControl>
          {description && (
            <FormDescription
              className={cn("text-xs", addressDescription ? "text-red-500 before:mr-0.5 before:content-['*']" : "")}
            >
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
