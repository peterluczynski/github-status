const request = require('request');
const getStatus = document.querySelector('#getStatus');
let status = document.querySelectorAll(".status");

function updateStatus() {
    request('https://www.githubstatus.com/',  { json: true }, (err, res, body) => {  
        let result = body.components;
        for(let i = 0; i < result.length; i++) {
            if(i === 3) continue;
            if(i < 3) {
                let flag = status[i].querySelector(".status__flag");
                if(result[i].status !== "operational"){
                    flag.classList.add("status__flag--error");
                }
                else {
                    flag.classList.remove("status__flag--error");
                }
                
                flag.innerHTML = result[i].status;
            }
            else {
                let flag = status[i - 1].querySelector(".status__flag");
                if(result[i].status !== "operational"){
                    flag.classList.add("status__flag--error");
                }
                else {
                    flag.classList.remove("status__flag--error");
                }
                flag.innerHTML = result[i].status;
            }
        }
    });
}
updateStatus();

getStatus.addEventListener("click", ()=>{
    updateStatus();
});