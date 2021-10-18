let startButton = document.querySelector('#start'),
	clock = document.querySelector('#clock'),
	body = document.querySelectorAll('body')[0],
	timer = document.querySelector('#timer'),
	startTime, requestId;

let ms, S, M;


startButton.addEventListener('click', funcStart);

function funcStart(){
	const savePointButton = document.createElement('button');
	savePointButton.innerText = 'Wait';
	savePointButton.id = 'savePointButton';
	clock.appendChild(savePointButton);

	const resetButton = document.createElement('button');
	resetButton.innerText = 'Reset';
	resetButton.id = 'resetButton';
	clock.appendChild(resetButton);

	switch (this.textContent) {
        case 'start':
            startTime = Date.now();
            this.textContent = 'Stop';
            clockRun();
            break;

        case 'Stop':
            this.textContent = 'Start';
            clock.removeChild(savePointButton);
            clock.removeChild(resetButton);
            cancelAnimationFrame(requestId);
            break;

        case 'Start':
            clockRun();
            this.textContent = 'Stop';
            clock.removeChild(savePointButton);
            clock.removeChild(resetButton);
            break;
    }
}

function clockRun(){
	ms = Date.now() - startTime;

	S = Math.floor(ms / 1000);
	ms = ms % 1000;
	M = Math.floor(S / 60);
	S = S % 60;

	timer.innerText = [showTime(M, 2), showTime(S, 2), showTime(ms, 3)].join(':');
	requestId = requestAnimationFrame(clockRun);
}

function showTime(x, y){
	let s = '00' + x;
	return s.slice(-y);
}

body.addEventListener('click', resetTime);

function resetTime(event){
	 let target = event.target;

    if (target.id === 'resetButton') {
        cancelAnimationFrame(requestId);
        timer.innerText = '00:00:000';
        startButton.textContent = 'start';
        clock.removeChild(resetButton);
        clock.removeChild(savePointButton);
    }
}

body.addEventListener('click',showSavePoint);

function showSavePoint(event) {
    let target = event.target;

    if (target.id === 'savePointButton') {
        let showSavePoint = document.createElement('div');
        showSavePoint.innerHTML = `Time: ${M}:${S}:${ms}`;
        body.appendChild(showSavePoint);
    }
};