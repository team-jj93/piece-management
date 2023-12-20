import type { Meta, StoryObj } from '@storybook/react';
import PieceDetail from '../../components/molecules/piece-detail/PieceDetailView';
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
    name: pieces[0].name,
    imgUrl: pieces[0].imgUrl,
    label: pieces[0].label,
    memo: pieces[0].memo,
    status: pieces[0].status,
    submitter: pieces[0].submitter,
    requester: pieces[0].requester,
    receivedDate: pieces[0].receivedDate,
    scheduledDepartureDate: pieces[0].scheduledDepartureDate,
    departureDate: pieces[0].departureDate
  },
};