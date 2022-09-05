const compileErrMsg = (errMsg, label) => {
  return typeof errMsg === 'string' ? errMsg.replace('%s', label) : errMsg(label);
};

export default compileErrMsg;
