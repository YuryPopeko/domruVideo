const separator = document.querySelector('.separator'),
	  withPhoto = document.querySelector('.with'),
	  withoutPhoto = document.querySelector('.without'),
	  photoContainer = document.querySelector('#with-out');
let flag = false;

separator.addEventListener('mousedown', function(event) {
	event.preventDefault();
	flag = true;
}, false);

document.addEventListener('mouseup', function(event) {
	flag = false;
}, false);

photoContainer.addEventListener('mousemove', function(event) {
	let res = event.pageX - this.offsetLeft;
	if (flag && (res > 0) && (res < withoutPhoto.offsetWidth)) {
		separator.style.left = res + 'px';
		withPhoto.style.width = res + 'px';
	}
}, false);



const modal = document.querySelector('div.modal');

document.querySelectorAll('button.modal').forEach(function(i) {
	i.addEventListener('click', function() {
		modal.classList.add('open');
		document.body.style.overflow = 'hidden';
	});
});

modal.querySelector('.close').addEventListener('click', function(e) {
	modal.classList.remove('open');
	document.body.style.overflow = '';
});



document.querySelector('nav ul').addEventListener('click', function(event) {
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



let scrollSearch = document.querySelector('.counter');

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
		if (end === 4200) increment = 20;
		if (end === 1000) increment = 5;
		if (end === 566) increment = 3;
		let t = setInterval(function() {
			el.innerHTML = j + '';
			if(j > end) {
				el.innerHTML = end + '';
				clearTimeout(t);
			}
			j += increment;
		}, 0);
	}
}


const calculatorRange = document.querySelector('.archive input[type="range"');

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