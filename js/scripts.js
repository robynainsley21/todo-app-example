// @ts-check
import { createTask } from "./tasks";

/**
 * When an error occurs, the entire page will be replaced with the following message
 */
window.addEventListener('error', () => {
    document.body.innerHTML = 'Something went wrong. Please refresh.';
});

createTask({
    title: 'Wash the dog',
    urgency: 'high',
    due: null,
});

