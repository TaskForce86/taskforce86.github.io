var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2018, 8, 16, 0, 0, 0);
var curShowTimeSeconds = 0;

window.onload = function () {

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

//    render(context);
	setInterval(
		function(){
			render(context);
			update();
		}
		,50
	);
};

function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret / 1000);
	
	return ret >= 0 ? ret : 0;
}

function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	
	var nextHours = parseInt(nextShowTimeSeconds / 3600);	
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600)/60);
	var nextSeconds = nextShowTimeSeconds % 60;
	
	var curHours = parseInt(curShowTimeSeconds /3600);
	var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600)/60);
	var curSeconds = curShowTimeSeconds % 60;
	
	if(nextSeconds != curSeconds){
		curShowTimeSeconds = nextShowTimeSeconds;
	};
}

function render(ctx) {
	
	ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60 );
    var seconds = curShowTimeSeconds % 60;

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);

    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx,true);
    // renderDigit(MARGIN_LEFT + 108 * (RADIUS + 1), MARGIN_TOP, 10, ctx);


}

function renderDigit(x, y, num, ctx) {
	
	ctx.fillStyle = arguments[4] ? getRandomColor() : "rgb(0,102,153)";
//	ctx.fillStyle = getRandomColor();
//	ctx.fillStyle = "rgb(0,102,153)";

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                ctx.closePath();

                ctx.fill();
            }
        }
    }
}

function getRandomColor(){
	var r = randomNum(0,255);
	var g = randomNum(0,255);
	var b = randomNum(0,255);
	
	var colorCode = 'rgb(' + String(r) + ',' + String(g) + ',' + String(b) + ')';
	
	return colorCode;
}

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}