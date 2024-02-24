import type { Meta, StoryObj } from "@storybook/react";
import PieceForm from "../../components/molecules/piece-form";

const meta = {
  title: "Molecules/PieceForm",
  component: PieceForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PieceForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: (data: any) => {
      console.log(data);
    },
    getImageUrl: (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onload = () => {
          const url = reader.result;

          if (typeof url === "string") {
            resolve(url);
          } else {
            resolve("");
          }
        };
      }).then((value) => {
        if (typeof value === "string") {
          return value;
        }

        return "";
      });
    },
    defaultValues: {
      name: "그림1",
    },
  },
};
