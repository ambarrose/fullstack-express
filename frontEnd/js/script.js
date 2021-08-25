console.log('script'); //testing if script.js is working
console.log(sessionStorage);

$(document).ready(function(){


$('#result').hide();
    $('.adminPage').hide();

$('#home').click(function(){
  $('#result').hide();
    $('.adminPage').hide();
    $('.homePage').show();
});

$('#admin').click(function(){
  $('.homePage').hide();
    $('#result').hide();
    $('.adminPage').show();
});

let url;//declare url as a variable in es6
$.ajax({
  url: 'config.json',
  type: 'GET',
  dataType: 'json',
  success:function(configData){
    console.log(configData.SERVER_URL,configData.SERVER_PORT );
    url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      console.log(url);
  },
  error:function(error){
    console.log(error);
  }
})


//view the products from database
$('#view').click(function(){
  console.log(url);
  $('.homePage').hide();
  $('.adminPage').hide();
  $('#result').show();
  $.ajax({
    url:`${url}/allProductsFromDB`,
    type: 'GET',
    dataType : 'json',
    success : function(productsFromMongo){
      console.log(productsFromMongo);
      var i;
      document.getElementById('result').innerHTML ="";
      for(i=0;i<productsFromMongo.length;i++){
      document.getElementById('result').innerHTML +=
      `<div class="col-4"><p>${productsFromMongo[i].name}<br>
      ${productsFromMongo[i].price}
      </p></div>`;
      }
    },
    error:function(){

    }
  })//ajax
})//view button click

// Products Controls::::::::::::::::::::::::::::::::::::::::::::::::::::::::
$('#addProduct').click(function(){
  event.preventDefault();
  let name = $('#a-name').val();
  let price = $('#a-price').val();
  let image_url = $('#a-imageurl').val();
  let userid =  sessionStorage.getItem('userID');
  console.log(userid);
  console.log(name,price, image_url);
  if (name == '' || price == '' || userid == ''){
    alert('Please enter all details');
  } else {
    $.ajax({
      url : `${url}/addProduct`,
      type : 'POST',
      data :{
        name: name,
        price: price,
        image_url:image_url,
        user_id:userid
      },
      success : function(product){
        console.log(product);
        alert ('product added');
      },
      error : function(){
        console.log('error: cannot call api');
      }//error
    })//ajax
  }//else
});//addProduct

//update the product
$('#updateProduct').click(function(){
  event.preventDefault();
  let productId = $('#productId').val();
  let productName = $('#productName').val();
  let productPrice = $('#productPrice').val();
  let imageurl = $('#imageurl').val();
  let userid =sessionStorage.getItem('userID');
  console.log(productId, productName, productPrice, imageurl, userid);
  if ( productId == ''){
    alert('Please enter product id for updating');
  } else {
    $.ajax({
      url: `${url}/updateProduct/${productId}`,
      type: 'PATCH',
      data:{
        name : productName,
        price : productPrice,
        image_url : imageurl,
        user_id: userid
      },
      success: function(data){
        console.log(data);
        if(data == '401 error: user has no permission to update'){
          alert('401 error: user has no permission to update');

        } else {
          alert('updated');
        }//else

        $('#productId').val('');
        $('#productName').val('');
        $('#productPrice').val('');
        $('#imageurl').val('');


      }, //success
      error: function(){
        console.log('error:cannot call api');
      }//error
    })//ajax
  }//if
})//updateProduct

//delete product
$('#deleteProduct').click(function(){
  event.preventDefault();
  if (!sessionStorage['userID']){
    alert('401 permission denied');
    return;
  };
  let productId = $('#delProductId').val();
  console.log(productId);
  if (productId == ''){
    alert('Please enter the product id to delete the product');
  } else {
    $.ajax({
      url : `${url}/deleteProduct/${productId}`,
      type:'DELETE',
      data :{
        user_id : sessionStorage['userID']
      },
      success : function(data){
        console.log(data);
        if (data =='deleted'){
          alert('deleted');
          $('#delProductId').val('');
        } else {
          alert('Enter a valid id');
        } //else
      }, //success
      error:function(){
        console.log('error: cannot call api');
      }//error
    })//ajax
  }//if

})//deleteProduct
// Project controls ends

// Projects Controls::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
$('#addProject').click(function(){
  event.preventDefault();
  let projectTitle = $('#projectTitle').val();
  let projectDecription = $('#projectDecription').val();
  let projectImg = $('#projectImg').val();
  let userid =  sessionStorage.getItem('userID');
  let date = new Date(),
  console.log(userid);
  console.log(projectImg);
  if (projectTitle == ' ' || projectDecription == ' ' || projectImg == ' '){
    alert('Please enter all details');
  } else {
    $.ajax({
      url : `${url}/addProject`,
      type : 'POST',
      data :{
        title: projectTitle,
        description: projectDecription,
        image_url:projectImg,
        author:userid,
        user_id:userid,
        date: new Date(),
      },
      success : function(project){
        console.log(project);
        alert ('project added');
      },
      error : function(){
        console.log('error: cannot call api');
      }//error
    })//ajax
  }//else
});//addProduct

//update the product
$('#updateProduct').click(function(){
  event.preventDefault();
  let productId = $('#productId').val();
  let productName = $('#productName').val();
  let productPrice = $('#productPrice').val();
  let imageurl = $('#imageurl').val();
  let userid =sessionStorage.getItem('userID');
  console.log(productId, productName, productPrice, imageurl, userid);
  if ( productId == ''){
    alert('Please enter product id for updating');
  } else {
    $.ajax({
      url: `${url}/updateProduct/${productId}`,
      type: 'PATCH',
      data:{
        name : productName,
        price : productPrice,
        image_url : imageurl,
        user_id: userid
      },
      success: function(data){
        console.log(data);
        if(data == '401 error: user has no permission to update'){
          alert('401 error: user has no permission to update');

        } else {
          alert('updated');
        }//else

        $('#projectId').val('');
        $('#projectTitle').val('');
        $('#projectDecription').val('');
        $('#projectImg').val('');


      }, //success
      error: function(){
        console.log('error:cannot call api');
      }//error
    })//ajax
  }//if
})//updateProduct

//delete product
$('#deleteProject').click(function(){
  event.preventDefault();
  if (!sessionStorage['userID']){
    alert('401 permission denied');
    return;
  };
  let projectId = $('#delProductId').val();
  console.log(productId);
  if (productId == ''){
    alert('Please enter the product id to delete the product');
  } else {
    $.ajax({
      url : `${url}/deleteProduct/${productId}`,
      type:'DELETE',
      data :{
        user_id : sessionStorage['userID']
      },
      success : function(data){
        console.log(data);
        if (data =='deleted'){
          alert('deleted');
          $('#delProductId').val('');
        } else {
          alert('Enter a valid id');
        } //else
      }, //success
      error:function(){
        console.log('error: cannot call api');
      }//error
    })//ajax
  }//if

})//deleteProduct


// display users projects in list on admin page
$('#submit').click(function(){
  $.ajax({
    url: `${url}/allProjectsFromDB`,
    type: 'GET',
    dataType: 'json',
    success: function(projectsFromMongo) {

      var i;
      // document.getElementById('projectList').innerHTML ="";
      for (i = 0; i < projectsFromMongo.length; i++) {
        // flex parent
        var projectStrip = document.createElement('div');
        projectStrip.classList.add('project-strip');
        $('#projectList').append(projectStrip);

        // flex children::::::::::::::::::::::::::::::::::::::
        // Title
        var projectListTitle = document.createElement('div');
        projectListTitle.classList.add('project-list-title');
        projectStrip.append(projectListTitle);
        projectListTitle.textContent = projectsFromMongo[i]
          .title
        // Date Added
        var projectListDate = document.createElement('div');
        projectListDate.classList.add('project-list-date');
        projectStrip.append(projectListDate);
        projectListDate.textContent = "21.12.21"

        // Controls
        var projectListControl = document.createElement('div');
        projectListControl.classList.add('up-del');
        projectListControl.innerHTML = `<i class='fas fa-pen control edit' value=${projectsFromMongo[i].title}></i>
        <i class='fas fa-trash delete'></i>`
        projectStrip.append(projectListControl);
        projectListControl.value = projectsFromMongo[i].title;

      }

      document.addEventListener('click', function(e) {
          // define the target objects by class name
          if (e.target.classList[2] === 'delete') {
            // find a match between a button value and project name
            for (var i = 0; i < projectsFromMongo.length; i++) {
              if (projectsFromMongo[i].title === e.target.parentNode.value) {
                selection = i;
                console.log(projectsFromMongo[selection].title);
                e.target.parentNode.parentNode.remove()
                deleteProject()
              }
            }
          }
        });// Event listner ends
        function deleteProject(){
          event.preventDefault();
          // if (!sessionStorage['userID']) {
          //   alert('401 permission denied');
          //   return;
          // };
          let projectId = projectsFromMongo[selection]._id;
            $.ajax({
              url: `${url}/deleteProject/${projectId}`,
              type: 'DELETE',
              data: {
                user_id: sessionStorage['userID']
              },
              success: function(data) {
                console.log(data);
                if (data == 'deleted') {
                  alert('deleted');
                  $('#delProjectId').val('');
                } else {
                  alert('Enter a valid id');
                } //else
              }, //success
              error: function() {
                console.log('error: cannot call api');
              } //error
            }) //ajax
        }

    },
    error: function() {

    }
  }) //ajax
})


// Create project button
$("#createBtn").click(function(){
$('#addProjectForm').fadeIn()
// $('.admin-proj-section').fadeOut()
})

// Project controls ends

// User Registration:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//  register button opens register Overlay
$('#register').click(function(){
  $('#registerOverlay').css('display', 'block');
  return false;
})

$('#registerExit').click(function(){
  $('#registerOverlay').css('display', 'none');
})




$('#r-submit').click(function(){
  //event.preventDefault()//this prevents code breaking when no data is found

  let username = $('#r-username').val();
  let email = $('#r-email').val();
  let password = $('#r-password').val();
  console.log(username, email, password);

  if (username == '' || email == '' || password == ''){
    alert('Please enter all details');

  }else {
    $.ajax({
      url: `${url}/registerUser`,
      type : 'POST',
      data : {
        username :username,
        email :email,
        password:password
      },
      success:function(user){
        console.log(user); //remove when development is finished
        if (!user == 'username taken already. Please try another name'){
          alert('Please login to manipulate the products data');

        }else {
          alert('success');
          $('#r-username').val('');
          $('#r-email').val('');
          $('#r-password').val('');
          $('#registerOverlay').css('display', 'none')
        } //else

      }, //success
      error:function(){
        console.log('error: cannot call api');
      }//error
    })//ajax post
  }//if

})//r-submit click

// User login::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
$('#submit').click(function(){
  event.preventDefault();
  let username = $('#username').val();
  let password = $('#password').val();

  console.log(username, password);//remove after development for security

  if (username == '' || password == ''){
    alert('Please enter all details');
  } else {
    $.ajax({
      url : `${url}/loginUser`,
      type :'POST',
      data :{
        username : username,
        password : password
      },
      success : function(user){
        console.log(user);

        if (user == 'user not found. Please register'){
          alert('user not found. Please enter correct data or register as a new user');
        } else if (user == 'not authorized') {
          alert('Please  try with correct details');
          $('#username').val('');
          $('#password').val('');
        }else{
           sessionStorage.setItem('userID', user['_id']);
           sessionStorage.setItem('userName',user['username']);
           sessionStorage.setItem('userEmail',user['email']);
           $('#loginOverlay').css('display', 'none')
        }
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//errror

    })//ajax
  }//if else
})

//logout
$('#logout').click(function(){
  sessionStorage.clear();
  console.log('You are logged out');
  console.log(sessionStorage);
  $('#loginOverlay').css('display', 'flex')
  location.href = "index.html";
});
$('.header-user').text(sessionStorage.getItem('userName'));

});//document.ready
