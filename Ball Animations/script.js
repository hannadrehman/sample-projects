var config = {
    frameWidth:560,
    frameHeight:315,
    frameId:'youtubeFrame',
    overlayId:'overlayWrapper',
    frameUrl : 'https://www.youtube.com/embed/WOGn4zQGmpU?autoplay=1',
    frameContainerId:'frameContainer',
    overlayId: 'overlayWrapper',
    ballSize:30,
    removeBallTime:800,
    ballLoadTime:300
}

window.onload=function(){
    setFrameDefaults();
    addClickListener(config.overlayId);
}

/**
 * function setFrameDefaults
 * description: this function will set the defaults 
 * for the youtube iframe form the config. and containers
 * the goal is to have uniform dimensions accross the containers
 */
function setFrameDefaults(){
    try{
        // set height,width to contaiiner
        var frameContainer = document.getElementById(config.frameContainerId);
        if(frameContainer){
            frameContainer.style.width = config.frameWidth;
            frameContainer.style.height =  config.frameHeight;  
        } 
        // set frameurl,height,width to the iframe 
        var frame = document.getElementById(config.frameId);
        if(frame){
            frame.src=config.frameUrl;
            frame.width=config.frameWidth;
            frame.height=config.frameHeight;
        }
        // set overlay height and width 
        var overlay = document.getElementById(config.overlayId);
        if(overlay){
            overlay.style.width = config.frameWidth;
            overlay.style.height =  config.frameHeight;  
        }
    }
    catch(e){
        throw e;
    }
}
/**
 * function addClickListener
 * description: adds the event handler on the overlay
 */
function addClickListener(id){
   var overlay =  document.getElementById(id);
   if(overlay){
       overlay.addEventListener('click', overlayClickHandler)
   }
}
/**
 * function overlayClickHandler
 * description: event handler for the click
 * action on the overlay
 */
function overlayClickHandler(ev){
    var overlay =  ev.target;
    var mousePos = mouse(ev);

    var left = mousePos.left-(config.ballSize/2);
    var top = mousePos.top-(config.ballSize/2);

    var ball = createBallElem(top, left);
    overlay.appendChild(ball);
    var basketPos = getFinalPos(ball,top, left);
    basketBallPut(ball,basketPos.left, basketPos.top);
    
    removeBall(ball);
    
}
/**
 * function mouse
 * description: gets exact click positions on the overlay
 * we take the page coordinates, and subtract them with the
 * overlay position
 */
function mouse(ev){
    try{
        var xCord = ev.pageX ;
        var yCord = ev.pageY ;
        var overlay = ev.target;
        var overlayX = overlay.getBoundingClientRect().left;
        var overlayY = overlay.getBoundingClientRect().top;
        
        return{
           top: yCord - overlayY,
           left: xCord - overlayX
        }
    }
    catch(e){
        throw e;
    }
    
}
/**
 * function createBallElem
 * description: creates basket ball element
 */
function createBallElem(top,left){
    try{
        var ball = document.createElement('div');
        ball.className='basket-ball';
        ball.style.width=config.ballSize+'px';
        ball.style.height=config.ballSize+'px';
        ball = addTransform(ball, left, top)
        
        return ball;
    }
    catch(e){
        throw e;
    }
    
}
function getFinalPos(ball, top, left){
    console.log(config.frameHeight,config.frameWidth )
    var targetTop = config.frameHeight -50;
    var targetLeft = config.frameWidth -40;
    return {
        top: top +(targetTop-top),
        left:left+ (targetLeft-left)
    }
}
/**
 * function removeBall
 * description: removes ball elem
 */
function removeBall(ball){
    var tt = setTimeout(function(){
        ball.remove()
    },config.removeBallTime);
}
/**
 * function addTransform
 * description: add translate x,y to the balll
 */
function addTransform(ball,x,y){
    ball.style.webkitTransform = 'translate('+x+'px,'+y+'px)';
    ball.style.MozTransform = 'translate('+x+'px,'+y+'px)';
    ball.style.msTransform = 'translate('+x+'px,'+y+'px)';
    ball.style.OTransform = 'translate('+x+'px,'+y+'px)';
    ball.style.transform = 'translate('+x+'px,'+y+'px)';
    return ball;
}

/**
 * function basketBallPut
 * description: puts the ball in the basket
 */
function basketBallPut(ball,x,y){
   
   var time = setTimeout(function(){
        addTransform(ball,x,y);
        clearTimeout(time)
    },config.ballLoadTime);
}
