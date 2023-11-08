const getField = (formState, token) => {
  if (token.id) {
    return formState[token.id];
  }
  return token.groupName ? Object.values(formState).find(field => field.name === token.name && field.groupName === token.groupName && field.groupIndex === token.groupIndex) : Object.values(formState).find(field => field.name === token.name);
};

export const getGroupFieldList = (formState, token) => {
  return token.groupName ? Object.values(formState).filter(field => field.name === token.name && field.groupName === token.groupName) : [];
};

export default getField;
