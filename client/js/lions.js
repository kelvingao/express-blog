
// DOM elements handler
var form = document.getElementById("lions");
var lionName = document.getElementById("lion-name");
var lionPride = document.getElementById("lion-pride");
var lionAge = document.getElementById("lion-age");
var lionGender = document.getElementById("lion-gender");
var submit = document.getElementById("submit");

submit.addEventListener('click', function(evt) {
  evt.preventDefault();

  var lion = Lion({
    name:lionName.value,
    pride:lionPride.value,
    age:lionAge.value,
    gender:lionGender.value,
  });
  
  // send to the server
  fetch('/lions', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(lion)
  })
  // get back from the backend
  .then(function(res) {
      return res.json();
    })
  .then(function(createdLion){
    lions.push(createdLion);
    // display in the front end
    updateLionlist(lions[lions.length - 1]);
  })
});

var updateLionlist = function(lion){
    var lionList = document.getElementById("lion-list");
    lionList.innerHTML += '<ui>' + 'lion name: '+lion.name + '</ui><br>' +
                    + 'lion pride: '+lion.pride + '<br>'+
                    + 'lion gender: '+lion.gender + '<br>'+
                    + 'lion age: '+lion.age + '<br>';
};
var lions = [];
//assets
var Lion = function(param) {
  var self = {};
  self.id = null;
  self.name = param.name;
  self.pride = param.pride;
  self.age = param.age;
  self.gender = param.gender;
  return self;
}
