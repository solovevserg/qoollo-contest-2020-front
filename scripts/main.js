async function loadUsers() {
    const httpResponse = await fetch('/data/users.json');
    const users = await httpResponse.json();
    return users;
}

function displayUsers(users) {
    const listElement = document.getElementById('users-list');
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

function search(users, query) {
    const searched = [];
    for (const user of users) {
        if (user.name.includes(query)) {
            searched.push(user);
        }
    }
    return searched;
}

function initSearching(users) {
    const field = document.getElementById('search-field');
    const button = document.querySelector('#search-button');
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
}

main();