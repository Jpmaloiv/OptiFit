
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
BMIDesc:"",
fatNeeded :0,
caloriesNeeded : 0,
proteinNeeded : 0,
carbsNeeded: 0,
alcoholNeeded:0,
onePound : 3500,
oneKg : 7700,
calTable  : [{desc:"To maintain your weight you need:",cal:0,fat:0,pr:0,crb:0,alc:0},{desc:"To loose 1 lbs/week you need : ",cal:0,fat:0,pr:0,crb:0,alc:0},{desc:"To loose 2 lbs/week you need : ",cal:0,fat:0,pr:0,crb:0,alc:0},{desc:"To gain 1 lbs/week you need: ",cal:0,fat:0,pr:0,crb:0,alc:0},{desc:"To gain 2 lbs/week you need: ",cal:0,fat:0,pr:0,crb:0,alc:0}],
calTableKg : [{desc:"To maintain your weight you need:",cal:0,fat:0,pr:0,crb:0,alc:0},{desc:"To loose 0.5 kg/week you need : ",cal:0,fat:0,pr:0,crb:0,alc:0},{desc:"To loose 1 kg/week you need : ",cal:0,fat:0,pr:0,crb:0,alc:0},{desc:"To gain 0.5 kg/week you need: ",cal:0,fat:0,pr:0,crb:0,alc:0},{desc:"To gain 1 kg/week you need: ",cal:0,fat:0,pr:0,crb:0,alc:0}],
itemIdArr : [],
test: 0,



calculateBMI: function(height, weight) {


   if ($("#weightType").val().trim() ==="kg"){
        weight = weight * 2.2046 ;   
    }
   var BMI = (weight / (height * height)) * 703
   var bmiVal = Math.round(BMI * Math.pow(10, 2)) / Math.pow(10, 2);
   if  (bmiVal < 18.5){
      this.BMIDesc = "Underweight";
   }
   else if (bmiVal < 24.9){
      this.BMIDesc = "Normal";
   }
   else if (bmiVal < 30){
      this.BMIDesc = "Overweight";
   }
   else if (bmiVal > 30){
      this.BMIDesc = "Obesse";
   }

    return bmiVal;
},


calcCal: function(){

var fd =0;

this.age = parseInt($("#age-input").val().trim());
this.heightFt = parseInt($("#height-feet-input").val().trim());
this.heightIn = parseInt($("#height-inches-input").val().trim());
this.height   = parseFloat( this.heightFt * 12) + parseFloat(this.heightIn);
this.weightType = $("#weightType").val().trim();
this.weight = parseInt($("#weight-input").val().trim());

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
    else{
        alert("Please select your gender");
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
    //display caloires intake in the  calories header
    $("#caloriesHeading").text("Calories Needed : " + this.caloriesNeeded + " Kcal/day");

    //this.fatNeeded = this.calcFat(this.caloriesNeeded);
    //this.proteinNeeded = this.calcPrCrb(this.caloriesNeeded);
   // this.carbsNeeded = this.calcPrCrb(this.caloriesNeeded);
   // this.alcoholNeeded = this.calcAlc(this.caloriesNeeded);
   // if ($("#weightType").val()==="pounds") {
   //     this.handlePoundWeight
   // }
   

    if ( ($("#resultType").val()==="g") && (userProfile.caloriesNeeded > 0) ){

        userProfile.displayResultsGrms();
    }
    else if (userProfile.caloriesNeeded > 0)
    {
        userProfile.displayResultsPounds();
    }
}
else
{
alert("Please fill your details properly!");
}

}, // end of calcCal function

calcFat: function(cal){

    return Math.floor((cal*0.333)/9);

},

calcPrCrb: function(cal){

    return Math.floor((cal*0.333)/4);
    
},

//calcAlc: function(cal){


 //   return Math.floor((cal*0.333)/7);
//},

displayResultsGrms: function(){

    var kgsDay = userProfile.oneKg/7;

    // fill the array with new calories needed in order to loose weight
        for (j=0; j <3; j++){

        
           this.calTableKg[j].cal = Math.floor(this.caloriesNeeded - (kgsDay*0.5*j));

           this.calTableKg[j].fat = this.calcFat(this.calTableKg[j].cal);
           this.calTableKg[j].pr = this.calcPrCrb(this.calTableKg[j].cal);
           this.calTableKg[j].crb = this.calcPrCrb(this.calTableKg[j].cal);
          // this.calTableKg[j].alc = this.calcAlc(this.calTableKg[j].cal);

           this.calTableKg[j].fat =  this.calTableKg[j].fat.toFixed(3);
           this.calTableKg[j].pr = this.calTableKg[j].pr.toFixed(3);
           this.calTableKg[j].crb = this.calTableKg[j].crb.toFixed(3);
           //this.calTableKg[j].alc = this.calTableKg[j].alc.toFixed(3);
        }

        // fill the array with new calories needed in order to gain weight

        for (h=1; h <3; h++){
        
           this.calTableKg[h+2].cal = Math.floor(this.caloriesNeeded + (kgsDay*0.5*h));
           this.calTableKg[h+2].fat = this.calcFat(this.calTableKg[h+2].cal);
           this.calTableKg[h+2].pr = this.calcPrCrb(this.calTableKg[h+2].cal);
           this.calTableKg[h+2].crb = this.calcPrCrb(this.calTableKg[h+2].cal);
         //  this.calTableKg[h+2].alc = this.calcAlc(this.calTableKg[h+2].cal);

           this.calTableKg[h+2].fat =  this.calTableKg[h+2].fat.toFixed(3);
           this.calTableKg[h+2].pr = this.calTableKg[h+2].pr.toFixed(3);
           this.calTableKg[h+2].crb = this.calTableKg[h+2].crb.toFixed(3);
         //  this.calTableKg[h+2].alc = this.calTableKg[h+2].alc.toFixed(3);
        }

        
    // fill table columns with values

    for (i=1; i <6;i++){

        $("#caloriesTable").children().children()[i].children[0].innerHTML = this.calTableKg[i-1].desc + this.calTableKg[i-1].cal + " Kcal/day" ;
        $("#caloriesTable").children().children()[i].children[1].innerHTML = this.calTableKg[i-1].fat + " g/day" ;
        $("#caloriesTable").children().children()[i].children[2].innerHTML = this.calTableKg[i-1].pr + " g/day";
        $("#caloriesTable").children().children()[i].children[3].innerHTML = this.calTableKg[i-1].crb+ " g/day";
       // $("#caloriesTable").children().children()[i].children[4].innerHTML = this.calTableKg[i-1].alc+ " grms/day" ;

    }
    
}, // end of displayResultsGrams

displayResultsPounds: function(){

            var poundsDay = userProfile.onePound/7;

            // fill the array with new calories needed in order to loose weight
            for (j=0; j <3; j++){

            
               this.calTable[j].cal = Math.floor(this.caloriesNeeded - (poundsDay*j));
               this.calTable[j].fat = this.calcFat(this.calTable[j].cal) * 0.0022;
               this.calTable[j].pr = this.calcPrCrb(this.calTable[j].cal) * 0.0022;
               this.calTable[j].crb = this.calcPrCrb(this.calTable[j].cal) * 0.0022;
               //this.calTable[j].alc = this.calcAlc(this.calTable[j].cal) * 0.0022;

               this.calTable[j].fat =  this.calTable[j].fat.toFixed(3);
               this.calTable[j].pr = this.calTable[j].pr.toFixed(3);
               this.calTable[j].crb = this.calTable[j].crb.toFixed(3);
              // this.calTable[j].alc = this.calTable[j].alc.toFixed(3);
            }

            // fill the array with new calories needed in order to gain weight

            for (h=1; h <3; h++){
            
               this.calTable[h+2].cal = Math.floor(this.caloriesNeeded + (poundsDay*h));
               this.calTable[h+2].fat = this.calcFat(this.calTable[h+2].cal) * 0.0022;
               this.calTable[h+2].pr = this.calcPrCrb(this.calTable[h+2].cal) * 0.0022;
               this.calTable[h+2].crb = this.calcPrCrb(this.calTable[h+2].cal) * 0.0022;
              // this.calTable[h+2].alc = this.calcAlc(this.calTable[h+2].cal) * 0.0022;

               this.calTable[h+2].fat =  this.calTable[h+2].fat.toFixed(3);
               this.calTable[h+2].pr = this.calTable[h+2].pr.toFixed(3);
               this.calTable[h+2].crb = this.calTable[h+2].crb.toFixed(3);
              // this.calTable[h+2].alc = this.calTable[h+2].alc.toFixed(3);
            }

            
        // fill table columns with values

        for (i=1; i <6;i++){

            $("#caloriesTable").children().children()[i].children[0].innerHTML = this.calTable[i-1].desc + this.calTable[i-1].cal + " Kcal/day" ;
            $("#caloriesTable").children().children()[i].children[1].innerHTML = this.calTable[i-1].fat + " lbs/day" ;
            $("#caloriesTable").children().children()[i].children[2].innerHTML = this.calTable[i-1].pr + " lbs/day";
            $("#caloriesTable").children().children()[i].children[3].innerHTML = this.calTable[i-1].crb+ " lbs/day";
           // $("#caloriesTable").children().children()[i].children[4].innerHTML = this.calTable[i-1].alc+ " lbs/day" ;

        }



} // end of displayResultsPounds

} // userProfile object


$(document).ready(function() {

$("#weight-input").keyup(function(){

    var number = $("#weight-input").val();
    if(!number.match(/^[0-9\.]+$/) && number !=""){
        number = number.substring(0,number.length-1);
        $("#weight-input").val(number);
    }
});


$("#heightCen").keyup(function(){

    var number = $("#heightCen").val();
    if(!number.match(/^[0-9\.]+$/) && number !=""){
        number = number.substring(0,number.length-1);
        $("#heightCen").val(number);
    }
});
                     

$("#submit-button").on("click", function(e) {
        e.preventDefault(); 
        userProfile.calcCal();
        $("#BMIBody").text('Your BMI is '+ userProfile.BMI);
        $("#BMIBody").append("<div>" +"Your are: " + userProfile.BMIDesc + "</div>");

});

$("#age-input").keypress(function(){
       var response = validateAge($("#age-input").val());
});


$("#height-inches-input").change(function(){
    heightConvert();
});

$("#height-feet-input").change(function(){
    heightConvert();
});

$("#heightCen").change(function(){
    convertCen($("#heightCen").val());    
});

$("#resultType").change(function(){
    if ( ($("#resultType").val()==="g") && (userProfile.caloriesNeeded > 0) ){

        userProfile.displayResultsGrms();
    }
    else if (userProfile.caloriesNeeded > 0)
    {
        userProfile.displayResultsPounds();
    }

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


$('#foodName').keyup(function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
       displayFoodResults();
    }
});

function displayFoodResults(){

var q1a = "http://api.nutritionix.com/v1_1/search/"
var q1b = "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_calories%2Cnf_protein%2Citem_type";
//var q2 ="https://trackapi.nutritionix.com/v2/natural/exercise/";
//var qfood ="https://trackapi.nutritionix.com/v2/search/item?nix_item_id=c640834927576f2c7fe01c19"

var appIdKey = "&appId=134566b1&appKey=f9027d278476a7c5a9458ef1eca1fa7e";
//var itemIdArr = [];

$.ajax({
        url: q1a+ $("#foodName").val().trim()+q1b+appIdKey,
        //url : qItem+appidkey,
        method: "GET"
      })
      // after the https is done do something
      .done(function(response) {

        //console.log(response.hits[0].fields.item_id);
        //console.log(response);
        
        for (f=0; f < 10; f++){
         userProfile.itemIdArr.push(response.hits[f].fields.item_id);
         //console.log(userProfile.itemIdArr[f]);
        }
        //console.log(userProfile.itemIdArr[0]);



var qItem1 = "http://api.nutritionix.com/v1/item/";
var qItemId = "";
var qItem2 = "?";

for (k=0; k<5 ;k++){ //itemIdArr.length

    qItemId = userProfile.itemIdArr[k];

   var qItemMaster = qItem1 + qItemId + qItem2 + appIdKey;
    //console.log(userProfile.itemIdArr[k]);
    //console.log(qItemMaster);
   $.ajax({
       url: qItemMaster,
       method: "GET"
      })
      
      .done(function(response2) {

        console.log(response2);
        //console.log(response2);
       
        $("#foodTable").children().children()[k].children[0].innerHTML = response2.brand_name;
        $("#foodTable").children().children()[k].children[1].innerHTML = response2.nf_calories;
        $("#foodTable").children().children()[k].children[2].innerHTML = response2.nf_total_fat;
        $("#foodTable").children().children()[k].children[3].innerHTML = response2.nf_protein;
        $("#foodTable").children().children()[k].children[4].innerHTML = response2.nf_total_carbohydrate;
        
});

} // for loop      

}); //first ajax call


}  //function

//$(document).on("click", "#testBtn", function(e){


}); //docuemnt

