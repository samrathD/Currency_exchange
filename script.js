const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const finalMsg = document.querySelector(".msg");


let i = 0;
for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "From" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "To" && currCode === "CAD" ){
            newOption.selected = "selected";
        }        
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
        updateExchangeRate();
    })
}


const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flagImg = element.parentElement.querySelector("img");
    flagImg.src = newSrc;
}
// currency code :country code
const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amntValue = amount.value;
    if(amount.value == "" || amount.value < 0){
        amntValue = 1;
        amount.value = "1"; 
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL); 
    let data = await response.json();

    console.log(data);
    console.log(data[toCurr.value.toLowerCase()]);
    let exchangeRate = data[toCurr.value.toLowerCase()];
    finalAmount = (exchangeRate*amntValue);
    finalMsg.innerText = `${amntValue}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})

