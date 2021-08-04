export const historyReplace = (path, history) => {
  history.entries = []
  history.index = -1;
  history.push(path);
};

export default historyReplace;
