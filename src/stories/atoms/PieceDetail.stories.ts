import type { Meta, StoryObj } from '@storybook/react';
import PieceDetail from '../../components/molecules/piece-detail';
import { pieces } from "../../resources/pieces";

const meta = {
  title: 'Atoms/PieceDetail',
  component: PieceDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PieceDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    piece: pieces[0]
  },
};