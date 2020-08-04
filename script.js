// Initialize the app
init();
// Data Structure
const data = {
    randomValue: "",
    input: "",
    clickCount: 0,
    appRunning: true,
}
// Random Number generator Event Handler
    document.querySelector('.generate-btn').addEventListener('click', function(){
        if(data.appRunning){
            // get random number and Update the UI
            let randomNumber = randomNumGen();
            document.getElementById('random-pin').value = randomNumber;
        
            // if the number is less than 1000, add 1000 to make it 4 digit
            if(randomNumber<1000) {
                const newRandomNumber = randomNumber + 1000;
                document.getElementById('random-pin').value = newRandomNumber;
            }
            // Store the random number into the data structure
            data.randomValue = parseInt(document.getElementById('random-pin').value);
        }
    });    

// Input numbers' Event Handler
    const inputNumbers = document.getElementsByClassName('digit');

    for(let i = 0; i < inputNumbers.length; i++) {
        inputNumbers[i].addEventListener('click', function(){
            if(data.appRunning && data.randomValue != "") {    
                data.input += this.innerText;
                document.getElementById("input-number").value = data.input;
            }

        });
    }

// Removing numbers' event handler
const removeNumbers =  document.getElementsByClassName("remove-digit");
for(let i = 0; i < removeNumbers.length; i++) {
    removeNumbers[i].addEventListener('click', function(){
        if(data.appRunning){
            if(this.id == 'backspace') {
                data.input = data.input.substr(0, data.input.length-1);
                document.getElementById("input-number").value = data.input;
            }
            else if ( this.id == "all-clear") {
                data.input = "";
                document.getElementById("input-number").value = data.input;
            }
        }
    });
}

// Check For Matches and Update the UI
document.querySelector('.submit-btn').addEventListener('click', function(){
    if(data.randomValue != "" && data.input != ""){
        data.clickCount += 1;
        
        if(data.input == data.randomValue){
        
            dataChecker('block', 'none');
            data.appRunning = false;
            
        }else if (data.input !== data.randomValue){
            
            dataChecker('none', 'block');
            document.querySelector('.action-left').innerHTML= 3-data.clickCount + " try left.";

            if(data.clickCount == 3){

                document.querySelector('.submit-btn').style.display = 'none';
                document.querySelector('#mismatch').style.display='none';
                data.appRunning = false;
            }
        }
        
    }
    
});
// Function for updating UI based on Match or Mismatch
function dataChecker(matchState1, matchState2) {
    document.querySelector('#match').style.display=matchState1;
    document.querySelector('#mismatch').style.display=matchState2;
}
// Initializing Function
function init(){
    document.querySelector('#mismatch').style.display='none';
    document.querySelector('#match').style.display='none';
    
}
// Random Number Generator(4 and 3 Digits)
function randomNumGen() {
    return Math.floor(Math.random()*10000);
}