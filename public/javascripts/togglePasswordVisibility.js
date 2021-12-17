const showPassword = document.querySelector('#showPassword');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

showPassword.addEventListener('click', function (e) {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  if (confirmPassword) {
    confirmPassword.setAttribute('type', type);
  }
});