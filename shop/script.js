const men = document.querySelector('.mens');
const women = document.querySelector('.womens');
const electronics = document.querySelector('.electric');
const jwels = document.querySelector('.jwels');
const filterByCategory = document.querySelectorAll('.filter');
const anybox = document.querySelector('.any');
const colorFilter = document.querySelectorAll('#colorFilter input');
const sizeFilter = document.querySelectorAll('#sizeFilter input');
const rateFilter = document.querySelector('#range');
const priceFilter = document.querySelectorAll('#priceFilter input');
const applyFilter = document.querySelector('#applyBtn');
const clearFilterBtn = document.querySelector('#clearBtn');
const searchInput = document.querySelector('#input');
const searchSuggest = document.querySelector('.suggestion');
const searchBtn = document.querySelector('#search');

const cartLink = document.querySelector('#cart-link');
const navSignupBtn = document.querySelector('#signup-link');
const navLoginBtn = document.querySelector('#login-link');
const profileLink = document.querySelector('#profile-link');

const loading = document.querySelector('.loading');

loading.style.display = 'flex';

let checkedColor = [];
let checkedsize = [];
let checkedprice = undefined;
let checkedrate = undefined;
let addToCartBtns = [];

function categoryFilter(data) {
  for (let i = 0; i < filterByCategory.length; i++) {
    let btn = filterByCategory[i];
    btn.addEventListener('click', (e) => {
      console.log(e.target);

      for (let j = 0; j < filterByCategory.length; j++) {
        filterByCategory[j].classList.remove('active');
      }
      btn.classList.add('active');

      if (btn.innerHTML == 'All') {
        const sect = document.querySelectorAll('.section');
        for (let j = 0; j < sect.length; j++) {
          sect[j].style.display = 'block';
        }
        anybox.style.display = 'none';
        return;
      }
      else {
        const sect = document.querySelectorAll('.section');
        for (let j = 0; j < sect.length; j++) {
          sect[j].style.display = 'none';
        }
        anybox.style.display = 'flex';
      }

      if (btn.innerHTML == 'Mens') {
        anybox.innerHTML = '';
        data.forEach((obj) => {
          if (obj.category == "men's clothing")
            renderData(obj, anybox);
        })
        // return;
      }

      else if (btn.innerHTML == 'Womens') {
        anybox.innerHTML = '';
        data.forEach((obj) => {
          if (obj.category == "women's clothing")
            renderData(obj, anybox);
        })
        // return;
      }

      else if (btn.innerHTML == 'Jewellery') {
        anybox.innerHTML = '';
        data.forEach((obj) => {
          if (obj.category == "jewelery")
            renderData(obj, anybox);
        })
        // return;
      }

      else if (btn.innerHTML == 'Electronics') {
        anybox.innerHTML = '';
        data.forEach((obj) => {
          if (obj.category == "electronics")
            renderData(obj, anybox);
        })
        // return;
      }
    })
  }
  
}


async function fetchProducts() {
  try {
    loading.style.display = 'flex';
    const responce = await fetch('https://fakestoreapi.com/products');
    const data = await responce.json();
    loading.style.display = 'none';
    return data;
  }
  catch (err) {
    alert(err);
  }
}

function getColors() {
  const colors = ['red', 'green', 'blue', 'white', 'black'];
  let clr = new Set();
  for (let i = 1; i <= 3; i++) {
    clr.add(colors[Math.floor(Math.random() * colors.length)]);
  }
  let unqClr = [...clr];

  return unqClr;
}

function renderColor(colors) {
  let str = '';
  for (let i = 0; i < colors.length; i++) {
    str += `<div class="circle" style="background-color: ${colors[i]}"></div>`
  }
  return str;
}

function getSizes() {
  const sizes = ['S', 'M', 'L', 'XL'];
  let sizeArr = new Set();
  for (let i = 0; i < 3; i++) {
    sizeArr.add(sizes[Math.floor(Math.random() * sizes.length)]);
  }
  let unqSiz = [...sizeArr]
  return unqSiz;
}

function rate(rates) {
  let round = parseInt(rates);
  let str = '';
  for (let i = 1; i <= round; i++) {
    str += '<span class="material-icons star">star_rate</span>'
  }
  return str;
}

function getPriceRange(price) {
  if (price > 0 && price <= 25) {
    return '0to25';
  }
  if (price > 25 && price <= 50) {
    return '25to50';
  }
  if (price > 50 && price <= 100) {
    return '50to100';
  }
  if (price > 100) {
    return '100on';
  }
  else {
    return 'none'
  }
}

function generateSectionWiseData(data) {
  loading.style.display = 'flex';
  data.forEach((obj) => {
    if (obj.category == "men's clothing") {
      obj.colors = getColors();
      obj.sizes = getSizes();
      obj.pRange = getPriceRange(obj.price);
      renderData(obj, men);
    }
    else if (obj.category == "women's clothing") {
      obj.colors = getColors();
      obj.sizes = getSizes();
      obj.pRange = getPriceRange(obj.price);
      renderData(obj, women);
    }
    else if (obj.category == "jewelery") {
      obj.pRange = getPriceRange(obj.price);
      renderData(obj, jwels);
    }
    else if (obj.category == "electronics") {
      obj.pRange = getPriceRange(obj.price);
      renderData(obj, electronics);
    }
  })
  loading.style.display = 'none';
}

function renderData(obj, box) {
  loading.style.display = 'flex';
  let item = document.createElement('div');
  item.classList.add('item');
  item.innerHTML = `<p style="display:none;">${obj.id}  </p>
  <div class='holder'>
    <img src=${obj.image} alt="Item" />
    </div>

    <div class="info">
      <div class='head'>
        <h4>${obj.title}</h4>
      </div>
      <div class="row">
        <div class="price">$${obj.price ? obj.price : 'NA'}</div>
        <div class="sized">${obj.sizes ? obj.sizes.join(', ') : 'Sizes: NA'}</div>
      </div>
      <div class="colors">
        Colors:
        <div class="row">
          ${obj.colors ? renderColor(obj.colors) : 'NA'}
        </div>
      </div>
      <div class="colors">Rating:
      <div class="row">${rate(obj.rating.rate)}</div>
      </div>
    </div>`

  let addbtn = document.createElement('button');
  addbtn.classList.add('addBtn');
  addbtn.innerHTML = 'Add to Cart';
  addToCartBtns.push(addbtn);
  item.appendChild(addbtn);

  box.appendChild(item);
  loading.style.display = 'none';
}


function addToCartListener(){
  addToCartBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        try {
          loading.style.display = 'flex';
          console.log(e.target);
          let cartItems = new Set();
          let text = e.target.parentElement.innerHTML
          cartItems.add(text.substring(25, 28));
          if (!localStorage.getItem('users')) {
            alert('Login to add/access cart.');
            return;
          }
          else {
            let flag = false;
            let Allusers = JSON.parse(localStorage.getItem('users'));
            Allusers.forEach((userObj) => {
              if (userObj.currentUser) {
                flag = true;
                if (userObj.cart) {
                  let prev = userObj.cart;
                  let updated = [...prev, ...cartItems];
                  userObj.cart = updated;
                  // localStorage.setItem('users', JSON.stringify(userObj));
                } else {
                  userObj.cart = [...cartItems];
                }
              }
              // console.log(userObj);
            })
            localStorage.setItem('users', JSON.stringify(Allusers));

            if (!flag) {
              alert('Login to add/access cart.');
              return;
            }
          }
          btn.innerHTML = 'Added';
          setTimeout(() => {
            btn.innerHTML = 'Add to cart';
          }, 2500)
          loading.style.display = 'none';
        }
        catch (err) {
          alert('Something went wrong! \n ' + err);
        }
        loading.style.display = 'none';
      })
    })
}



fetchProducts().then((data) => {
  loading.style.display = 'flex';
  generateSectionWiseData(data);
  categoryFilter(data);
  loading.style.display = 'none';
  console.log(data);
  for (let i = 0; i < colorFilter.length; i++) {
    colorFilter[i].addEventListener('change', (e) => {
      console.log(e.target);
      if (e.target.checked) {
        checkedColor.push(e.target.value);
      }
      else if (!e.target.checked) {
        checkedColor = checkedColor.filter(c => c !== e.target.value);
      }
      console.log(checkedColor);
    })
  }

  for (let i = 0; i < sizeFilter.length; i++) {
    sizeFilter[i].addEventListener('change', (e) => {
      console.log(e.target);
      if (e.target.checked) {
        checkedsize.push(e.target.value);
      }
      else if (!e.target.checked) {
        checkedsize = checkedsize.filter(s => s !== e.target.value);
      }
      console.log(checkedsize);
    })
  }

  for (let i = 0; i < priceFilter.length; i++) {
    priceFilter[i].addEventListener('change', (e) => {
      console.log(e.target);
      if (e.target.checked) {
        checkedprice = e.target.value;
      }
      console.log(checkedprice);
    })
  }

  rateFilter.addEventListener('change', (e) => {
    console.log(e.target);
    if (rateFilter.value > 0) {
      checkedrate = rateFilter.value
    }
    else {
      checkedrate = undefined;
    }
    console.log(checkedrate);
  })


  applyFilter.addEventListener('click', (e) => {
    loading.style.display = 'flex';
    console.log(e.target);

    if (!checkedColor.length && !checkedsize.length && !checkedprice && !checkedrate) {
      alert('Select the filters!');
      loading.style.display = 'none';
      return;
    }
    if (!checkedColor.length && !checkedsize.length && !checkedprice && !checkedrate) {
      const sect = document.querySelectorAll('.section');
      for (let j = 0; j < sect.length; j++) {
        sect[j].style.display = 'block';
      }
      anybox.style.display = 'none';
    }
    else {
      const sect = document.querySelectorAll('.section');
      for (let j = 0; j < sect.length; j++) {
        sect[j].style.display = 'none';
      }
      anybox.style.display = 'flex';
    }

    anybox.innerHTML = ''

    if (checkedsize.length && checkedColor.length && checkedprice && checkedrate) {
      loading.style.display = 'flex';
      anybox.innerHTML = '';
      let filtered = [];
      filtered = data.filter(obj => {
        if (obj.sizes && obj.colors) {
          let foundS = obj.sizes.some((siz) => checkedsize.includes(siz));
          let foundC = obj.colors.some((clr) => checkedColor.includes(clr));
          if (foundS && foundC) {
            let numRate = parseInt(obj.rating.rate);
            let priceRange = (obj.pRange === checkedprice);
            return (priceRange && (numRate == checkedrate))
          }
        }
      })

      filtered.forEach(obj => {
        renderData(obj, anybox);
      })

      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      loading.style.display = 'none';
      addToCartListener();
      return;
    }

    if (checkedsize.length && checkedColor.length && checkedprice) {
      loading.style.display = 'flex';
      anybox.innerHTML = '';
      let filtered = [];
      filtered = data.filter(obj => {
        if (obj.sizes && obj.colors) {
          let foundS = obj.sizes.some((siz) => checkedsize.includes(siz));
          let foundC = obj.colors.some((clr) => checkedColor.includes(clr));
          if (foundS && foundC) {
            let priceRange = (obj.pRange === checkedprice);
            console.log(priceRange);
            return priceRange;
          }
        }
      })

      // console.log(filtered);
      filtered.forEach(obj => {
        renderData(obj, anybox);
      })

      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      loading.style.display = 'none';
      addToCartListener()
      return;
    }


    if (checkedsize.length && checkedColor.length && checkedrate) {
      loading.style.display = 'flex';
      anybox.innerHTML = '';
      let filtered = [];
      filtered = data.filter(obj => {
        if (obj.sizes && obj.colors) {
          let foundS = obj.sizes.some((siz) => checkedsize.includes(siz));
          let foundC = obj.colors.some((clr) => checkedColor.includes(clr));
          if (foundS && foundC) {
            let numRate = parseInt(obj.rating.rate);
            return (numRate == checkedrate);
          }
        }
      })

      filtered.forEach(obj => {
        renderData(obj, anybox);
      })

      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      loading.style.display = 'none';
      addToCartListener()
      return;
    }

    if (checkedsize.length && checkedprice && checkedrate) {
      loading.style.display = 'flex';
      anybox.innerHTML = '';
      let filtered = [];
      filtered = data.filter(obj => {
        if (obj.sizes) {
          let foundS = obj.sizes.some((siz) => checkedsize.includes(siz));
          let priceRange = (obj.pRange == checkedprice)
          if (foundS && priceRange) {
            let numRate = parseInt(obj.rating.rate);
            return (numRate == checkedrate);
          }
        }
      })

      filtered.forEach(obj => {
        renderData(obj, anybox);
      })
      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      loading.style.display = 'none';
      addToCartListener()
      return;
    }

    if (checkedColor.length && checkedprice && checkedrate) {
      loading.style.display = 'flex';
      anybox.innerHTML = '';
      let filtered = [];
      filtered = data.filter(obj => {
        if (obj.colors) {
          let foundC = obj.colors.some((clr) => checkedColor.includes(clr));
          let priceRange = (obj.pRange == checkedprice);
          if (foundC && priceRange) {
            let numRate = parseInt(obj.rating.rate);
            return (numRate == checkedrate);
          }
        }
      })

      filtered.forEach(obj => {
        renderData(obj, anybox);
      })

      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      loading.style.display = 'none';
      addToCartListener()
      return;
    }

    if (checkedsize.length && checkedColor.length) {
      loading.style.display = 'flex';
      anybox.innerHTML = ''
      let filtered = [];
      filtered = data.filter(obj => {
        if (obj.sizes && obj.colors) {
          let foundS = obj.sizes.some((siz) => checkedsize.includes(siz));
          let foundC = obj.colors.some((clr) => checkedColor.includes(clr));
          return (foundS && foundC);
        }
      })

      filtered.forEach(obj => {
        renderData(obj, anybox);
      })

      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      loading.style.display = 'none';
      addToCartListener()
      return;
      // console.log(filtered);
    }


    if (checkedColor.length && checkedprice) {
      loading.style.display = 'flex';
      anybox.innerHTML = '';
      let filtered = [];
      filtered = data.filter(obj => {
        if (obj.colors) {
          let foundC = obj.colors.some((clr) => checkedColor.includes(clr));
          let priceRange = (obj.pRange === checkedprice);
          return (foundC && priceRange)
        }
      })

      filtered.forEach(obj => {
        renderData(obj, anybox);
      })

      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      loading.style.display = 'none';
      addToCartListener()
      return;
    }

    if (checkedsize.length && checkedprice) {
      loading.style.display = 'flex';
      anybox.innerHTML = '';
      let filtered = [];
      filtered = data.filter(obj => {
        if (obj.size) {
          let foundS = obj.sizes.some((siz) => checkedsize.includes(siz));
          let priceRange = (obj.pRange === checkedprice);
          return (foundS && priceRange)
        }
      })

      filtered.forEach(obj => {
        renderData(obj, anybox);
      })

      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      loading.style.display = 'none';
      addToCartListener()
      return;
    }

    if (checkedprice && checkedrate) {
      loading.style.display = 'flex';
      anybox.innerHTML = '';
      let filtered = [];
      filtered = data.filter(obj => {
        let priceRange = (obj.pRange == checkedprice);
        let numRate = parseInt(obj.rating.rate);
        return (priceRange && (numRate == checkedrate))
      })

      filtered.forEach(obj => {
        renderData(obj, anybox);
      })

      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      loading.style.display = 'none';
      addToCartListener()
      return;
    }

    if (checkedsize.length && checkedrate) {
      loading.style.display = 'flex';
      anybox.innerHTML = '';
      let filtered = [];
      filtered = data.filter(obj => {
        if (obj.sizes) {
          let foundS = obj.sizes.some((siz) => checkedsize.includes(siz));
          let numRate = parseInt(obj.rating.rate);
          return (foundS && (numRate == checkedrate))
        }
      })

      filtered.forEach(obj => {
        renderData(obj, anybox);
      })

      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      loading.style.display = 'none';
      addToCartListener()
      return;
    }

    if (checkedColor.length && checkedrate) {
      loading.style.display = 'flex';
      anybox.innerHTML = '';
      let filtered = [];
      filtered = data.filter(obj => {
        if (obj.colors) {
          let foundC = obj.colors.some((clr) => checkedColor.includes(clr));
          let numRate = parseInt(obj.rating.rate);
          return (foundC && (numRate == checkedrate))
        }
      })

      filtered.forEach(obj => {
        renderData(obj, anybox);
      })

      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      addToCartListener()
    }

    else {
      anybox.innerHTML = ''
      if (checkedColor.length) {
        loading.style.display = 'flex';
        // anybox.innerHTML = ''
        data.forEach(obj => {
          if (obj.colors) {
            let found = obj.colors.some((clr) => checkedColor.includes(clr));
            if (found) {
              renderData(obj, anybox)
            }
          }
        })
        loading.style.display = 'none';
      }

      else if (checkedsize.length) {
        loading.style.display = 'flex';
        data.forEach(obj => {
          if (obj.sizes) {
            let found = obj.sizes.some((siz) => checkedsize.includes(siz));
            if (found) {
              renderData(obj, anybox)
            }
          }
        })
        loading.style.display = 'none';
      }

      else if (checkedprice) {
        loading.style.display = 'flex';
        data.forEach(obj => {
          if ((obj.pRange === checkedprice)) {
            renderData(obj, anybox)
          }
        })
        loading.style.display = 'none';
      }

      else if (checkedrate) {
        loading.style.display = 'flex';
        data.forEach(obj => {
          let numRate = parseInt(obj.rating.rate);
          if (numRate == checkedrate) {
            renderData(obj, anybox)
          }
        })
        loading.style.display = 'none';
      }
      if (anybox.innerHTML == '') {
        loading.style.display = 'none';
        anybox.innerHTML = '<h1 style="color:grey">No items found!!</h1>'
      }
      addToCartListener();
    }
    
    
  })


  clearFilterBtn.addEventListener('click', (e) => {
    console.log(e.target);
    loading.style.display = 'flex';
    const allcheck = document.querySelectorAll('main aside input[type="checkbox"]');
    const allradio = document.querySelectorAll('main aside input[type="radio"]');
    for (let i = 0; i < allcheck.length; i++) {
      allcheck[i].checked = false;
    }
    for (let i = 0; i < allradio.length; i++) {
      allradio[i].checked = false;
    }
    loading.style.display = 'flex';
    rateFilter.value = 0;
    generateSectionWiseData(data);
    checkedColor = [];
    checkedsize = [];
    checkedprice = undefined;
    checkedrate = undefined;
    const sect = document.querySelectorAll('.section');
    for (let j = 0; j < sect.length; j++) {
      sect[j].style.display = 'block';
    }
    anybox.style.display = 'none';
    loading.style.display = 'none';
  })
  
  // general add-to-cart event listener
  addToCartListener();

  searchInput.addEventListener('keyup', (e) => {
    // console.log(e.target);
    console.log(e.target.value);
    let found = false;
    searchSuggest.innerHTML = ''
    data.forEach((obj) => {
      if (obj.title.includes(searchInput.value)) {
        found = true;
        searchSuggest.style.display = 'flex';
        searchSuggest.innerHTML += `<p class='suggestList'>${obj.title.substring(0, 48)}</p>`;
        let sug = document.querySelectorAll('.suggestList')
        for (let i = 0; i < sug.length; i++) {
          sug[i].addEventListener('click', (e) => {
            searchInput.value = e.target.innerHTML
            e.stopPropagation()
          })
        }
      }
    })
    if (!found) {
      searchSuggest.style.display = 'flex';
      searchSuggest.innerHTML = ``;
      searchSuggest.innerHTML = `<p class='suggestList'>No products found</p>`;
    }
    if (searchInput.value == '') {
      searchSuggest.style.display = 'none';
    }
  })

  searchBtn.addEventListener('click', (e) => {
    loading.style.display = 'flex';
    console.log(e.target);
    searchSuggest.innerHTML = ``;
    searchSuggest.style.display = 'none';
    let found = false;
    data.forEach((obj) => {
      if (obj.title.includes(searchInput.value)) {
        found = true;
        const sect = document.querySelectorAll('.section');
        for (let j = 0; j < sect.length; j++) {
          sect[j].style.display = 'none';
        }
        anybox.style.display = 'flex';
        anybox.innerHTML = ''
        loading.style.display = 'flex';
        renderData(obj, anybox);
        loading.style.display = 'none';
      }
    })
    if (!found || searchInput.value == '') {
      anybox.innerHTML = '<h1 style="color:grey; font-size:2.5rem">Opps! No products found!!</h1>'
    }
    addToCartListener();
    searchInput.value = '';
    loading.style.display = 'none';
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
            cartLink.href = '../cart/index.html'
          } else {
            alert('Cart is empty, add items!')
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
        link.href = '../login.html';
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

});


loading.style.display = 'none';