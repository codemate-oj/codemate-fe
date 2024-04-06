import type { Meta, StoryObj } from "@storybook/react";
import FixedSelect from "../components/common/fixed-select";

const meta = {
  title: "Example/FixedSelect",
  component: FixedSelect,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof FixedSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestCase: Story = {
  args: {
    options: [
      {
        value: "1",
        label: "赛事题库",
        children: [
          {
            value: "11",
            label: "赛事题库1",
          },
          {
            value: "12",
            label: "赛事题库2",
          },
          {
            value: "13",
            label: "赛事题库3",
          },
        ],
      },
      {
        value: "2",
        label: "专项题库",
        children: [
          {
            value: "21",
            label: "专项题库1",
          },
          {
            value: "22",
            label: "专项题库2",
          },
          {
            value: "23",
            label: "专项题库3",
          },
        ],
      },
    ],
  },
};
