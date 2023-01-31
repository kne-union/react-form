const getField = (formState, token) => {
  if (token.id) {
    return formState[token.id];
  }
  return groupName ? Object.values(formState).find(field => field.name === token.name && field.groupName === token.groupName && field.groupIndex === token.groupIndex) : Object.values(formState).find(field => field.name === token.name);
};

export default getField;