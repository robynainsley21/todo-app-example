import { createTask } from "./tasks";
import { getHtml } from "./helpers";

/**
 * When an error occurs, the entire page will be replaced with the following message
 */
window.addEventListener('error', () => {
    document.body.innerHTML = 'Something went wrong. Please refresh.';
});

const createAddingHtml = () => {
    const element = getHtml('adding');

    const button = document.createElement('button');
    button.className = 'button';
    element.innerText = 'Add Task';

    element.appendChild(button);
};

createAddingHtml();

const list = [
    createTask({
        title: 'Wash the dog',
        urgency: 'high',
        due: null,
    }),
    
    createTask({
        title: 'Write code',
        urgency: 'high',
        due: new Date(),
    }),
];