# Validate form for Reactjs and React Native
WilForm will help you validate the data fields passing through it. When fields are passed in with an array

### Installation

**npm**

```bash
npm install wil-form --save
```

**yarn**

```bash
yarn add wil-form
```

**Basic Example**

#### [https://codesandbox.io/s/wil-form-emhy1](https://codesandbox.io/s/wil-form-emhy1)

```js
import WilForm from "wil-form";

class App extends React.Component {
  render() {
    return (
      <form>
        <WilForm
          fields={[
            {
              name: "username",
              type: "text",
              required: true,
              label: "Username"
            },
            {
              name: "password",
              type: "password",
              required: true,
              label: "Password"
            },
            {
              name: "email",
              type: "text",
              required: true,
              label: "Email"
            },
            {
              name: "gender",
              label: "Gender",
              type: "select",
              required: true,
              multiple: false,
              options: [
                {
                  name: "",
                  label: "",
                  checked: false
                },
                {
                  name: "male",
                  label: "Male",
                  checked: false
                },
                {
                  name: "female",
                  label: "Female",
                  checked: false
                }
              ]
            }
          ]}
          constraints={{
            username: {
              presence: {
                message: "Username is required"
              },
              length: {
                minimum: 6,
                message: "Your username must be at least 6 characters"
              }
            },
            password: {
              presence: {
                message: "Password is required"
              },
              special: {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                message: "Special password....."
              },
              length: {
                minimum: 5,
                message: "Your password must be at least 5 characters"
              }
            },
            email: {
              presence: {
                message: "Email is required"
              },
              special: {
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email address is not valid"
              },
              length: {
                minimum: 5,
                message: "Your password must be at least 5 characters"
              }
            },
            gender: {
              presence: {
                message: "Gender is required"
              }
            }
          }}
          defaultResult={{
            username: "Test"
          }}
          defineRenderFields={{
            text: "renderInput",
            password: "renderInput",
            select: "renderSelectAbc"
          }}
          renderInput={({
            name,
            type,
            required,
            label,
            error,
            defaultValue,
            onChange,
            onFocus
          }) => {
            return (
              <div>
                <label>
                  {label}
                  {required && <span style={{ color: "red" }}> *</span>}
                </label>
                <br />
                <input
                  name={name}
                  type={type}
                  defaultValue={defaultValue}
                  onChange={event => {
                    const { value } = event.target;
                    onChange(value);
                  }}
                  onFocus={event => {
                    const { value } = event.target;
                    onFocus(value);
                  }}
                />
                <br />
                {error.status && (
                  <span style={{ color: "red" }}>{error.message}</span>
                )}
              </div>
            );
          }}
          renderSelectAbc={({
            options,
            multiple,
            required,
            label,
            error,
            defaultValue,
            onChange,
            onFocus
          }) => {
            return (
              <div>
                <label>
                  {label}
                  {required && <span style={{ color: "red" }}> *</span>}
                </label>
                <br />
                <select
                  multiple={multiple}
                  defaultValue={defaultValue}
                  onChange={event => {
                    const { value } = event.target;
                    onChange(value);
                  }}
                  onFocus={event => {
                    const { value } = event.target;
                    onFocus(value);
                  }}
                >
                  {options.map(item => {
                    return (
                      <option
                        key={item.name}
                        value={item.name}
                        checked={item.checked}
                      >
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                {error.status && (
                  <div style={{ color: "red" }}>{error.message}</div>
                )}
              </div>
            );
          }}
          renderElementWithIndex={{
            render: handleSubmit => {
              return (
                <button type="submit" onClick={handleSubmit}>
                  submit
                </button>
              );
            },
            moveByIndex: dataLength => {
              return dataLength;
            }
          }}
          onSubmit={({ result, valid, errors }) => {
            if (valid) {
              console.log(result);
            } else {
              console.log(errors);
            }
          }}
        />
      </form>
    )
  }
```

**Options**

| Prop                  | Type                                | Default | Description |
| :---------            | :-------:                           | :-----: | :----------- |
| fields (required)     | `Array<Object>`                     | -       | declare an array of data fields |
| constraints           | `Object`                            | `{}`    | object check validate corresponding to data fields |
| defineRenderFields    | `Object`                            | `{}`    | This property will help you create a renderProps function corresponding to the field. You can then use the following example: `<WilForm defineRenderFields = {{ text: "renderInput" }} renderInput = {({name, type, label, ..., error, defaultValue, onChange, onFocus}) => <FieldComponent />} />`. "error, defaultValue, onChange, onFocus" are special params generated |
| renderElementWithIndex| `{ render: React$Node, moveByIndex: Function }`| `{}`    | see the example above |
| defaultResult         | `Object`                            | `{}`    | default result |
| defaultErrors         | `Object`                            | `{}`    | default errors |
| onSubmit              | `({result, valid, errors}) => void` | -  | when you take the action to submit the form |
| onChange              | `({result, valid, errors}) => void` | -  | when you take the action to change the data field |
| customSubmit          | `(handleSubmit: Function) => void`  | -  | see the [Example](https://codesandbox.io/s/wil-form-custom-submit-bwszi) |
