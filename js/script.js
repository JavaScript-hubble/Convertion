//déclaration des variables

let rate1 = document.querySelector('.rate1');
let rate2 = document.querySelector('.rate2');
let resultBtn = document.querySelector('.result');
let selects = document.querySelectorAll('.options select');
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll('.input input');
let inpt1 = inputs[0];
let inpt2 = inputs[1];

let rates = {};

//lien API
let requestUrl = 'https://api.exchangerate.host/latest?base=USD';

//appel à la fonction fetchRates()
fetchRates();
async function fetchRates(){
    let res = await fetch(requestUrl);
    res = await res.json();
    rates = res.rates;
    populateOptions();
}

//la function qui permet d'afficher les données de L'API
function populateOptions() {
    console.log(rates);
    const select = document.querySelectorAll('select');
    let val = "";
    Object.keys(rates).forEach(code=>{
        let str = `<option value="${code}">${code}</option>`;
        val += str;
    })

    for (let i = 0; i <select.length; i++) {
        select[i].innerHTML = val;
    }

};



function convert(val, fromCurr, toCurr) {
    let v = (val/rates[fromCurr]) * rates[toCurr];
    let v1 = v.toFixed(3);
    return (v1==0.0 ? v.toFixed(5):v1);
}
    
//fonction pour comparaison des taux d'échange
function displayRate(){
    let v1 = sel1.value;
    let v2 = sel2.value;

    let val = convert(1, v1, v2);

    rate1.innerHTML = `1 ${v1} égale à`;
    rate2.innerHTML = ` ${val} ${v2}`;
}

//boutton de convertion
resultBtn.addEventListener('click', () => {
    
    let fromCurr = sel1.value;
    let fromVal = parseFloat(inpt1.value)
    let toCurr = sel2.value;

    if(isNaN(fromVal)){
        alert('saisissez un nombre valide svp!!');

    }else{
        let cVal =  convert(fromVal, fromCurr, toCurr);
        inpt2.value = cVal;
    }
});


selects.forEach(s=>s.addEventListener('change', displayRate));
displayRate();

