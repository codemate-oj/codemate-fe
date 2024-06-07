import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserRole } from "@/constants/misc";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CommonFormItemProps } from "./form-item-wrapper";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";

interface SelectiveButtonProps {
  selected?: boolean;
  label: string;
  value: number;
  onClick?: (value: number) => void;
}

export const SelectiveButton: React.FC<SelectiveButtonProps> = ({ selected, label, value, onClick }) => (
  <Button
    type="button"
    variant="outline"
    className={cn("justify-start", {
      "border-2 border-primary text-primary hover:bg-accent/30 hover:text-primary": selected,
    })}
    onClick={() => {
      onClick?.(value);
    }}
  >
    {label}
  </Button>
);

interface UserSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

const UserRoleSelect: React.FC<UserSelectProps> = ({ value, onChange }) => {
  const [selected, setSelected] = React.useState<number>(value ?? UserRole.PRIMARY_SCHOOL_STUDENT);

  useEffect(() => {
    onChange?.(selected);
  }, [selected]);

  return (
    <div className="flex gap-x-1">
      <SelectiveButton
        label="小学生"
        value={UserRole.PRIMARY_SCHOOL_STUDENT}
        selected={selected === UserRole.PRIMARY_SCHOOL_STUDENT}
        onClick={setSelected}
      />
      <SelectiveButton
        label="初中生"
        value={UserRole.JUNIOR_MIDDLE_SCHOOL_STUDENT}
        selected={selected === UserRole.JUNIOR_MIDDLE_SCHOOL_STUDENT}
        onClick={setSelected}
      />
      <SelectiveButton
        label="高中生"
        value={UserRole.SENIOR_MIDDLE_SCHOOL_STUDENT}
        selected={selected === UserRole.SENIOR_MIDDLE_SCHOOL_STUDENT}
        onClick={setSelected}
      />
      <Select onValueChange={(v) => setSelected(Number(v))}>
        <SelectTrigger
          className={selected >= 10 ? "border-2 border-primary text-primary hover:bg-accent/30 hover:text-primary" : ""}
        >
          <SelectValue placeholder="成年人" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={String(UserRole.ADULT)}>成年人</SelectItem>
          <SelectItem value={String(UserRole.COLLEGE_STUDENT)}>大学生</SelectItem>
          <SelectItem value={String(UserRole.SCHOOL_TEACHER)}>中小学教师</SelectItem>
          <SelectItem value={String(UserRole.INSTITUTE_TEACHER)}>机构教师</SelectItem>
          <SelectItem value={String(UserRole.STUDENT_PARENT)}>学生家长</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const FormUserRoleSelect: React.FC<Omit<CommonFormItemProps, "children">> = ({
  wrapperClassName,
  label,
  name,
  description,
  addressDescription,
  required,
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
            <UserRoleSelect {...field} />
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

export default UserRoleSelect;
