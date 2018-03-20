// JavaScript för att implementera kraven A-E.
//start view
$("#productOutput").attr("style", "display: block");
$("#checkoutDiv").attr("style", "display: none");
$("#theProductDiv").attr("style", "display: none");

/******************************************funktioner för att byta vy***********************************************' */

$(".checkoutBtn").on("click", () => {
  switchToPage2();
});

//lägger till ett event när man klickar på checkout knappen
function switchToPage1() {
  $("#productOutput").attr("style", "display: block");
  $("#checkoutDiv").attr("style", "display: none");
  $("#theProductDiv").attr("style", "display: none");
}

function switchToPage2() {
  $("#productOutput").attr("style", "display: none");
  $("#checkoutDiv").attr("style", "display: none");
  $("#theProductDiv").attr("style", "display: block");
}

function switchToPage3() {
  $("#productOutput").attr("style", "display: none");
  $("#checkoutDiv").attr("style", "display: block");
  $("#theProductDiv").attr("style", "display: none");
}

function jsShow(id) {
  document.getElementById(id).style.display = "block";
}

function jsHide(id) {
  document.getElementById(id).style.display = "none";
}

//funktoner för att dölja/visa saker

/**************************************Skapar individuell produkt div******************************************' */

/*Fetchin products*/
fetch("http://demo.edument.se/api/products")
  .then(response => response.json())
  .then(data => {
    var products = data;
    console.log(products, "hey");
    renderHTMLtext(products);
  });

/*rendering html by looping out the products*/

function renderHTMLtext(data) {
  var HTMLstring = "";

  let cards = $(".card");

  for (var i in data) {
    cards[i].innerHTML = `
<div class="prodDiv" data-id="${data[i].Id}">
<img src="${data[i].Image}" />
<h4>${data[i].Name}</h4>
<div>Price: ${data[i].Price}</div>
<div>${data[i].Description}</div>
</div>
`;
  }
}

var prodData;

$(".card").click(function(event) {
  fetch("http://demo.edument.se/api/products")
    .then(response => response.json())
    .then(data => {
      var products = data;
      console.log(products, "hey hoooe");
      event.preventDefault();

      var id = $(this).attr("data-id");
      for (var i = 0; i < products.length; i++) {
        if (products[i].Id == id) {
          prodData = products[i];
        }
      }

      displayProduct(prodData);
      switchToPage2();
    });

  $("#checkourBtn").click(function(event) {
    switchToPage3();
  });
});

function displayProduct(prodData) {
  var output = "";

  output += `
  <div class="theProduct col-xs-4" align="center" data-id="${prodData.Id}">
  <img src="${prodData.Image}" />
   <h5>${prodData.Name}</h5>
   <p>${prodData.Price}</p>
   <p>${prodData.Description}</p>

   <button class="backBtn">Go Back</button>
  </div> 
  
  `;

  $("#theProductDiv").html(output);

  $(".backBtn").click(function(event) {
    switchToPage1();
  });
}

/******************************************Shopping cart functions***********************************************' */

// var shoppingCart = (function() {
//   var cart = [];

//   function Item(id, name, price, count) {
//     this.id = id;
//     this.name = name;
//     this.price = price;
//     this.count = count;
//   }

//   function saveCart() {
//     localStorage.setItem("shoppingCart", JSON.stringify(cart));
//   }

//   function loadCart() {
//     cart = JSON.parse(localStorage.getItem("shoppingCart"));
//     if (cart === null) {
//       cart = [];
//     }
//   }

//   loadCart();

//   var obj = {};

//   obj.addItemToCart = function(id, name, price, count) {
//     for (var i in cart) {
//       if (cart[i].name === name) {
//         cart[i].count += count;
//         saveCart();
//         return;
//       }
//     }

//     console.log("addItemToCart:", id, name, price, count);

//     var item = new Item(id, name, price, count);
//     cart.push(item);
//     saveCart();
//   };

//   obj.setCountForItem = function(name, count) {
//     for (var i in cart) {
//       if (cart[i].name === name) {
//         cart[i].count = count;
//         break;
//       }
//     }
//     saveCart();
//   };

//   obj.removeItemFromCart = function(name) {
//     for (var i in cart) {
//       if (cart[i].name === name) {
//         cart[i].count--;
//         if (cart[i].count === 0) {
//           cart.splice(i, 1);
//         }
//         break;
//       }
//     }
//     saveCart();
//   };

//   obj.removeItemFromCartAll = function(name) {
//     for (var i in cart) {
//       if (cart[i].name === name) {
//         cart.splice(i, 1);
//         break;
//       }
//     }
//     saveCart();
//   };

//   obj.clearCart = function() {
//     cart = [];
//     saveCart();
//   };

//   obj.countCart = function() {
//     var totalCount = 0;
//     for (var i in cart) {
//       totalCount += cart[i].count;
//     }

//     return totalCount;
//   };

//   obj.totalCart = function() {
//     var totalCost = 0;
//     for (var i in cart) {
//       totalCost += cart[i].price * cart[i].count;
//     }
//     return totalCost.toFixed(2);
//   };

//   obj.listCart = function() {
//     var cartCopy = [];
//     console.log("Listing cart");
//     console.log(cart);
//     for (var i in cart) {
//       console.log(i);
//       var item = cart[i];
//       var itemCopy = {};
//       for (var p in item) {
//         itemCopy[p] = item[p];
//       }
//       itemCopy.total = (item.price * item.count).toFixed(2);
//       cartCopy.push(itemCopy);
//     }
//     return cartCopy;
//   };

//   return obj;
// })();

// /****************************************** Bygger cart***********************************************' */

// $(".add-to-cart").on("click", function(event) {
//   event.preventDefault();
//   var id = Number($(this).attr("data-id"));
//   var name = $(this).attr("data-name");
//   var price = Number($(this).attr("data-price"));

//   shoppingCart.addItemToCart(id, name, price, 1);
//   displayCart();
// });

// $("#clear-cart").on("click", function(event) {
//   shoppingCart.clearCart();
//   displayCart();
// });

// function displayCart() {
//   var cartArray = shoppingCart.listCart();
//   console.log(cartArray);
//   var output = "";

//   for (var i in cartArray) {
//     output +=
//       "<div id='cartCheckout'>" +
//       "<table>" +
//       "<td id='tdname'>" +
//       cartArray[i].name +
//       "</td>" +
//       "<td id='tdcountprice'>" +
//       " <input class='item-count styleCartInput' type='number' data-name='" +
//       cartArray[i].name +
//       "' value='" +
//       cartArray[i].count +
//       "' >" +
//       " x " +
//       cartArray[i].price +
//       " = " +
//       cartArray[i].total +
//       "</td>" +
//       "<td>" +
//       " <button class='btn btn-default plus-item' data-name='" +
//       cartArray[i].name +
//       "'>+</button>" +
//       " <button class='btn btn-default subtract-item' data-name='" +
//       cartArray[i].name +
//       "'>-</button>" +
//       " <button class='btn btn-default delete-item' data-name='" +
//       cartArray[i].name +
//       "'>X</button>" +
//       "</td>" +
//       "</table>" +
//       "</div>";
//   }

//   $("#show-cart").html(output);

//   $(".count-cart").html(shoppingCart.countCart());
//   $("#total-cart").html(shoppingCart.totalCart());

//   /*****************Inlämning 4 Order using fetch********************** */

//   $("#validateBtn").on("click", function(event) {
//     event.preventDefault();
//     addRequest(event);
//     console.log("button pressed");
//   });

//   function addRequest(e) {
//     //event parameter is passed since it is a form.
//     e.preventDefault(); //prevents default behaviour

//     let orderItems = [];
//     let cart = shoppingCart.listCart();
//     console.log(cart);
//     cart.forEach(item => {
//       for (let i = 0; i < item.count; i++) {
//         orderItems.push({
//           Id: item.id,
//           Name: item.name,
//           Price: item.price
//         });
//       }
//     });

//     // creating new list of items inside cart, then creating new objects from every object in the cart and pushing them to the new array.

//     console.log(orderItems); //test
//     let userName = document.getElementById("fName").value;
//     let userLast = document.getElementById("lName").value;
//     let userEmail = document.getElementById("email").value;
//     let userPhone = document.getElementById("phone").value;
//     let userStreet = document.getElementById("street").value;
//     let userZip = document.getElementById("zip").value;
//     let userCity = document.getElementById("city").value;
//     let userComments = document.getElementById("formComment").value;
//     let userCart = orderItems;

//     fetch("http://demo.edument.se/api/orders", {
//       method: "POST",
//       headers: {
//         Accept: "application/json, text/plain, */*",
//         "Content-type": "application/json"
//       },
//       body: JSON.stringify({
//         firstname: userName,
//         lastname: userLast,
//         email: userEmail,
//         phone: userPhone,
//         streetaddress: userStreet,
//         zipcode: userZip,
//         city: userCity,
//         comment: userComments,
//         OrderItems: orderItems
//       })
//     })
//       .then(res => res.json())
//       .then(data => console.log(data));
//   }
// }

// /************************************************** */

// $("#show-cart").on("click", ".delete-item", function(event) {
//   var name = $(this).attr("data-name");
//   shoppingCart.removeItemFromCartAll(name);
//   displayCart();
// });

// $("#show-cart").on("click", ".subtract-item", function(event) {
//   var name = $(this).attr("data-name");
//   shoppingCart.removeItemFromCart(name);
//   displayCart();
// });

// $("#show-cart").on("click", ".plus-item", function(event) {
//   var name = $(this).attr("data-name");
//   shoppingCart.addItemToCart(name, 0, 1);
//   displayCart();
// });

// $("#show-cart").on("change", ".item-count", function(event) {
//   var name = $(this).attr("data-name");
//   var count = Number($(this).val());
//   shoppingCart.setCountForItem(name, count);
//   displayCart();
// });

// displayCart();
