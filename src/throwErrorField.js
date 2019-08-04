// @flow
function throwErrorField(item: Object): void {
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
}

export default throwErrorField;
