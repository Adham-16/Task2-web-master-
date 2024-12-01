const images = document.querySelectorAll('.images img');
const imgModel = document.querySelector('.img-Model');
const Next = document.querySelector('.Next');
const Prev = document.querySelector('.Prev');
const dots = document.querySelectorAll('.dot');
let startX, endX;

let number = 0;
let timeInterval;

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}
function handleTouchMove(e) {
    endX = e.touches[0].clientX;
}

function handleTouchEnd() {
    const distance = startX - endX;
    if (distance > 50) {
        Next.click();
    } else if (distance < -50) {
        Prev.click();
    }
}
imgModel.addEventListener('touchstart', handleTouchStart);
imgModel.addEventListener('touchmove', handleTouchMove);
imgModel.addEventListener('touchend', handleTouchEnd);
function startInterval() {

    timeInterval = setInterval(() => {
        number = number + 1;
        if (number >= images.length) {
            number = 0;
        }
        changeImageSrc(number);
    }, 3000);
}


function changeImageSrc(number) {
    updateIndicators(number)
    imgModel.classList.remove('loaded');
    setTimeout(() => {
        imgModel.setAttribute('src', images[number].src);
    }, 250);

    imgModel.onload = () => {
        imgModel.classList.add('loaded');
    };
}

window.addEventListener('load', () => {
    imgModel.classList.add('loaded');
});

function updateIndicators(number) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === number) {
            dot.classList.add('active');
        }
    });
}

startInterval();

Next.addEventListener('click', () => {
    clearInterval(timeInterval);
    number++;
    if (number >= images.length) {
        number = 0;
    }
    changeImageSrc(number);
    startInterval();
})
Prev.addEventListener('click', () => {
    clearInterval(timeInterval);
    number--;
    if (number < 0) {
        number = images.length - 1;
    }
    changeImageSrc(number);
    startInterval();
})

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(timeInterval);
        number = index;
        changeImageSrc(number);
        updateIndicators(number);
        startInterval();
    });
});
function updateIndicators(number) {

    dots.forEach((dot) => {
        dot.classList.remove('active');
    });
    dots[number].classList.add('active');
}
imgModel.addEventListener('mouseover', () => {
    clearInterval(timeInterval);
});

imgModel.addEventListener('mouseout', () => {
    startInterval();
});




document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        Next.click();
    } else if (e.key === 'ArrowLeft') {
        Prev.click();
    }
});