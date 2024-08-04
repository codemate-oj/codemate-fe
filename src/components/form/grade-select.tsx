import { Select, SelectProps } from "antd";
import React, { useMemo } from "react";

export function generateGradeOptions(startRange = 1, endRange = 12) {
  const optionCandidates: { start: number; end: number; prefix: string; gradeRewriter?: (n: number) => number }[] = [
    {
      start: 1,
      end: 6,
      prefix: "小学",
    },
    {
      start: 7,
      end: 9,
      prefix: "中学",
    },
    {
      start: 10,
      end: 12,
      prefix: "高中",
      gradeRewriter: (n: number) => n - 9,
    },
  ];

  const options: SelectProps["options"] = [];
  for (let i = startRange; i <= endRange; i++) {
    const option = optionCandidates.find((o) => o.start <= i && o.end >= i);
    if (option) {
      options.push({
        label: `${option.prefix}${option.gradeRewriter ? option.gradeRewriter(i) : i}年级`,
        value: i,
      });
    }
  }

  options.push({
    label: "其他",
    value: -1,
  });

  return options;
}

interface GradeSelectProps extends SelectProps {
  range?: [number, number];
}

const GradeSelect: React.FC<GradeSelectProps> = ({ range, ...props }) => {
  const options = useMemo(() => {
    if (range) return generateGradeOptions(range[0], range[1]);
    return generateGradeOptions();
  }, [range]);

  return <Select options={options} {...props} />;
};

export default GradeSelect;
