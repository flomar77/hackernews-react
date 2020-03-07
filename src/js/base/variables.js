////////////////////////////////////////////////
// Define main variables for project
////////////////////////////////////////////////
const vars = {};

vars.location = window.location;
vars.url = window.location.href;
vars.body = document.querySelector('body');
vars.hnewsAPI = 'https://hacker-news.firebaseio.com/v0/';

export { vars };