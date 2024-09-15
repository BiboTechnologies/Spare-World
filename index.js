import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import { getDatabase, ref, remove, push, get, update, onValue, child, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import { getAuth, onAuthStateChanged,sendPasswordResetEmail,sendEmailVerification ,createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
        const firebaseConfig = {
              apiKey: "AIzaSyAisBpwnYt14S4NiLbcOiAhdINsqwSYJiI",
  authDomain: "aleveltv-75194.firebaseapp.com",
  databaseURL: "https://aleveltv-75194-default-rtdb.firebaseio.com",
  projectId: "aleveltv-75194",
  storageBucket: "aleveltv-75194.appspot.com",
  messagingSenderId: "440342498130",
  appId: "1:440342498130:web:20e2eb670b1cb2c39cc88b",
  measurementId: "G-VTR1KGT4CW"
            };

          
  // ... Your existing Firebase imports ...
  const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app);



    document.addEventListener('DOMContentLoaded', function () {
  // Check if the welcome popup has been shown
  const hasShownPopup = localStorage.getItem('hasShownPopup');

  if (!hasShownPopup) {
    // Show the welcome popup
    const overlay10 = document.getElementById('overlay10');
    const welcomePopup = document.getElementById('welcomePopup');
    overlay10.style.display = 'block';
    welcomePopup.style.display = 'block';

    // Fade in the welcome popup
    setTimeout(() => {
      welcomePopup.classList.remove('fade-in');
    }, 100); // Wait for 1 second (adjust as needed)

    // Set the flag to indicate that the popup has been shown
    localStorage.setItem('hasShownPopup', true);
  }
});

// Function to close welcome popup
function closeWelcomePopup() {
  const overlay10 = document.getElementById('overlay10');
  const welcomePopup = document.getElementById('welcomePopup');

  // Hide the overlay and the welcome popup
  overlay10.style.display = 'none';
  welcomePopup.style.display = 'none';
}

// Listen for the popstate event
window.addEventListener('popstate', closeWelcomePopup);


document.getElementById('subscribeButton').addEventListener('click', subscribeToFirebase);
document.getElementById('closeButton').addEventListener('click', closeWelcomePopup);
function subscribeToFirebase() {
  var email = document.getElementById('email').value;

  // Check if the email input is empty
  if (email.trim() === '') {
    alert('Please enter your email.');
    return; // Exit the function early if email is empty
  }

  // Show spinner and update button text
  document.getElementById('subscribeButton').style.display = 'none';
  document.getElementById('spinner').style.display = 'inline-block';

  // Push the email to Firebase Realtime Database
  const emailsRef = ref(database, 'subscribedEmails');
  push(emailsRef, email)
    .then(() => {
      // Hide spinner and show thank you message
      document.getElementById('spinner').style.display = 'none';
      document.getElementById('thankYouMessage').style.display = 'block';

      // Replace the existing content with the success message
      replaceContentWithSuccessMessage();

      // Close the welcome popup after 1 second
      setTimeout(() => {
        closeWelcomePopup();
      }, 1000);
    })
    .catch(error => {
      console.error('Error submitting email to Firebase:', error);

      // Hide spinner and show an error message (if needed)
      document.getElementById('spinner').style.display = 'none';
      alert('There was an error subscribing. Please try again.');
    });
}

function replaceContentWithSuccessMessage() {
  // Replace the content inside the subscriptionContent div with the success message
  document.getElementById('subscriptionContent').innerHTML = '';
}



// Function to create the cart dynamically
function createCart() {
  // Create the main cart div
  const cartDiv = document.createElement("div");
  cartDiv.id = "cart";
  cartDiv.classList.add("cart");

  // Create the cart count span
  const cartCountSpan = document.createElement("span");
  cartCountSpan.id = "cart-count";

  // Create the cart buttons div
  const cartButtonsDiv = document.createElement("div");
  cartButtonsDiv.id = "cart-buttons";

  // Create the open cart button
  const openCartBtn = document.createElement("button");
  openCartBtn.id = "open-cart-btn";
  openCartBtn.innerHTML = '<i class="fa fa-shopping-cart"></i>';

  // Create the close cart button
  const closeCartBtn = document.createElement("button");
  closeCartBtn.id = "close-cart-btn";
  closeCartBtn.innerHTML = '<i class="fa fa-times"></i>';

  // Append buttons to the cart buttons div
  cartButtonsDiv.appendChild(openCartBtn);
  cartButtonsDiv.appendChild(closeCartBtn);

  // Create the cart content div
  const cartContentDiv = document.createElement("div");
  cartContentDiv.id = "cart-content";

  // Create the cart items div
  const cartItemsDiv = document.createElement("div");
  cartItemsDiv.id = "cart-items";

 // Create the total price paragraph
const totalPriceParagraph = document.createElement("p");
totalPriceParagraph.id = "total-price";

// Create the checkout button
const checkoutBtn = document.createElement("button");
checkoutBtn.id = "checkout-btn";
checkoutBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Checkout';

// Create a div to contain the button and total
const buttonAndTotalContainer = document.createElement("div");
buttonAndTotalContainer.classList.add("button-and-total-container");

// Append items to the cart content div
cartContentDiv.appendChild(cartItemsDiv);
cartContentDiv.appendChild(buttonAndTotalContainer);

// Append the total price and checkout button to the container
buttonAndTotalContainer.appendChild(totalPriceParagraph);
buttonAndTotalContainer.appendChild(checkoutBtn);


  // Append elements to the main cart div
  cartDiv.appendChild(cartCountSpan);
  cartDiv.appendChild(cartButtonsDiv);
  cartDiv.appendChild(cartContentDiv);

  // Append the cart to the cart container
  const cartContainer = document.getElementById("cart-container");
  cartContainer.appendChild(cartDiv);

  // Check if cart is empty and hide it initially
  if (isCartEmpty()) {
    cartDiv.style.display = "none";
  }
}

// Function to check if the cart is empty
function isCartEmpty() {
  const cartItems = document.getElementById("cart-items");
  return cartItems.children.length === 0;
}

document.addEventListener("DOMContentLoaded", () => {
    // The page has fully loaded, now you can safely create the cart
    createCart();

 // Show/hide the cart based on scroll position
 window.addEventListener("scroll", () => {
  const cart = document.getElementById("cart");
  const distanceFromTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollThreshold = 200; // Set the scroll height to trigger the cart display

  if (distanceFromTop > scrollThreshold) {
    // Fade in
    cart.style.display = "block";
    setTimeout(() => {
        cart.style.opacity = "1";
    }, 10); // Adjust the delay (in milliseconds) if needed
} else {
    // Fade out
    cart.style.opacity = "0";
    setTimeout(() => {
        cart.style.display = "none";
    }, 300); // Adjust the delay (in milliseconds) to match the transition duration
}
});















    // Declare userData variable in a higher scope
    let userData = {};

// Function to show the popup with user details
async function showPopupWithUserDetails() {
  // Check if the user is authenticated
  const user = auth.currentUser;
  if (!user) {
      console.log('User not authenticated');

      // Display a message and fade it in with an overlay
      const messageContainer = document.getElementById('messageContainer');
      const messageContent = document.getElementById('messageContent');
      const overlay2 = document.getElementById('overlay6');

      // Set the message content HTML, including the company logo and login button
      messageContent.innerHTML = `
          <div id="companyLogo" class="company-logo">
              <img src="bibo-phone-spare-world-logo-zip-file/png/logo-black.png" alt="Company Logo">
          </div>
          <p>You are not signed in. Please sign in to access your account.</p>
          <button id="loginButton" class="login-button">
              <i class="fa fa-sign-in"></i> Login
          </button>
      `;

      // Add the "fade-in" class to apply the fade-in animation
      messageContainer.classList.add('fade-in');
      messageContainer.style.display = 'flex'; // Make the message container visible
      overlay2.style.display = 'block';

      // Add a click event listener to the login button
      const loginButton = document.getElementById('loginButton');
      loginButton.addEventListener('click', function () {
          window.location.href = 'login.html'; // Adjust the login page URL
      });

      return;
  }

  // Display an overlay
  const overlay2 = document.getElementById('overlay6');
  overlay2.style.display = 'block';

  // Show loader while fetching user details
  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  // Retrieve user details from local storage
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  // Display user details in the popup with lazy load effect
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
  popup.classList.add('fade-in');

  const userDetailsElement = document.getElementById('userDetails');
  userDetailsElement.innerHTML = `
      <div class="user-info">
          <p class="accountt"> Account Details </p>
          <p>Email: ${userDetails.email}</p>
      </div>
  `;

  // Fetch additional details from Firebase using the user's UID
  const userId = userDetails.uid;
  const userRef = ref(database, 'users/' + userId);

  try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
          const userData = snapshot.val();
          userDetailsElement.innerHTML += `
              <table class="additional-info-table">
                  <tr>
                      <th>First Name</th>
                      <td>${userData.firstName || 'N/A'}</td>
                  </tr>
                  <tr>
                      <th>Last Name</th>
                      <td>${userData.lastName || 'N/A'}</td>
                  </tr>
                  <tr>
                      <th>Telephone</th>
                      <td>${userData.telephone || 'N/A'}</td>
                  </tr>
                  <tr>
                      <th>Date of Birth</th>
                      <td>${userData.dob || 'N/A'}</td>
                  </tr>
              </table>
          `;
            // Hide the loader when user details are loaded
            loader.style.display = 'none';
        

            // Display profile picture if available or show a default profile icon
            const profilePictureElement = document.getElementById('profilePicture');
            if (user.photoURL) {
                profilePictureElement.src = user.photoURL;
                profilePictureElement.style.display = 'block';
            } else {
                // Show a default profile icon
                profilePictureElement.src = 'img/profile.png'; // Replace with your default icon path
                profilePictureElement.style.display = 'block';
            }

        } else {
            userDetailsElement.innerHTML += `<p>No user details found.</p>`;
        }
    } catch (error) {
        console.error('Error fetching user details from Firebase:', error.message);
    }

// Show the popup
document.getElementById("popup").style.display = "block";
document.body.classList.add("no-scroll"); // Disable scrolling
    }

    // Use onAuthStateChanged to check when the authentication state changes
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in
            // You can now call showPopupWithUserDetails here or wherever appropriate
        } else {
            // User is signed out
            console.log('User signed out');
        }
    });

// Add an event listener to the close button
document.getElementById("closePopupBtn").addEventListener("click", function() {
  closePopup();
});

// Function to close the popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById('overlay6').style.display = 'none';
  document.body.classList.remove("no-scroll"); // Enable scrolling
}

// Listen for the popstate event
window.addEventListener('popstate', closePopup);


// Event listener for the "Logout" button
document.getElementById("logoutBtn").addEventListener("click", function () {
    // Display confirmation popup
    showLogoutConfirmationPopup();
});

// Function to show the logout confirmation popup
function showLogoutConfirmationPopup() {
    const confirmationPopup = document.getElementById('confirmationPopup');
    const overlay = document.getElementById('overlay3');

    // Display the confirmation popup
    confirmationPopup.style.display = 'block';
    overlay.style.display = 'block';

    // Add event listeners to "Yes" and "No" buttons
    const yesButton = document.getElementById('confirmYesBtn');
    const noButton = document.getElementById('confirmNoBtn');

    yesButton.addEventListener('click', handleLogoutConfirmation);
    noButton.addEventListener('click', closeLogoutConfirmationPopup);
}

function handleLogoutConfirmation() {
    const overlay2 = document.getElementById('overlay2');
    // Perform logout actions here (e.g., using Firebase Auth)
    auth.signOut()
        .then(() => {
            showLoggedOutMessage();
            closePopup();
            closeLogoutConfirmationPopup();
            location.reload();  // Corrected: invoke the function
        })
        .catch((error) => {
            console.error("Error logging out:", error.message);
        });
}


// Function to close the logout confirmation popup
function closeLogoutConfirmationPopup() {
  const confirmationPopup = document.getElementById('confirmationPopup');
  const overlay = document.getElementById('overlay3');

  // Close the confirmation popup
  confirmationPopup.style.display = 'none';
  overlay.style.display = 'none';

  // Remove event listeners to prevent memory leaks
  const yesButton = document.getElementById('confirmYesBtn');
  const noButton = document.getElementById('confirmNoBtn');

  yesButton.removeEventListener('click', handleLogoutConfirmation);
  noButton.removeEventListener('click', closeLogoutConfirmationPopup);
}

// Listen for the popstate event
window.addEventListener('popstate', closeLogoutConfirmationPopup);


// ...


// Function to show the "Added to Cart" message
function showLoggedOutMessage() {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `User Logged out!`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}

// Event listener for the "Account" link
document.getElementById("accountLink").addEventListener("click", async function(event) {
    event.preventDefault();
    await showPopupWithUserDetails();
});

function addClosePopupEventListener() {
  document.getElementById("closePopupBtn").addEventListener("click", function() {
      const overlay = document.getElementById('overlay');
      overlay.style.display = 'none';
      
      const popup = document.getElementById('popup');
      popup.style.display = 'none';
      popup.classList.remove('fade-in');
      document.body.classList.remove("no-scroll"); // Enable scrolling
  });
}
window.addEventListener('popstate', function(event) {
  // Call the function to close the popup
  addClosePopupEventListener();
});

// Get the checkout button element
const checkoutBtn = document.getElementById("checkout-btn");

// Add event listener to the checkout button
checkoutBtn.addEventListener("click", () => {
  // Collect cart items and their details
  const cartItems = document.getElementsByClassName("cart-item");
  const orderSummary = [];

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const productName = cartItem.querySelector(".product-details h5").innerText;
    const price = parseFloat(cartItem.querySelector(".product-details h4").dataset.price);
    const quantity = parseInt(cartItem.querySelector(".quantity-input").value);
    const total = quantity * price; // Calculate total by multiplying quantity with price
    const isWholesale = cartItem.querySelector(".toggle-switch").checked;

    orderSummary.push({ productName, price, quantity, total, isWholesale });
  }

  // Get the cart total
  const cartTotal = orderSummary.reduce((acc, item) => acc + item.total, 0);

  // Create the popup with the order summary and customer details
  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  // Add the title to the popup
  const title = document.createElement("h4");
  title.innerText = "Order Summary";
  popupContent.appendChild(title);

  // Add the order summary to the popup
  const orderTable = document.createElement("table");
  orderTable.classList.add("order-table");

  // Create table header
  const tableHeader = document.createElement("tr");
  tableHeader.innerHTML = `
    <th>Product</th>
    <th>Price</th>
    <th>Qty</th>
    <th>Total</th>
    <th>Wholesale</th>
  `;
  orderTable.appendChild(tableHeader);

  // Iterate over the order summary and create table rows
  for (let i = 0; i < orderSummary.length; i++) {
    const { productName, price, quantity, total, isWholesale } = orderSummary[i];
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${productName}</td>
      <td>UGX ${price}</td>
      <td>${quantity}</td>
      <td>UGX ${total.toFixed(2)}</td>
      <td>${isWholesale ? "Yes" : "No"}</td>
    `;
    orderTable.appendChild(tableRow);
  }


// Create input for additional notes
const notesInput = document.createElement("input");
notesInput.setAttribute("type", "text");
notesInput.setAttribute("placeholder", "Order Specifications eg.(I want white color for Iphone 6 screen OR Can you give me a discount?)...");
notesInput.setAttribute("id", "additionalNotes"); // Optional: You can set an ID for easier access if needed.

// Append the table and input to the popup content
popupContent.appendChild(orderTable);
popupContent.appendChild(notesInput);



  // Add the cart total to the popup
  const totalElement = document.createElement("h4");
  totalElement.innerText = `Total: UGX ${cartTotal.toFixed(2)}`;
  totalElement.style.fontSize = "18px";
  totalElement.style.marginTop = "10px";
  totalElement.style.color = "#333";
  popupContent.appendChild(totalElement);


// Create the popup container
const popupContainer = document.createElement("div");
popupContainer.classList.add("popup-container");


// Add the popup content to the container
popupContainer.appendChild(popupContent);


  // Add the popup container to the document body
  document.body.appendChild(popupContainer);


  
// Create the close button
const closeButton = document.createElement("button");
closeButton.classList.add("close-button");
closeButton.innerHTML = "&times; Close";

function registerPopupCloseListener() {
  closeButton.addEventListener("click", () => {
    popupContainer.style.display = "none";
  });
}

// Call the function to register the popup close listener
registerPopupCloseListener();

// Event listener for the navigation back button
window.addEventListener('popstate', function(event) {
    // Call the function to register the popup close listener
    registerPopupCloseListener();
});



// Append the close button to the popup container
popupContainer.appendChild(closeButton);
// Create the order type section
/*
const orderTypeSection = document.createElement("div");
orderTypeSection.classList.add("order-type");

// Create the title for the order type
const orderTypeTitle = document.createElement("h4");
orderTypeTitle.innerText = "Order Type";
orderTypeSection.appendChild(orderTypeTitle);

// Declare selectedOrderType outside the function scope
let selectedOrderType;

// Function to create order option with note
function createOrderOption(id, value, label, note) {
  const orderOption = document.createElement("div");
  orderOption.classList.add("order-option");

  // Create radio input
  const radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.name = "order-type";
  radioInput.id = id;
  radioInput.value = value;

  // Create label for radio input
  const labelElement = document.createElement("label");
  labelElement.for = id;
  labelElement.innerText = label;

  // Create note element
  const noteElement = document.createElement("p");
  noteElement.classList.add("order-note");
  noteElement.innerText = note;

  // Append elements to order option
  orderOption.appendChild(radioInput);
  orderOption.appendChild(labelElement);
  orderOption.appendChild(noteElement);

  // Append order option to order type section
  orderTypeSection.appendChild(orderOption);

  // Add event listener to show/hide notes
  radioInput.addEventListener("change", () => {
    // Set the selected order type
    selectedOrderType = radioInput.value;

    // Hide all notes
    document.querySelectorAll(".order-note").forEach((note) => {
      note.style.display = "none";
    });

    // Show the selected note
    noteElement.style.display = "block";
  });
}

// Create retail order option with note
//createOrderOption("retail-order", "retail", "Retail Order", "Prices remain the same for all products.");

// Create wholesale order option with note
//createOrderOption("wholesale-order", "wholesale", "Wholesale Order", "Wholesale orders have special discounts and require a minimum order quantity.");

// Append the order type section to the document or another container
//popupContent.appendChild(orderTypeSection);
*/
// Create the customer details section
const customerDetails = document.createElement("div");
customerDetails.classList.add("customer-details");
// Create the payment options section
const paymentOptionsSection = document.createElement("div");
paymentOptionsSection.classList.add("payment-options");

// Create the title for the payment options
const paymentOptionsTitle = document.createElement("h4");
paymentOptionsTitle.innerText = "Payment Options";
paymentOptionsSection.appendChild(paymentOptionsTitle);

// Create a small note under the payment options title
const paymentOptionsNote = document.createElement("p");
paymentOptionsNote.innerText = "Click the payment option to copy the receiver details. After Placing your Order, track it in your account and use it's order ID as reason while making the payment. Thank You! ";
paymentOptionsNote.classList.add("payment-options-note"); // Add the desired class
paymentOptionsSection.appendChild(paymentOptionsNote);

// Create the payment options
const paymentOptions = ["Mobile Money"];

paymentOptions.forEach((option) => {
  // Create a container for each payment option
  const paymentOptionContainer = document.createElement("div");
  paymentOptionContainer.classList.add("payment-option-container");

  // Create the payment option div
  const paymentOption = document.createElement("div");
  paymentOption.classList.add("payment-option");
  paymentOption.innerHTML = `
    <input type="radio" name="payment-option" id="${option.toLowerCase()}" value="${option.toLowerCase()}">
    <label for="${option.toLowerCase()}">${option}</label>
  `;

  // Create a div for details (copy icon and "Copy" word)
  const detailsSection = document.createElement("div");
  detailsSection.classList.add("details-section");

// Create a copy icon
const copyIcon = document.createElement("i");
copyIcon.classList.add("fas", "fa-copy", "copy-icon");
copyIcon.style.display = "none"; // Set display to none

  detailsSection.appendChild(copyIcon);

  // Create a "Copy" word
  const copyWord = document.createElement("span");
  copyWord.innerText = "";
  detailsSection.appendChild(copyWord);

  // Append details section to payment option
  paymentOption.appendChild(detailsSection);

 // Add event listener to copy the details to clipboard when the option is selected
paymentOption.addEventListener("click", () => {
  // Get the selected payment option
  const selectedOption = document.querySelector('input[name="payment-option"]:checked').value;

  // Check if the selected payment option exists in the receiverDetails object
  if (selectedOption && receiverDetails[selectedOption]) {
    // Assuming the merchant code is the second line in the details
    const merchantDetails = receiverDetails[selectedOption].split("\n");
    if (merchantDetails.length >= 2) {
      const merchantCode = merchantDetails[1].split(": ")[1];

      // Copy the merchant code to the clipboard
      copyToClipboard(merchantCode);

      // Create a message element
      const message = document.createElement("div");
      message.className = "copied-message";
      message.textContent = "Payment Number Copied to clipboard";

      // Append the message element to the body
      document.body.appendChild(message);

      // Trigger the slide-in effect
      setTimeout(() => {
        message.classList.add("show");
      }, 100); // Adjust the delay to match the CSS transition duration

      // Reset the copied status and remove the message after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        message.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(message);
        }, 500); // Adjust the delay to match the CSS transition duration
      }, 2000);
    } else {
      console.error("Invalid receiver details format for the selected payment option.");
    }
  } else {
    console.error("Receiver details not found for the selected payment option.");
  }
});

  // Append the payment option to the container
  paymentOptionContainer.appendChild(paymentOption);

  // Append the payment option container to the payment options section
  paymentOptionsSection.appendChild(paymentOptionContainer);
});

// Append the payment options section to the popup content
popupContent.appendChild(paymentOptionsSection);
// Function to copy text to clipboard
function copyToClipboard(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}
// Get the receiver/account details section
const receiverDetailsSection = document.createElement("div");
receiverDetailsSection.classList.add("receiver-details");

// Define the receiver/account details for each payment option
const receiverDetails = {
   "mobile money": "Receiver: Daisy Nakitto\nMTN Number: 0774 050 825",
};

// Function to update the receiver/account details based on the selected payment option
function updateReceiverDetails() {
  // Clear the previous receiver/account details
  receiverDetailsSection.innerHTML = "";

  // Get the selected payment option
  const selectedOption = document.querySelector('input[name="payment-option"]:checked').value;

  // Create the details element
  const details = document.createElement("p");
  details.innerText = receiverDetails[selectedOption];

  // Append the details element to the receiver/account details section
  receiverDetailsSection.appendChild(details);
}

// Add event listener to each payment option radio button
const paymentOptionRadios = document.querySelectorAll('input[name="payment-option"]');
paymentOptionRadios.forEach((radio) => {
  radio.addEventListener("change", updateReceiverDetails);
});

// Append the receiver/account details section to the payment options section
paymentOptionsSection.appendChild(receiverDetailsSection);

// Add the title to the popup
const head = document.createElement("h4");
head.innerText = "Delivery details.";
popupContent.appendChild(head);

// Add note about transport and delivery costs
const note = document.createElement("p");
note.innerText = "Please note that transport and delivery costs are on the side of the customer.";
note.classList.add("order-note2");
popupContent.appendChild(note);

// Create a select element for means of transport
const transportSelect = document.createElement("select");
transportSelect.classList.add("input-field");

// Create options for the select element
const option1 = document.createElement("option");
option1.value = "taxi";
option1.text = "Taxi";
transportSelect.appendChild(option1);

const option2 = document.createElement("option");
option2.value = "boda boda";
option2.text = "Boda boda";
transportSelect.appendChild(option2);

const option3 = document.createElement("option");
option3.value = "bus";
option3.text = "Bus";
transportSelect.appendChild(option3);

const option4 = document.createElement("option");
option4.value = "foot";
option4.text = "Foot";
transportSelect.appendChild(option4);


// Set the placeholder for the select element
const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.text = "Select Means of Transport";
defaultOption.disabled = true;
defaultOption.selected = true;
transportSelect.appendChild(defaultOption);

// Set the required attribute for the select element
transportSelect.required = true;

// Append the select element to customerDetails
customerDetails.appendChild(transportSelect);

// Append customerDetails to popupContent
popupContent.appendChild(customerDetails);

// Create input for delivery place
const deliveryPlaceInput = document.createElement("input");
deliveryPlaceInput.type = "text";
deliveryPlaceInput.placeholder = "Delivery Place or Location";
deliveryPlaceInput.classList.add("input-field");
deliveryPlaceInput.required = true; // Set the required attribute
customerDetails.appendChild(deliveryPlaceInput);





// Append the customer details to the popup content
popupContent.appendChild(customerDetails);

// Create input for telephone contact
const telephoneInput = document.createElement("input");
telephoneInput.type = "tel";
telephoneInput.placeholder = "Telephone Contact";
telephoneInput.classList.add("input-field");
telephoneInput.required = true; // Set the required attribute
customerDetails.appendChild(telephoneInput);

// Append the telephone input to the customer details
customerDetails.appendChild(telephoneInput);

// Create the order button
const orderButton = document.createElement("button");
orderButton.innerText = "Place Order";
orderButton.classList.add("order-button");
orderButton.style.backgroundColor = "#3f51b5";
orderButton.style.width = "fit-content";
orderButton.style.color = "#fff";
orderButton.style.padding = "10px 20px";
orderButton.style.border = "none";
orderButton.style.borderRadius = "4px";
orderButton.style.fontSize = "16px";
orderButton.style.marginTop = "20px";

// Now you can use selectedOrderType globally in your code



popupContent.appendChild(orderButton);






function showNotLoggedInMessage() {
  // Define getOrderSummary function to extract order details from the table
  function getOrderSummary() {
      const orderSummary = [];
      const rows = orderTable.querySelectorAll("tr");
      rows.forEach((row, index) => {
          if (index > 0) { // Skip the header row
              const columns = row.querySelectorAll("td");

            // Assuming the order of columns is Product, Price, Qty, Total, Wholesale
const productName = columns[0].innerText;
const price = parseFloat(columns[1].innerText.replace("UGX ", ""));
const quantity = parseInt(columns[2].innerText, 10);
const total = parseFloat(columns[3].innerText.replace("UGX ", ""));
const isWholesale = columns[4].innerText.toLowerCase() === "yes";

// Retrieve additional notes
const additionalNotes = document.getElementById("additionalNotes").value;

// Push product details to orderSummary array including additional notes
orderSummary.push({
    productName,
    price,
    quantity,
    total,
    isWholesale,
    additionalNotes,
});
          }
      });
      return orderSummary;
  }

  // Get the cart details
  const deliveryPlace = deliveryPlaceInput.value.trim();
  const telephoneNumber = telephoneInput.value.trim();
  const meansOfTransport = transportSelect.value.trim();
  const selectedPaymentOptionElement = document.querySelector('input[name="payment-option"]:checked');
  const selectedPaymentOption = selectedPaymentOptionElement ? selectedPaymentOptionElement.value : "";
  const orderSummary = getOrderSummary();
  const cartTotalElement = document.getElementById("total-price");
  const cartTotal = cartTotalElement ? parseFloat(cartTotalElement.innerText.replace("TOTAL: UGX ", "")) : 0;

  // Validate input values
  let errorMessage = "";
  if (!deliveryPlace) {
      errorMessage += "Delivery place is required. ";
  }
  if (!telephoneNumber) {
      errorMessage += "Telephone number is required. ";
  }
  if (!meansOfTransport) {
      errorMessage += "Means of transport is required. ";
  }
  if (!selectedPaymentOption) {
      errorMessage += "Payment option is required. ";
  }
  if (orderSummary.length === 0) {
      errorMessage += "Order summary is empty. ";
  }
  if (cartTotal <= 0) {
      errorMessage += "Cart total is invalid. ";
  }

  if (errorMessage) {
      // Show an alert with the error message
      alert(errorMessage);
  } else {
    
      // Show the popup only if all fields are filled
      const messageContainer = document.getElementById('messageContainer');
      const messageContent = document.getElementById('messageContent');
      const overlay = document.getElementById('overlay2');
// Save the cart details in local storage
const cartDetails = {
  deliveryPlace,
  telephoneNumber,
  meansOfTransport,
  selectedPaymentOption,
  orderSummary,
  cartTotal,
  additionalNotes: document.getElementById("additionalNotes").value
};

      // Set the message content HTML, including the company logo and login button
      messageContent.innerHTML = `
          <div id="companyLogo" class="company-logo">
              <img src="bibo-phone-spare-world-logo-zip-file/png/logo-color.png" alt="Company Logo">
          </div>
          <p>You are not signed in. Please sign in to access your account and shop with us. Thank you!</p>
          <button id="loginButton" class="login-button">
              <i class="fa fa-sign-in"></i> Login
          </button>
      `;

      // Add the "fade-in" class to apply the fade-in animation
      localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
      messageContainer.classList.add('fade-in');
      messageContainer.style.display = 'flex'; // Make the message container visible
      overlay.style.display = 'block'; // Show the overlay

      // Add a click event listener to the login button
      const loginButton = document.getElementById('loginButton');
      loginButton.addEventListener('click', function() {
          window.location.href = 'login.html'; // Adjust the login page URL
      });
  }
}




// Function to remove the loader container
function removeLoaderContainer() {
    const loaderContainer = document.querySelector(".loader-container");
    if (loaderContainer) {
        document.body.removeChild(loaderContainer);
    }
}

// Function to show the success popup
function showSuccessPopup() {
    // Remove the loader container
    removeLoaderContainer();

    // Create the success popup
    const successPopup = document.createElement("div");
    successPopup.classList.add("success-popup");

    // Create the success message
    const successMessage = document.createElement("h3");
    const successText = document.createElement("p");
    successText.innerText = "Thank you for shopping with us... You can always find your receipts in your account and use ORDER IDs as reasons for payment. Thank you.";
    successMessage.innerText = "Order Successful !";

    // Create the okay button
    const okayButton = document.createElement("button");
    okayButton.classList.add("okay-button");
    okayButton.innerText = "Okay";

    // Add event listener to the okay button
    //okayButton.addEventListener("click", () => {
    //    location.reload(); // Refresh the page
   // });

    // Append the okay button to the success popup
    successPopup.appendChild(okayButton);

    // Add event listener to close the success popup when the okay button is clicked
    okayButton.addEventListener("click", () => {
       location.reload()
        document.body.removeChild(successPopup);
       // popupContainer.style.display = "none";
       
    });

    // Append the success message and okay button to the success popup
    successPopup.appendChild(successMessage);
    successPopup.appendChild(successText);
    successPopup.appendChild(okayButton);

    // Add the success popup to the document body
    document.body.appendChild(successPopup);
}

// Function to show the error popup
function showErrorPopup() {
    // Remove the loader container
    removeLoaderContainer();

    // Create the error popup
    const errorPopup = document.createElement("div");
    errorPopup.classList.add("error-popup");

    // Create the error message
    const errorMessage = document.createElement("h3");
    errorMessage.innerText = "Oops..., something went wrong! Check your internet connection or else you have missing fields";

    // Create the okay button
    const okayButton = document.createElement("button");
    okayButton.classList.add("okay-button");
    okayButton.innerText = "Okay";

    // Add event listener to the okay button
    okayButton.addEventListener("click", () => {
       // location.reload(); // Refresh the page
       document.body.removeChild(errorPopup);
       // popupContainer.style.display = "none";
       
    });

    // Append the okay button to the error popup
    errorPopup.appendChild(okayButton);

    // Append the error message and okay button to the error popup
    errorPopup.appendChild(errorMessage);
    errorPopup.appendChild(okayButton);

    // Add the error popup to the document body
    document.body.appendChild(errorPopup);
}
// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.innerText = count;
}

// Define the clearCart function
function clearCart() {
  // Remove all items from the cart
  const cartItems = document.getElementsByClassName("cart-item");

  while (cartItems.length > 0) {
    cartItems[0].remove();
    
  }
updateCartCount(0);
  // Update the total price
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX 0.00";

  // Update any other necessary cart-related logic
}

// Rest of your code...

// Add event listener to the order button
orderButton.addEventListener("click", async () => {
    // Display loader while processing the order
    const loader = document.createElement("div");
    loader.classList.add("loader");
    popupContainer.appendChild(loader);

    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
        // User is not authenticated, show the not logged in message
        showNotLoggedInMessage();
        return; // Stop further execution
    }

    // Get the UID of the logged-in user
    const userId = user.uid;
    const userEmail = user.email;
// Get the delivery place from the input field
const deliveryPlace = deliveryPlaceInput.value;

// Get the selected means of transport
const meansOfTransport = transportSelect.value;


// Get the selected payment option
const selectedPaymentOptionElement = document.querySelector('input[name="payment-option"]:checked');
if (!selectedPaymentOptionElement) {
    // Payment option not selected, show an error message
    showErrorPopup("Please select a payment option");
    return;
}
const selectedPaymentOption = selectedPaymentOptionElement.value;


// Initialize orderSummary as an array
const orderSummary = [];

// Iterate over the table rows and create table cells
const rows = orderTable.querySelectorAll("tr");
rows.forEach((row, index) => {
  if (index > 0) { // Skip the header row
    const columns = row.querySelectorAll("td");

    // Assuming the order of columns is Product, Price, Qty, Total, Wholesale
    const productName = columns[0].innerText;
    const price = parseFloat(columns[1].innerText.replace("UGX ", ""));
    const quantity = parseInt(columns[2].innerText, 10);
    const total = parseFloat(columns[3].innerText.replace("UGX ", ""));
    const isWholesale = columns[4].innerText.toLowerCase() === "yes";

    // Push product details to orderSummary array
    orderSummary.push({
      productName,
      price,
      quantity,
      total,
      isWholesale,
    });
  }
});



// Get the cart total from the displayed element (assuming it's already calculated and displayed)
const cartTotalElement = document.getElementById("total-price");
const cartTotal = parseFloat(cartTotalElement.innerText.replace("TOTAL: UGX ", ""));

// Rest of your code...
      
// Create the loader container
const loaderContainer = document.createElement("div");
loaderContainer.classList.add("loader-container");

// Append the loader to the loader container
loaderContainer.appendChild(loader);

// Add the loader container to the document body
document.body.appendChild(loaderContainer);

// Push the order details to Firebase database
const orderRef = ref(database, "orders");
const newOrderRef = push(orderRef);

// Get the telephone number from the input field
const telephoneNumber = telephoneInput.value;

// Get the selected order type
const selectedOrderType = document.querySelector('input[name="order-type"]:checked');

// Validate required fields, including the order type
if (!deliveryPlace || !meansOfTransport || !telephoneNumber) {
    // Show an error message if any required field is empty or if the order type is not selected
    showErrorPopup("Please fill in all required fields and select an order type");
    document.body.removeChild(loaderContainer); // Remove the loader container
    return;
}

// If you need the value of the selected order type, you can access it using selectedOrderType.value
//const orderTypeValue = selectedOrderType.value;



// Function to generate a random alphanumeric string
function generateRandomOrderId(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

// Generate a random order ID
const randomOrderId = generateRandomOrderId(5);

// Create the order data object with the random order ID
const orderData = {
  orderId: randomOrderId,
  orderDate: new Date().toLocaleDateString(),
  orderTime: new Date().toLocaleTimeString(),
  deliveryPlace,
  meansOfTransport,
  selectedPaymentOption,
  //selectedOrderType: orderTypeValue, // Add the selected order type
  orderSummary,
  cartTotal,
  userId, // Add the UID of the user
  userEmail, // Add the email of the user (if needed)
  telephoneNumber, // Add the telephone number
  additionalNotes: document.getElementById("additionalNotes").value
};


// Save the order data
set(newOrderRef, orderData)
    .then(() => {
        // Order placed successfully
        // Save the receipt in the customer's account

        // Create a new reference to the customer's receipt in the "receipts" node
        const userReceiptRef = ref(database, `users/${userId}/receipts`);
        const newUserReceiptRef = push(userReceiptRef);

        // Save the receipt data under the user's account
        const receiptData = {
            orderId: randomOrderId,
            orderDate: orderData.orderDate,
            orderTime: orderData.orderTime,
            deliveryPlace: orderData.deliveryPlace,
            meansOfTransport: orderData.meansOfTransport,
            selectedPaymentOption: orderData.selectedPaymentOption,
            //selectedOrderType: orderData.selectedOrderType, // Add the selected order type
            orderSummary: orderData.orderSummary,
            cartTotal: orderData.cartTotal,
            userId: userId, // Add the UID of the user
            userEmail: user.email, // Add the email of the user (if needed)
            // Add other user-related details as needed
        };

        // Save the receipt data
        set(newUserReceiptRef, receiptData)
            .then(() => {
                // Receipt saved successfully
                showSuccessPopup();
                clearCart();
            })
            .catch((error) => {
                console.error("Error saving receipt:", error.message);
                showErrorPopup();
            })
            .finally(() => {
                // Remove the loader container
                document.body.removeChild(loaderContainer);
            });
    })
    .catch((error) => {
        console.error("Error placing order:", error.message);
        showErrorPopup();
        document.body.removeChild(loaderContainer); // Remove the loader container in case of an error
    });

// Simulating the booking process
// Note: This setTimeout should be removed in the actual implementation
setTimeout(() => {
    // Simulate successful booking
    showSuccessPopup();

    // Simulate failed booking
    // showErrorPopup();
}, 2000);



});


});

});




// Event listener for the "View Purchase History" button
document.getElementById("viewPurchaseHistoryBtn").addEventListener("click", async function(event) {
  event.preventDefault();

  
  // Get the button and spinner elements
  const viewHistoryBtn = document.getElementById("viewPurchaseHistoryBtn");
  const spinner = document.getElementById("spinner2"); // Add an ID to your spinner element

  // Disable the button and show the spinner
  viewHistoryBtn.disabled = true;
  spinner.style.display = "block";


  // Check if the user is authenticated
  const user = auth.currentUser;
  if (!user) {
    console.log('User not authenticated');
    // You may want to redirect the user to the login page or handle the lack of authentication
    return;
  }

  // Fetch the user's UID
  const userId = user.uid;

  // Fetch the user's receipts from Firebase
  const userReceiptsRef = ref(database, `users/${userId}/receipts`);
  
  try {
    const userReceiptsSnapshot = await get(userReceiptsRef);

    if (userReceiptsSnapshot.exists()) {
      // User has receipts
      const userReceipts = userReceiptsSnapshot.val();

      // Display receipts in a popup
      displayReceiptsPopup(userReceipts);
    } else {
      // No receipts found
      showNoPurchaseMessage()
      // You can display a message to the user indicating no purchase history.
    }
  } catch (error) {
    console.error('Error fetching user receipts from Firebase:', error.message);
  }
  finally {
    // Enable the button and hide the spinner after loading
    viewHistoryBtn.disabled = false;
    spinner.style.display = "none";
  }
});
// Function to show the "Added to Cart" message
function showNoPurchaseMessage() {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `No purchase history found!`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}

// Function to display receipts in a popup
function displayReceiptsPopup(userReceipts) {
  // Create the popup container
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  // Create the close button for the popup
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.classList.add("close-button");

// Add event listener to close the popup when the close button is clicked
closeButton.addEventListener("click", () => {
  // Apply a class for the fade-out animation
  popupContainer.style.animation = "fadeOut 0.5s";
  // Remove the popup container after the animation duration
  setTimeout(() => {
    document.body.removeChild(popupContainer);
  }, 500); // 500 milliseconds (0.5 seconds) should match your animation duration
});
// Create the receipt details container
const receiptDetailsContainer = document.createElement("div");
receiptDetailsContainer.classList.add("receipt-details-container");

// Create filter by date input
const dateFilterLabel = document.createElement("label");
dateFilterLabel.innerText = "Filter by Date";
const dateFilterInput = document.createElement("input");
dateFilterInput.type = "date";
dateFilterInput.placeholder = "Filter by Date";
dateFilterInput.addEventListener("input", handleDateFilter);

// Create clear button for the date input
const clearDateButton = document.createElement("button");
clearDateButton.innerText = "Clear";
clearDateButton.classList.add("clear-button");
clearDateButton.addEventListener("click", clearDateFilter);

// Create search by order ID input
const orderIdSearchLabel = document.createElement("label");
orderIdSearchLabel.innerText = "Search by Order ID";
const orderIdSearchInput = document.createElement("input");
orderIdSearchInput.type = "text";
orderIdSearchInput.placeholder = "Search by Order ID";
orderIdSearchInput.addEventListener("input", handleOrderIdSearch);

// Append labels and inputs to the filter container
const filterContainer = document.createElement("div");
filterContainer.classList.add("filter-container");



filterContainer.appendChild(orderIdSearchLabel);
filterContainer.appendChild(orderIdSearchInput);
filterContainer.appendChild(dateFilterLabel);
filterContainer.appendChild(dateFilterInput);
filterContainer.appendChild(clearDateButton);


// Append the filter container to the document body or another container
popupContainer.appendChild(filterContainer);

// Add fade-in animation to the popup container
popupContainer.style.animation = "fadeIn 0.5s";
// Add event listeners for the filter inputs
dateFilterInput.addEventListener("input", handleDateFilter);
orderIdSearchInput.addEventListener("input", handleOrderIdSearch);

// Function to clear the date filter
function clearDateFilter() {
  dateFilterInput.value = "";
  handleDateFilter({ target: { value: "" } }); // Trigger the filter function after clearing
}

// Filter by date handler function
function handleDateFilter(event) {
  const selectedDate = event.target.value;

  // Clear previous orders
  document.querySelectorAll('.receipt-container').forEach(receiptContainer => {
    receiptContainer.style.display = 'none';
  });

  const receiptDetailsContainer = document.querySelector('.receipt-details-container');
  let noOrdersMessageContainer = receiptDetailsContainer.querySelector('.no-orders-message-container');

  // If the message container doesn't exist, create it
  if (!noOrdersMessageContainer) {
    noOrdersMessageContainer = document.createElement('div');
    noOrdersMessageContainer.classList.add('no-orders-message-container');
    receiptDetailsContainer.appendChild(noOrdersMessageContainer);

    // Add an image on top of the message
    const noOrdersImage = document.createElement('img');
    noOrdersImage.src = 'img/nothing found.png'; // Provide the correct path to your image
    noOrdersImage.alt = 'No Orders Image';
    noOrdersImage.classList.add('no-orders-image');
    noOrdersMessageContainer.appendChild(noOrdersImage);

    // Create a paragraph element for the message
    const noOrdersMessage = document.createElement('p');
    noOrdersMessage.classList.add('no-orders-message');
    noOrdersMessageContainer.appendChild(noOrdersMessage);
  }

  // Hide the message container initially
  noOrdersMessageContainer.style.display = 'none';

  // Clear existing content
  noOrdersMessageContainer.querySelector('.no-orders-message').textContent = '';

  // Track whether any orders are found for the selected date
  let ordersFound = false;

  // Iterate through receipt containers and filter based on date
  document.querySelectorAll('.receipt-container').forEach(receiptContainer => {
    const orderDateElement = receiptContainer.querySelector('.receipt-info:nth-child(2)');
    const orderDate = orderDateElement.textContent.split(": ")[1]; // Extract the date part from the receipt

    // Parse and format the orderDate to match the selectedDate format
    const formattedOrderDate = new Date(orderDate);

    // Check if formattedOrderDate is a valid date object
    if (!isNaN(formattedOrderDate.getTime())) {
      const formattedSelectedDate = formattedOrderDate.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });

      // Convert selectedDate to a Date object
      const selectedDateObj = new Date(selectedDate);

      if (selectedDate && formattedOrderDate.toISOString().split('T')[0] !== selectedDateObj.toISOString().split('T')[0]) {
        receiptContainer.style.display = 'none'; // hide orders not matching the selected date
      } else {
        receiptContainer.style.display = 'block'; // show orders matching the selected date
        ordersFound = true; // Orders are found for the selected date
      }
    }
  });


  // Toggle the visibility of the message container based on orders found
  noOrdersMessageContainer.style.display = ordersFound ? 'none' : 'block';

  // Update the message if no orders are found for the selected date
  if (!ordersFound) {
    noOrdersMessageContainer.querySelector('.no-orders-message').textContent = 'No orders found on this date.';
  }

  // Reattach event listeners to handle further filtering
  dateFilterInput.addEventListener("input", handleDateFilter);
  orderIdSearchInput.addEventListener("input", handleOrderIdSearch);
}








// Search by order ID handler function
function handleOrderIdSearch(event) {
  const searchText = event.target.value.toLowerCase();

  // Clear previous orders and messages
  document.querySelectorAll('.receipt-container').forEach(receiptContainer => {
    receiptContainer.style.display = 'none';
  });

  const receiptDetailsContainer = document.querySelector('.receipt-details-container');
  let searchResultsContainer = receiptDetailsContainer.querySelector('.search-results-container');

  // If the search results container doesn't exist, create it
  if (!searchResultsContainer) {
    searchResultsContainer = document.createElement('div');
    searchResultsContainer.classList.add('search-results-container');
    receiptDetailsContainer.appendChild(searchResultsContainer);

    // Add an image on top of the message
    const noOrdersImage = document.createElement('img');
    noOrdersImage.src = 'img/nothing found.png'; // Provide the correct path to your image
    noOrdersImage.alt = 'No Orders Image';
    noOrdersImage.classList.add('no-orders-image');
    searchResultsContainer.appendChild(noOrdersImage);

    // Create a paragraph element for the message
    const noOrdersMessage = document.createElement('p');
    noOrdersMessage.classList.add('no-orders-message');
    searchResultsContainer.appendChild(noOrdersMessage);
  }

  // Hide the search results container initially
  searchResultsContainer.style.display = 'none';

  // Check if the message element exists before updating its textContent
  const noOrdersMessageElement = searchResultsContainer.querySelector('.no-orders-message');
  if (noOrdersMessageElement) {
    // Clear existing content
    noOrdersMessageElement.textContent = '';

    // Track whether any orders are found for the search text
    let ordersFound = false;

    // Iterate through receipt containers and filter based on order ID
    document.querySelectorAll('.receipt-container').forEach(receiptContainer => {
      const orderId = receiptContainer.querySelector('.receipt-info:first-child').textContent;
      if (searchText && !orderId.toLowerCase().includes(`${searchText}`)) {
        receiptContainer.style.display = 'none'; // hide orders not matching the search text
      } else {
        receiptContainer.style.display = 'block'; // show orders matching the search text
        ordersFound = true; // Orders are found for the search text
      }
    });

    // Toggle the visibility of the search results container based on orders found
    searchResultsContainer.style.display = ordersFound ? 'none' : 'block';

    // Update the message if no orders are found for the search text
    if (!ordersFound) {
      noOrdersMessageElement.textContent = 'No orders found for the specified order ID.';
    }
  }

  // Reattach event listeners to handle further filtering
  dateFilterInput.addEventListener("input", handleDateFilter);
  orderIdSearchInput.addEventListener("input", handleOrderIdSearch);
}

// Get the keys of userReceipts and sort them in descending order (assuming orderId is a timestamp)
const sortedReceiptIds = Object.keys(userReceipts).sort((a, b) => userReceipts[b].orderId - userReceipts[a].orderId);

// Reverse the order of sorted receipt IDs
sortedReceiptIds.reverse();

// Iterate through sorted receipt IDs
for (const receiptId of sortedReceiptIds) {
  const receipt = userReceipts[receiptId];

  // Create a container for each receipt
  const receiptContainer = document.createElement("div");
  receiptContainer.classList.add("receipt-container");

  // Create elements for receipt details using template literals
  const receiptDetails = `
    <p class="receipt-info"><span>Order ID:  </span>${receipt.orderId}</p>
    <p class="receipt-info"><span>Order Date:  </span>${receipt.orderDate}</p>
    <p class="receipt-info"><span>Delivery Place: </span>${receipt.deliveryPlace}</p>
    <p class="receipt-info"><span>Means of Transport:  </span>${receipt.meansOfTransport}</p>
    <p class="receipt-info"><span>Payment Option:  </span>${receipt.selectedPaymentOption}</p>
    <p class="receipt-info"><span>Order Time:  </span>${receipt.orderTime}</p>
    <!-- Replace the existing order summary element with this table -->
    <table class="order-summary-table">
      <caption>Order Summary</caption>
      <thead>
        <tr>
          <th>Pdt</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
          <th>WholeSale</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iterate through each item in the order summary -->
        ${receipt.orderSummary.map(item => `
          <tr>
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>UGX ${item.price.toFixed(2)}</td>
            <td>UGX ${item.total.toFixed(2)}</td>
            <td>${item.isWholesale}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <p class="receipt-info">Cart Total: UGX ${receipt.cartTotal.toFixed(2)}</p>
  `;

  // Set innerHTML of the receipt container
  receiptContainer.innerHTML = receiptDetails;

  // Append the receipt container to the receipt details container
  receiptDetailsContainer.appendChild(receiptContainer);
}

// Append the close button and receipt details container to the popup container
popupContainer.appendChild(closeButton);
popupContainer.appendChild(filterContainer);
popupContainer.appendChild(receiptDetailsContainer);

// Add the popup container to the document body
document.body.appendChild(popupContainer);

// Add fade-in animation to the popup container
popupContainer.style.animation = "fadeIn 0.5s";

}





const newScreensRef = ref(database, "products/newScreens");
const gradeBScreensRef = ref(database, "products/gradeBScreens");
const electronicsRef = ref(database, "products/electronics");
const touchesRef = ref(database, "products/touches");
const accessoriesRef = ref(database, "products/accessories");
const portsRef = ref(database, "products/Ports");
const fibresRef = ref(database, "products/Fibres");
const buttonsRef = ref(database, "products/Buttons");
const fingerPrintsRef = ref(database, "products/Finger-Prints");
const cameraGlassRef = ref(database, "products/Camera-Glasses");
const backCoversRef = ref(database, "products/Back-Covers");
const chesisRef = ref(database, "products/Chesis");
const glassesRef = ref(database, "products/Glasses");

// Define your product references
const productRefs = [
  newScreensRef,
  gradeBScreensRef,
  electronicsRef,
  touchesRef,
  accessoriesRef,
  portsRef,
  fibresRef,
  buttonsRef,
  fingerPrintsRef,
  cameraGlassRef,
  backCoversRef,
  chesisRef,
  glassesRef,
];

// Options for the Intersection Observer
const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: "0px", // No margin
  threshold: 0.5, // Trigger when 50% of the target is visible
};

// Create a callback function for the Intersection Observer
const intersectionCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // If the target is intersecting, load or retrieve the products
      const productRef = entry.target.dataset.productRef;
      // Call a function to retrieve products from the specified reference
      retrieveProducts(productRef);

      // Unobserve the target to avoid unnecessary calls
      observer.unobserve(entry.target);
    }
  });
};

// Create an Intersection Observer instance
const productObserver = new IntersectionObserver(intersectionCallback, observerOptions);

// Function to create a product element and observe it
function observeProduct(productRef) {
  const productContainer = document.createElement("div");
  // Set the dataset for the product reference
  productContainer.dataset.productRef = productRef;

  // Append the product element to the DOM
  document.getElementById("products-list").appendChild(productContainer);

  // Observe the product element
  productObserver.observe(productContainer);
}




const searchBtn = document.getElementById("search-btn");
let isSearching = false;

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (isSearching) {
    // If currently searching, clear search bar and perform search
    searchProducts();
  } else {
    // If not currently searching and search bar is not empty, append the refresh icon and perform search
    if (shouldShowRefreshIcon()) {
      appendRefreshIcon();
      searchProducts();
      isSearching = true;
    }
  }


function shouldShowRefreshIcon() {
  const searchBar = document.getElementById("search-bar");
  return searchBar.value.trim() !== "";
}

function appendRefreshIcon() {
  if (!shouldShowRefreshIcon()) {
    return;
  }

  // Create a new element for the refresh icon
  const refreshIcon = document.createElement("i");
  refreshIcon.classList.add("fa", "fa-refresh", "refresh-icon");

  // Append the refresh icon to the right side of the search bar
  const searchBar = document.getElementById("search-bar");
  searchBar.parentNode.insertBefore(refreshIcon, searchBar.nextSibling);

  // Add an event listener to the refresh icon to clear the search bar and perform search
  refreshIcon.addEventListener("click", function () {
    clearSearchBar();
    searchProducts();
  });

  // Style the search button
  searchBtn.style.background = 'orange';
}

function clearSearchBar() {
  const searchBar = document.getElementById("search-bar");
  searchBar.value = "";
  isSearching = false;
  revertSearchButton();
}

function revertSearchButton() {
  // Remove the refresh icon from the search bar
  const searchBar = document.getElementById("search-bar");
  const icon = searchBar.nextSibling;
  if (icon && icon.classList.contains("refresh-icon")) {
    searchBar.parentNode.removeChild(icon);
  }

  // Style the search button
  searchBtn.style.background = '#008abf';
}

});



const searchBar = document.getElementById("search-bar");
const suggestionsContainer = document.getElementById("suggestions-container");
const overlay = document.getElementById('overlay');

// Create a title element for suggestions
const suggestionsTitle = document.createElement("div");
suggestionsTitle.classList.add("suggestions-title");
suggestionsTitle.textContent = "Suggestions";

// Append the title to the suggestions container
suggestionsContainer.appendChild(suggestionsTitle);

// Variable to store the last search query
let lastQuery = '';

// Variable to track if suggestions have been processed
let suggestionsProcessed = true;

// Function to fetch suggestions with retries
function fetchSuggestions(query, retryCount = 1) {
    return new Promise((resolve, reject) => {
// Define an array of Firebase node references to search through
const firebaseNodes = [ 
  newScreensRef,
  gradeBScreensRef,
  electronicsRef,
  touchesRef,
  accessoriesRef,
  portsRef,
  fibresRef,
  buttonsRef,
  fingerPrintsRef,
  cameraGlassRef,
  backCoversRef,
  chesisRef,
  glassesRef,
];  
      // Create an array to store the promises returned by the Firebase queries
      const promises = [];
  
      // Flag to check if any matching products were found
      let matchingProductsFound = false;
  
      // Function to check if a string contains all words in another string
      const containsAllWords = (str, words) => {
        return words.every(word => str.includes(word));
      };
  
      // Search for the query in each relevant Firebase node
      firebaseNodes.forEach((nodeRef) => {
        const promise = get(nodeRef).then((snapshot) => {
          const data = snapshot.val();
  
          // Process the data and display matching products as suggestions
          for (let productId in data) {
            const product = data[productId];
            const name = product.name.toLowerCase();
            const description = product.description.toLowerCase();
  
            // Additional conditions for matching suggestions
            if (
              containsAllWords(name, query.toLowerCase().split(" ")) || // Matching suggestion with all words in any order
              containsAllWords(name, query.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase().split(" ")) || // Matching suggestion with all alphanumeric words in any order
              name.includes(query.toLowerCase()) || // Matching suggestion with partial name
              description.includes(query.toLowerCase()) // Matching suggestion with partial description
            ) {
              matchingProductsFound = true;
  
// Create a suggestion element
const suggestionItem = document.createElement("div");
suggestionItem.classList.add("suggestion-item");

// Create a search icon element
const searchIcon = document.createElement("i");
searchIcon.classList.add("fa", "fa-search", "search-icon");
suggestionItem.appendChild(searchIcon);

// Create a text node for the suggestion item
const suggestionText = document.createTextNode(name);
suggestionItem.appendChild(suggestionText);

// Add a click event listener to log the suggestion into the search bar and perform search
suggestionItem.addEventListener("click", function () {
  searchBar.value = name;
  suggestionsContainer.style.display = "none"; // Hide suggestions
  overlay.style.display = 'none';
  searchProducts(name); // Perform search for the selected suggestion
});

// Append the suggestion to the suggestions container
suggestionsContainer.appendChild(suggestionItem);

            }
          }
        });
  
        promises.push(promise);
      });
  
      // Wait for all Firebase queries to complete
      Promise.all(promises).then(() => {
        // Set suggestionsProcessed to true
        suggestionsProcessed = true;
  
        // Resolve or reject based on whether matching products were found
        matchingProductsFound ? resolve() : reject();
      });
    });
  }
    
// Function to initialize Firebase data and attach event listener
function initializeSearch() {
  // Listen for input events on the search bar
  searchBar.addEventListener("input", function () {
    // Clear existing suggestions (excluding the title)
    while (suggestionsContainer.children.length > 3) {
      suggestionsContainer.removeChild(suggestionsContainer.lastChild);
    }

    // Get the user input from the search bar
    const query = searchBar.value.trim().toLowerCase();

    // If the query is empty, hide suggestions
    if (!query) {
      suggestionsContainer.style.display = "none";
      overlay.style.display = 'none';
      return;
    }

    // Update lastQuery variable
    lastQuery = query;

    // Fetch suggestions with retries only if suggestionsProcessed is true
    if (suggestionsProcessed) {
      suggestionsProcessed = false; // Set suggestionsProcessed to false before fetching suggestions
      fetchSuggestions(query)
        .then(() => {
          // Show the suggestions container if there are suggestions
          suggestionsContainer.style.display = "block";
          overlay.style.display = 'block';
        })
        .catch(() => {
          // Show a message when no matching products are found
          const noResultsMessage = document.createElement("div");
          noResultsMessage.classList.add("no-results-message");
          noResultsMessage.textContent = "No Matching products found!";

          // Append the message to the suggestions container
          suggestionsContainer.appendChild(noResultsMessage);

          // Hide suggestions and overlay
          suggestionsContainer.style.display = "block";
          overlay.style.display = 'block';
        });
    }
  });

  // Add an event listener to the document to detect clicks
  document.addEventListener("click", function (event) {
    const searchBar = document.getElementById("search-bar");
    const suggestionsContainer = document.getElementById("suggestions-container");
    const overlay = document.getElementById('overlay');
    // Check if the click target is not the search bar or suggestions container
    if (event.target !== searchBar && !searchBar.contains(event.target) && event.target !== suggestionsContainer && !suggestionsContainer.contains(event.target)) {
      // Click occurred outside the search bar and suggestions container
      suggestionsContainer.style.display = "none"; // Hide suggestions
      overlay.style.display = 'none';
    }
  });
}

// Call the function to initialize Firebase data and attach event listener
initializeSearch();

  
  function searchProducts(searchTerm) {
  const query = document.getElementById("search-bar").value.toLowerCase();
  
  // Display the loader
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  // Clear the products list
  document.getElementById("products-list").innerHTML = "";

  // Define an array of Firebase node references to search through
  const firebaseNodes = [ 
    newScreensRef,
    gradeBScreensRef,
    electronicsRef,
    touchesRef,
    accessoriesRef,
    portsRef,
    fibresRef,
    buttonsRef,
    fingerPrintsRef,
    cameraGlassRef,
    backCoversRef,
    chesisRef,
    glassesRef,
  ];
  // Create an array to store the promises returned by the Firebase queries
  const promises = [];

// Search for query in each relevant Firebase node
firebaseNodes.forEach((nodeRef) => {
  const promise = get(nodeRef).then((snapshot) => {
    const data = snapshot.val();

    // Process the data and display matching products
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      const name = product.name.toLowerCase();
      const description = product.description.toLowerCase();
      const queryLower = query.toLowerCase();

      // Check for similarity with a minimum threshold (adjust as needed)
      const nameSimilarity = calculateSimilarity({innerText: name}, queryLower);
      const descriptionSimilarity = calculateSimilarity({innerText: description}, queryLower);

      // If the query is empty or there is a match (even for one word), create a card for the product
      if (!queryLower || nameSimilarity > 0.6 || descriptionSimilarity > 0.6 || name.includes(queryLower) || description.includes(queryLower)) {

      // Create a card for the matching product
const card = document.createElement("div");
card.classList.add("card1");

// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);



      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title);

      
      // Add star rating
const stars = document.createElement("div");
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
card.appendChild(stars);
/*
// Add rate icon
const rateIcon = document.createElement("i");
rateIcon.classList.add("rate-icon", "fas", "fa-star");
rateIcon.addEventListener("click", () => openRatingPopup(product.name));
card.appendChild(rateIcon);
*/
// Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);

/*
function openRatingPopup(productName) {
  // Get the modal element
  const ratingModal = document.getElementById("rating-modal");

  // Set the product name in the modal
  const productNameElement = ratingModal.querySelector("#productName");
  productNameElement.innerText = productName;

  // Show the rating modal
  ratingModal.style.display = "block";

  // Attach click event listener to the close button
  const closeBtn = document.getElementById("closeRatingPopup");
  closeBtn.addEventListener("click", () => closeRatingPopup());
}

function closeRatingPopup() {
  // Get the modal element
  const ratingModal = document.getElementById("rating-modal");

  // Hide the rating modal
  ratingModal.style.display = "none";
}
\

*/
      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);




// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);




// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);
// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

// Function to fetch wholesale price from Firebase
async function fetchWholesalePriceFromFirebase(productName) {
  // Define an array of subcategories you want to search through
  const subcategories = ["accessories", "Ports", "touches", "newScreens", "gradeBScreens", "electronics"]; // Add more subcategories as needed

  // Iterate through each subcategory and check for the product
  for (const subcategory of subcategories) {
    const productsRef = ref(database, `products/${subcategory}`);
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }
  }

  // Return a default value or handle the case when the product is not found in any subcategory
  return null;
}


  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}


const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}

      // Add card to list
      productsList.appendChild(card);
    }
      }
    });

    promises.push(promise);
  });

 // Wait for all promises to resolve before proceeding
Promise.all(promises).then(() => {
  // Sort products by relevance based on similarity to the query
  const products = Array.from(document.querySelectorAll('.card1'));
  products.sort((a, b) => {
    const aSimilarity = calculateSimilarity(a, query);
    const bSimilarity = calculateSimilarity(b, query);
    return bSimilarity - aSimilarity; // Sort in descending order of similarity
  });

// Clear the products list
document.getElementById("products-list").innerHTML = "";

// Append sorted products or display a message
const productsList = document.getElementById("products-list");

if (products.length === 0) {
  // If no relevant products found, create a container for the message and image
  const noResultsContainer = document.createElement("div");
  noResultsContainer.classList.add("no-results-container");

  // Add an image on top
  const noResultsImage = document.createElement("img");
  noResultsImage.src = "img/nothing found.png"; // Replace with the actual path to your image
  noResultsImage.alt = "No Results Image";
  noResultsContainer.appendChild(noResultsImage);

  // Add the message
  const noResultsMessage = document.createElement("p");
  noResultsMessage.innerText = "Oops...No relevant products found. If you cant find your desired product, please contact us to add it. Thank you!";
  noResultsMessage.classList.add("no-results-message");
  noResultsContainer.appendChild(noResultsMessage);

  // Append the container to the productsList
  productsList.appendChild(noResultsContainer);
} else {
  // If relevant products found, append them to the productsList
  products.forEach((product) => productsList.appendChild(product));
}

// Hide the loader
loader.style.display = "none";
});

}



// Function to calculate string similarity (Levenshtein distance)
function similarity(str1, str2) {
  const maxLength = Math.max(str1.length, str2.length);
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLength;
}

function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// Function to calculate similarity between product and query
function calculateSimilarity(productCard, query) {
  const productText = productCard.innerText.toLowerCase();
  const queryWords = query.toLowerCase().split(' ');

  // Generate all possible permutations of query words
  const permutations = generatePermutations(queryWords);

  // Calculate similarity for each permutation and find the maximum
  let maxSimilarity = 0;
  for (const perm of permutations) {
    const permString = perm.join(' ');
    const currentSimilarity = similarity(productText, permString);
    maxSimilarity = Math.max(maxSimilarity, currentSimilarity);
  }

  return maxSimilarity;
}

// Function to generate all possible permutations of an array
function generatePermutations(arr) {
  if (arr.length <= 1) {
    return [arr];
  }

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const permutations = generatePermutations(rest);
    for (const perm of permutations) {
      result.push([arr[i], ...perm]);
    }
  }

  return result;
}








//button for brand new//



document.querySelector("#cameraGlass-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
    // Display the loader
    const loader = document.getElementById("loader");
  loader.style.display = "block";


  // Get products from newPhonesRef
  get(cameraGlassRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
       // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i>Good, Tested and Trusted Quality";
guaranteeText.classList.add("guarantee-text");
card.appendChild(guaranteeText);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);


      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);





      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
    
   
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);
// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/Camera-Glasses");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}


const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});







document.querySelector("#brand-new-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
    // Display the loader
    const loader = document.getElementById("loader");
  loader.style.display = "block";


  // Get products from newPhonesRef
  get(newScreensRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
       // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i>Good, Tested and Trusted Quality";
guaranteeText.classList.add("guarantee-text");
card.appendChild(guaranteeText);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);


      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);





      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
    
   
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);
// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/newScreens");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}


const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});








//button for used //



document.querySelector("#uk-used-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";

  // Get products from newPhonesRef
  get(gradeBScreensRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge");
      badge.innerText = "Grade B";
      card.appendChild(badge);
       // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i>No Guarantee for Grade B";
guaranteeText.classList.add("guarantee-text");
card.appendChild(guaranteeText);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title);
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);


      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);




      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);

    
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);
// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/gradeBScreens");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});

//Phones//




document.querySelector("#newScreens-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(newScreensRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
       // Add guarantee text
      const guaranteeText = document.createElement("div");
      guaranteeText.innerHTML = "<i class='fa fa-shield'></i>Good, Tested and Trusted Quality Screens";
      guaranteeText.classList.add("guarantee-text");
      card.appendChild(guaranteeText);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title);  
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);
// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);



  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/newScreens");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });



function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});




   // Get products from newPhonesRef
   get(gradeBScreensRef).then((snapshot) => {
    const data = snapshot.val();
     // Display the loader
  const loader = document.getElementById("loader");
  loader.style.display = "block";
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge");
      badge.innerText = "Grade B ";
      card.appendChild(badge);
       // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i> No Guarantee for Grede B";
guaranteeText.classList.add("guarantee-text");
card.appendChild(guaranteeText);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);





      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
    
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);
// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/gradeBScreens");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });



function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });





//tevevisions navigation//




document.querySelector("#touches-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
  
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(touchesRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/touches");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});







document.querySelector("#glasses-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
  
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(glassesRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/Glasses");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});





document.querySelector("#backcovers-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
  
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(backCoversRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/Back-Covers");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});


document.querySelector("#chesis-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
  
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(chesisRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/Chesis");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});







document.querySelector("#fingerPrint-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
  
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(fingerPrintsRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/Finger-Prints");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});



document.querySelector("#buttons-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
  
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(buttonsRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/Buttons");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});




document.querySelector("#fibres-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
  
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(fibresRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/Fibres");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});






//sound navigation//



document.querySelector("#electronics-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";

  // Get products from newPhonesRef
  get(electronicsRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title);
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);


      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
    
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/electronics");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });



function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});


//accessories Navigation//




document.querySelector("#accessories-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(accessoriesRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);


      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
    
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/accessories");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});


// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });



function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});



//tablets Navigation//



document.querySelector("#ports-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
  
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(portsRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

      // Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






      // Add product description
const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);
     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/Ports");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});



           const loaderContainer = document.querySelector('.loader-container');
         //   const loader = document.querySelector('.loader');
            const productsList = document.getElementById("products-list");
            const modal = document.querySelector('.modal');
            const modalImg = document.getElementById("modalImg");
            const closeBtn = document.querySelector('.close');
      
      
          //  loaderContainer.style.display = "flex"; // show the loader


// Function to load new screens cards
function loadNewScreenCards(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const newScreenCard = document.createElement("div");
    newScreenCard.classList.add("card1");
                       // Add "used" badge
  const usedBadge = document.createElement("div");
  usedBadge.classList.add("used-badge2");
  usedBadge.innerText = "Brand New";
  newScreenCard.appendChild(usedBadge);
   // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i>Good, Tested and Trusted Quality";
guaranteeText.classList.add("guarantee-text");
newScreenCard.appendChild(guaranteeText);
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                newScreenCard.appendChild(title);


                      const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
newScreenCard.appendChild(stars);


// Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
newScreenCard.appendChild(ratingCount);






                const desc = document.createElement("p");
                desc.innerText = product.description;
                newScreenCard.appendChild(desc);
      

      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
newScreenCard.appendChild(price);


// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

newScreenCard.appendChild(wholesalePrice);

      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
              
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/newScreens");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
newScreenCard.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });



function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


    // Add card to list only if it's in the viewport
    if (isNewScreenElementInViewport(newScreenCard)) {
      productsList.appendChild(newScreenCard);
    }
  }
  loader.style.display = "none";
}


// Function to check if an element is in the viewport
function isNewScreenElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle scroll events for new screens
function handleNewScreenScroll() {
  const productsList = document.getElementById("products-list");
  const newScreenCards = document.querySelectorAll(".card1");

  newScreenCards.forEach((newScreenCard) => {
    if (isNewScreenElementInViewport(newScreenCard) && !productsList.contains(newScreenCard)) {
      productsList.appendChild(newScreenCard);
    }
  });
}

// Attach scroll event listener for new screens
window.addEventListener("scroll", handleNewScreenScroll);

// Function to load new screen cards with retries and backoff strategy
function loadNewScreenCardsWithRetriesAndBackoff(retries = 5, initialDelay = 3000, maxDelay = 16000) {
  // Retry loading new screen cards with backoff
  function retryLoad(delay) {
    setTimeout(() => {
      // Make the asynchronous call to retrieve new screens data
      get(newScreensRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadNewScreenCards(data);
        } else {
          // Retry with an increased delay if data is not retrieved successfully
          const nextDelay = Math.min(delay * 2, maxDelay);
          retryLoad(nextDelay);
        }
      }).catch(() => {
        // Retry with an increased delay if there is an error in retrieving data
        const nextDelay = Math.min(delay * 2, maxDelay);
        retryLoad(nextDelay);
      });
    }, delay);
  }

  // Initial attempt to retrieve new screens data
  retryLoad(initialDelay);
}

// Call the function to load new screen cards with retries and backoff strategy
loadNewScreenCardsWithRetriesAndBackoff();





//gradeBScreens //

// Function to load gradeB screen cards
function loadGradeBScreenCards(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const gradeBScreenCard = document.createElement("div");
    gradeBScreenCard.classList.add("card1");


                  // Add "used" badge
  const usedBadge = document.createElement("div");
  usedBadge.classList.add("used-badge");
  usedBadge.innerText = "Grade B ";
  gradeBScreenCard.appendChild(usedBadge);
   // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i>No Guarantee for Grade B";
guaranteeText.classList.add("guarantee-text");
gradeBScreenCard.appendChild(guaranteeText);
      
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                gradeBScreenCard.appendChild(title);
      
                const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
gradeBScreenCard.appendChild(stars);

// Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
gradeBScreenCard.appendChild(ratingCount);






                const desc = document.createElement("p");
                desc.innerText = product.description;
                gradeBScreenCard.appendChild(desc);
      
     
      
      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
gradeBScreenCard.appendChild(price);

      
// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

gradeBScreenCard.appendChild(wholesalePrice);




      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
      
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);


// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/gradeBScreens");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});


// Assuming `card` is the element representing the product card
gradeBScreenCard.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


    // Add card to list only if it's in the viewport
    if (isGradeBScreenElementInViewport(gradeBScreenCard)) {
      productsList.appendChild(gradeBScreenCard);
    }
  }
  loader.style.display = "none";
}

// Function to check if an element is in the viewport
function isGradeBScreenElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}



// Function to handle scroll events for gradeB screens
function handleGradeBScreenScroll() {
  const productsList = document.getElementById("products-list");
  const gradeBScreenCards = document.querySelectorAll(".card1");

  gradeBScreenCards.forEach((gradeBScreenCard) => {
    if (isGradeBScreenElementInViewport(gradeBScreenCard) && !productsList.contains(gradeBScreenCard)) {
      productsList.appendChild(gradeBScreenCard);
    }
  });
}

// Attach scroll event listener for gradeB screens
window.addEventListener("scroll", handleGradeBScreenScroll);
// Function to load gradeB screen cards with retries and backoff strategy
function loadGradeBScreenCardsWithRetriesAndBackoff(retries = 5, initialDelay = 3000, maxDelay = 16000) {
  // Retry loading gradeB screen cards with backoff
  function retryLoad(delay) {
    setTimeout(() => {
      // Make the asynchronous call to retrieve gradeB screens data
      get(gradeBScreensRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadGradeBScreenCards(data);
        } else {
          // Retry with an increased delay if data is not retrieved successfully
          const nextDelay = Math.min(delay * 2, maxDelay);
          retryLoad(nextDelay);
        }
      }).catch(() => {
        // Retry with an increased delay if there is an error in retrieving data
        const nextDelay = Math.min(delay * 2, maxDelay);
        retryLoad(nextDelay);
      });
    }, delay);
  }

  // Initial attempt to retrieve gradeB screens data
  retryLoad(initialDelay);
}

// Call the function to load gradeB screen cards with retries and backoff strategy
loadGradeBScreenCardsWithRetriesAndBackoff();






    //ports//


// Function to load port cards
function loadPortCards(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const portCard = document.createElement("div");
    portCard.classList.add("card1");

// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                portCard.appendChild(title);
      
                const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
portCard.appendChild(stars);


// Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
portCard.appendChild(ratingCount);






                const desc = document.createElement("p");
                desc.innerText = product.description;
                portCard.appendChild(desc);
      
      
      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
portCard.appendChild(price);

      
// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

portCard.appendChild(wholesalePrice);


      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
              
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/Ports");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});


// Assuming `card` is the element representing the product card
portCard.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


    // Add port card to list only if it's in the viewport
    if (isPortElementInViewport(portCard)) {
      productsList.appendChild(portCard);
    }
  }
  loader.style.display = "none";
}

   

// Function to check if an element is in the viewport
function isPortElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}




// Function to handle scroll events for ports
function handlePortScroll() {
  const productsList = document.getElementById("products-list");
  const portCards = document.querySelectorAll(".card1");

  portCards.forEach((portCard) => {
    if (isPortElementInViewport(portCard) && !productsList.contains(portCard)) {
      productsList.appendChild(portCard);
    }
  });
}

// Attach scroll event listener for ports
window.addEventListener("scroll", handlePortScroll);
// Function to load port cards with retries and backoff strategy
function loadPortCardsWithRetriesAndBackoff(retries = 5, initialDelay = 3000, maxDelay = 16000) {
  // Retry loading port cards with backoff
  function retryLoad(delay) {
    setTimeout(() => {
      // Make the asynchronous call to retrieve ports data
      get(portsRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadPortCards(data);
        } else {
          // Retry with an increased delay if data is not retrieved successfully
          const nextDelay = Math.min(delay * 2, maxDelay);
          retryLoad(nextDelay);
        }
      }).catch(() => {
        // Retry with an increased delay if there is an error in retrieving data
        const nextDelay = Math.min(delay * 2, maxDelay);
        retryLoad(nextDelay);
      });
    }, delay);
  }

  // Initial attempt to retrieve ports data
  retryLoad(initialDelay);
}

// Call the function to load port cards with retries and backoff strategy
loadPortCardsWithRetriesAndBackoff();




    //touches//


// Function to load touches cards
function loadTouchesCards(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const card = document.createElement("div");
    card.classList.add("card1");

      
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                card.appendChild(title);
      
                const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
card.appendChild(stars);


// Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);






const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

      
      
      
      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

      
// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);


      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
   
      
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);


// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/touches");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


    // Add touches card to list only if it's in the viewport
    if (isInViewportTouches(card)) {
      productsList.appendChild(card);
    }
  }
  loader.style.display = "none";
}
   

// Function to check if an element is in the viewport
function isInViewportTouches(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}




// Function to handle scroll events for touches
function handleScrollTouches() {
  const productsList = document.getElementById("products-list");
  const cards = document.querySelectorAll(".card1");

  cards.forEach((card) => {
    if (isInViewportTouches(card) && !productsList.contains(card)) {
      productsList.appendChild(card);
    }
  });
}

// Attach scroll event listener for touches
window.addEventListener("scroll", handleScrollTouches);

// Function to load touches cards with retries and backoff strategy
function loadTouchesCardsWithRetriesAndBackoff(retries = 5, initialDelay = 3000, maxDelay = 16000) {
  // Retry loading touches cards with backoff
  function retryLoad(delay) {
    setTimeout(() => {
      // Make the asynchronous call to retrieve touches data
      get(touchesRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadTouchesCards(data);
        } else {
          // Retry with an increased delay if data is not retrieved successfully
          const nextDelay = Math.min(delay * 2, maxDelay);
          retryLoad(nextDelay);
        }
      }).catch(() => {
        // Retry with an increased delay if there is an error in retrieving data
        const nextDelay = Math.min(delay * 2, maxDelay);
        retryLoad(nextDelay);
      });
    }, delay);
  }

  // Initial attempt to retrieve touches data
  retryLoad(initialDelay);
}

// Call the function to load touches cards with retries and backoff strategy
loadTouchesCardsWithRetriesAndBackoff();




    //accessories//


function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to load cards
function loadCards(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const card = document.createElement("div");
    card.classList.add("card1");

      
// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                card.appendChild(title);
      
                const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
card.appendChild(stars);


// Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);




const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

      
     
      
      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);



// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);

      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);


// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/accessories");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
const cart = document.getElementById('cart-container')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


if (isInViewport(card)) {
      productsList.appendChild(card);
    }
  }
  loader.style.display = "none";
}
// Function to handle scroll events
function handleScroll() {
  const productsList = document.getElementById("products-list");
  const cards = document.querySelectorAll(".card1");

  cards.forEach((card) => {
    if (isInViewport(card) && !productsList.contains(card)) {
      productsList.appendChild(card);
    }
  });
}

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);
// Function to load cards with retries and backoff strategy
function loadCardsWithRetriesAndBackoff(dataRef, loadFunction, retries = 5, initialDelay = 3000, maxDelay = 16000) {
  // Retry loading cards with backoff
  function retryLoad(delay) {
    setTimeout(() => {
      // Make the asynchronous call to retrieve data
      get(dataRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadFunction(data);
        } else {
          // Retry with an increased delay if data is not retrieved successfully
          const nextDelay = Math.min(delay * 2, maxDelay);
          retryLoad(nextDelay);
        }
      }).catch(() => {
        // Retry with an increased delay if there is an error in retrieving data
        const nextDelay = Math.min(delay * 2, maxDelay);
        retryLoad(nextDelay);
      });
    }, delay);
  }

  // Initial attempt to retrieve data
  retryLoad(initialDelay);
}

// Call the function to load cards with retries and backoff strategy for accessories
loadCardsWithRetriesAndBackoff(accessoriesRef, loadCards);


//electronics//

// Function to load cards
function loadCardsNew(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const card = document.createElement("div");
    card.classList.add("card1");

// Add product image
const img = document.createElement("img");
img.src = product.image;
img.alt = product.name;
img.classList.add("product-img");

// Create a loader element
const loader2 = document.createElement("div");
loader2.classList.add("loader2");
loader2.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // You can use any loading icon

// Append the loader to the card
card.appendChild(loader2);

// Add a load event listener to toggle the loader visibility
img.addEventListener("load", () => {
  // Hide the loader when the image is loaded
  loader2.style.display = "none";
});
img.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
  modalImg.src = img.src;
});
card.appendChild(img);


// Add an error event listener to handle image load errors
img.addEventListener("error", () => {
  // Hide the loader and display an alternative text or image for load errors
  loader2.style.display = "none";
  img.src = "img/no photo.jpg"; // Replace with your error image path
  img.alt = "Image Load Error"; // Replace with your error message
});

// Append the image to the card
card.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                card.appendChild(title);
      
                const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
card.appendChild(stars);

// Add rating count from Firebase
const ratingCount = document.createElement("div");
ratingCount.classList.add("rating-count");

// Generate a random rating count between 0 and 100,000
const randomRating = Math.floor(Math.random() * 100001);

// Format the rating count as "1k" if it exceeds 1000
const formattedRating = randomRating > 1000 ? (randomRating / 1000).toFixed(1) + 'k' : randomRating;

ratingCount.innerText = `(${formattedRating}) 5 star ratings`;
card.appendChild(ratingCount);




  

const maxDescriptionLength = 70; // Set your desired maximum length

const desc = document.createElement("p");
const originalDescription = product.description;

if (originalDescription.length > maxDescriptionLength) {
    // Truncate the description if it's too long
    const truncatedDescription = originalDescription.substring(0, maxDescriptionLength);
    desc.innerText = truncatedDescription + '...';

    // Add a tooltip with the full description
    desc.title = originalDescription;
} else {
    desc.innerText = originalDescription;
}

card.appendChild(desc);

      
      
      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

      
// Add product price
const wholesalePrice = document.createElement("h6");
const formattedWholesalePrice = parseFloat(product.wholesalePrice).toLocaleString('en-US');

wholesalePrice.innerHTML = ` Wholesale UGX:<span class="value"> ${formattedWholesalePrice}</span>`;
wholesalePrice.classList.add("wholesale-price"); // Add your custom class name

card.appendChild(wholesalePrice);

      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);




// Declare productPrice outside of addToCart to make it accessible to other functions
let productPrice;
// Initialize an object to store totals for each product
const productTotals = {};
// Initialize overall total variable
let total = 0;

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");
  // Create a container for the toggle switch
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Add title to the toggle
  const toggleTitle = document.createElement("p");
  toggleTitle.innerText = "Wholesale";
  toggleContainer.appendChild(toggleTitle);

 // Create the toggle switch
 const toggleSwitch = document.createElement("input");
 toggleSwitch.type = "checkbox";
 toggleSwitch.classList.add("toggle-switch");

 // Create a loading spinner
 const loadingSpinner = document.createElement("div");
 loadingSpinner.classList.add("loading-spinner");

 // Add the toggle switch and spinner to the toggle container
 toggleContainer.appendChild(toggleSwitch);
 toggleContainer.appendChild(loadingSpinner);

function handleWholesaleToggleChange() {
  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is less than 4
  if (currentQuantity < 2 && toggleSwitch.checked) {
    // Show a message to the user
    alert("The number of pieces should be more than 3 to enable wholesale.");
    // Set the toggle switch back to unchecked
    toggleSwitch.checked = false;
  } else {
    // Show the loading spinner
    loadingSpinner.style.display = "inline-block";

    // Fetch the wholesale price asynchronously
    fetchWholesalePriceFromFirebase(product.name)
      .then((wholesalePrice) => {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";

        // Update the price based on the toggle state
        updatePriceBasedOnToggle(product, toggleSwitch.checked, wholesalePrice);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching wholesale price:", error);
      });
  }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", handleWholesaleToggleChange);




  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  productDetails.appendChild(toggleContainer);

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

  // Create a quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add("quantity-input"); // Add the quantity-input class

quantityInput.addEventListener("input", () => {
  // Log the input value to the console
  console.log("Input value:", quantityInput.value);

  // Get the current quantity value
  const currentQuantity = parseInt(quantityInput.value);

  // Check if the current quantity is more than 3
  if (currentQuantity > 3) {
    // Call the function to turn on wholesale
    toggleSwitch.checked = true;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  } else {
    // Call the function to turn off wholesale
    toggleSwitch.checked = false;
    handleWholesaleToggleChange(); // Call the function to handle toggle change
  }

  // Get the displayed product price from innerText
  const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));

  // Call the multiply function with the current input value and displayed price
  multiplyInputByDisplayedPrice(quantityInput.value, displayedPrice, product.name);
});


  productDetails.appendChild(quantityInput);

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartCount(-1);
    updateCartTotal()
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);

  // Function to fetch wholesale price from Firebase
  async function fetchWholesalePriceFromFirebase(productName) {
    const productsRef = ref(database, "products/electronics");
    const productSnapshot = await get(child(productsRef, productName));

    if (productSnapshot.exists()) {
      // Assuming there's a property named 'wholesalePrice' in the product data
      const wholesalePrice = productSnapshot.val().wholesalePrice;

      // Parse the wholesalePrice as a number
      return wholesalePrice !== null ? parseFloat(wholesalePrice) : null;
    }

    // Return a default value or handle the case when the product is not found
    return null;
  }

  let originalTotal = 0;

  // Function to update price based on the toggle switch
  async function updatePriceBasedOnToggle(product, isWholesale) {
    // Get the displayed product price from innerText
    const displayedPrice = parseFloat(productPrice.innerText.replace("UGX ", ""));
  
    // Calculate the original total based on the current input value and displayed price
    const originalQuantity = parseInt(quantityInput.value);
    originalTotal = originalQuantity * displayedPrice;
  
    if (isWholesale) {
      // Fetch wholesale price from Firebase based on the product name
      const wholesalePrice = await fetchWholesalePriceFromFirebase(product.name);
  
      if (wholesalePrice !== null) {
        productPrice.innerText = `UGX ${wholesalePrice}`;
        productPrice.dataset.price = wholesalePrice;
      } else {
        // Handle the case when wholesale price is not found
        //console.error(`Wholesale price not found for product: ${product.name}`);
      }
    } else {
      productPrice.innerText = `UGX ${product.price}`;
      productPrice.dataset.price = product.price;
    }
  
    // Calculate the new total based on the current input value, displayed price, and product name
    const newQuantity = parseInt(quantityInput.value);
    const newTotal = newQuantity * parseFloat(productPrice.dataset.price);
  
    // Update the total element with the difference
    updateTotalElement(newTotal - originalTotal);
  
    // Log the updated price to the console
    console.log("Updated Price:", parseFloat(productPrice.dataset.price));
  }
  
  // Function to update the total element
  function updateTotalElement(result) {
    const totalPriceElement = document.getElementById("total-price");
  
    // Parse the total as a number
    const total = parseFloat(totalPriceElement.innerText.replace("TOTAL: UGX ", ""));
  
    // Display the updated total in the total element
    totalPriceElement.innerText = "TOTAL: UGX " + (total + result).toFixed(2);
  
    // Log the updated total to the console
    console.log("Updated Total:", total + result);
  }
  

// Function to multiply input by displayed price and update the total element
function multiplyInputByDisplayedPrice(inputValue, displayedPrice, productName) {
  // Check if inputValue is not empty and is a valid number
  if (inputValue && !isNaN(inputValue)) {
    // Calculate the result by multiplying the input by the displayed product price
    const result = inputValue * displayedPrice;

    // Update the total for this product directly
    productTotals[productName] = result;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", result);
  } else {
    // If inputValue is empty or not a valid number, reset the total for this product
    productTotals[productName] = 0;

    // Update the overall total directly
    updateCartTotal();

    // Log the result to the console
    console.log("Result of multiplication:", 0);
  }
}}

// Function to update the total element based on all cart items
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityInput = cartItem.querySelector(".product-details .quantity-input");
    const productPriceElement = cartItem.querySelector(".product-details h4");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPriceElement.dataset.price);
    const totalForItem = quantity * price;

    total += totalForItem;
  }

  // Display the overall total in the total element
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);

  // Log the updated total to the console
  console.log("Updated Total:", total);
}

// Example of using the function



// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
    const closeCartBtn = document.getElementById("close-cart-btn");
    closeCartBtn.style.display = 'none'
    setTimeout(() => {
        cart.style.opacity = '1';
    }, 10);
  addToCart(product);
  updateCartTotal();

});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

const body = document.body;

        openCartBtn.addEventListener("click", () => {
            if (cartIsEmpty()) {
                cartContent.style.display = "none"; // Hide the cart content on load
                showAddToCartMessage('Cart is Empty! Nothing is')
                // Show a message or perform any desired action when cart is empty
                return;
            }

            // Fade in
            overlay.style.display = 'block';
            cartContent.style.display = "block";
            openCartBtn.style.display = "none";
            closeCartBtn.style.display = "inline-block";
            body.classList.add("no-scroll"); // Add class to disable scrolling

            setTimeout(() => {
                overlay.style.opacity = '1';
                cartContent.style.opacity = '1';
            }, 10); // Adjust the delay (in milliseconds) if needed
        });

        closeCartBtn.addEventListener("click", () => {
            // Fade out
            overlay.style.opacity = '0';
            cartContent.style.opacity = '0';

            setTimeout(() => {
                cartContent.style.display = "none";
                closeCartBtn.style.display = "none";
                openCartBtn.style.display = "inline-block";
                overlay.style.display = 'none';
                body.classList.remove("no-scroll"); // Remove class to enable scrolling
            }, 300); // Adjust the delay to match the transition duration
        });


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list only if it's in the viewport
      if (isInViewportNew(card)) {
      productsList.appendChild(card);
    }
  }
  loader.style.display = "none";
}

  // Function to check if an element is in the viewport
function isInViewportNew(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


  

// Function to handle scroll events
function handleScrollNew() {
  const productsList = document.getElementById("products-list");
  const cards = document.querySelectorAll(".card1");

  cards.forEach((card) => {
    if (isInViewportNew(card) && !productsList.contains(card)) {
      productsList.appendChild(card);
    }
  });
}

// Attach scroll event listener
window.addEventListener("scroll", handleScrollNew);

// Function to load cards with retries and backoff strategy
function loadCardsWithRetryAndBackoff(dataRef, loadFunction, retries = 5, initialDelay = 3000, maxDelay = 16000) {
  // Retry loading cards with backoff
  function retryLoad(delay) {
    setTimeout(() => {
      // Make the asynchronous call to retrieve data
      get(dataRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadFunction(data);
        } else {
          // Retry with an increased delay if data is not retrieved successfully
          const nextDelay = Math.min(delay * 2, maxDelay);
          retryLoad(nextDelay);
        }
      }).catch(() => {
        // Retry with an increased delay if there is an error in retrieving data
        const nextDelay = Math.min(delay * 2, maxDelay);
        retryLoad(nextDelay);
      });
    }, delay);
  }

  // Initial attempt to retrieve data
  retryLoad(initialDelay);
}

// Call the function to load cards with retries and backoff strategy for electronics
loadCardsWithRetryAndBackoff(electronicsRef, loadCardsNew);




const slider = document.querySelector('.image-slider');
const images = slider.querySelectorAll('img');
const interval = 3000; // Change image every 3 seconds

let index = 0;
setInterval(() => {
  images[index].classList.remove('active');
  index = (index + 1) % images.length;
  images[index].classList.add('active');
}, interval);

const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    // Use smooth scrolling to scroll to the top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// Get all filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');

// Add click event listener to each filter button
filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove the 'active' class from all filter buttons
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    // Add the 'active' class to the clicked filter button
    this.classList.add('active');

    // Get the data filter value
    const filterValue = this.getAttribute('data-filter');

    // Call the filterProducts function with the filter value
    filterProducts(filterValue);
  });
});

// Function to filter products based on the filter value
function filterProducts(filterValue) {
  // Get all product cards within the products-list container
  const products = document.querySelectorAll('#products-list .card1');
  let maxHeight = 0; // Variable to store the maximum height of visible product cards

  // Iterate through each product card
  products.forEach(product => {
    // Get the product name
    const productName = product.querySelector('h2').innerText.toLowerCase();

    // Split the filterValue into an array of suggestions
    const suggestions = filterValue.toLowerCase().split(',');

    // Check if the product name contains any of the suggestions
    const matches = suggestions.some(suggestion => productName.includes(suggestion.trim()));

    if (matches || filterValue === 'all') {
      // Show the product card if it matches any of the suggestions or if filter value is 'all'
      product.style.display = 'block';
      maxHeight = Math.max(maxHeight, product.offsetHeight); // Update maxHeight
    } else {
      // Hide the product card if it doesn't match any of the suggestions
      product.style.display = 'none';
    }
  });

  // Set the same height for all product cards to prevent layout shift
  products.forEach(product => {
    product.style.height = `${maxHeight}px`;
  });

  // If no products were found, display the no results message
  const noResultsContainer = document.getElementById("no-results-container");
  noResultsContainer.style.display = (maxHeight === 0) ? "block" : "none";
}

// Function to adjust the height of placeholder to maintain layout
function adjustPlaceholderHeight(allProducts, visibleProducts) {
  const placeholder = document.getElementById('placeholder'); // Assuming you have a placeholder element
  const totalProducts = allProducts.length;
  const visibleCount = visibleProducts.length;
  const hiddenCount = totalProducts - visibleCount;
  const cardHeight = visibleProducts[0].offsetHeight; // Assuming all cards have the same height

  // Calculate the height for the placeholder
  const placeholderHeight = hiddenCount * cardHeight;

  // Set the height of the placeholder
  placeholder.style.height = `${placeholderHeight}px`;
}


// Function to show the no results message
function showNoResultsMessage() {
  const noResultsContainer = document.getElementById("no-results-container");
  noResultsContainer.style.display = "block";
}

// Function to hide the no results message
function hideNoResultsMessage() {
  const noResultsContainer = document.getElementById("no-results-container");
  noResultsContainer.style.display = "none";
}

// Function to generate a random alphanumeric string
function generateRandomOrderId(length) {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }

  return result;
}

// Generate a random order ID
const randomOrderId = generateRandomOrderId(5);


window.addEventListener("load", () => {
  // Check if there are any saved cart details in local storage
  const savedCartDetails = localStorage.getItem("cartDetails");
  if (savedCartDetails) {
      // Parse the saved cart details from JSON
      const cartDetails = JSON.parse(savedCartDetails);

      // Create a popup container
      const customPopupContainer = document.createElement("div");
      customPopupContainer.classList.add("custom-popup-container");

      // Create the overlay
      const overlay = document.createElement("div");
      overlay.classList.add("overlay7");

      // Create the popup content
      const customPopupContent = document.createElement("div");
      customPopupContent.classList.add("custom-popup-content");

      // Add title to the popup
      const title = document.createElement("h4");
      title.innerText = "We Saved your previous Cart Details !";
      customPopupContent.appendChild(title);

      // Display cart details in the popup
      const cartSummary = document.createElement("p");
      cartSummary.innerHTML = `
          <strong>Delivery Place:</strong> ${cartDetails.deliveryPlace}<br>
          <strong>Telephone Contact:</strong> ${cartDetails.telephoneNumber}<br>
          <strong>Means of Transport:</strong> ${cartDetails.meansOfTransport}<br>
          <strong>Selected Payment Option:</strong> ${cartDetails.selectedPaymentOption}<br>
          <strong>Order Summary:</strong><br>
      `;
      cartSummary.classList.add("cart-summary");

      // Create a table for order summary
      const orderTable = document.createElement("table");
      orderTable.classList.add("custom-order-table");
      const tableHeader = document.createElement("tr");
      tableHeader.innerHTML = `
          <th>Pdt</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
          <th>Whole-sale</th>
      `;
      orderTable.appendChild(tableHeader);

      // Add order items to the table
      cartDetails.orderSummary.forEach(item => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${item.productName}</td>
              <td>UGX ${item.price}</td>
              <td>${item.quantity}</td>
              <td>UGX ${item.total.toFixed(2)}</td>
              <td>${item.isWholesale ? "Yes" : "No"}</td>
          `;
          orderTable.appendChild(row);
      });

      cartSummary.appendChild(orderTable);
      customPopupContent.appendChild(cartSummary);

      // Add close button
      const closeButton = document.createElement("button");
      closeButton.innerText = "Close";
      closeButton.classList.add("close-button");
      closeButton.addEventListener("click", () => {
          customPopupContainer.style.display = "none";
          overlay.style.display = "none";
      });
      customPopupContent.appendChild(closeButton);


      // Add place order button
      const placeOrderButton = document.createElement("button");
      placeOrderButton.innerText = "Place Order";
      placeOrderButton.classList.add("place-order-button");
      placeOrderButton.addEventListener("click", async () => {
          // Display loader while processing the order
          const loader = document.createElement("div");
          loader.classList.add("loader");
          customPopupContainer.appendChild(loader);

          // Check if the user is authenticated
          const user = auth.currentUser;
          if (!user) {
              // User is not authenticated, show the not logged in message
              showNotLoggedInMessage();
              return; // Stop further execution
          }

          // Get the UID of the logged-in user
          const userId = user.uid;
          const userEmail = user.email;
          // Get the delivery place from the input field
          const deliveryPlace = cartDetails.deliveryPlace;

          // Get the selected means of transport
          const meansOfTransport = cartDetails.meansOfTransport;

          // Get the selected payment option
          const selectedPaymentOption = cartDetails.selectedPaymentOption;
// Get the telephone number from the input field
const telephoneNumber = cartDetails.telephoneNumber;

          // Get the cart total
          const cartTotal = cartDetails.cartTotal;

          // Get the order summary
          const orderSummary = cartDetails.orderSummary;

          // Rest of your code to handle placing the order...

// Initialize orderData object
const orderData = {
  orderId: generateRandomOrderId(10),
  orderDate: new Date().toLocaleDateString(),
  orderTime: new Date().toLocaleTimeString(),
  deliveryPlace,
  meansOfTransport,
  selectedPaymentOption,
  orderSummary,
  cartTotal,
  userId,
  userEmail,
  telephoneNumber
};

// Push the order details to Firebase database
const orderRef = ref(database, "orders");
const newOrderRef = push(orderRef);

// Save the order data
set(newOrderRef, orderData)
  .then(() => {
      // Order placed successfully

      // Create a new reference to the customer's receipt in the "receipts" node
      const userReceiptRef = ref(database, `users/${userId}/receipts`);
      const newUserReceiptRef = push(userReceiptRef);

      // Save the receipt data under the user's account
      const receiptData = {
          orderId: orderData.orderId,
          orderDate: orderData.orderDate,
          orderTime: orderData.orderTime,
          deliveryPlace: orderData.deliveryPlace,
          meansOfTransport: orderData.meansOfTransport,
          selectedPaymentOption: orderData.selectedPaymentOption,
          orderSummary: orderData.orderSummary,
          cartTotal: orderData.cartTotal,
          userId: orderData.userId,
          userEmail: orderData.userEmail
      };

      // Save the receipt data
      set(newUserReceiptRef, receiptData)
          .then(() => {
              // Receipt saved successfully
              showSuccessPopup();
              clearCart();
          })
          .catch((error) => {
              console.error("Error saving receipt:", error.message);
             // showErrorPopup();
          })
          .finally(() => {
              // Remove the loader container
              document.body.removeChild(loaderContainer);
          });
  })
  .catch((error) => {
      console.error("Error placing order:", error.message);
     // showErrorPopup();
      document.body.removeChild(loaderContainer); // Remove the loader container in case of an error
  });

      });
      customPopupContent.appendChild(placeOrderButton);
// Add no longer need order button
const cancelOrderButton = document.createElement("button");
cancelOrderButton.innerText = "No Longer Need Order ?";
cancelOrderButton.classList.add("cancel-order-button");
cancelOrderButton.addEventListener("click", () => {
    // Display a confirmation dialog before clearing the cart items
    const confirmation = confirm("Are you sure you no longer need this order?");
    if (confirmation) {
        // Clear local storage cart items
        localStorage.removeItem("cartDetails");
        // Close the popup
        customPopupContainer.style.display = "none";
        // Hide the overlay
        overlay.style.display = "none";
    }
});
customPopupContent.appendChild(cancelOrderButton);

// Add the popup content to the container
customPopupContainer.appendChild(customPopupContent);

// Append the overlay and popup container to the body
document.body.appendChild(overlay);
document.body.appendChild(customPopupContainer);

// Get a reference to the View Draft Orders button
const viewDraftOrdersBtn = document.getElementById("viewDraftOrdersBtn");

// Add event listener to the View Draft Orders button
viewDraftOrdersBtn.addEventListener("click", () => {
    // Toggle the display of the customPopupContainer
    customPopupContainer.style.display = "block";
    overlay.style.display = "block";

});
}
});

// Function to remove the loader container
function removeLoaderContainer() {
  const loaderContainer = document.querySelector(".loader-container");
  if (loaderContainer) {
      document.body.removeChild(loaderContainer);
  }
}

// Function to show the success popup
function showSuccessPopup() {
  // Remove the loader container
  removeLoaderContainer();

  // Create the success popup
  const successPopup = document.createElement("div");
  successPopup.classList.add("success-popup");

  // Create the success message
  const successMessage = document.createElement("h3");
  const successText = document.createElement("p");
  successText.innerText = "Thank you for shopping with us... You can always find your receipts in your account and use ORDER IDs as reasons for payment. Thank you.";
  successMessage.innerText = "Order Successful !";

  // Create the okay button
  const okayButton = document.createElement("button");
  okayButton.classList.add("okay-button");
  okayButton.innerText = "Okay";

  // Add event listener to the okay button
  //okayButton.addEventListener("click", () => {
  //    location.reload(); // Refresh the page
 // });

  // Append the okay button to the success popup
  successPopup.appendChild(okayButton);

// Add event listener to close the success popup when the okay button is clicked
okayButton.addEventListener("click", () => {
  // Clear the local storage saved cart details
  localStorage.removeItem("cartDetails");

  // Reload the page
  location.reload();

  // Remove the success popup from the document body
  document.body.removeChild(successPopup);
});

  // Append the success message and okay button to the success popup
  successPopup.appendChild(successMessage);
  successPopup.appendChild(successText);
  successPopup.appendChild(okayButton);

  // Add the success popup to the document body
  document.body.appendChild(successPopup);
}
