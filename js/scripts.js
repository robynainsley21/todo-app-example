// @ts-check

import { state, Task } from "./state";
import { addTaskToHtml, updateHtmlTask } from './tasks'

/**
 * When an error occurs, the entire page will be replaced with the following message
 */
window.addEventListener('error', () => {
    document.body.innerHTML = 'Something went wrong. Please refresh.';
});

addTaskToHtml('test');
updateHtmlTask('test', { title: 'Wash the dog' });