
const colorPickerElement = document.getElementById("color-picker")
const colorModeElement = document.getElementById("color-modes")
const colorContainer = document.getElementById("color-container")
const hexContainer = document.getElementById("hex-container")


document.getElementById("get-scheme-btn").addEventListener("click", event => {
    const color = colorPickerElement.value.slice(1, 7);
    const colorMode = colorModeElement.value
       

fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${colorMode}&count=6`)
    .then(res => res.json())
    .then(data => {
        
        const colorBars = data.colors.map(color => {
            return `<div class="color-bar" id="color${color.hex.clean}" style="background-color: ${color.hex.value}"></div>`
        }).join("")
        
        const hexNames = data.colors.map(color => {
            return `<div class="hex-name">${color.hex.value}</div>`
        }).join("")

        colorContainer.innerHTML=colorBars
        hexContainer.innerHTML=hexNames

        for (col of data.colors) {
            document.getElementById(`color${col.hex.clean}`).addEventListener("click", event => {
                console.log(`Clicked on color: ${event.target.style.backgroundColor}`)
                navigator.clipboard.writeText(event.target.style.backgroundColor)
            })
        }
    })

})


