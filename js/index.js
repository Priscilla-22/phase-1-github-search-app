let selectedName = null;

const search = document.querySelector('#search');
const submitBtn = document.querySelector(`input[type='submit']`);
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  handleSubmitBtnClick();
});

//fetch user details
function handleSubmitBtnClick() {
  const userName = search.value;

  return fetch(`https://api.github.com/search/users?q=${userName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then((resp) => resp.json())
    .then((userInfo) => {
      console.log(userInfo);

      const userList = document.querySelector('#user-list');
      userList.innerHTML = '';

      userInfo.items.forEach((user) => {
        const listItems = document.createElement('li');

        //login name
        const loginName = document.createElement('p');
        loginName.innerHTML = `<strong>login Name:</strong> ${user.login}`;
        listItems.appendChild(loginName);

        loginName.addEventListener('click', (e) => {
          e.preventDefault();
          getUserRepos(user.login);
        });

        //avatar image
        const avatarImg = document.createElement('img');
        avatarImg.src = user.avatar_url;
        avatarImg.alt = 'Avatar';
        listItems.appendChild(avatarImg);

        //profile
        const profileLink = document.createElement('a');
        profileLink.href = user.html_url;
        profileLink.textContent = 'View profile';
        listItems.appendChild(profileLink);

        userList.appendChild(listItems);
      });
    })
    .catch((err) => {
      console.error('Error fetching GitHub users:', err);
    });
}

//fetch user repos
function getUserRepos(login) {
  selectedName = login;

  fetch(`https://api.github.com/users/${selectedName}/repos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then((resp) => resp.json())
    .then((repos) => {
      const repoList = document.querySelector('#repos-list');
      repoList.innerHTML = '';

      repos.forEach((repo) => {
        const eachRepoLink = document.createElement('li');
        eachRepoLink.textContent = repo.name;
        repoList.appendChild(eachRepoLink);
      });
    })
    .catch((err) => {
      console.error('Error fetching user repositories', err);
    });
}
