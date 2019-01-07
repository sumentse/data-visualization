/**
 * Return node(s) with the given id name
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {String} val - Value of the id name
 * @returns {ShallowWrapper}
 */
export const findByID = (wrapper, val) => {
  return wrapper.find(`#${val}`);
};

/**
 * Return node(s) with the given class name
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {String} val - Value of the class name
 * @returns {ShallowWrapper}
 */
export const findByClassName = (wrapper, val) => {
  return wrapper.find(`[className="${val}"]`)
};