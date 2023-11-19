const typingtext_para = document.querySelector('.typing-text p');
const typingtext = document.querySelector('.typing-text');
const try_again = document.querySelector('button');
const inputfield = document.querySelector('.wrapper .input-field');
const mistake = document.querySelector('.mistake span');
const timetext = document.querySelector('.time span b');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span ');

let timer,
    maxtime = 90,
    timeleft = maxtime;
let characterindex = 0;
let mistakes = 0;
let istyping = false;
function randompara() {
    let randindex = Math.floor(Math.random() * para.length);
    // we empty the paragraph when randompara func() called so the new para who's come not add to the previous para
    typingtext_para.innerHTML = "";
    // typingtext_para.innerHTML = para[randindex]
    // By split we can access each chracter of paragrpah word & we are adding that word to span tag and we adding the span tag to "p" tag of typing-text class
    para[randindex].split('').forEach(span => {
        let spantag = `<span>${span}</span>`;
        typingtext_para.innerHTML += spantag;
    });
    typingtext_para.querySelectorAll('span')[0].classList.add('active')
    // Focusing the input field on keydown or click on typing paragraph we making them focus so we can type in input field without taking the mouse their. so, by click on page we can write in input field
    document.addEventListener('keydown', () => inputfield.focus());
    typingtext_para.addEventListener('click', () => inputfield.focus());
}

function inittyping() {
    
    // But this function is calling every time when user inputs the word so we using a flag here 
    if (!istyping) {  // if istyping is false then call this function but in this func() we are setting the flag true so condition never become true again
        timer = setInterval(inittimer, 1000);
        istyping = true;    // by turning the flag true we can prevent the condition to being satisfied so this function will not call again & again 
    }
    const character = typingtext_para.querySelectorAll('span');
    // now we also split the value we are typing and we also stored that array of a  into "typechar" variable 
    let typechar = inputfield.value.split("")[characterindex];
    // If user has not enter any charcter or pressed backspace
    if (typechar == null) {
        // Decrement the index when backspace or character not entered
        characterindex--;
        // Decrement the value of mistakes when characterindex span contain the incorrect class and we pressed the backspace so mistakes number go down 
        if (character[characterindex].classList.contains('incorrect')) {
            mistakes--;
        }
        // remove both the classes correct and incorrect when we press backspace
        character[characterindex].classList.remove("correct", "incorrect");
    }
    else {
        // if our typing character at index is same as the character which is at span tag into paragraph
        if (character[characterindex].innerText === typechar) {
        // If user typed the correct words then add the "correct" class to that matched words of span tag
            character[characterindex].classList.add("correct");
            console.log("correct");
        }
        else {
            // If user typed the incorrect words then add the "incorrect" class to that unmatched words of span tag
            character[characterindex].classList.add("incorrect");
            // Because we typed the wrong character so we increment the mistakes variable
            mistakes++;
            console.log("incorrect");
        }
        characterindex++;  // increment characterindex either user type the correct aord or incorrect word
    }
    // First we are subtracting the all mistakes from total inputs word then divide it by the 5 means we are assuming the word is of 5 character then divide the output to the time taken during typing that input & multiply with 60 means it is a minute conversion
    let Wpm = Math.round((((characterindex - mistakes) / 5) / (maxtime - timeleft)) * 60);
    Wpm = Wpm < 0 || !Wpm || Wpm === Infinity ? 0 : Wpm;
    wpm.innerText = Wpm;
    mistake.innerText = mistakes;
    cpm.innerText = characterindex - mistakes;  // cpm will not count any mistakes
    // mtlb ki sbhi span mai se "active" class ko remove krdo
    character.forEach(span => span.classList.remove("active"));
    // pr jis ka yeh indx hai ss span mai "active" class add krte jayo toh jisse current word ke niche hi underline blink hoga baakiyo mai se yeh class remove ho chuki hai
    character[characterindex].classList.add("active");
}

function inittimer() {
    // 
    if (timeleft > 0) {
        timeleft--;
        timetext.innerText = timeleft + 's';
    }
    else {
        inputfield.disabled = true; // we are stopping to take any more words as inputs 
        timetext.innerText = "Time's Up"
        clearInterval(timer);
    }
}
function resetgame() {
    randompara();
    maxtime = 90;
    timeleft = maxtime;
    characterindex = 0;
    istyping = false;
    mistakes = 0;
    timetext.innerText = timeleft;
    wpm.innerText = 0
    cpm.innerText = 0
    inputfield.value = "";
    clearInterval(timer);
}
randompara();
try_again.addEventListener('click', resetgame);
inputfield.addEventListener('input', inittyping);