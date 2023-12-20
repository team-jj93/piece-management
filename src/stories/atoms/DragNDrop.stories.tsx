import { setDragNDropComponent } from "@/components/atoms/drag-n-drop";
import { cn } from "@/utils/cn";
import type { Meta, StoryObj } from "@storybook/react";
import { Fragment, useState } from "react";

const DragNDrop = setDragNDropComponent<{
  dragStartId: string;
  dropTargetId: string;
}>();

const DragNDropTest = () => {
  const [list, setList] = useState<string[]>(["1", "2", "3", "4", "5", "6"]);

  return (
    <div className="block w-screen h-screen">
      <DragNDrop
        className="overflow w-full h-full"
        dropCallback={({ dragStartId, dropTargetId }) => {
          const newList: string[] = [];

          list.forEach((value) => {
            if (dragStartId === value) {
              return;
            }

            newList.push(value);

            if (dropTargetId === value) {
              newList.push(`${dragStartId}`);
            }
          });
          setList(newList);
        }}
        dependencies={[list]}
      >
        <div
          className="w-full h-[600px] overflow-auto text-black dark:text-white"
          style={{ width: "600px" }}
        >
          {list.map((value) => (
            <Fragment key={value}>
              <DragNDrop.DropArea
                id={value}
                className="w-full h-content"
                payload={({ dragStartId }) => ({
                  dragStartId: `${dragStartId}`,
                  dropTargetId: value,
                })}
              >
                {({ isTarget, isStart }) => (
                  <>
                    <DragNDrop.Draggable id={value}>
                      <div className="w-full h-16">{value}</div>
                    </DragNDrop.Draggable>
                    <div
                      className={cn(
                        "w-full h-0 transition-all duration-100 overflow-hidden bg-blue-500 bg-opacity-30",
                        {
                          ["h-2 bg-opacity-60"]: isStart,
                          ["h-16 bg-opacity-60"]: isTarget,
                        }
                      )}
                    ></div>
                  </>
                )}
              </DragNDrop.DropArea>
            </Fragment>
          ))}
        </div>
        <div className="block bg-pink-500 w-5 h-5">12346</div>
      </DragNDrop>
    </div>
  );
};

const meta = {
  title: "Atoms/DragNDrop",
  component: DragNDropTest,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DragNDropTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
