// // Function to delete an item from the cart and update local storage
// const deleteItemFromCart = (itemId) => {
//   try {
//     // Get the cart content from localStorage
//     let cartContent = JSON.parse(localStorage.getItem("cartContent")) || [];

//     // Find the item index in the cart
//     const itemIndex = cartContent.findIndex((item) => item.id === itemId);

//     if (itemIndex !== -1) {
//       // Decrease the quantity by one
//       if (cartContent[itemIndex].quantity > 1) {
//         cartContent[itemIndex].quantity--;
//       } else {
//         // If item quantity is 1, remove the item from the cart
//         cartContent.splice(itemIndex, 1);
//       }

//       // Save the updated cart content back to localStorage
//       localStorage.setItem("cartContent", JSON.stringify(cartContent));

//       // Log the item deleted from the cart
//       console.log("Item deleted from cart with ID:", itemId);

//       // Update the display of cart content after successful deletion
//       displayCartContent();

//       // Dispatch a custom event to notify other parts of the application
//       const cartUpdatedEvent = new CustomEvent("cartUpdated");
//       window.dispatchEvent(cartUpdatedEvent);
//     } else {
//       console.log("Item not found in the cart.");
//     }
//   } catch (error) {
//     console.error("Error deleting item from cart:", error.message);
//   }
// };

// // Function to update the cart table with items from localStorage
// const updateCartFromLocalStorage = () => {
//   try {
//     // Get the cart content from localStorage
//     const cartContent = JSON.parse(localStorage.getItem("cartContent"));

//     // Get the cart container element
//     const cartContainer = document.getElementById("cartContainer");

//     if (!cartContent || cartContent.length === 0) {
//       // Cart is empty
//       cartContainer.innerHTML = "<h2 class='empty-cart-message'>Your cart is empty!</h2>";
//       return;
//     }

//     // Get the table body element
//     const tbody = cartContainer.querySelector("table tbody");

//     // Clear the existing content
//     tbody.innerHTML = "";

//     // Iterate over each item in the cart and update/add the corresponding row
//     cartContent.forEach((item, index) => {
//       const row = document.createElement("tr");

//       // Update the content of the row
//       row.innerHTML = `
//         <td>
//           <div class="productImage">
//             <img src="${item.image}" alt="${item.name}" />
//           </div>
//         </td>
//         <td>
//           <h3>${item.name}</h3>
//           <p>${item.description}</p>
//         </td>
//         <td class="productSize">${item.size}</td>
//         <td class="productColor">${item.color}</td>
//         <td>
//           <input
//             type="number"
//             value="${item.quantity}"
//             aria-label="Quantity"
//             disabled
//           />
//         </td>
//         <td class="productPrice">$${item.price.toFixed(2)}</td>
//         <td>
//           <button class="deleteItem" data-id="${item.id}">Delete</button>
//         </td>
//       `;

//       // Attach event listener to delete button
//       const deleteButton = row.querySelector(".deleteItem");
//       deleteButton.addEventListener("click", () => {
//         deleteItemFromCart(item.id);
//       });

//       // Append the row to the tbody
//       tbody.appendChild(row);
//     });
//   } catch (error) {
//     console.error("Error updating cart from localStorage:", error.message);
//   }
// };

// // Function to display the cart content
// const displayCartContent = () => {
//   updateCartFromLocalStorage();
// };

// // Attach event listener to the parent container of delete buttons when the page loads
// document.addEventListener("DOMContentLoaded", () => {
//   // Call the function to update the cart table from localStorage when the page loads
//   displayCartContent();
// });


// // Attach event listener to the parent container of delete buttons when the page loads
// document.addEventListener("DOMContentLoaded", () => {
//   // Call the function to update the cart table from localStorage when the page loads
//   displayCartContent();
// });


// --------test

// Function to delete an item from the cart and update local storage
const deleteItemFromCart = (itemId) => {
  try {
    // Get the cart content from localStorage
    let cartContent = JSON.parse(localStorage.getItem("cartContent")) || [];

    // Find the item index in the cart
    const itemIndex = cartContent.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      // Decrease the quantity by one
      if (cartContent[itemIndex].quantity > 1) {
        cartContent[itemIndex].quantity--;
      } else {
        // If item quantity is 1, remove the item from the cart
        cartContent.splice(itemIndex, 1);
      }

      // Save the updated cart content back to localStorage
      localStorage.setItem("cartContent", JSON.stringify(cartContent));

      // Log the item deleted from the cart
      console.log("Item deleted from cart with ID:", itemId);

      // Update the display of cart content after successful deletion
      updateCartFromLocalStorage();

      // Dispatch a custom event to notify other parts of the application
      const cartUpdatedEvent = new CustomEvent("cartUpdated");
      window.dispatchEvent(cartUpdatedEvent);
    } else {
      console.log("Item not found in the cart.");
    }
  } catch (error) {
    console.error("Error deleting item from cart:", error.message);
  }
};

// Function to update the cart table with items from localStorage
const updateCartFromLocalStorage = () => {
  try {
    // Get the cart content from localStorage
    const cartContent = JSON.parse(localStorage.getItem("cartContent"));

    // Get the cart container element
    const cartContainer = document.getElementById("cartContainer");

    if (!cartContent || cartContent.length === 0) {
      // Cart is empty
      cartContainer.innerHTML = "<h2 class='empty-cart-message'>Your cart is empty!</h2>";
      updateItemCount(0); // Update item count in cart counter
      updateTotalPrice(0); // Update total price in cart
      return;
    }

    // Get the table body element
    const tbody = cartContainer.querySelector("table tbody");

    // Clear the existing content
    tbody.innerHTML = "";

    // Variables to store total quantity and price
    let totalQuantity = 0;
    let totalPrice = 0;

    // Iterate over each item in the cart and update/add the corresponding row
    cartContent.forEach((item, index) => {
      const row = document.createElement("tr");

      // Update the content of the row
      row.innerHTML = `
        <td>
          <div class="productImage">
            <img src="${item.image}" alt="${item.name}" />
          </div>
        </td>
        <td>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </td>
        <td class="productSize">${item.size}</td>
        <td class="productColor">${item.color}</td>
        <td>
          <input
            type="number"
            value="${item.quantity}"
            aria-label="Quantity"
            disabled
          />
        </td>
        <td class="productPrice">$${(item.price * item.quantity).toFixed(2)}</td>
        <td>
          <button class="deleteItem" data-id="${item.id}">Delete</button>
        </td>
      `;

      // Update total quantity and price
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;

      // Attach event listener to delete button
      const deleteButton = row.querySelector(".deleteItem");
      deleteButton.addEventListener("click", () => {
        deleteItemFromCart(item.id);
      });

      // Append the row to the tbody
      tbody.appendChild(row);
    });

    // Update total quantity and price in the cart display
    updateItemCount(totalQuantity);
    updateTotalPrice(totalPrice);
  } catch (error) {
    console.error("Error updating cart from localStorage:", error.message);
  }
};

// Function to update the item count in cart counter
const updateItemCount = (count) => {
  const counterElement = document.querySelector(".counter");
  if (counterElement) {
    counterElement.textContent = count.toString();
  }
};

// Function to update the total price in cart
const updateTotalPrice = (price) => {
  const existingCartTotal = document.querySelector(".cartTotal");
  
  if (existingCartTotal) {
    // Create a new cartTotal div with the updated total price
    const newCartTotal = document.createElement("div");
    newCartTotal.classList.add("cartTotal");

    newCartTotal.innerHTML = `
      <div class="totalPrice">
        <h3>Total Price:</h3>
        <p>$${price.toFixed(2)}</p>
      </div>
      <div class="ctaCart">
        <div>
          <p>
            <a href="/index/productPage.html">
              <i class="bx bx-chevron-left"></i>
              Continue Shopping
            </a>
          </p>
        </div>
        <button class="submitButton" id="submitButton">Submit</button>
      </div>
    `;

    // Replace existing cartTotal with the new one
    existingCartTotal.parentNode.replaceChild(newCartTotal, existingCartTotal);
  }
};


// Function to display the cart content
const displayCartContent = () => {
  updateCartFromLocalStorage();
};

// Attach event listener to the parent container of delete buttons when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Call the function to update the cart table from localStorage when the page loads
  displayCartContent();
});
