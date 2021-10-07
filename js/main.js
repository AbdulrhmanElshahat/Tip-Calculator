let inputs = Array.from(document.getElementsByTagName('input')),
   percentageButtons = document.querySelectorAll('.calculator-btns-container span'),
   results = document.getElementsByClassName('result'),
   theError = document.querySelectorAll('.error'),
   invalidChars = ["-", "+", "e"],
   bill , percentage , numOfpeople,tipAmount,total,
   resetBtn = document.querySelector('.reset-btn');

//only numbers in inputs
inputs.forEach((element) => {
    element.addEventListener('keypress' , e =>{
        if (invalidChars.includes(e.key)){ e.preventDefault();}
    })
});
//Percentage Buttons
percentageButtons.forEach(ele =>{
    ele.addEventListener('click' , e =>{
             inputs[1].value = null
             convertString()
            tipAmount = bill * (parseFloat(e.target.textContent) /100 )/numOfpeople;
            total = bill / numOfpeople + tipAmount;
            //Calculate the resulte
            calculateAll()
    })
})
//custom percentage
inputs[1].oninput = function(){
    percentage = parseFloat(this.value) /100;
    convertString()
    //check if th custom percentage fild contains a right value
    if(this.value < 0 ||isNaN(this.value) ||this.value==''&& 
       bill < 1 ||isNaN(bill) || numOfpeople < 1 ||isNaN(numOfpeople)){
        this.value = null;
        calculateAll()
    }else{
    
        tipAmount = bill * (percentage)/numOfpeople,
        total = bill / numOfpeople + tipAmount;
        calculateAll()
        if(isNaN(tipAmount) || isNaN(total)){
            results[0].textContent = '$0';
            results[1].textContent = '$0';
        }
    }
   
}
//REset buttton
resetBtn.onclick = reset()

function calculateAll(){
        //Check if the inputs contains corect values
        if(bill < 1 ||isNaN(bill) || numOfpeople < 1 ||isNaN(numOfpeople)){
            if(bill<1){
                showEle(theError[0])
                zeroEle(theError[0])
            }else if(isNaN(bill)){
                showEle(theError[0])
                mtEle(theError[0])
            }else{
                hideEle(theError[0])
            }

            if(numOfpeople<1){
                showEle(theError[1])
                zeroEle(theError[1])
            }else if(isNaN(numOfpeople)){
                showEle(theError[1])
                mtEle(theError[1])
            }else{
                hideEle(theError[1])
            }

        }else{
            hideEle(theError[0])
            hideEle(theError[1])
            results[0].textContent ='$'+ tipAmount.toFixed(1)
            results[1].textContent ='$'+ total.toFixed(1)
        }
}
//function to convert the string to number
function convertString(){
    bill = parseFloat(inputs[0].value),
    numOfpeople = parseFloat(inputs[2].value);
}
//functions to show or hide warning message if the user enter wrong value
function showEle(ele){
    ele.style.display = 'block'
}
function hideEle(ele){
    ele.style.display = 'none'
}
function mtEle(ele){
    ele.textContent =`Can't be empty`
}
function zeroEle(ele){
    ele.textContent =`Can't be < 1`
}
// functin to reset the calculator
function reset(){
    inputs[0].value='';
    inputs[1].value='';
    inputs[2].value='';
    results[0].textContent = '$0'
    results[1].textContent = '$0'
    theError[0].style.display=''
    theError[1].style.display=''
}