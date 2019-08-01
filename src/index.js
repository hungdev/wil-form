// @flow
import React, { Component, Fragment } from "react";
import { isEmpty, equals } from "ramda";

type RenderElementWithIndex = {
  render: (handleSubmit: Function) => React$Node,
  moveByIndex: (dataLength: number) => number
};

type FormProps = {
  fields: Array<Object>,
  constraints: Object,
  defaultResult: Object,
  defaultErrors: Object,
  onSubmit: (object: {
    result: Object,
    valid: boolean,
    errors: Object
  }) => void,
  onChange: (object: {
    result: Object,
    valid: boolean,
    errors: Object
  }) => void,
  customSubmit: (handleSubmit: Function) => void,
  renderElementWithIndex: RenderElementWithIndex,
  defineRenderFields: Object
};

type FormState = {
  fields: Array<Object>,
  result: Object,
  constraints: Object,
  errors: Object
};

const isDev: boolean = process.env.NODE_ENV === "development";

export default class WilForm extends Component<FormProps, FormState> {
  static defaultProps = {
    constraints: {},
    defaultResult: {},
    defaultErrors: {},
    onSubmit: ({
      result,
      valid,
      errors
    }: {
      result: Object,
      valid: boolean,
      errors: Object
    }): void => {},
    onChange: ({
      result,
      valid,
      errors
    }: {
      result: Object,
      valid: boolean,
      errors: Object
    }): void => {},
    customSubmit: (handleSubmit: () => {}): void => {},
    renderElementWithIndex: {
      render: (handleSubmit: () => {}): React$Node => null,
      moveByIndex: (dataLength: number): number => dataLength - 1
    },
    defineRenderFields: {}
  };

  state = {
    fields: [],
    constraints: {},
    errors: {},
    result: {}
  };

  static getDerivedStateFromProps(
    nextProps: FormProps,
    prevState: FormState
  ): ?Object {
    if (
      !isEmpty(prevState.fields) &&
      !equals(nextProps.fields, prevState.fields)
    ) {
      return {
        fields: nextProps.fields
      };
    }
    return null;
  }

  async componentDidMount(): Promise<void> {
    const { customSubmit }: FormProps = this.props;

    // setState component ready
    await this._setState();

    // xử lý prop onChange
    this._handleFormOnChange();

    // customSubmit
    customSubmit(this._handleSubmit);
  }

  componentDidUpdate(prevProps: FormProps, prevState: FormState): void {
    const { result, fields }: FormState = this.state;
    if (!equals(fields, prevState.fields)) {
      this._setState();
    }
    if (!equals(result, prevState.result)) {
      this._handleFormOnChange();
    }
  }

  _setState = async (): Promise<void> => {
    const {
      defaultResult,
      defaultErrors,
      fields,
      constraints
    }: FormProps = this.props;
    await this.setState({
      fields,
      result: {
        ...this._getObjectFromArray(fields, ""),
        ...defaultResult
      },
      constraints: {
        ...this._getObjectFromArray(fields, {}),
        ...constraints
      },
      errors: defaultErrors
    });
  };

  _getDefineRenderFields = (): Object => {
    const { defineRenderFields }: FormProps = this.props;
    return defineRenderFields;
  };

  _getPatterns = (type: string): RegExp => {
    const { constraints }: FormState = this.state;
    const { pattern }: { pattern: RegExp } = constraints[type].special;
    return pattern;
  };

  _validFieldSpecial = (type: string, value: Array<any> | string): boolean => {
    const pattern: RegExp = this._getPatterns(type);
    return value.length > 0 && pattern.test(String(value));
  };

  _getObjectFromArray = (arr: Array<any>, value: any): Object => {
    return arr.reduce((obj: Object, item: Object): Object => {
      return {
        ...obj,
        [item.name]: value
      };
    }, {});
  };

  // trả về true nếu mảng errors rỗng
  // nghĩa là không có lỗi xảy ra
  _getValid = (): boolean => {
    const { errors }: FormState = this.state;
    const messageErrors: Array<string> = Object.keys(errors).reduce(
      (arr: Array<string>, name: string): Array<string> => {
        const { message }: { message: string } = errors[name];
        return [...arr, ...(!!message ? [message] : [])];
      },
      []
    );
    return isEmpty(messageErrors);
  };

  _handleFormOnChange = (): void => {
    const { onChange }: FormProps = this.props;
    const { result, errors }: FormState = this.state;
    const valid: boolean = this._getValid();
    onChange({ result, valid, errors });
  };

  // check những trường hợp có điền patterns
  _checkFieldSpecial = (
    name: string,
    value: Array<any> | string,
    special: Object
  ): string => {
    return !this._validFieldSpecial(name, value) ? special.message : "";
  };

  _hasValue = (value: Array<any> | string): boolean => {
    return typeof value === "object" ? !isEmpty(value) : !!value;
  };

  _getMessageErrorFocus = (
    name: string,
    required: boolean,
    value: Array<any> | string
  ): string => {
    const { constraints }: FormState = this.state;
    const { presence }: Object = constraints[name];
    if (!!presence && required && !this._hasValue(value)) {
      return presence.message;
    }
    return "";
  };

  _getMessageErrorBeforeSubmit = (
    name: string,
    required: boolean,
    value: Array<any> | string
  ): string => {
    const { constraints }: FormState = this.state;
    const { presence, length, special }: Object = constraints[name];
    if (!!presence && required && !this._hasValue(value)) {
      return presence.message;
    }
    if (!!length && value.length > 0 && value.length <= length.minimum) {
      return length.message;
    }
    if (!!special && value.length > 0) {
      return this._checkFieldSpecial(name, value, special);
    }
    return "";
  };

  _setResult = (name: string, value: Array<any> | string): void => {
    const { result }: FormState = this.state;
    this.setState({
      result: {
        ...result,
        [name]: value
      }
    });
  };

  _setErrors = (name: string, error: string): void => {
    const { errors }: FormState = this.state;
    this.setState({
      errors: {
        ...errors,
        [name]: {
          status: !!error,
          message: !!error ? error : ""
        }
      }
    });
  };

  _handleFieldFocus = (name: string, required: boolean): Function => (
    value: Array<any> | string
  ): void => {
    const { result }: FormState = this.state;
    const error: string = this._getMessageErrorFocus(name, required, value);
    if (!result[name]) {
      this._setErrors(name, error);
    }
  };

  _conditionLength = ({
    length,
    presence,
    special,
    value,
    required
  }: {
    length: Object,
    presence: Object,
    special: Object,
    value: Array<any> | string,
    required: boolean
  }): boolean => {
    return (
      !!length &&
      ((!presence && value.length <= length.minimum) ||
        (value.length > 0 && value.length <= length.minimum) ||
        (!!special &&
          !required &&
          value.length > 0 &&
          value.length <= length.minimum) ||
        (required && value.length > 0 && value.length <= length.minimum))
    );
  };

  _conditionSpecial = ({
    length,
    presence,
    special,
    value,
    required
  }: {
    length: Object,
    presence: Object,
    special: Object,
    value: Array<any> | string,
    required: boolean
  }): boolean => {
    return (
      !!special &&
      ((!length && value.length > 0 && required) ||
        (!length && !presence && value.length >= 0) ||
        (!required && value.length > 0) ||
        (!!length && !presence && value.length > 0) ||
        (!!length && !!presence && required && value.length > 0))
    );
  };

  conditionPresence = ({
    presence,
    required,
    value
  }: {
    presence: Object,
    value: Array<any> | string,
    required: boolean
  }): boolean => {
    return !!presence && required && value.length <= 0;
  };

  _getMessageErrorFieldChange = ({
    name,
    value,
    required
  }: {
    name: string,
    value: Array<any> | string,
    required: boolean
  }): string => {
    const { constraints }: FormState = this.state;
    const { length, presence, special }: Object = constraints[name];

    if (this._conditionLength({ length, presence, special, value, required })) {
      return length.message;
    }

    if (
      this._conditionSpecial({ length, presence, special, value, required })
    ) {
      return this._checkFieldSpecial(name, value, special);
    }

    if (this.conditionPresence({ presence, required, value })) {
      return presence.message;
    }
    return "";
  };

  _handleDefaultFieldChange = (name: string, required: boolean): Function => (
    value: Array<any> | string
  ): void => {
    const error: string = this._getMessageErrorFieldChange({
      name,
      value,
      required
    });
    this._setErrors(name, error);
    this._setResult(name, value);
  };

  _throwErrorType = (item: Object): void => {
    const defineRenderFields: Object = this._getDefineRenderFields();
    const getDefineTypeKey: Array<string> = Object.keys(defineRenderFields);
    if (isDev) {
      const error: Object = new Error(
        !item.type
          ? `You need to pass the type property: ${JSON.stringify(item)}`
          : `You need to use the defineRenderFields prop to define the render type of a "type".\nEg: <WilForm defineRenderFields={{ ${
              item.type
            }: "render${item.type}" }} render${
              item.type
            }={...} ... />.\nOr use the previously defined type ${JSON.stringify(
              getDefineTypeKey
            )}`
      );
      throw error.message;
    }
  };

  _handleBeforeSubmit = async (): Promise<void> => {
    const { result, fields, errors }: FormState = this.state;
    const getObj: Object = (value: string): Object => {
      return fields.reduce((obj: Object, item: Object): Object => {
        return {
          ...obj,
          [item.name]: item[value]
        };
      }, {});
    };
    await this.setState({
      errors: {
        ...errors,
        ...Object.keys(result).reduce((obj: Object, name: string): Object => {
          const value: Array<any> | string = result[name];
          const required: boolean = getObj("required")[name];
          const error: string = this._getMessageErrorBeforeSubmit(
            name,
            required,
            value
          );
          return {
            ...obj,
            [name]: {
              status: !!error,
              message: !!error ? error : ""
            }
          };
        }, {})
      }
    });
  };

  _handleSubmit = async (event: SyntheticEvent<any>): Promise<void> => {
    const { onSubmit }: FormProps = this.props;
    const { result }: FormState = this.state;
    event.preventDefault();
    await this._handleBeforeSubmit();
    const { errors }: FormState = this.state;
    const valid: boolean = this._getValid();
    onSubmit({ result, valid, errors });
  };

  _handleErrorItemField = (item: Object): void => {
    if (typeof item !== "object") {
      throw new Error(`The element of the passed fields must be an object`)
        .message;
    }
    const arr: Array<string> = Object.keys(item);
    if (!arr.includes("name")) {
      throw new Error(
        `The element of the fields passed must have a "name" property`
      ).message;
    }
    if (!arr.includes("type")) {
      throw new Error(
        `The element of the fields passed must have a "type" property`
      ).message;
    }
  };

  _renderItem = (item: Object): React$Node | Function => {
    const { errors, result }: FormState = this.state;
    const {
      type,
      name,
      required
    }: { type: string, name: string, required: boolean } = item;
    const errorDefault: { status: boolean, message: string } = {
      status: false,
      message: ""
    };
    const error: Object = errors[item.name] || errorDefault;
    const itemGeneral: Object = {
      ...item,
      error,
      defaultValue: result[name],
      onChange: this._handleDefaultFieldChange(name, required),
      onFocus: this._handleFieldFocus(name, required)
    };
    const defineRenderFields: Object = this._getDefineRenderFields();

    const defineFieldKeys: Array<string> = Object.keys(defineRenderFields);
    for (let i: number = 0; i < defineFieldKeys.length; i += 1) {
      const key: string = defineFieldKeys[i];
      if (type === key) {
        const fn: Function = defineRenderFields[key];
        const { props }: { props: FormProps } = this;
        if (!props[fn]) {
          throw new Error(
            `You need to initialize renderProps of the type "${type}" defined in defineRenderFields prop.\n Eg: <WilForm render${type}={({ name, label, ...}) => { return <FieldComponent /> }} ... />`
          ).message;
        }
        return props[fn](itemGeneral);
      }
    }

    return this._throwErrorType(itemGeneral);
  };

  _handleItem = (
    item: Object,
    index: number,
    fields: Array<Object>
  ): React$Node => {
    const { renderElementWithIndex }: FormProps = this.props;
    const {
      render,
      moveByIndex
    }: RenderElementWithIndex = renderElementWithIndex;
    const _getIndex: number = moveByIndex(fields.length);
    const _index: number =
      _getIndex > fields.length - 1 ? fields.length - 1 : _getIndex;
    this._handleErrorItemField(item);
    const elementWithIndex: React$Node = (
      <Fragment key="___elementWithIndex___">
        {render(this._handleSubmit)}
      </Fragment>
    );
    return [
      _getIndex < 0 && index === 0 && elementWithIndex,
      <Fragment key={item.name}>{this._renderItem(item)}</Fragment>,
      index === _index && elementWithIndex
    ];
  };

  render(): React$Node {
    const { fields }: FormState = this.state;
    return !isEmpty(fields) && fields.map(this._handleItem);
  }
}
