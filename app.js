const BASEURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const fromCurr = document.querySelector(" .from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");

const swapBtn = document.getElementById("swapBtn");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");



// for (code in countryList){
//     console.log(code , countryList[code]);
// }
for (let select of dropdowns) {
    select.innerHTML = "";
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFLag(evt.target);
    })
}




const updateExchangeRate =async ()=>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    // console.log(amtValue);
    if(amtValue === "" || amtValue < 1){
        amtValue = 1;
        amount.value ="1";
    }
    // console.log(fromCurr.value, toCurr.value)
    const URL = `${BASEURL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    if (!response.ok) return;
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalAmount = amtValue * rate;
    msg.innerText =`${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


}


const updateFLag =(element) =>{ 
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;

};



btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
})


window.addEventListener("load" ,()=>{
    updateExchangeRate();
})

swapBtn.addEventListener("click",()=>{
    //swap dropdown values
    let temp= fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;    
    
    //swap flags
    const fromImg = document.querySelector(".from img");
    const toImg = document.querySelector(".to img");

    let tempSrc = fromImg.src;
    fromImg.src = toImg.src;
    toImg.src = tempSrc;

    //update the conversion again
    updateExchangeRate();
})