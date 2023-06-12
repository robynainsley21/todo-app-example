/**
 * Notes by author + from lecture
 * - Do not write abstractions specifically according to SOLID rules, just use them as guides
 * - SOLID methods used
 *  - SRP (each object has their own purpose or responsibility; specificity)
 *  - DIP (depending on abstractions)
 */

import { getHtml, doesHtmlExist, createUniqueId } from "./helpers";
import { Task, State, Filters } from './state';

/**
 * Main function to display and add each task
 * Tasks should not be deletable by default, unless they are completed
 * (id param comes from the state.js file)
 * @param {string} id
 * */ 
export const addTaskToHtml = (id) => {
    //checking if the id is in the html already 
    if(doesHtmlExist('task', id)) {
        throw new Error('Task with that ID already added');
    } 

    //checking if data-list exists
    const list = getHtml({ dataAtrr: 'list' });
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
                <input class="task__input" data-checkbox type="checkbox" disabled/>
            </label>

            <button class="task__title" data-title disabled>
                Wash th Dog asda sdasd asd as ddas Dog asda sdasd asd as ddase Dog
                asda sdasd asd as ddas
            </button>

            <button class="task__check" data-delete style='display: none'>
                <svg
                    class="task__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                >
                    <path
                        d="M253 961q-40.212 0-67.606-27.1Q158 906.8 158 867V314h-58v-94h231v-48h297v48h232v94h-58v553q0 39.05-27.769 66.525Q746.463 961 707 961H253Zm454-647H253v553h454V314ZM354 789h77V390h-77v399Zm175 0h78V390h-78v399ZM253 314v553-553Z"
                    ></path>
                </svg>
            </button>
        </li> 
    `;
    
    list.appendChild(preview);
}

/**
 * Inital jsdoc
 * Allows user to edit task
 * @param {string} id - string in the callback
 * @param {Partial<Props>} changes - properties of the
 *  extracted Task object that can be updated; 'Pick' is a 'helper' (see jsdoc)
 * Other helpers:
 *  - Partial: makes properties optional
 *  - Required: makes properties required
 */
export const updateHtmlTask = (id, changes) => {
    // Keep in mind that 'due' and 'urgency' can also be passed but we dont do anything with them yet
    const { completed, title } = changes;

    //An html element
    const element = getHtml({ dataAtrr: 'task', value: id });

    const hasCompleted = completed !== undefined;
    const hasTitle = title !== undefined;

    if(hasCompleted){
        const inner = getHtml({ dataAtrr: 'checkbox', target: element });
        //Checking if 'selected' is NOT in inner (which is an html element)
        if(!('selected' in inner)) throw new Error('Expected input element');
        inner.selected = completed;
    };

    if(hasTitle){
        const inner = getHtml({ dataAtrr: 'title', target: element });
        inner.innerText = title;
    };
}

/**
 * Abstracted function that has beem composed of previous two functions and encapsulates all 
 * the behavior associated (abstraction built from other abstractions that composes and combines
 * them into a higher level idea)
 * @param {Omit<Props, 'completed'>} props
 * @returns {Task}
 */
export const createTask = (props) => {
    const id = createUniqueId();

    /**
     * Internal state of the task when clicked on
     * @type {Task}
     */
    const state = {
        id,
        completed: false,
        created: new Date(),
        ...props,
    }


    addTaskToHtml(id);

    updateHtmlTask(id, {
        completed: false,
        ...props,
        }        
    );

    return {
        //The 'gets' and 'sets' create a more strict interface to narrow down amount of errors

        //When you 'get' an object, you have to 'set' its value; one cannot be without the other
        get id () {
            return state.id;
        },

        /**
         * Returning an error when the id is changed
         * A value needs to be parsed into 'set' even when the value is not used
         */
        set id (newValue) {
            throw new Error('Cannot directly change ID');
        },

        get completed () {
            return state.completed;
        },

        //Checking if newValue is the same as state.completed
        set completed (newValue) {
            if (typeof newValue !== boolean) throw new Error('completed is not a boolean');
            if (newValue === state.completed) return; //return nothing when values are the same
            state.completed = newValue; //Otherwise set state.completed to newValue

            updateHtmlTask(id, {
                completed: newValue,

            });
        },

        get created () {
            return state.created;
        },

        set created (newValue) {
            throw new Error('Cannot directly change created');
        },

        get title () {
            return state.title;
        },

        set title (newValue) {
            if (!newValue || typeof newValue !== 'string' || newValue.trim() === '') {
                throw new Error('\"title\" is required to be a non-empty string');
            };

            state.title = newValue;
        },

        get urgency () {
            return state.urgency;
        },

        set urgency (newValue) {
            /**
             * @type {Array<Urgency>} 
             */
            const valid = ['high', 'low', 'medium'];
            if(!valid.includes(newValue)) {
                throw new Error('Valid is required to be high, low or medium');
            };
        },

        get due () {
            return state.due;
        },

        set due (newValue) {
            if(!(newValue instanceof Date)) {
                throw new Error('due is required to be a date');
            }

            state.due = newValue;
        },
        
    };
};

export default createTask;