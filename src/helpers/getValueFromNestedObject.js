export const getValueFromNestedObject = (
  object,
  propertyPath,
  defaultValue = ""
) => {
  var properties = propertyPath.split(".");
  var obj = object;
  for (var i = 0; i < properties.length; i++) {
    if (typeof obj !== "object") {
      return defaultValue;
    }
    obj = obj[properties[i]];
  }
  return obj;
};
