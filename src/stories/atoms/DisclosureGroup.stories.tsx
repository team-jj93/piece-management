import DisclosureGroup from "../../components/atoms/disclosure-group";
import Disclosure from "../../components/atoms/disclosure";
import type { Meta, StoryObj } from "@storybook/react";

const DisclosureGroupTest = () => {
  return (
    <DisclosureGroup className="">
      <Disclosure as="li" index={1}>
        <Disclosure.Button>
          <h1>Disclosure</h1>
        </Disclosure.Button>
        <Disclosure.Panel>
          <h1>열리나? 안열리나?</h1>
        </Disclosure.Panel>
      </Disclosure>
      <Disclosure as="li" index={2}>
        <Disclosure.Button>
          <h1>테스트2</h1>
        </Disclosure.Button>
        <Disclosure.Panel>
          <h1>잘 되나?</h1>
        </Disclosure.Panel>
      </Disclosure>
      <Disclosure as="li" index={3}>
        <Disclosure.Button>
          <h1>테스트3</h1>
        </Disclosure.Button>
        <Disclosure.Panel>
          <h1>잘 되나?</h1>
        </Disclosure.Panel>
      </Disclosure>
    </DisclosureGroup>
  );
};

const meta = {
  title: "Atoms/DisclosureGroup",
  component: DisclosureGroupTest,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DisclosureGroupTest>;

export default meta;

export const Primary = {
  args: {},
};
