import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import TextInput from ".";

storiesOf("Text Input", module)
  .add("Default", withInfo()(() => <TextInput />))
  .add("With label", withInfo()(() => <TextInput label="Field Label" />))
  .add(
    "With placeholder",
    withInfo()(() => (
      <TextInput label="Field Label" placeholder="input value here" />
    ))
  )
  .add(
    "With value",
    withInfo()(() => (
      <TextInput
        value="a value"
        label="Field Label"
        placeholder="input value here"
      />
    ))
  )
  .add(
    "With a protected value",
    withInfo()(() => (
      <TextInput
        protected
        value="a protected value"
        onReplace={action("the user replaced the protected value")}
        onCancel={action("the user cancelled the editing")}
        label="Field Label"
        placeholder="input value here"
      />
    ))
  )
  .add(
    "disabled protected value",
    withInfo()(() => (
      <TextInput
        protected
        disabled
        value="a protected value"
        label="Field Label"
        placeholder="input value here"
      />
    ))
  )
  .add(
    "Protected value changing programatically every 3 seconds",
    withInfo()(() => {
      class Story extends React.Component {
        constructor(props) {
          super(props);
          this.state = { count: 0 };
        }

        componentDidMount() {
          this.interval = window.setInterval(() => {
            this.setState({ count: this.state.count + 1 });
          }, 3000);
        }

        componentWillUnmount() {
          window.clearInterval(this.interval);
        }

        render() {
          const value = `the value is ${this.state.count}`;
          return (
            <TextInput
              protected
              value={value}
              onReplace={action("the user replaced the protected value")}
              onCancel={action("the user cancelled the editing")}
              label="Field Label"
              placeholder="input value here"
            />
          );
        }
      }

      return <Story />;
    })
  )
  .add(
    "With change handler",
    withInfo()(() => (
      <TextInput
        onChange={action("input changed")}
        label="Field Label"
        placeholder="input value here"
      />
    ))
  )
  .add(
    "Disabled",
    withInfo()(() => (
      <TextInput
        disabled
        onChange={action("input changed")}
        label="Field Label"
        placeholder="input value here"
      />
    ))
  )
  .add(
    "with onMouseOver and onMouseLeave handlers",
    withInfo()(() => (
      <TextInput
        onMouseOver={action("input hovered")}
        onMouseLeave={action("input mouse leave")}
        disabled
        label="Field Label"
        placeholder="input value here"
      />
    ))
  )
  .add(
    "Invalid with custom text",
    withInfo()(() => (
      <TextInput
        validationMessages={["You need to fill this field."]}
        placeholder="Type in the formfield content…"
        label="Field Label"
      />
    ))
  )
  .add(
    "Invalid with multiple errors",
    withInfo()(() => (
      <TextInput
        validationMessages={[
          "Your password needs to contain a capital letter",
          "Your password needs to contain a number",
          "Your password needs to contain an emoji",
          "Your password needs to contain a plot",
          "Your password needs to contain a protagonist",
          "Your password needs to contain some character developtment",
          "Your password needs to contain a twist end"
        ]}
        value="invalid value"
        label="Field Label"
      />
    ))
  )
  .add(
    "Required field",
    withInfo()(() => (
      <form onSubmit={e => e.preventDefault()}>
        <TextInput
          label="Field Label"
          placeholder="a DISABLED field"
          disabled
        />
        <TextInput
          required
          label="Required Field Label"
          placeholder="a REQUIRED field"
        />
        <TextInput label="Field Label" placeholder="an OPTIONAL field" />
        <input type="submit" />
      </form>
    ))
  )
  .add(
    "Required field with invalid handler",
    withInfo()(() => (
      <form onSubmit={e => e.preventDefault()}>
        <TextInput
          label="Field Label"
          placeholder="a DISABLED field"
          disabled
        />
        <TextInput
          required
          onInvalid={action("invalid value")}
          label="Required Field Label"
          placeholder="a REQUIRED field"
        />
        <TextInput label="Field Label" placeholder="an OPTIONAL field" />
        <input type="submit" />
      </form>
    ))
  )
  .add(
    "Built-in constraint validation",
    withInfo()(() => (
      <form onSubmit={e => e.preventDefault()}>
        <TextInput type="URL" label="URL Type" placeholder="an URL field" />
        <TextInput
          type="email"
          label="Email Type"
          placeholder="an EMAIL field"
        />
        <TextInput
          label="Number type with Min and Max"
          placeholder="A number between 2 and 5"
          type="number"
          min="2"
          max="5"
        />
        <TextInput
          label="maxlength"
          maxLength="10"
          placeholder="maxlength=10"
        />
        <TextInput required label="Required" placeholder="a REQUIRED field" />
        <TextInput
          label="regex Pattern"
          placeholder="type a word ended with a"
          pattern="^\w+a$"
        />
        <TextInput type="date" label="Date type" />
        <TextInput type="password" label="Password type" />
        <input type="submit" />
      </form>
    ))
  )
  .add(
    "Search",
    withInfo()(() => (
      <TextInput type="search" onChange={action("input changed")} />
    ))
  );
