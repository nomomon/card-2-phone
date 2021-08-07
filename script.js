document.documentElement.style.setProperty('--pixel-ratio', devicePixelRatio);

let relativeEl = document.createElement("div")
relativeEl.style.width = "calc(1cm * 4/3 * var(--pixel-ratio))"
document.body.appendChild(relativeEl)



const coin = document.querySelector("#coin")

const pixelsInMillimeter = relativeEl.clientWidth / 20
const pixelsInMeter = pixelsInMillimeter * 1000

document.documentElement.style.setProperty('--coin-width', pixelsInMillimeter * 24.5);

const screenWidthInMeters = window.screen.availWidth / pixelsInMeter
const screenHeightInMeters = window.screen.availHeight / pixelsInMeter

const coinWidthInMeters = 24.5 / 1000
const coinHeightInMeters = 24.5 / 1000

const params = {
    position:{
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    acceleration:{
        x: 0,
        y: 0
    },
    time: 0,
    prevTime: 0,
    currTime: 0,
    touch: false
}

const coefOfRestitution = 0.2 // between steel ball and glass
const coefOfFriction = 0.6 // between glass and coin

ondevicemotion = (e) => {
    params.currTime = e.timeStamp

    params.time = (params.currTime - params.prevTime) / 1000
    params.time2 = params.time * params.time

    params.acceleration.x = e.accelerationIncludingGravity.x * coefOfFriction
    params.acceleration.y = e.accelerationIncludingGravity.y * coefOfFriction

    // update position
    params.position.x += params.velocity.x * params.time + 1/2 * params.acceleration.x * params.time2
    params.position.y += params.velocity.y * params.time + 1/2 * params.acceleration.y * params.time2

    if(params.position.x < 0 || params.position.x > screenWidthInMeters - coinWidthInMeters){
        currAngle = coin.style.transform || "rotate(0deg)"
        currAngle = currAngle.split("rotate(")[1].split("deg)")[0]
        
        change =  params.velocity.y * params.time / (coinHeightInMeters / 2)
        change = change * 180 / Math.PI
        
        newAngle = currAngle + change
        
        coin.style.transform = `rotate(${newAngle}deg)`
    }
    if(params.position.y < coinHeightInMeters / 2 || params.position.y > screenHeightInMeters - coinHeightInMeters * 3/2){
        currAngle = coin.style.transform || "rotate(0deg)"
        currAngle = currAngle.split("rotate(")[1].split("deg)")[0]
        
        change =  params.velocity.y * params.time / (coinHeightInMeters / 2)
        change = change * 180 / Math.PI

        newAngle = currAngle + change

        coin.style.transform = `rotate(${newAngle}deg)`
    }

    // update velocity
    params.velocity.x += params.acceleration.x * params.time
    params.velocity.y += params.acceleration.y * params.time
    

    if(params.position.x < 0){
        params.velocity.x = - params.velocity.x * coefOfRestitution
        params.position.x = 0
    }
    else if(params.position.x > screenWidthInMeters - coinWidthInMeters){
        params.velocity.x = - params.velocity.x * coefOfRestitution
        params.position.x = screenWidthInMeters - coinWidthInMeters
    }
    
    if(params.position.y < coinHeightInMeters / 2){
        params.velocity.y = - params.velocity.y * coefOfRestitution
        params.position.y = coinHeightInMeters / 2
    }
    else if(params.position.y > screenHeightInMeters - coinHeightInMeters * 3/2){
        params.velocity.y = - params.velocity.y * coefOfRestitution
        params.position.y = screenHeightInMeters - coinHeightInMeters * 3/2
    }

    if(!params.touch){
        coin.style.left = "unset";
        
        coin.style.top = Math.floor(params.position.y * pixelsInMeter) + "px"
        coin.style.right = Math.floor(params.position.x * pixelsInMeter) + "px"
    }

    params.prevTime = e.timeStamp
}

// alert(window.location.protocol)
var timeout = 0

document.body.addEventListener('touchmove', (e) => {
    if(timeout) clearTimeout(timeout)
    params.touch = true
    
    params.position.y = e.touches[0].pageY / pixelsInMeter
    params.position.x = e.touches[0].pageX / pixelsInMeter

    
    coin.style.right = "unset";

    coin.style.top = Math.floor(e.touches[0].pageY) + "px"
    coin.style.left = Math.floor(e.touches[0].pageX) + "px"

    timeout = setTimeout(() => {
        params.touch = false
    }, 100)

}, false);