declare module "wil-form" {
  export interface RenderElementWithIndex {
    render: (handleSubmit: Function) => React.ReactNode;
    moveByIndex: (dataLength: number) => number;
  }

  export interface FormProps {
    fields: Array<Object>;
    constraints: Object;
    defaultResult: Object;
    defaultErrors: Object;
    onSubmit: (object: {
      result: Object;
      valid: boolean;
      errors: Object;
    }) => void;
    onChange: (object: {
      result: Object;
      valid: boolean;
      errors: Object;
    }) => void;
    customSubmit: (handleSubmit: Function) => void;
    renderElementWithIndex: RenderElementWithIndex;
    defineRenderFields: Object;
  }

  export interface FormState {
    fields: Array<Object>;
    result: Object;
    constraints: Object;
    errors: Object;
  }

  export default class WilForm<FormState extends object> {
    state: FormState;
    props: FormProps;
  }
}
