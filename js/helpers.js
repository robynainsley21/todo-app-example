//@ts-check

/**
 * @param {string} dataAtrr
 * @param {string} [value] - value is in [] to indicate that it is optional
 * @returns {HTMLElement} - what returns must be an html element
 */
export const getHtml = (dataAtrr, value) => {
    const selector = value ? `[data-${dataAtrr}='${value}']` : `[data-${dataAtrr}]`;
    /**
     * Checking if element exists in case element is moved, or file containing element is moved
     */
    const element = document.querySelector(selector);
    const isHtmlElement = element instanceof HTMLElement;
    if(!isHtmlElement) {throw new Error(`${selector} attribute not found in HTML`);}

    return element;
}

/**
 * This function is solely for the purpose of checking if the element already exists
 * @param {string} dataAtrr
 * @param {string} [value]
 * @returns {boolean}
 */
export const doesHtmlExist = (dataAtrr, value) => {
    const selector = value 
    ? `[data-${dataAtrr}='${value}']`
    : `[data-${dataAtrr}]`;

    const element = document.querySelector(selector);
    const isHtmlElement = element instanceof HTMLElement;
    return isHtmlElement;
};
