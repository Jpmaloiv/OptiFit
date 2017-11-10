
var userProfile = {
weight : 0,
weightType: '',
heightFt : 0,
heightIn : 0,
height : 0 ,
age    :  0,
gender :  '',
activityLevel : '',
BMI : 0,
fatNeeded :0,
caloriesNeeded : 0,
proteinNeeded : 0,
carbsNeeded: 0,
alcoholNeeded:0,


calculateBMI: function(height, weight) {

   BMI = (weight / (height * height)) * 703
	
return Math.round(BMI * Math.pow(10, 2)) / Math.pow(10, 2);
},


calcCal: function(){

var fd =0;

this.age = parseInt($("#age-input").val().trim());
this.heightFt = parseInt($("#height-feet-input").val().trim());
this.heightIn = parseInt($("#height-inches-input").val().trim());
this.height   = parseFloat( this.heightFt * 12) + parseFloat(this.heightIn);
this.weight = parseInt($("#weight-input").val().trim());
this.weightType = $("#weightType").val().trim();
var cm = $("#heightCen").val().trim();
//Calling BMI calculate function
this.BMI = this.calculateBMI(this.height, this.weight);


if (this.age!='' && cm!='' && this.weight!='') {
    if (this.weightType==="pounds"){
        this.weight=parseInt(this.weight);
        this.weight=Math.round(this.weight/2.2046);
    }

    this.activityLevel= $("#activityLevel").val();
    if (document.getElementById('genderMale').checked)
    {
        
        fd=(10*this.weight)+(6.25*cm)-(5*this.age)+5;
    }
    else if (document.getElementById('genderFemale').checked)
    {
        fd=(10*this.weight)+(6.25*cm)-(5*this.age)-161;
    }

    switch(this.activityLevel)
    {
    case "1":
    this.caloriesNeeded=fd*1.2;
    break;
    case "2":
    this.caloriesNeeded=fd*1.375
    break;
    case "3":
    this.caloriesNeeded=fd*1.53;
    break;
    case "4":
    this.caloriesNeeded=fd*1.725;
    break;
    case "5":
    this.caloriesNeeded=fd*1.9;
    break;
    }
    this.caloriesNeeded=Math.floor(this.caloriesNeeded);
    this.fatNeeded=Math.floor((this.caloriesNeeded*0.25)/9);
    this.proteinNeeded=Math.floor((this.caloriesNeeded*0.25)/4);
    this.carbsNeeded=Math.floor((this.caloriesNeeded*0.25)/4);
    this.alcoholNeeded=Math.floor((this.caloriesNeeded*0.25)/7);


    if (this.weightType==="pounds") {
            this.fatNeeded = this.fatNeeded * 0.0022 ;
            this.proteinNeeded = this.proteinNeeded * 0.0022 ;
            this.carbsNeeded = this.carbsNeeded * 0.0022 ;
            this.alcoholNeeded = this.alcoholNeeded * 0.0022 ;
            this.fatNeeded=this.fatNeeded.toFixed(3);
            this.proteinNeeded = this.proteinNeeded.toFixed(3);
            this.carbsNeeded = this.carbsNeeded.toFixed(3);
            this.alcoholNeeded  = this.alcoholNeeded .toFixed(3);

            $("#caloriesBody").empty();
            drawCalPieChart(this)
            // $("#caloriesBody").append("<div>"+ "Daily Calories Needed : " + this.caloriesNeeded+ " Kcallories" +"</div>");
            // $("#caloriesBody").append("<div>"+ "Daily Fat Needed : " + this.fatNeeded+ " lbs per day" +"</div>");
            // $("#caloriesBody").append("<div>"+ "Daily Protein Needed : " + this.proteinNeeded+ " lbs per day" +"</div>");
            // $("#caloriesBody").append("<div>"+ "Daily Carbs Needed : " + this.carbsNeeded+ " lbs per day" + "</div>");
            // $("#caloriesBody").append("<div>"+ "Daily Carbs Needed : " + this.alcoholNeeded+ " lbs per day" + "</div>");
    }
    else
    {
            this.fatNeeded=this.fatNeeded.toFixed(3);
            this.proteinNeeded = this.proteinNeeded.toFixed(3);
            this.carbsNeeded = this.carbsNeeded.toFixed(3);
            this.alcoholNeeded  = this.alcoholNeeded .toFixed(3);

            $("#caloriesBody").empty();
            drawCalPieChart(this)
            // $("#caloriesBody").append("<div>"+ "Daily Calories Needed : " + this.caloriesNeeded+ " Kcallories" +"</div>");
            // $("#caloriesBody").append("<div>"+ "Daily Fat Needed : " + this.fatNeeded+ " grms per day" +"</div>");
            // $("#caloriesBody").append("<div>"+ "Daily Protein Needed : " + this.proteinNeeded+ " grms per day" +"</div>");
            // $("#caloriesBody").append("<div>"+ "Daily Carbs Needed : " + this.carbsNeeded+ " grms per day" + "</div>");
            // $("#caloriesBody").append("<div>"+ "Daily Carbs Needed : " + this.alcoholNeeded+ " grms per day" + "</div>");

    }
    
}
else
{
alert("Please fill your details properly!");
}

} // end of calcCal function



} // userProfile object


$(document).ready(function() {
   // $('#formBMI').submit(function(e) {
                     

$("#submit-button").on("click", function(e) {
        e.preventDefault(); 
        userProfile.calcCal();
        $("#BMIBody").text('Your BMI is '+ userProfile.BMI);
        //console.log('Your BMI is '+ this.BMI);
});

$("#age-input").keypress(function(){
       var response = validateAge($("#age-input").val());
});


$("select").change(function(){
    heightConvert();
});

$("#heightCen").change(function(){
    convertCen($("#heightCen").val());
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

function heightConvert()
{
    var heightFoot=parseInt($("#height-feet-input").val());
    var heightInch=parseInt($("#height-inches-input").val());
    var heightFinal =0 ;

    heightFinal=Math.round((heightFoot*30.48)+(heightInch*2.54));
    
   $("#heightCen").val(heightFinal);
   //console.log($("#heightCen").val());
}


function convertCen(num)
{
    var heightCen = parseInt(num);
    var heightInch = heightCen/2.54;
    var heightFeet=Math.floor(heightInch/12);
    var inch=Math.round(heightInch%12);
    if (heightCen>40 && heightCen<=210)
    {
        $("#height-feet-input").val(heightFeet);
    }
    $("#height-inches-input").val(inch);
}

        
});






google.charts.load("current", {packages:["corechart"]});
//google.charts.setOnLoadCallback(drawCalPieChart);

function drawCalPieChart(profile) {

    var proteinNeeded = profile.proteinNeeded;
    var fatNeeded = profile.fatNeeded;
    var carbsNeeded = profile.carbsNeeded;
    
    console.log(proteinNeeded)
    console.log(fatNeeded)
    console.log(carbsNeeded)
    
    var data = google.visualization.arrayToDataTable([
      ['Caloric Breakdown', 'Suggested Daily Intake'],
      ['Protein',     proteinNeeded],
      ['Carbs',       carbsNeeded], 
    //   ['Fats',        fatNeeded],
    ]);

    console.log(data)
  
    var options = {
      title: 'My Daily Activities',
      is3D: true,
    };
  
    var chart = new google.visualization.PieChart(document.getElementById('caloriesBody'));
    chart.draw(data, options);
  }