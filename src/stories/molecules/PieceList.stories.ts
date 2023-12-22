import type { Meta, StoryObj } from '@storybook/react';
import PieceList from '../../components/molecules/piece-tabs';
import { pieces } from "../../resources/pieces";

const meta = {
  title: 'Molecules/PieceList',
  component: PieceList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PieceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    pieces
  },
};