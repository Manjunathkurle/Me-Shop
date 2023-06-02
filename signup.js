const fName = document.querySelector('#fname');
const lName = document.querySelector('#lname');
const username = document.querySelector('#username');
const mail = document.querySelector('#mail');
const password = document.querySelector('#pass');
const confirmPass = document.querySelector('#confirmpass');
const error = document.querySelector('.error');
const submitBtn = document.querySelector('#signup');

const navSignupBtn = document.querySelector('#signup-link');
const navLoginBtn = document.querySelector('#login-link');
const cartLink = document.querySelector('#cart-link');

const loading = document.querySelector('.loading');


loading.style.display = 'flex';
// let userArray= [];

function validateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.#$'*+?_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.match(validRegex)) {  
      return true;
  
    } else {
        return false;
    }
  
} 

submitBtn.addEventListener('click', (e)=>{
    console.log(e.target);
    console.log(fName.value+" "+lName.value);
    console.log(username.value);
    e.preventDefault();
    error.style.color = 'red'
    // if any field is empty or all fields are empty
    if(username.value == '' || mail.value == '' || password.value=='' || confirmPass.value=='' || fName.value == '' || lName.value==''){
        error.innerHTML = `Error: All fields are mandatory!`
        return;
    }

    // checking mail id if it is even a mail id or not
    if(!validateEmail(mail.value)){
        error.innerHTML = `Error: Enter Valid mail please!`
        mail.focus();
        return;
    }
    
    // checking if password length is less(weak password)
    if(password.value.length<8){
        error.innerHTML = `Error: Password length must be atleast 8 characters!`;
        password.focus();
        return;
    }

    // checking if password and current password are matching
    if(password.value !== confirmPass.value){
        error.innerHTML = `Error: Password doesn't match!`;
        confirmPass.focus();
        return;
    }

    error.innerHTML = '';
    // generating user details object
    
    let userInfo = {
        fname: fName.value,
        lname: lName.value,
        userName: username.value,
        mailId: mail.value,
        pass: password.value,
        currentUser: false
    };
  
    // storing in local storage
    if(!localStorage.getItem('users')){
        let userArray = [userInfo];
        localStorage.setItem('users', JSON.stringify(userArray));
    }
    else{
        let prevObj = JSON.parse(localStorage.getItem('users'));
        let flag = false;
        for(let i = 0; i<prevObj.length; i++){
            userObj = prevObj[i];
            if(userObj.userName==userInfo.userName){
                error.innerHTML = 'This user_name already taken!'
                username.focus();
                return;
            }
            if(userObj.mailId==userInfo.mailId){
                error.innerHTML = 'This mail_id already taken!'
                mail.focus();
                return;
            }
            else{
                error.innerHTML = '';
                flag = true;
            }
        };
        if(flag){
            let updatedArr = [...prevObj, userInfo];
            localStorage.setItem('users', JSON.stringify(updatedArr))
        }
    }

    error.style.color = 'rgb(28, 190, 28)';
    error.innerHTML = 'Successfully Signedup!!'
    // console.log(userInfo.fname);
    // console.log(userInfo.lname);
    // console.log(userInfo.userName);
    // console.log(userInfo.mailId);
    // redirecting to profile
    loading.style.display = 'flex';
    setTimeout(()=>{
        let link = document.createElement('a');
        link.href = './login.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        loading.style.display = 'none';
    }, 1000)
});

navLoginBtn.addEventListener('click', (e)=>{
    console.log(e.target);
    let link = document.createElement('a');
    link.href = './login.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

navSignupBtn.addEventListener('click', (e)=>{
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