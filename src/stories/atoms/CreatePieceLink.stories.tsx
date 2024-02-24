import type { Meta, StoryObj } from "@storybook/react";
import CreatePieceLink from "@/components/atoms/create-piece-link";

const meta = {
  title: "Atoms/CreatePieceLink",
  component: CreatePieceLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreatePieceLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
