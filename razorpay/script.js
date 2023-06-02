// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

const addName = document.querySelector('#name');
const addPhone = document.querySelector('#phon');
const addState = document.querySelector('#state');
const addCity = document.querySelector('#city');
const addPin = document.querySelector('#pin');
const addBuilding = document.querySelector('#house');
const addLandmark = document.querySelector('#mark');

let bill = 0;
if (localStorage.getItem("users")) {
  let allUsers = JSON.parse(localStorage.getItem("users"));
  allUsers.forEach((user) => {
    if (user.currentUser && user.totalBill) {
      bill = Math.round(user.totalBill);
    }
  });
}

document.querySelector(".bill").innerHTML = `Your total Bill is: $${bill} <br> 
                                              Please click on 'Pay' button for payments!`;

document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: bill ? bill * 100 : 300 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    redirect: true,
    name: "MyShop Checkout",
    "handler": function (response) {
      if (typeof response.razorpay_payment_id !== 'undefined' || response.razorpay_payment_id >= 1) {
        redirect_url = './success.html';
      }
      location.href = redirect_url
    },
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };


  if (addName.value == '' || addPhone.value == '' || addState.value == '' || addCity.value == '' || addPin.value == '' || addBuilding.value == '' || addLandmark.value == '') {
    alert('Please fill out the address!');
    return;
  }
  if(addPhone.value.length !== 10){
    addPhone.focus();
    alert('Enter valid Phone-number!')
    return;
  }
  if(addPin.value.length !== 6){
    addPhone.focus();
    alert('Enter valid Pincode!')
    return;
  }

  var rzpy1 = new Razorpay(options);
  rzpy1.on("payment.failed", function (response) {
    redirect_url = './failure.html.html';
    location.href = redirect_url;
  });

  
  rzpy1.open();
  // clear mycart - localStorage
  let updatedUserArray = []
  if (localStorage.getItem('users')) {
    let allUsers = JSON.parse(localStorage.getItem('users'));
    allUsers.forEach(user => {
      if (user.currentUser && user.cart ) {
        delete user.cart;
      }
      if(user.currentUser && user.totalBill){
        delete user.totalBill;
      }
      updatedUserArray.push(user);
    })
  }
  localStorage.setItem('users' ,JSON.stringify(updatedUserArray));
  e.preventDefault();
};