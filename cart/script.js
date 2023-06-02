const items = document.querySelector('.itemContainer');
const listContainer = document.querySelector('.list');
const totalPrice = document.querySelector('.figure');

const shopLink = document.querySelector('#cart-link');
const navSignupBtn = document.querySelector('#signup-link');
const navLoginBtn = document.querySelector('#login-link');
const profileLink = document.querySelector('#profile-link');
const checkoutBtn = document.querySelector('#checkoutBtn');

const loading = document.querySelector('.loading');

loading.style.display = 'flex';
// let removeFromCartBtns = [];

async function fetchById(id) {
    try {
        loading.style.display = 'flex';
        const responce = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await responce.json();
        loading.style.display = 'none';
        return data;
        // console.log(data);
    }
    catch (err) {
        alert('Could not fetch details \n' + err);
    }
}

let removeBtn;
function renderItems(obj) {
    loading.style.display = 'flex';
    let item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `<p style="display:none;">${obj.id} </p>
        <div class='holder'>
        <img src=${obj.image} alt="Item" />
        </div>

        <div class="info">
        <div class='head'>
            <h4>${obj.title}</h4>
        </div>
        <div class="row">
            <div class="price">$${obj.price ? obj.price : 'NA'}</div>
        </div>
        
        </div>`;
    removeBtn = document.createElement('button');
    removeBtn.classList.add('removebtn');
    removeBtn.innerHTML = 'Remove From Cart';

    // removeFromCartBtns.push(removeBtn);
    removeBtn.addEventListener('click', (e) => {
        console.log(e.target);
        update(obj.id);
        e.stopPropagation();
    })
    item.appendChild(removeBtn);

    items.appendChild(item);
    loading.style.display = 'none';
}

function update(cardId) {
    console.log(cardId);
    let updatedUserArray = [];
    if (localStorage.getItem('users')) {
        loading.style.display = 'flex';
        let updatedArray;
        let allUsers = JSON.parse(localStorage.getItem('users'));
        allUsers.forEach(user => {
            if (user.currentUser) {
                if (user.cart) {
                    updatedArray = user.cart.filter(e => e != cardId);
                    user.cart = updatedArray
                    items.innerHTML = '';
                    listContainer.innerHTML = '';
                    sum = 0;
                }
            }
            updatedUserArray.push(user);
        })

        if (!updatedArray.length && items.innerHTML == '') {
            totalPrice.innerHTML = `$0`
            items.innerHTML = '<h2 style="color:grey">Your cart is empty!!</h2>';
        }
        updatedArray.forEach((itemId) => {
            let id = parseInt(itemId.trim());
            fetchById(id).then((data) => {
                loading.style.display = 'flex';
                renderItems(data);
                renderList(data);
                totalPrice.innerHTML = `$${sum.toFixed(2)}`
                loading.style.display = 'none';
            });
        })
    }
    localStorage.setItem('users', JSON.stringify(updatedUserArray));
    loading.style.display = 'none';
}

let sum = 0;
function renderList(obj) {
    let div = document.createElement('div');
    div.classList.add('priceList');
    div.innerHTML = `<span> ${obj.title.substring(0, 20)}</span>
    <span>$${obj.price}</span>`;
    listContainer.appendChild(div);
    let price = parseFloat(obj.price);
    sum += price;
}

if (localStorage.getItem('users')) {
    loading.style.display = 'flex';
    items.innerHTML = '';
    let allUsers = JSON.parse(localStorage.getItem('users'));
    allUsers.forEach(user => {
        if (user.currentUser) {
            if (user.cart) {
                user.cart.forEach((itemId) => {
                    let id = parseInt(itemId.trim());
                    fetchById(id).then((data) => {
                        loading.style.display = 'flex';
                        renderItems(data);
                        renderList(data);
                        totalPrice.innerHTML = `$${sum.toFixed(2)}`
                        loading.style.display = 'none';
                    });
                })
                if (!user.cart.length) {
                    items.innerHTML = '<h2 style="color:grey">Your cart is empty!!</h2>';
                    totalPrice.innerHTML = `$${0}`;
                }

            }
        }
    })
    if (!allUsers.length) {
        items.innerHTML = '';
        totalPrice.innerHTML = `$${0}`
    }

}
else {
    items.innerHTML = '<h2 style="color:grey">Your cart is empty!!</h2>';
}

loading.style.display = 'none';
// if (items.innerHTML == '') {
//     items.innerHTML = '<h1 style="color:grey">Your cart is empty!!</h1>';
//     // alert('some');
// }


shopLink.addEventListener('click', (e) => {
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
                shopLink.href = '../shop/index.html'
            }
        })
        if (!flag) {
            shopLink.href = '#';
            alert('Login to add/access cart.');
            return;
        }
    }
})

navLoginBtn.addEventListener('click', (e) => {
    console.log(e.target);
    let flag = false;
    if (!localStorage.getItem('users')) {
        alert('You are already Loggedin!');
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
            link.href = '../login.jslogin.html';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

});

navSignupBtn.addEventListener('click', (e) => {
    console.log(e.target);
    let link = document.createElement('a');
    link.href = '../signup.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

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
                profileLink.href = '../profile/index.html'
            }
        })
        if (!flag) {
            profileLink.href = '#';
            alert('Login to view your profile!');
            return;
        }
    }
})


checkoutBtn.addEventListener('click', (e) => {
    // console.log(sum);
    loading.style.display = 'flex';
    console.log(e.target);
    let updatedUserArray = [];
    if (localStorage.getItem('users')) {
        let allUsers = JSON.parse(localStorage.getItem('users'));
        allUsers.forEach(user => {
            if (user.currentUser) {
                if (user.cart) {
                    user.totalBill = sum;
                }
            }
            updatedUserArray.push(user);
        })
    }
    localStorage.setItem('users', JSON.stringify(updatedUserArray));
    let link = document.createElement('a');
    link.href = '../razorpay/index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    loading.style.display = 'none';
})

loading.style.display = 'none';