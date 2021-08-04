module.exports = (obj) => {
  let result = {};
  Object.keys(obj).forEach(key => {
    result[key] = key
  })
  
  return result
}