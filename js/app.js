//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) {}

let sliderQuiz = new Swiper('.page__quiz', {

	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 80,
	// autoHeight: true,
	speed: 800,
	touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	lazy: true,

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});

//=====================Обработчик ответов================================
let answer =document.querySelectorAll('.input');
let succesText = document.querySelector('.quiz__message_succes');
let wrongText = document.querySelector('.quiz__message_wrong');
let quizMessage = document.querySelector('.quiz__message');
let score = 0;

for (let index = 0; index < answer.length; index++) {
  const element = answer[index];
  let answerValue = element.getAttribute('value');

  element.addEventListener("click", function(e) {
    let parenttAnswer = element.closest('.quiz__question');
	let label =element.closest('.quiz__label');
    let correctAnswer = parenttAnswer.getAttribute('data-correct');

	label.classList.add('_active');
	quizMessage.classList.add('_active');

    if (correctAnswer == answerValue) {

		quizMessage.innerHTML= `Верно!`;
    	console.log('Correct answer');
    	score++;
    	console.log(score);
    } else {
		quizMessage.innerHTML= `Ты был близко!`;

    	console.log('Wrong answer');
    }
	setTimeout(goToNextQuestion, 800);
	
  });
  
}
function goToNextQuestion() {
	sliderQuiz.slideNext();
	quizMessage.classList.remove('_active');
}

sliderQuiz.on('reachEnd', function () {
	let pageTitle = document.querySelector('.page__title');
	let quizQuestionsLenght = document.querySelectorAll('.quiz__question').length;
	let quizTotal = document.querySelector('.results-quiz__total');
	let quizScore = document.querySelector('.results-quiz__score');
	let finalPageTitle = document.querySelector('.page__title_last');
	let quizResults = document.querySelector('.quiz__results');

	finalPageTitle.classList.add('_show');
	quizResults.classList.add('_show');

	quizTotal.innerHTML = `${quizQuestionsLenght}`;
	quizScore.innerHTML = `${score}`;
});