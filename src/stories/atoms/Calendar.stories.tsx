import Calendar from "@/components/atoms/calendar";
import type { Meta, StoryObj } from "@storybook/react";

const CalendarText = () => {
  return (
    <Calendar>
      <Calendar.Month />
    </Calendar>
  );
};

const meta = {
  title: "Atoms/Calendar",
  component: CalendarText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CalendarText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
