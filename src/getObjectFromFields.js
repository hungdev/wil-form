// @flow
function getObjectFromFields(arr: Array<any>, value: any): Object {
  return arr.reduce((obj: Object, item: Object): Object => {
    return {
      ...obj,
      [item.name]: value
    };
  }, {});
}

export default getObjectFromFields;
