// myProducts.filter((item)=>item.title.includes(search.value))
// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

// elements
const navLoginBtn = document.querySelector('#login-link');
const navSignupBtn = document.querySelector('#signup-link');
const mainLoginBtn = document.querySelector('.login-btn');
const mainSignupBtn = document.querySelector('.signup-btn');
const profileLink = document.querySelector('#profile-link');
const cartLink = document.querySelector('#cart-link');
const browseShop = document.querySelector('.browseShop');

const loading = document.querySelector('.loading');

loading.style.display = 'flex';

navLoginBtn.addEventListener('click', (e) => {
  console.log(e.target);
  let flag = false;
  if (!localStorage.getItem('users')) {
    alert('Signup before login');
    return;
  }
  else {
    let Allusers = JSON.parse(localStorage.getItem('users'));
    Allusers.forEach((userObj) => {
      if (userObj.currentUser) {
        flag = true;
        alert('You are already Loggedin!');
        return;
      }
    })
    if (!flag) {
      let link = document.createElement('a');
      link.href = './login.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
})
mainLoginBtn.addEventListener('click', (e) => {
  console.log(e.target);
  let flag = false;
  if (!localStorage.getItem('users')) {
    alert('Signup before login');
    return;
  }
  else {
    let Allusers = JSON.parse(localStorage.getItem('users'));
    Allusers.forEach((userObj) => {
      if (userObj.currentUser) {
        flag = true;
        alert('You are already Loggedin!');
        return;
      }
    })
    if (!flag) {
      let link = document.createElement('a');
      link.href = './login.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
})

navSignupBtn.addEventListener('click', (e) => {
  console.log(e.target);
  let link = document.createElement('a');
  link.href = './signup.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
})
mainSignupBtn.addEventListener('click', () => {
  let link = document.createElement('a');
  link.href = './signup.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
})

profileLink.addEventListener('click', (e) => {
  console.log(e.target);
  let flag = false;
  if (!localStorage.getItem('users')) {
    alert('No user found! Signup to view your profile.');
    return;
  }
  else {
    let Allusers = JSON.parse(localStorage.getItem('users'));
    Allusers.forEach((userObj) => {
      if (userObj.currentUser) {
        flag = true;
        profileLink.href = './profile/index.html'
      }
    })
    if (!flag) {
      profileLink.href = '#';
      alert('Login to view your profile!');
      return;
    }
  }
})

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
        }else{
          alert(`${userObj.fname}, Your cart is empty! \n Visit shop to add products`);
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

browseShop.addEventListener('click', (e) => {
  console.log(e.target);
  let link = document.createElement('a');
  link.href = './shop/index.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
})

loading.style.display = 'none';