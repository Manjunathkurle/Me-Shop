const navSignupBtn = document.querySelector('#signup-link');
const navLoginBtn = document.querySelector('#login-link');
const cartLink = document.querySelector('#cart-link');

const user = document.querySelector('#username');
const password = document.querySelector('#pass');
const loginBtn = document.querySelector('#login');
const error = document.querySelector('.error')

const loading = document.querySelector('.loading');

loading.style.display = 'flex';

function generateToken(){
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';

  let res = '';
  let length = characters.length;
  for(let i = 1; i<=16; i++){
      res += characters.charAt(Math.floor(Math.random()*length));
  }
  return res;
}

loginBtn.addEventListener('click', (event) => {
  console.log(event.target);
  console.log(user.value);
  event.preventDefault();
  error.style.color = 'red';
  if (user.value == '' || password.value == '') {
    error.innerHTML = 'Please enter Username and Password!'
    return;
  }
  if (!localStorage.getItem('users')) {
    error.innerHTML = 'No user found! Please Signup.'
    return;
  }
  let usersArray = JSON.parse(localStorage.getItem('users'));
  // console.log(usersArray);
  let matched = false;
  for (let i = 0; i < usersArray.length; i++) {
    let obj = usersArray[i];
    let mail = obj.mailId;
    let username = obj.userName;
    let pass = obj.pass;
    if ((username == user.value || mail == user.value) && pass == password.value) {
      obj.currentUser = true;
      obj.accessToken = generateToken();
      matched = true;
      error.innerHTML = '';
      error.style.color = 'rgb(28, 190, 28)';
      error.innerHTML = 'Successfully Loggedin!!'
      console.log(user.value);
      localStorage.setItem('users', JSON.stringify(usersArray));
      loading.style.display = 'flex';
      setTimeout(() => {
        let link = document.createElement('a');
        link.href = './shop/index.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        loading.style.display = 'none';
      }, 1000)
      break;
    }
    else {
      obj.currentUser = false;
    }
  }
  if (!matched) {
    error.innerHTML = "either the User ID or Password that you're using to login, is invalid!"
  }
})



navLoginBtn.addEventListener('click', (e) => {
  console.log(e.target);
  let link = document.createElement('a');
  link.href = '#';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

navSignupBtn.addEventListener('click', (e) => {
  console.log(e.target);
  let link = document.createElement('a');
  link.href = './signup.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

cartLink.addEventListener('click', (e) => {
  console.log(e.target);
  let flag = false;
  if (!localStorage.getItem('users')) {
    alert('Login to add/access cart.');
    return;
  }
  else {
    let Allusers = JSON.parse(localStorage.getItem('users'));
    Allusers.forEach((userObj) => {
      if (userObj.currentUser) {
        flag = true;
        if (userObj.cart) {
          cartLink.href = './cart/index.html'
        }
      }
    })
    if (!flag) {
      cartLink.href = '#';
      alert('Login to add/access cart.');
      return;
    }
  }
})


loading.style.display = 'none';