
var userProfile = {
weight : 0,
heightFt : 0,
heightIn : 0,
height : 0 ,
age    :  0,
gender :  '',
activityLevel : 0,
BMI : 0,


calculateBMI: function(height, weight) {

   BMI = (weight / (height * height)) * 703
	
return Math.round(BMI * Math.pow(10, 2)) / Math.pow(10, 2);
}

} // userProfile 


$(document).ready(function() {
   // $('#formBMI').submit(function(e) {
                     

$("#testbmi").on("click", function(e) {
        e.preventDefault();
        
        userProfile.age = $("#age-input").val().trim();
        userProfile.heightFt = $("#height-feet-input").val().trim();
        userProfile.heightIn = $("#height-inches-input").val().trim();
        userProfile.height   = parseFloat( userProfile.heightFt * 12) + parseFloat(userProfile.heightIn);
        userProfile.weight = $("#weight-input").val().trim();
        userProfile.BMI = userProfile.calculateBMI(userProfile.height, userProfile.weight);
        console.log('Your BMI is '+ userProfile.BMI);

        //$('divBMI').text('Your BMI is '+BMI);
});

        
});

