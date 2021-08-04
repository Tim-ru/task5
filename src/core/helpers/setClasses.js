export function setClasses(styles = [], condStyles = []) {
  //condStyles [[style, condition]]
  let obj = {};
  styles.forEach((item) => (obj = { ...obj, ...item }));
  condStyles.forEach((arrayCond) => {
    const [style, condition] = arrayCond;
    if (condition) {
      obj = { ...obj, ...style };
    }
  });
  return obj;
}

export default setClasses;
