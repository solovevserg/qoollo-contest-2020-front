import { greet } from './lib.js';

interface User {
    name: string;
    age: number;
    followers: number[];
    id: number;
    verified: boolean;
}

async function loadUsers() {
    const httpResponse = await fetch('/data/users.json');
    const users = await httpResponse.json() as User[];
    return users;
}

function displayUsers(users: User[]) {
    const listElement = document.getElementById('users-list');
    if (!listElement) {
        throw Error('There is not listElement on the page');
    }
    listElement.innerHTML = '';
    for (const user of users) {
        const userElement = document.createElement('li');
        userElement.innerHTML = `${user.name} (подписчиков: ${user.followers.length})`;
        listElement.appendChild(userElement);
        if (user.verified) {
            userElement.classList.add('verified');
        }
    }
}

function search(users: User[], query: string) {
    const searched = [];
    for (const user of users) {
        if (user.name.includes(query)) {
            searched.push(user);
        }
    }
    return searched;
}

function initSearching(users: User[]) {
    const field = document.getElementById('search-field') as HTMLInputElement;
    const button = document.querySelector('#search-button');
    if (!field || !button) {
        throw Error('There are not controles on the page!');
    }
    button.addEventListener('click', (event) => {
        const query = field.value;
        const searchedUsers = search(users, query);
        displayUsers(searchedUsers);
    })
}

async function main() {
    const users = await loadUsers();
    displayUsers(users);
    initSearching(users);
    const firstUser = users[0];
    const greeting = greet(firstUser.name);
    alert(greeting);
}

main();