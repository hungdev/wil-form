// @flow
function checkPresence({
  presence,
  required,
  value
}: {
  presence: Object,
  value: Array<any> | string,
  required: boolean
}): boolean {
  return !!presence && required && value.length <= 0;
}

export default checkPresence;
