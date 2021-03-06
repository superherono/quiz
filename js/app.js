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
let welcomeBtn = document.querySelector('.welcome-quiz__btn');
let quizLabels =document.querySelectorAll('.quiz__label');
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
	quizMessage.innerHTML= `Супер, молодец!`;
	quizLabels.forEach(quizLabel => {
		quizLabel.classList.add('_untouch');
	});
    if (correctAnswer == answerValue) {
    	score++;
    }
	setTimeout(removeClass, 1000);
	setTimeout(goToNextQuestion, 800);
  });
}
welcomeBtn.addEventListener("click", function(e) {
	sliderQuiz.slideNext();
});
function removeClass() {
	quizLabels.forEach(element => {
		element.classList.remove('_untouch');
	});
}
function goToNextQuestion() {
	sliderQuiz.slideNext();
	quizMessage.classList.remove('_active');
}


sliderQuiz.on('reachEnd', function () {
	
	let quizQuestionsLenght = document.querySelectorAll('.quiz__question').length;
	let quizTotal = document.querySelector('.results-quiz__total');
	let quizScore = document.querySelector('.results-quiz__score');
	let congratsPageTitle = document.querySelector('.page__title_last');
	let repeatPageTitle = document.querySelector('.page__title_repeat');
	let quizResults = document.querySelector('.quiz__results');
	let quizResultsTextRepeat = document.querySelector('.results-quiz__more_repeat');
	let quizResultsTextFinal = document.querySelector('.results-quiz__more_final');

	
	quizResults.classList.add('_show');
	quizTotal.innerHTML = `${quizQuestionsLenght}`;
	quizScore.innerHTML = `${score}`;

	if (score == quizQuestionsLenght) {
		congratsPageTitle.classList.add('_show');
		quizResultsTextFinal.classList.add('_active');
	} else {
		repeatPageTitle.classList.add('_show');
		quizResultsTextRepeat.classList.add('_active');
	}
});