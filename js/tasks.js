/**
 * Main function to display and add each task
 * Tasks should not be deletable by default, unless they are completed
 * (id param comes from the state.js file)
 * @param {string} id
 * */ 
const addTaskToHtml = (id) => {
    //checking if the id is in the html already 
    if(doesHtmlExist('task', id)) {
        throw new Error('Task with that id already added');

    } 
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
 * Inital jsdoc
 * Allows user to edit task
 * @param {string} id - string in the callback
 * @param {Partial<Pick<Task, 'completed' | 'due' | 'title' | 'urgency'>>} changes - properties of the
 *  extracted Task object that can be updated; 'Pick' is a 'helper' (see jsdoc)
 * Other helpers:
 *  - Partial: makes properties optional
 *  - Required: makes properties required
 */
const updateHtmlTask = (id, changes) => {
    const element = document.querySelector(`[data-task=${id}]`);
    const isHtmlElement = element instanceof HTMLElement;
    if(!isHtmlElement) throw new Error(`${element} not found in HTML`);
}

/**
 * Abstracted function that has beem composed of previous two functions and encapsulates all 
 * the behavior associated (abstraction built from other abstractions that composes and combines
 * them into a higher level idea)
 */
export const addTask = 