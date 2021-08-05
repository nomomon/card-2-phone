const appTemp = (data) =>{
    return `
        <div class="app">
            <div class="appIcon">
                <img src="${data.icon}"/>
            </div>
            <div class="appName">
                ${data.name}
            </div>
        </div>
    `
}