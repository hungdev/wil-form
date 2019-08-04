import React from "react";
import ReactDOM from "react-dom";
import WilForm from "../../src";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>WilForm</h1>
        <h2>
          <a href="https://github.com/wiloke1/wil-form">
            https://github.com/wiloke1/wil-form
          </a>
        </h2>

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
                  maximum: 10,
                  message:
                    "Your username must be at least 6 characters and at most 10 characters"
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
                  message: "Your password must have at least 5 characters"
                }
              },
              gender: {
                presence: {
                  message: "Gender is required"
                }
              }
            }}
            defaultResult={{
              username: "Test",
              email: "sdfdsfdsfdsfdf"
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
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
