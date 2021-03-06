function autoChange(timer, section, time) {										// АВТО СМЕНА
	timer = setInterval(function() {
		const currentSelector = section + ' input[checked]',
			  firstInputSelector = section + ' input';
		let current = document.querySelector(currentSelector);
		current.removeAttribute('checked', '');
		if(current.nextElementSibling.nodeName === 'INPUT') {
			current.nextElementSibling.setAttribute('checked', '')
		} else {
			document.querySelector(firstInputSelector).setAttribute('checked', '')
		}
	}, time);

	document.querySelector(section + ' .nav').addEventListener('click', function(event) {
		if (event.target.nodeName === 'LABEL') clearTimeout(timer);
	});
}




const separator = document.querySelector('.separator'),							// БЕЗ И С
	  withPhoto = document.querySelector('.with'),
	  withoutPhoto = document.querySelector('.without'),
	  photoContainer = document.querySelector('#with-out');
let flag = false;
const stop = photoContainer.clientWidth * .44;

function separatorDown(event) {
	event.preventDefault();
	flag = true;
}

function separatorMove(event, res) {
	event.preventDefault();
	if (flag && res > stop && res < withoutPhoto.offsetWidth) {
		separator.style.left = res + 'px';
		withPhoto.style.width = res + 'px';
	} 
	if(flag && res < stop) {
		separator.classList.add('stop');
		setTimeout(function() {
			separator.classList.remove('stop');
		}, 900);
	}
}

separator.addEventListener('mousedown', function(event) {separatorDown(event)}, false);
separator.addEventListener('touchstart', function(event) {separatorDown(event)}, false);

document.addEventListener('mouseup', function(event) {flag = false}, false);
document.addEventListener('touchend', function(event) {flag = false}, false);

photoContainer.addEventListener('mousemove', function(event) {
	separatorMove(event, event.pageX - this.offsetLeft);
}, false);

photoContainer.addEventListener('touchmove', function(event) {
	separatorMove(event, event.changedTouches[0].screenX - this.offsetLeft);
}, false);

let withOutTimer;
autoChange(withOutTimer, '#with-out', 10000);




const modal = document.querySelector('div.modal');								// ОТКРЫТИЕ И ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА

document.querySelectorAll('button.modal').forEach(function(i) {
	i.addEventListener('click', function() {
		modal.classList.add('open');
		document.body.style.overflow = 'hidden';
	});
});

function modalClose() {
	modal.classList.remove('open');
	document.body.style.overflow = '';
}

modal.querySelector('.close').addEventListener('click', function() {modalClose()});

document.addEventListener('keydown', function(event) {
	if (event.keyCode === 27) {
		event.preventDefault();
		modalClose();
	}
});




document.querySelector('nav ul').addEventListener('click', function(event) {	// ПО ЯКОРЯМ
	event.preventDefault();
	target = event.target;
	if (target.nodeName !== 'A') {return}
	const id = target.href.slice(target.href.indexOf('#') + 1);
	window.scrollTo({
		'behavior': 'smooth',
		'left': 0,
		'top': document.getElementById(id).offsetTop
	});
});




let scrollSearch = document.querySelector('.counter');							// АВТО СЧЁТЧИК

function sees() {
	scrollSearch.position = {
		top: window.pageYOffset + scrollSearch.getBoundingClientRect().top, 
		left: window.pageXOffset + scrollSearch.getBoundingClientRect().left, 
		right: window.pageXOffset + scrollSearch.getBoundingClientRect().right, 
		bottom: window.pageYOffset + scrollSearch.getBoundingClientRect().bottom
	};

	window.position = {
		top: window.pageYOffset, 
		left: window.pageXOffset, 
		right: window.pageXOffset + document.documentElement.clientWidth, 
		bottom: window.pageYOffset + document.documentElement.clientHeight
	};
  
	if(scrollSearch.position.bottom > window.position.top && scrollSearch.position.top < window.position.bottom &&
	scrollSearch.position.right > window.position.left && scrollSearch.position.left < window.position.right) {
	   	counterVisible = true;
	   	counter(
	   		document.querySelector('.count-cameras'),
	   		document.querySelector('.count-clients'),
	   		document.querySelector('.count-settlements')
	   	);
	}
};

window.addEventListener('scroll', sees);

function counter() {
	window.removeEventListener('scroll', sees);
	for(let i = 0; i < arguments.length; i++) {
		let j = 10,
			el = arguments[i],
			increment;
		let end = parseInt(el.innerHTML);
		if (end === 4200) increment = 8;
		if (end === 1000) increment = 2;
		if (end === 566) increment = 1;
		let t = setInterval(function() {
			el.innerHTML = j.toLocaleString('ru-RU');
			if(j > end) {
				el.innerHTML = end.toLocaleString('ru-RU') + '\u200A+';
				clearTimeout(t);
			}
			j += increment;
		}, 0);
	}
}





document.querySelector('.sd-fullhd').addEventListener('mousemove', function(event) {		// SD VS FULLHD LENS ZOOM
	if(event.target.parentNode.classList.contains('sd')) {
		zoom(event, document.querySelector('.sd-fullhd .sd .lens'));
	}
	if(event.target.parentNode.classList.contains('fullhd')) {
		zoom(event, document.querySelector('.sd-fullhd .fullhd .lens'));
	}
});

function zoom(event, overlay) {
	let posX = event.offsetX,
		posY = event.offsetY;
	overlay.style.left = posX + 'px';
	overlay.style.top = posY + 'px';
	overlay.style.backgroundPosition = (-posX) + 'px ' + (-posY) + 'px';
}



const calculatorRange = document.querySelector('.archive input[type="range"');				// КАЛЬКУЛЯТОР

calculatorRange.addEventListener('mousedown', function() {
	flag = true;
});

calculatorRange.addEventListener('mouseup', function() {
	flag = false;
});

calculatorRange.addEventListener('mousemove', function(e) {
	if(flag) document.querySelector('.archive .current').innerHTML = e.target.value;
});


let amount = document.querySelector('.amount input');

document.querySelector('.line.amount .indicators').addEventListener('click', function(event) {
	event.preventDefault();
	let e =  event.target,
	value = parseInt(amount.value);

	if (e.classList.contains('minus') && value > 1) {
		amount.value = value - 1;
	} else if (e.classList.contains('plus') && value) {
		amount.value = value + 1;
	} else {
		amount.value = 1;
	}
});




let clientsTimer;
autoChange(clientsTimer, '.clients', 2000);