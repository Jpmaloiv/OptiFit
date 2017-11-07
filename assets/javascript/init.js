
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
                     

$("#submit-button").on("click", function(e) {
        e.preventDefault();
        
        userProfile.age = parseInt($("#age-input").val().trim());
        userProfile.heightFt = parseInt($("#height-feet-input").val().trim());
        userProfile.heightIn = parseInt($("#height-inches-input").val().trim());
        userProfile.height   = parseFloat( userProfile.heightFt * 12) + parseFloat(userProfile.heightIn);
        userProfile.weight = parseInt($("#weight-input").val().trim());
        userProfile.BMI = userProfile.calculateBMI(userProfile.height, userProfile.weight);
        $("#BMIBody").text('Your BMI is '+ userProfile.BMI);
        //console.log('Your BMI is '+ userProfile.BMI);
});

$("#age-input").keypress(function(){
       var response = validateAge($("#age-input").val());
       console.log(response);
});


//validating if the age is a valid number
function validateAge(age){
 var ageNum = parseInt(age);
if(ageNum == "")     
    return false;

//check if age is a number or less than or greater than 100
if (isNaN(ageNum)||ageNum<1||ageNum>100)
{ 
    //alert("The age must be a number between 1 and 100");
    return false;
}
}


        
});

