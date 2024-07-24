
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLV7F4Jb1u9zdKWBzsXK6TXRMdeP-A0BM",
    authDomain: "tutorial-2-201f3.firebaseapp.com",
    projectId: "tutorial-2-201f3",
    storageBucket: "tutorial-2-201f3.appspot.com",
    messagingSenderId: "247783474416",
    appId: "1:247783474416:web:309c5e5401c8fd4c99ae35",
    databaseURL: "https://tutorial-2-201f3-default-rtdb.firebaseio.com/",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const dbRef = firebase.database().ref();
  
  //Sing Up function
  document.getElementById("signup").addEventListener("click", function (event) {
    event.preventDefault();
  
    var userName = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var localStorage = window.localStorage;
    console.log("Pressed", userName, email, password);
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("User has sign-in");
        firebase
          .database()
          .ref("users/" + user.uid)
          .set({
            username: userName,
            email: email,
            highscore: "0",
          });
        document.getElementById("registerModal").style.display = "none";
  
        alert("You have succssfully created the account");
        localStorage.setItem("userId", user.uid);
        localStorage.setItem("highScore", "0");
        localStorage.setItem("userName", userName);
  
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        alert(`Error while creating the account: ${error}`);
      });
  });
  
  //Login Button function
  document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault();
  
    var email = document.getElementById("loginEmail");
    var password = document.getElementById("loginPassword");
  
    if (email === "" || password.value === "") {
      alert("Please eneter an email address and password");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          document.querySelector(".modal").classList.add("hide");
          // alert(`You have succcessfullyt logged in ${user.uid}`);
          alert(`You have succcessfully logged in`);
          dbRef
            .child("users")
            .child(user.uid)
            .get()
            .then((snapshot) => {
              const value = snapshot.val();
              console.log(value.email);
              localStorage.setItem("userId", user.uid);
              localStorage.setItem("highScore", value.highscore);
              localStorage.setItem("userName", value.username);
              document.getElementById('userHighScore').textContent = value.highscore
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(`Error while login: ${error} `);
        });
    }
  });
  
  function checkUserState() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/v8/firebase.User
        var uid = user.uid;
        console.log(uid);
        document.querySelector(".modal").classList.add("hide");
        document.querySelector(".modal-register").classList.add("hide");
        // ...
      } else {
        // User is signed out
        console.log("User is not sign in");
        document.querySelector(".modal").classList.remove("hide");
        document.querySelector(".modal-register").classList.remove("hide");
        // ...
      }
    });
  }
  
  //Logout function
  
  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
  
  
  
  // Get highscores and render in Leader Board
  
  document.addEventListener("DOMContentLoaded",function(){
  
      dbRef
      .child("users").orderByChild("highscore")
      .get().then((snapshot)=>{
        console.log(snapshot)
  //       const dataArray = Object.entries(snapshot.val()).map(([key, value]) => ({ key, ...value }));
  //     const sortedArray =  sortArrayByProperty(dataArray, 'highscore')
      
  // const convertedObject = sortedArray.reduce((obj, { key, ...rest }) => {
  //   obj[key] = { ...rest };
  //   return obj;
  // }, {});
  
  // const finalArray = [convertedObject]
  
  // console.log(finalArray);
  
  
     
       
          snapshot.forEach(element => {
             
  
              var userName = element.val()['username']
              var score = element.val()['highscore']
              // var score = JSON.parse(h_score);
  
              renderLeaderBoardScores(userName, score)
          });
      }).catch((e)=>{
          console.log(e)
      })
  
      
  })
  
  function renderLeaderBoardScores(username, score){
      var parentDiv = document.getElementById('leaderBoard')
      var userName = document.createElement('h4')
      var userScore = document.createElement('h4')
      var rowDiv = document.createElement('div')
      var row1 = document.createElement('div')
      var row2 = document.createElement('div')
  
      rowDiv.classList.add('row')
      row1.classList.add('col')
      row2.classList.add('col')
  
      userName.innerHTML = username
      userScore.innerHTML = score
  
      parentDiv.appendChild(rowDiv)
      rowDiv.appendChild(row1)
      rowDiv.appendChild(row2)
      row1.appendChild(userName)
      row2.appendChild(userScore)
  
  
  
  
  }
  
  function sortArrayByProperty(array, property) {
    const array1 = []
    
    return array.sort((a, b) => b[property] - a[property]);
  }