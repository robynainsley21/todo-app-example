//@ts-check

/**
 * @param {object} props
 * @param {string} props.dataAtrr
 * @param {string} [props.value] - value is in [] to indicate that it is optional
 * @param {HTMLElement} [props.target] - optional element parsed; where the html is retrieved from
 * @returns {HTMLElement} - what returns must be an html element
 */
export const getHtml = (props) => {
    const { dataAtrr, value, target } = props;

    const selector = value ? `[data-${dataAtrr}='${value}']` : `[data-${dataAtrr}]`;

    /**
     * Example of a good abstraction because minimal changes were made
     * Checking if element exists in case element is moved, or file containing element is moved   
     * Make scope = target id there is one otherwise fall back to document
     */
    const scope = target || document; 
    //whatever is parsed through here is what querySelector is going to run on 
    const element = scope.querySelector(selector);
    const isHtmlElement = element instanceof HTMLElement;
    if(!isHtmlElement) {throw new Error(`${selector} attribute not found in HTML`)};

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

/**
 * @return {string}
 */
export const createUniqueId = () => {
    const array = [
        Math.round(Math.random() * 10000000000),
        new Date().getTime(),
        Math.round(Math.random() * 10000000000),
    ];

    //.join adds what is put in the () after each iteration; returns as string
    return array.join('-');
}