
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

  const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

/*
   // Google Sign-In function
   function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info
                const user = result.user;

                // Save user information to the Realtime Database
                saveUserToDatabase(user);

                // You can handle the signed-in user as needed
                console.log(user);
            })
            .catch((error) => {
                // Handle errors here
                console.error(error);
            });
    }

    // Save user information to the Realtime Database
    function saveUserToDatabase(user) {
        const userRef = ref(database, `users/${user.uid}`);
        set(userRef, {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            // Add any other user information you want to save
        });
    }

    // Listen for changes in authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            console.log("Signed in:", user);
            saveUserToDatabase(user);
        } else {
            // User is signed out
            console.log("Signed out");
        }
    });

    // Add click event listener to the button
    const button = document.getElementById('signInWithGoogle');
    button.addEventListener("click", () => {
        signInWithGoogle();
    });
 */
    const toggle = document.getElementById('toggleForm');
    const formContainer = document.getElementById('formContainer');
    const backToSignInBtn = document.getElementById('backToSignIn');

    toggle.addEventListener('click', (e) => {
        formContainer.classList.toggle('signup-active');
        e.preventDefault();
    });

    backToSignInBtn.addEventListener('click', (e) => {
        formContainer.classList.remove('signup-active');
        e.preventDefault();
    });

// Form submission handling
const signInForm = document.getElementById('signInForm');
const signInBtn = document.getElementById('signInBtn');
const spinner = document.querySelector('.spinner');

signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Verify reCAPTCHA
   const recaptchaResponse = grecaptcha.getResponse();
   if (!recaptchaResponse) {
       alert('Please complete the reCAPTCHA verification.');
      return;
   }

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        // Disable the button and show the loading spinner
        signInBtn.disabled = true;
        signInBtn.classList.add('loading-btn');
        spinner.style.display = 'block';

        // Verify reCAPTCHA server-side (optional but recommended)
       // const recaptchaVerificationResult = await verifyRecaptchaServerSide(recaptchaResponse);
      //// if (!recaptchaVerificationResult.success) {
      //     throw new Error('reCAPTCHA verification failed. Please try again.');
      //  }

        // Sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if the user's email is verified
        if (!user.emailVerified) {
            // Throw an error if the email is not verified
            throw new Error('Email not verified. Please check your inbox for the verification email.');
        }

        // Check if user data already exists in the database
        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            // User data already exists, don't overwrite it
            console.log('User data already exists in the database');
        } else {
            // User data doesn't exist, create a new entry
            await set(userRef, {
                email: user.email,
                displayName: user.displayName,
                // Add other user details as needed
            });

            console.log('User data added to the database');
        }

        // Save user details in local storage
        localStorage.setItem('userDetails', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            // Add other user details as needed
        }));

        // Redirect to the dashboard page upon successful sign-in
        window.location.href = 'index.html';
    } catch (error) {
        // Handle errors, including reCAPTCHA verification failure
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = error.message;
    } finally {
        // Re-enable the button and hide the loading spinner
        signInBtn.disabled = false;
        signInBtn.classList.remove('loading-btn');
        spinner.style.display = 'none';
    }
});





// Initialize an array to store personal details
let personalDetailsArray = [];

// Get the input fields and the next button
const firstNameInput = document.getElementById("signUpFirstNameInput");
const lastNameInput = document.getElementById("signUpLastNameInput");
const telephoneInput = document.getElementById("signUpTelephoneInput");
const dobInput = document.getElementById("signUpDOBInput");
const nextButton = document.getElementById("nextToAccountInfo");

// Disable the Next button by default
nextButton.disabled = true;

// Add input event listeners to the fields
firstNameInput.addEventListener("input", toggleNextButton);
lastNameInput.addEventListener("input", toggleNextButton);
telephoneInput.addEventListener("input", toggleNextButton);
dobInput.addEventListener("input", toggleNextButton);

// Add a click event listener to the Next button
nextButton.addEventListener("click", storePersonalDetails);

function toggleNextButton() {
    // Check if all fields are filled before enabling the button
    const allFieldsFilled =
        firstNameInput.value.trim() !== "" &&
        lastNameInput.value.trim() !== "" &&
        telephoneInput.value.trim() !== "" &&
        dobInput.value.trim() !== "";

    // Update the disabled attribute of the button based on the condition
    nextButton.disabled = !allFieldsFilled;
}

function storePersonalDetails() {
    // Store the form details in the array with titles
    personalDetailsArray = [
        { title: "First Name", value: firstNameInput.value.trim() },
        { title: "Last Name", value: lastNameInput.value.trim() },
        { title: "Telephone", value: telephoneInput.value.trim() },
        { title: "Date of Birth", value: dobInput.value.trim() },
    ];

    // Log the personal details to the console
    //console.log("Personal Details:", personalDetailsArray);

    // Hide the personal information form and show the account information form
    document.getElementById("personalInfoDiv").style.display = "none";
    document.getElementById("accountInfoDiv").style.display = "block";
}





const signUpFormPersonal = document.getElementById('personalInfoForm');
const signUpFormAccount = document.getElementById('accountInfoForm');
const signUpBtn = document.getElementById('signUpBtn');
const spinner2 = document.querySelector('.spinner2');
const errorMessage2 = document.getElementById('error-message2');

let personalFormData = {};
let accountFormData = {};

// Personal Information Form submission handling
signUpFormPersonal.addEventListener('submit', (event) => {
    event.preventDefault();

    // Store the form details in the array with titles
    personalDetailsArray = [
        { title: "First Name", value: personalFormData.firstName },
        { title: "Last Name", value: personalFormData.lastName },
        { title: "Telephone", value: personalFormData.telephone },
        { title: "Date of Birth", value: personalFormData.dob },
    ];

    // Log the personal details to the console
    console.log("Personal Details:", personalDetailsArray);

    // Hide the personal information form and show the account information form
    document.getElementById("personalInfoDiv").style.display = "none";
    document.getElementById("accountInfoDiv").style.display = "block";
});

// Account Information Form submission handling
signUpFormAccount.addEventListener('submit', async (event) => {
    event.preventDefault();

    const signUpEmailInput = document.getElementById('signUpEmailInput');
    const signUpPasswordInput = document.getElementById('signUpPasswordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');

    accountFormData = {
        email: signUpEmailInput.value,
        password: signUpPasswordInput.value,
        confirmPassword: confirmPasswordInput.value,
    };

    // Check if passwords match
    if (accountFormData.password !== accountFormData.confirmPassword) {
        errorMessage2.textContent = "Passwords do not match.";
        return;
    }

    try {
        // Disable the button and show the loading spinner
        signUpBtn.disabled = true;
        signUpBtn.classList.add('loading-btn');
        spinner2.style.display = 'block';

        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, accountFormData.email, accountFormData.password);
        const user = userCredential.user;

        // Send verification email
        await sendVerificationEmail(user);

        // Combine personal and account information
        const combinedUserData = {
            email: accountFormData.email,
            firstName: personalDetailsArray.find(detail => detail.title === 'First Name')?.value,
            lastName: personalDetailsArray.find(detail => detail.title === 'Last Name')?.value,
            telephone: personalDetailsArray.find(detail => detail.title === 'Telephone')?.value,
            dob: personalDetailsArray.find(detail => detail.title === 'Date of Birth')?.value,
            // Add other fields as needed
        };

        // Save additional user data to Firebase Realtime Database
        saveUser(user.uid, combinedUserData);
        // Display a success message
        displaySuccessMessage();

        // Clear the form fields
        signUpFirstNameInput.value = '';
        signUpLastNameInput.value = '';
        signUpTelephoneInput.value = '';
        signUpDOBInput.value = '';
        signUpEmailInput.value = '';
        signUpPasswordInput.value = '';
        confirmPasswordInput.value = '';

      // Automatically reload the page after a timeout
setTimeout(() => {
    location.reload();
}, 2000); // Adjust the timeout duration as needed

    } catch (error) {
        // Handle errors
        errorMessage2.textContent = error.message;
    } finally {
        // Re-enable the button and hide the loading spinner
        signUpBtn.disabled = false;
        signUpBtn.classList.remove('loading-btn');
        spinner2.style.display = 'none';
    }
});
   // Modified saveUser function to handle the new structure
function saveUser(userId, userData) {
    const usersRef = ref(database, 'users/' + userId);

    // Update the user data
    update(usersRef, userData)
        .then(() => {
            console.log('User data saved successfully');
        })
        .catch((error) => {
            console.error('Error saving user data:', error);
        });
}
        async function sendVerificationEmail(user) {
            // Send email verification
            await sendEmailVerification(user);
            // Display a message to the user
            displaySuccessMessage();
        }
        
        function displaySuccessMessage() {
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Verification email sent. Please check your inbox.';
            successMessage.classList.add('success-message');
            document.body.appendChild(successMessage);
        
            setTimeout(() => {
            }, 100);
        
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 5000); // Adjust the timeout duration as needed
        }

        
        
        
        

        function displayMessage() {
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Password reset email sent successfully! Check your email.';

            successMessage.classList.add('success-message');
            document.body.appendChild(successMessage);
        
            setTimeout(() => {
            }, 100);
        
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 5000); // Adjust the timeout duration as needed
        }
       



        function startResendCountdown() {
            const countdownElement = document.getElementById('countdown');
            const resendCountdownElement = document.getElementById('resendCountdown');
            const resendButton = document.getElementById('sendResetEmailBtn');
        
            let timeInSeconds = 120; // 2 minutes
            const countdownInterval = setInterval(function () {
                const minutes = Math.floor(timeInSeconds / 60);
                const seconds = timeInSeconds % 60;
                countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
                if (timeInSeconds <= 0) {
                    clearInterval(countdownInterval);
                    countdownElement.textContent = '0:00';
                    resendCountdownElement.style.display = 'none';
        
                    // Enable the button after the countdown is complete
                    resendButton.style.cursor = 'pointer'
                    resendButton.disabled = false;
                    resendButton.classList.remove('dull-btn');
                } else {
                    // Disable the button and add dull-btn class during the countdown
                    resendButton.style.cursor = 'not-allowed';
                    resendButton.disabled = true;
                    resendButton.classList.add('dull-btn');
                }
        
                timeInSeconds--;
            }, 1000);
        }
        

        document.getElementById('forgotPasswordLink').addEventListener('click', function () {
            // Hide sign-in form, show password reset form
            document.getElementById('signInForm').style.display = 'none';
            document.getElementById('passwordResetForm').style.display = 'block';
        });

        document.getElementById('backToSignInLink').addEventListener('click', function () {
            // Hide password reset form, show sign-in form
            document.getElementById('signInForm').style.display = 'block';
            document.getElementById('passwordResetForm').style.display = 'none';
        });

        document.getElementById('sendResetEmailBtn').addEventListener('click', async function () {
            const resetEmail = document.getElementById('resetEmailInput').value;

            // Display the spinner and disable the button
            const button = document.getElementById('sendResetEmailBtn');
            const spinner = button.querySelector('.spinner');
            const btnText = document.getElementById('btnText');

            button.disabled = true;
            button.classList.add('dull-btn');
            spinner.style.display = 'inline-block';
            btnText.style.display = 'inline-block'; // Show the text

            try {
                // Use Firebase method to send the reset email
                await sendPasswordResetEmail(auth, resetEmail);
                // Handle success, for example, display a success message
                displayMessage();
                // Show the resend countdown
                document.getElementById('resendCountdown').style.display = 'block';
                // Start the resend countdown
                startResendCountdown();
                
            } catch (error) {
                // Handle error, for example, log the error
                console.error(error.message);
            } finally {
                // Hide the spinner
                spinner.style.display = 'none';
                // Enable the button for manual resend
                button.disabled = false;
                button.classList.remove('dull-btn');
            }
        });
        