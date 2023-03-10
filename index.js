
let leads = [];

const save_button = document.getElementById("save-btn");
const ulEl = document.getElementById("ulEl");
const input_ele = document.getElementById("input-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

if(localStorage.getItem("Leads")){
    leads = JSON.parse(localStorage.getItem("Leads"));
    renderLeads(leads);
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        leads.push(tabs[0].url);
        localStorage.setItem(`Leads`, JSON.stringify(leads));
        renderLeads(leads);
        });
    
})

deleteBtn.addEventListener("click", function(){
    localStorage.clear();
    leads = [];
    ulEl.innerHTML = "";

})

save_button.addEventListener("click" , function(){
    leads.push(input_ele.value);
    localStorage.setItem(`Leads`, JSON.stringify(leads));
    input_ele.value = "";
    renderLeads(leads);
})

function renderLeads (arr){
    let listItems = '';
    for(let i = 0; i < arr.length; i++){
        listItems += `
        <li>
            <a target='_blank' href='${arr[i]}'>
             ${arr[i]}  
            </a> 
        </li>
        `
    }
    ulEl.innerHTML = listItems;
}
 

