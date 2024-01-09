const search = document.querySelector('#search');
// search.innerText = data.search;

const submitBtn = document.querySelector(`input[type='submit']`);
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  handleSubmitBtnClick();
});
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

        const loginName = document.createElement('p');
        loginName.textContent = `User login name: ${user.login}`;
        listItems.appendChild(loginName);

        const avatarImg = document.createElement('img');
        avatarImg.src = user.avatar_url;
        avatarImg.alt = 'Avatar';
        listItems.appendChild(avatarImg);

        const profileLink = document.createElement('a');
        profileLink.href = user.html_url;
        profileLink.textContent = 'View profile';
        listItems.appendChild(profileLink);

        userList.appendChild(listItems);
      });
    })
    .catch((error) => {
      console.error('Error fetching GitHub users:', error);
    });
}
