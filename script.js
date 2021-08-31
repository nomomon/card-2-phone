document.documentElement.style.setProperty('--pixel-ratio', devicePixelRatio);

const coin = document.querySelector("#coin")

const pixelsInMillimeter = window.innerWidth / 76.80
const pixelsInMeter = pixelsInMillimeter * 1000

document.documentElement.style.setProperty('--coin-width', pixelsInMillimeter * 24.5 + "px");

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
	circumforance: Math.PI * 24.5 / 1000 / 2,		 // in meters
	angle: 0,
    touch: false,
}

const coefOfRestitution = 0.2 // between steel ball and glass
const coefOfFriction = 0.6 // between glass and coin


ondevicemotion = (e) => {
    params.acceleration.x = e.accelerationIncludingGravity.x * (1 - coefOfFriction)
    params.acceleration.y = e.accelerationIncludingGravity.y * (1 - coefOfFriction)
}

const updateParams = () => {
    // update position
    dx = params.velocity.x * params.time + 1/2 * params.acceleration.x * params.time2
    dy = params.velocity.y * params.time + 1/2 * params.acceleration.y * params.time2

    params.position.x += dx
    params.position.y += dy

    // update velocity
    params.velocity.x += params.acceleration.x * params.time
    params.velocity.y += params.acceleration.y * params.time
}

const collision = () => {
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
}

const rotation = () => {
    xwall1 = params.position.x <= 0
	xwall2 = params.position.x >= screenWidthInMeters - coinWidthInMeters 
    ywall1 = params.position.y <= coinHeightInMeters / 2
	ywall2 = params.position.y >= screenHeightInMeters - coinHeightInMeters * 3/2

	corner = (xwall1 && ywall1) ||
		 	 (xwall1 && ywall2) ||
		 	 (xwall2 && ywall1) ||
			 (xwall2 && ywall2)

	if(!corner){
		if(xwall1 || ywall1){
			params.angle -= Math.sign((dx*dx > dy*dy)? -params.velocity.x : params.velocity.y) 
					* Math.sqrt(dx * dx + dy * dy) / params.circumforance
		}
		if(xwall2 || ywall2){
			params.angle += Math.sign((dx*dx > dy*dy)? -params.velocity.x : params.velocity.y) 
					* Math.sqrt(dx * dx + dy * dy) / params.circumforance
		}
	}
	coin.style.transform = `rotate(${params.angle}rad)`
}

const updatePosition = () => {
	coin.style.left = "unset";
	
	coin.style.top = Math.floor(params.position.y * pixelsInMeter) + "px"
	coin.style.right = Math.floor(params.position.x * pixelsInMeter) + "px"
}


// document.body.addEventListener('touchmove', (e) => {
//     if(timeout) clearTimeout(timeout)
//     params.touch = true
    
//     params.position.y = e.touches[0].pageY / pixelsInMeter
//     params.position.x = e.touches[0].pageX / pixelsInMeter

//     params.velocity.y = 0
//     params.velocity.x = 0

    
//     coin.style.right = "unset";

//     coin.style.top = Math.floor(e.touches[0].pageY) + "px"
//     coin.style.left = Math.floor(e.touches[0].pageX) + "px"

//     timeout = setTimeout(() => {
//         params.touch = false
//     }, 300)

// }, false);

const doWork = () => {
    updateParams()
    collision()

    rotation()
	updatePosition()
}

const time = 5

params.time = time / 1000  					// measured in sec
params.time2 = params.time * params.time

const interval = setInterval(doWork, time)  // measured in milisec