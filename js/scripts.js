// @ts-check

import { state, Task } from "./state.js";

/**
 * Inital jsdoc
 * @param {string} id - string in the callback
 * @param {Partial<Pick<Task, 'completed' | 'due' | 'title' | 'urgency'>>} changes - properties of the
 *  extracted Task object that can be updated; 'Pick' is a 'helper' (see jsdoc)
 * Other helpers:
 *  - Partial: makes properties optional
 *  - Required: makes properties required
 */

/**
 * @param {string} dataAtrr
 * @param {string} [value] - value is in [] to indicate that it is optional
 * @returns {HTMLElement} - what returns must be an html element
 */
const getHtml = (dataAtrr, value) => {
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
 * Main function to display each task
 * Tasks should not be deletable by default, unless they are completed
 * (id param comes from the state.js file)
 * @param {string} id
 * */ 

const addTaskToHtml = (id) => {
    //checking if the id is in the html already 
    const isExisting = getHtml('task', id);
    if(isExisting) throw new Error('Task with that id already added');

    //checking if data-list exists
    const list = getHtml('list');
    //previous code before abstraction
    // const list = document.querySelector('[data-list]');
    // const test = list instanceof HTMLElement;    
    // if (!test) throw new Error('\"data-list\" attribute not found in HTML');
    
    const preview = document.createElement('li');
    preview.className = 'task';

    //dataset is how one accesses the data attributes
    preview.dataset.task = id;

    preview.innerHTML = /* html */ `
        <li class="task">
            <label class="task__check">
                <input class="task__input" type="checkbox" />
            </label>
            <button class="task__title">
                Wash th Dog asda sdasd asd as ddas Dog asda sdasd asd as ddase Dog
                asda sdasd asd as ddas
            </button>
            <label class="task__check">
                <svg
                    class="task__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    style='display: none'
                >
                    <path
                        d="M253 961q-40.212 0-67.606-27.1Q158 906.8 158 867V314h-58v-94h231v-48h297v48h232v94h-58v553q0 39.05-27.769 66.525Q746.463 961 707 961H253Zm454-647H253v553h454V314ZM354 789h77V390h-77v399Zm175 0h78V390h-78v399ZM253 314v553-553Z"
                    ></path>
                </svg>
            </label>
        </li> 
    `;
    
    list.appendChild(preview)
}




/**
 * When an error occurs, the entire page will be replaced with the following message
 */
window.addEventListener('error', () => {
    document.body.innerHTML = 'Something went wrong. Please refresh.';
});

addTaskToHtml('test', { title: 'Wash the dog'  });
