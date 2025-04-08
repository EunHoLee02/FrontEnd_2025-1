//번호 생성부분
const getnumberbutton = document.querySelectorAll(".button")[0];
const getnumberSection = document.querySelectorAll(".section")[0];
const balls = getnumberSection.querySelectorAll(".ball");

//구매 수량 부분
const purchaseInput = document.querySelector('.input');
const priceText = document.querySelector('.price');

//구매하기 버튼 부분
const purchaseButton = document.querySelectorAll('.button')[1];
const resultSection = document.querySelector('.result-section');

//결과화면
const resultBlocks = document.querySelectorAll('.result-block')[1];
const resultNum = resultBlocks.querySelectorAll('.ball');
const resultText = document.querySelector('.result-text');

//이번주 당첨 번호 부분
const winningballs = resultSection.querySelectorAll('.ball');
let numbers = [];
let count = 0;

//번호 생성하기 버튼
getnumberbutton.addEventListener('click', () => {
    numbers = getRandomNumbers();
    if (isNaN(count) || count <= 0) {
        alert('구매 수량을 올바르게 입력하세요!');
        return;
    } else {
        resultSection.style.display = 'block';
    }

    balls.forEach((ball, index) => {
        ball.textContent = numbers[index];
    });
    winningballs.forEach((ball, index) => {
        ball.textContent = numbers[index];
    });
    // `<div class="result-label">내가 구매한 번호:</div>` 이거 빼고 resultBlocks 안에 요소들 다 지우기
    resultBlocks.innerHTML = `<div class="result-label">내가 구매한 번호:</div>`;

    // element생성
    for (let i = 0; i < count; i++) {
        const myNumbers = getRandomNumbers();

        const lottoDiv = document.createElement('div');
        lottoDiv.className = 'lotto-balls';

        myNumbers.forEach((_, index) => {
            const ballDiv = document.createElement('div');
            ballDiv.className = `ball ball-${(index % 5) + 1}`;
            ballDiv.textContent = myNumbers[index];
            lottoDiv.appendChild(ballDiv);
        });

        const match = myNumbers.filter(num => numbers.includes(num));

        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-text';
        if (match.length === 6) {
            resultDiv.innerHTML = '결과: 6개 일치 - 당첨!!';
        } else {
            resultDiv.innerHTML = `결과: ${match.length}개 일치`;
        }

        resultBlocks.appendChild(lottoDiv);
        resultBlocks.appendChild(resultDiv);
    }
});


//구매하기 버튼
purchaseButton.addEventListener('click', () => {

    count = parseInt(purchaseInput.value); // 구매 수량 읽기
    if (isNaN(count) || count <= 0) {
        alert('구매 수량을 올바르게 입력하세요!');
        return;
    }

});

//구매수량 입력
purchaseInput.addEventListener('input', () => {
    let count = parseInt(purchaseInput.value);
    if (isNaN(count) || count < 0) {
        count = 0;
    }
    const totalPrice = count * 1000;
    priceText.textContent = `총 금액: ${totalPrice.toLocaleString()}원 (1장당 1,000원)`;
});


//6개 랜덤 숫자 만드는 함수
function getRandomNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    numbers.sort((a, b) => a - b);
    return numbers;
}

//console.log(getRandomNumbers());