import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";

import Checkbox from ".";

storiesOf("Checkbox Input", "module")
  .add("Default", withInfo()(() => <Checkbox />))
  .add("checked", withInfo()(() => <Checkbox checked />))
  .add("with text label", withInfo()(() => <Checkbox label="Checkbox Label" />))
  .add(
    "with onChange event",
    withInfo()(() => (
      <Checkbox label="Checkbox Label" onChange={action("onChange")} />
    ))
  )
  .add(
    "disabled",
    withInfo()(() => (
      <Checkbox
        disabled
        tooltipText="custom disabled text"
        checked
        label="Checkbox Label"
      />
    ))
  )
  .add(
    "in a fieldset",
    withInfo()(() => (
      <fieldset>
        <Checkbox label="Checkbox Label 1" name="foo" />
        <Checkbox disabled label="Checkbox Label 2" name="foo" />
        <Checkbox label="Checkbox Label 3" name="foo" />
      </fieldset>
    ))
  );
