function generateData() {
    let data = []
    for (let i = 0; i < getRandomArbitrary(12, 1000); i++) {
        let random = Math.random()
        if (random < 0.90) {
            data.push({color: "green"})
        } else if (random < 0.95) {
            data.push({color: "yellow"})
        } else {
            data.push({color: "red"})
        }
    }
    return data;
}

function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function uploadToWebsite(data) {
    let greenDay = 0
    let carky = document.querySelectorAll(".carka")
    for (let i = 0; i < data.length; i++) {
        if (data[i].color === "green") {
            greenDay++
        }
    }
    document.getElementById("uptime").innerText = "Uptime: " + Math.floor(greenDay * 100 / data.length) + "%"
    document.getElementById("avgUptime").innerText = "Uptime: " + Math.floor(greenDay * 100 / data.length) + "%"

    let numberOfDaysInLine = Math.floor(data.length / 12)
    let lastDownTime = 0;

    for (let i = 0; i < 12; i++) {
        let green = 0;
        let yellow = 0;
        let red = 0;
        for (let j = 0; j < numberOfDaysInLine; j++) {
            if (data[i * numberOfDaysInLine + j].color === "green") {
                green++
            } else if (data[i * numberOfDaysInLine + j].color === "yellow") {
                yellow++
            } else if (data[i * numberOfDaysInLine + j].color === "red") {
                red++
                lastDownTime = i * numberOfDaysInLine + j;
            }
        }

        if (green > yellow && green > red) {
            carky[i].className = "carka green"
        } else if (yellow > green && yellow > red) {
            carky[i].className = "carka yellow"
        } else if (red > green && red > yellow) {
            carky[i].className = "carka red"
        } else if (red > 0) {
            carky[i].className = "carka red"
        } else if (yellow > 0) {
            carky[i].className = "carka yellow"
        } else{
            carky[i].className = "carka green"
        }
        /*
        Červená má přednost protože je více důležité
        vědět jestli server byl down než jestli byl ok
        */
        carky[i].addEventListener("mouseenter", () => {
            let span = document.createElement("span")
            span.className = "info"
            span.innerHTML = `<p>Server down ${red}</p>` +
                `<p>Warning ${yellow}</p>` +
                `<p>All good ${green}</p>`;
            carky[i].appendChild(span)
        })
        
        carky[i].addEventListener("mouseleave", () => {
            let span = document.querySelector(".info")
            span.remove()
        })
        
    }
    document.getElementById("lastDownTime").innerText = "Last downtime: " + (data.length - lastDownTime) + " days ago"
    
    if (lastDownTime === 0) {
        document.getElementById("lastDownTime").innerText = "Last downtime: Never"
    }
    
    document.getElementById("days").innerText = "Total days: " + data.length
}

uploadToWebsite(generateData())
let isAlertDisplayed = false

function alert() {
    if (isAlertDisplayed) {
        return; // If alert is already displayed, do nothing
    }

    isAlertDisplayed = true;
    
    let alert = document.createElement("div")
    alert.className = "alert"
    alert.innerHTML = '<span>ℹ️🥸 There was some problem idk</span>'
    document.body.appendChild(alert)

    alert.style.animation = 'fadeInUp 2s ease forwards';
    setTimeout(() => {
        let alert = document.querySelector(".alert")
        alert.style.animation = 'fadeOutDown 1s ease forwards';
        setTimeout(() => {
            alert.remove()
            isAlertDisplayed = false;
        }, 1000);
    }, 2000);
}

let button = document.getElementById("alert")
button.addEventListener("click", alert)

let buttonRefresh = document.getElementById("refresh")
buttonRefresh.addEventListener("click", () => {
    uploadToWebsite(generateData())
})