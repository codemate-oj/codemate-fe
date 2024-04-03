import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import FilterTabsTree from "../components/common/filter-tabs-tree";

export type TreeItem = {
  key: string;
  label: React.ReactNode;
  children?: TreeItem[];
};
export type FilerTabsTreeData = TreeItem[];

const meta = {
  title: "Example/FilterTabsTree",
  component: FilterTabsTree,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof FilterTabsTree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestCase: Story = {
  args: {
    defaultActiveKey: "1-2-1-2",
    filerTabsTreeData: [
      {
        key: "1",
        label: "1",
        children: [
          {
            key: "1-1",
            label: "1-1",
            children: [
              {
                key: "1-1-1",
                label: "1-1-1",
              },
            ],
          },
          {
            key: "1-2",
            label: "1-2",
            children: [
              {
                key: "1-2-1",
                label: "1-2-1",
                children: [
                  {
                    key: "1-2-1-1",
                    label: "1-2-1-1",
                  },
                  {
                    key: "1-2-1-2",
                    label: "1-2-1-2",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: "2",
        label: "2",
        children: [
          {
            key: "2-1",
            label: "2-1",
          },
          {
            key: "2-2",
            label: "2-2",
          },
          {
            key: "2-3",
            label: "2-3",
            children: [
              {
                key: "2-3-1",
                label: "2-3-1",
              },
              {
                key: "2-3-2",
                label: "2-3-2",
              },
              {
                key: "2-3-3",
                label: "2-3-3",
              },
            ],
          },
          {
            key: "2-4",
            label: "2-4",
          },
        ],
      },
    ],
  },
};
