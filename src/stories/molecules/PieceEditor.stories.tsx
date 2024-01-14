import type { Meta, StoryObj } from "@storybook/react";
import PieceEditor from "../../components/molecules/piece-editor";

const meta = {
  title: "Molecules/PieceEditor",
  component: PieceEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PieceEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
