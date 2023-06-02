const first = document.querySelector('#firstName');
const last = document.querySelector('#lastName');
const save = document.querySelector('#saveInfo');
const errorSave = document.querySelector('#infoForm .err-save')
const oldPass = document.querySelector('#oldPass');
const newPass = document.querySelector('#newPass');
const confirmPass = document.querySelector('#confirmPass');
const changePass = document.querySelector('#changePass');
const errorChange = document.querySelector('#changeForm .err-change');

const logout = document.querySelector('#logout');

const loading = document.querySelector('.loading');

loading.style.display = 'flex';



if (localStorage.getItem('users')) {
    let allUsers = JSON.parse(localStorage.getItem('users'));
    allUsers.forEach(user => {
        if (user.currentUser) {
            first.value = user.fname;
            last.value = user.lname;
        }
    });
}

save.addEventListener('click', (e) => {
    loading.style.display = 'flex';
    console.log(e.target);
    e.preventDefault();
    errorSave.style.color = 'red';
    let updatedUserArray = [];
    if (localStorage.getItem('users')) {
        let allUsers = JSON.parse(localStorage.getItem('users'));
        allUsers.forEach(user => {
            if (user.currentUser) {
                if (user.fname === first.value && user.lname === last.value) {
                    errorSave.innerHTML = 'No changes made!';
                    // return
                }
                else {
                    user.fname = first.value;
                    user.lname = last.value;
                    errorSave.style.color = 'green';
                    errorSave.innerHTML = 'Changes successfull!';
                }
            }
            updatedUserArray.push(user);
        });
    }
    localStorage.setItem('users', JSON.stringify(updatedUserArray));
    loading.style.display = 'none';

    setTimeout(() => {
        errorSave.innerHTML = '';
    }, 2000)
    // errorSave.innerHTML = 'some'
})

changePass.addEventListener('click', (e) => {
    console.log(e.target);
    e.preventDefault();
    errorChange.style.color = 'red';
    let updatedUserArray = []
    let flag = true;
    if(oldPass.value=='' || newPass.value=='' || confirmPass.value==''){
        errorChange.innerHTML = 'All fields are mandetory!'
        return;
    }
    if (localStorage.getItem('users')) {
        let allUsers = JSON.parse(localStorage.getItem('users'));
        allUsers.forEach(user => {
            if (user.currentUser) {
                if (user.pass === oldPass.value) {4
                    if(newPass.value.length <8){
                        flag = false;
                        newPass.focus();
                        errorChange.innerHTML = 'Passwords length must be greater than 8!';
                        return;
                    }
                    if (newPass.value !== confirmPass.value) {
                        flag = false;
                        confirmPass.focus();
                        errorChange.innerHTML = 'Passwords does not match!';
                        loading.style.display = 'none';
                        return;
                    }
                    else {
                        user.pass = newPass.value;
                        errorChange.style.color = 'green';
                        errorChange.innerHTML = 'Your password is updated!'
                    }
                }
                else {
                    flag = false;
                    oldPass.focus();
                    errorChange.innerHTML = 'Old_Password does not match!';
                    return;
                }
            }
            updatedUserArray.push(user);
        });
        if(!flag){
            loading.style.display = 'none';
            return;
        }
    }
    localStorage.setItem('users', JSON.stringify(updatedUserArray));
    loading.style.display = 'none';

})
setTimeout(() => {
    errorChange.innerHTML = '';
}, 2000)

logout.addEventListener('click', (e)=>{
    loading.style.display = 'flex';
    console.log(e.target);
    let updatedUserArray = [];
    if(localStorage.getItem('users')){
        let allusers = JSON.parse(localStorage.getItem('users'));
        allusers.forEach(user=>{
            if(user.currentUser && user.accessToken){
                user.currentUser = false;
                delete user.accessToken;
            }
            updatedUserArray.push(user);
        })
    }
    localStorage.setItem('users', JSON.stringify(updatedUserArray));
    let link = document.createElement('a');
    link.href = '../index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('We are logging you out! \n Redirecting back to Home page');
    loading.style.display = 'none';
})

loading.style.display = 'none';