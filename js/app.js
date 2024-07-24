// const createUser = document.querySelector(".user");
const modal = document.querySelector(".modal")
const register_link = document.querySelector(".register-link");
const modal_register = document.querySelector(".modal-register");
const login_link = document.querySelector(".login-link")
const btn = document.querySelector(".modal-btn");

const check_user = false;



window.addEventListener("onLoad",function(){
  console.log('Loaded')
  if(!check_user){
    setTimeout(showPopup, 2000);
    check_user = true;
  }
});

// function showPopup(){
//   modal.classList.add("open");
// }

register_link.addEventListener('click', () => {
  // modal.classList.add("hide");
  // modal_register.classList.remove("hide");
  document.getElementById('registerModal').style.display = 'block'
  document.getElementById('loginModal').style.display = 'none'
  
});

login_link.addEventListener('click', () => {
  document.getElementById('registerModal').style.display = 'none'
  document.getElementById('loginModal').style.display = 'block'
});

// firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in 
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ..
//   });






// btn.addEventListener('click', () => {
//   modal.classList.remove("open");
//   modal_register.classList.remove("open");
//   check_user = false;
// });



