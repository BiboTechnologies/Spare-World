import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import { getDatabase, ref, remove,orderByChild, push, get, update, onValue, child, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
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


// Assuming productList is the ID of the HTML element where you want to display the products
const productList = document.getElementById('productList');

// Check if productList exists before accessing it
if (productList) {
    // Your Firebase code here
} else {
    console.error('Product list element not found.');
}

// Reference to the root node containing products
const productsRef = ref(database, 'products');
// Function to create table rows with input fields and buttons
function createProductRow(categoryId, productId, productName, price, wholesalePrice) {
    const row = document.createElement('tr');
    row.setAttribute('data-category-id', categoryId); // Store categoryId as a data attribute

    row.innerHTML = `
        <td><input type="text" class="product-name" value="${productName}" readonly></td>
        <td><input type="number" class="product-price" value="${price}" readonly></td>
        <td><input type="number" class="product-wholesale-price" value="${wholesalePrice}" readonly></td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="save-btn" style="display: none;">Save</button>
            <button class="revert-btn" style="display: none;">Revert</button>
        </td>
    `;

    // Attach event listeners for edit, save, and revert buttons
    const editBtn = row.querySelector('.edit-btn');
    const saveBtn = row.querySelector('.save-btn');
    const revertBtn = row.querySelector('.revert-btn');

    editBtn.addEventListener('click', () => {
        // Enable input fields for editing
        row.querySelectorAll('input').forEach(input => {
            input.removeAttribute('readonly');
        });
        // Show save and revert buttons, hide edit button
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline';
        revertBtn.style.display = 'inline';
    });

    saveBtn.addEventListener('click', () => {
        // Get the category ID from the table row
        const categoryId = row.getAttribute('data-category-id');
        
        // Get the product name from the input field
        const productName = row.querySelector('.product-name').value;
        
        // Get the updated values from the input fields
        const updatedPrice = parseFloat(row.querySelector('.product-price').value);
        const updatedWholesalePrice = parseFloat(row.querySelector('.product-wholesale-price').value);
        
        // Construct the updated data object
        const updatedData = {
            price: updatedPrice,
            wholesalePrice: updatedWholesalePrice
        };
        
        // Query Firebase to find the product ID based on its name
        const productsInCategoryRef = ref(database, `products/${categoryId}`);
        
        get(productsInCategoryRef).then((snapshot) => {
            if (snapshot.exists()) {
                // Find the product ID by iterating through the snapshot
                let productId;
                snapshot.forEach((childSnapshot) => {
                    const product = childSnapshot.val();
                    if (product.name === productName) {
                        productId = childSnapshot.key;
                    }
                });
    
                if (productId) {
                    // Construct the reference to the product
                    const productRef = ref(database, `products/${categoryId}/${productId}`);
        
                    // Update the data in the Firebase database
                    update(productRef, updatedData)
                        .then(() => {
                            alert('Product updated successfully:', updatedData);
                        })
                        .catch((error) => {
                            alert('Error updating product:', error);
                        });
                } else {
                    alert('Product not found.');
                }
            } else {
                alert('Category not found.');
            }
        }).catch((error) => {
            alert('Error querying database:', error);
        });
        
        // Disable input fields, hide save and revert buttons, show edit button
        row.querySelectorAll('input').forEach(input => {
            input.setAttribute('readonly', true);
        });
        editBtn.style.display = 'inline';
        saveBtn.style.display = 'none';
        revertBtn.style.display = 'none';
    });
    
    

    revertBtn.addEventListener('click', () => {
        // Revert changes to original values
        row.querySelectorAll('input').forEach(input => {
            input.value = input.getAttribute('value');
            input.setAttribute('readonly', true);
        });
        // Hide save and revert buttons, show edit button
        editBtn.style.display = 'inline';
        saveBtn.style.display = 'none';
        revertBtn.style.display = 'none';
    });

    return row;
}

// Function to fetch and display products
function fetchAndDisplayProducts() {
    // Listen for changes in the products node
    onValue(productsRef, (snapshot) => {
        const productCategories = snapshot.val(); // Retrieve product categories data from the snapshot

        // Clear existing product list (if any)
        productList.innerHTML = '';

        // Iterate over each product category
        for (const categoryId in productCategories) {
            const category = productCategories[categoryId];

            // Create table for each category
            const categoryTable = document.createElement('table');
            categoryTable.classList.add('category-table');

            // Create table header row
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
                <th>Product</th>
                <th>Price</th>
                <th>Wholesale</th>
                <th>Actions</th>
            `;
            categoryTable.appendChild(headerRow);

            // Iterate over each product within the category
            for (const productId in category) {
                const product = category[productId];
                // Retrieve product details
                const { name, price, wholesalePrice } = product;

                // Create table row for each product
                const productRow = createProductRow(categoryId, productId, name, price, wholesalePrice);
                categoryTable.appendChild(productRow);
            }

            // Append category table to the product list
            productList.appendChild(categoryTable);
        }
    });
}

// Call the function to fetch and display products
fetchAndDisplayProducts();

