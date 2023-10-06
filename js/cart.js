
let firstName = localStorage.getItem("firstName")
let lastName = localStorage.getItem("lastName")
let email = localStorage.getItem("email")
let username = localStorage.getItem("username")

let signInBtn = document.querySelector("#signInBtn")
let signupBtn = document.querySelector("#signupBtn")
let profileNameBox = document.querySelector("#profileNameBox")
let profileNameMenu = document.querySelector(".profileNameMenu")
let profileName = document.querySelector(".profileName")
let userImg = document.getElementById("userImg")

let errorMessageContainer = document.querySelector(".errorMessageContainer");
let errorMessageList = document.querySelector(".errorMessageList");
let closeErrorBtn = document.querySelector(".closeErrorBtn");

if(firstName) {
    signupBtn.style.display = "none"
    signInBtn.style.display = "none"
    profileNameBox.style.display = "block"
    profileName.innerHTML +=  firstName 
}
userImg.addEventListener("click",() => {
    if(profileNameMenu.style.display !== "flex") {
        profileNameMenu.style.display = "flex"
    }else {
        profileNameMenu.style.display = "none"
    }
})

const logoutBtn = document.getElementById("logoutBtn")
logoutBtn.addEventListener("click",() => {
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("username")
    window.location.reload()
})





const scrollContainer = document.querySelector('.scrollspy-example');
let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
  scrollContainer.style.cursor = 'grabbing';
});

scrollContainer.addEventListener('mouseleave', () => {
  isDown = false;
  scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mouseup', () => {
  isDown = false;
  scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (isDown === false) return;
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 5; 
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// ---------------------------------------
let allMainProducts = localStorage.getItem('allProducts');
if (allMainProducts) {
  allMainProducts = JSON.parse(allMainProducts);
}

function updateProductPice (array) {
  array.forEach((product) => {
    if (product.discount === true){
      let netPrice = product.price - product.discountAmount  
      product.cartPrice = netPrice * product.cartQuantity
  }else {
    product.cartPrice = product.price
  }
  });
}
let cartContainer = document.querySelector('.cartContainer')
let allCartProducts = localStorage.getItem('cart')

if (allCartProducts){
  allCartProducts = JSON.parse(allCartProducts)
  updateProductPice (allCartProducts)
}else {
  allCartProducts=[]
}

let totalPrice = document.querySelector('.totalPrice span')
let totalPriceContainer = document.querySelector('.totalPriceContainer')
function drawTotalPrice () {
  let price = 0 
  if (allCartProducts.length !== 0) {
    allCartProducts.map( (product) => {
      price += product.cartPrice
    })
    totalPrice.innerHTML = price
  } else { 
    totalPriceContainer.style.display = "none "
  }
}


function drawCartProducts () {
  const cartProductsCards = allCartProducts.map( (product) => {
    return `<div class="cartProductCard">
    <div class="cardImgBox">
      <img src="${product.imgPath}".jpg" alt="">
    </div>
    <div class="cartProductBody">
      <h3 class="productTitle">${product.name}</h3>
      <div class="productInfo"> 
        <p class="productCategory">Category : <span> ${product.category} </span></p>
        <p class="productTotalPrice_${product.id}">Total Price : <span> ${product.cartPrice} </span>EGP</p>
      </div>
      <div class="cartProductQuantity">
        <div class="cardBtns">
          <span class="btn btn-primary productQuantityBtn" onclick="quantityIncrement(${product.id})"><i class="fa-solid fa-plus"></i></span>
          <span class="productQuantity_${product.id}">${product.cartQuantity}</span>
          <span class="btn btn-danger productQuantityBtn" onclick="quantityDecrement(${product.id})"><i class="fa-solid fa-minus"></i></span>
        </div>
        <button class="deleteBtn" onclick=" deleteProductBtn (${product.id})">Delete</button>
      </div>
    </div>
</div>`
  })
  drawTotalPrice ()
  cartContainer.innerHTML = cartProductsCards.join('')
}
drawCartProducts ()



// ********************************
let cartBadgeValue = 0
let cartBadge = document.querySelector(".cartBadge")

function cartOnload () { 
  if (allCartProducts.length !== 0) {
      
      function Badge (){
          allCartProducts.map((product) => {
              cartBadgeValue += product.cartQuantity
              cartBadge.innerHTML = cartBadgeValue
                      
          } )
      }
      Badge ()
  }else {
    cartBadge.style.display = "none"
    cartContainer.innerHTML = `<h2 class="emptyContainer">Cart Is Empty</h2>
    <a class="btn" href="index.html">Go Shopping</a>`
  }
}
cartOnload ()


function updateCartBadge () {
  if (allCartProducts.length !== 0) {
    cartBadgeValue = 0
    allCartProducts.map(function (product) {
      let quantity = product.cartQuantity
      cartBadgeValue += quantity
    })
    cartBadge.innerHTML = cartBadgeValue
  }else {
    cartBadge.style.display = "none"
    cartContainer.innerHTML = `<h2 class="emptyContainer">Cart Is Empty</h2>
    <a class="btn" href="index.html">Go Shopping</a>`
  }
}
// *********************************
// **********  Product BTNs **************
function quantityIncrement(id) {
  let index = allCartProducts.findIndex((item) => item.id === id) 
  let productTotalPrice = document.querySelector (`.productTotalPrice_${allCartProducts[index].id} span`) 
   allCartProducts[index].cartQuantity ++
  let productQuantityText = document.querySelector (`.productQuantity_${allCartProducts[index].id}`) 
  productQuantityText.innerHTML = allCartProducts[index].cartQuantity
  cartBadgeValue ++
  cartBadge.innerHTML = cartBadgeValue
  let price = allCartProducts[index].price - allCartProducts[index].discountAmount 
  allCartProducts[index].cartPrice = price * allCartProducts[index].cartQuantity
  productTotalPrice.innerHTML = allCartProducts[index].cartPrice
  drawTotalPrice ()
  localStorage.setItem('cart' , JSON.stringify(allCartProducts) )
}

function quantityDecrement(id) {
  let index = allCartProducts.findIndex((item) => item.id === id) 
  let productTotalPrice = document.querySelector (`.productTotalPrice_${allCartProducts[index].id} span`) 

  if (allCartProducts[index].cartQuantity > 1 ) {
    let productQuantityText = document.querySelector (`.productQuantity_${allCartProducts[index].id}`) 
    allCartProducts[index].cartQuantity --
    productQuantityText.innerHTML = allCartProducts[index].cartQuantity
    let price = allCartProducts[index].price - allCartProducts[index].discountAmount 
    allCartProducts[index].cartPrice = price * allCartProducts[index].cartQuantity
    productTotalPrice.innerHTML = allCartProducts[index].cartPrice
  }else {
    allCartProducts.splice(index, 1);
    drawCartProducts();
    localStorage.setItem('cart', JSON.stringify(allCartProducts));
  }

  drawTotalPrice ()
  updateCartBadge ()
  localStorage.setItem('cart' , JSON.stringify(allCartProducts) )
}
// ***************  Delete from  Cart   ****************
function deleteProductBtn(id) {
  let index = allCartProducts.findIndex((item) => item.id === id);
  if (index !== -1) {
    allCartProducts.splice(index, 1);
    drawCartProducts();
    localStorage.setItem('cart', JSON.stringify(allCartProducts));
    updateCartBadge();
  }
}

let deleteAllBtn = document.querySelector('.deleteAllBtn')
deleteAllBtn.addEventListener('click',() => {
  allCartProducts=[]
  localStorage.removeItem('cart')
  drawCartProducts()
  updateCartBadge();
})

// ---------------------------------------------------
// **********************************************
let favoriteContainer = document.querySelector('.favoriteContainer')
let circlesBox = document.querySelector('.circlesBox')
let allFavoriteProducts = localStorage.getItem('favorites')

if (allFavoriteProducts){
  allFavoriteProducts = JSON.parse(allFavoriteProducts)
}else{
  allFavoriteProducts =[]
}

function drawFavoriteProducts () {
  if (allFavoriteProducts.length > 0) {
    // let favoriteLength = allFavoriteProducts.length
    let indexID = 0
    const favoriteProductsCards = allFavoriteProducts.map( (product) => {
      indexID ++
      
      return `<div id="list-item-${indexID}"  class="scrollCard bg-light favoriteCard">
      <div class="favoriteImgBox ">
      <img src="${product.imgPath}" alt="" class="favoriteImg"  draggable="false">
      </div>
      <div class="favoriteCardText">
      <h2 class="favoriteName">${product.name}</h2>
      <button class=" favoriteIcon" onclick="favoriteProduct (${product.id})" onclick><i class="fas fa-heart"></i></button>
      </div>
      </div>`
    })
    favoriteContainer.innerHTML = favoriteProductsCards.join('')
  }else {
    favoriteContainer.innerHTML = `<div class="emptyFavorite">
    <h2>No Favorite Item</h2>
  </div>`
  }
}
 drawFavoriteProducts ()



function favoriteProduct (id) {

    let index = allFavoriteProducts.findIndex((item) => item.id === id)
    allFavoriteProducts.splice(index, 1)
   
    // let length = allFavoriteProducts.length 

    let reIndex = allMainProducts.findIndex((item) => item.id === id)
    allMainProducts[reIndex].favorite = false
    localStorage.setItem("favorites" , JSON.stringify(allFavoriteProducts))
    localStorage.setItem("allProducts" , JSON.stringify(allMainProducts))
    drawFavoriteProducts ()
    drawFavoriteCircles ()
}

// ..........................................
function drawFavoriteCircles () {
  circlesBox.innerHTML = ""
  let favoriteLength = allFavoriteProducts.length 
  if (favoriteLength > 0) {

    if (favoriteLength <3) {
      if(screen.width < 868){
        favoriteContainer.style.justifyContent = "auto"
      }else{
        favoriteContainer.style.justifyContent = "center"
      }

    }else {
      let circleNo = Math.floor(favoriteLength/3)
      favoriteContainer.style.justifyContent = "auto"
      
      if (favoriteLength < 6 && favoriteLength > 3 && favoriteLength != 0) {
        circlesBox.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-1"></a> `
        circlesBox.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${favoriteLength}"></a> `
      } else {
        circlesBox.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-1"></a> `
        let temp = 3
        let temp2 = 3
        // console.log( temp)
        for (let i = 1; i < circleNo  ; i ++ ) {
          temp2 = temp + i
          if (temp2 < favoriteLength) {
            circlesBox.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${i+temp}"></a> `
            temp += 3
          }
        }
        circlesBox.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${favoriteLength}"></a> `
      }
    }
    
  }
}
drawFavoriteCircles () 