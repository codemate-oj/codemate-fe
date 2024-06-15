"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Option {
  label: string;
  value: string;
}

interface ObjectiveInputProps {
  options: Option[];
}
export const ObjectiveInput = (props: ObjectiveInputProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <div className="flex w-1/2 flex-col">
      {props.options.map((option, index) => (
        <Button
          key={index}
          value={option.label}
          variant={selectedIndex === index ? undefined : "outline"}
          className="mb-2 justify-start"
          onClick={() => handleButtonClick(index)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
