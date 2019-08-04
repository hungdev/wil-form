// @flow
function checkLength({
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
}): boolean {
  return (
    !!length &&
    ((!presence &&
      (value.length <= length.minimum || value.length >= length.maximum)) ||
      (value.length > 0 &&
        (value.length <= length.minimum || value.length >= length.maximum)) ||
      (!!special &&
        !required &&
        value.length > 0 &&
        (value.length <= length.minimum || value.length >= length.maximum)) ||
      (required &&
        value.length > 0 &&
        (value.length <= length.minimum || value.length >= length.maximum)))
  );
}

export default checkLength;
