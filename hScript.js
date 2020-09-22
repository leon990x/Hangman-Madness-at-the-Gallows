//Define variables and constants
var words = [""];
var ct = 0;
var theWord;
const correctLetters = [];
const wrongLetters = [];
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playButton = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const start = document.getElementById("start");
const figureParts = document.querySelectorAll('.figure-part');
const guessWord = document.getElementById('guess');

let selectedWord = words[words.length - 1];
//Reveals hidden word 
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(
            letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>
            `
        )
        .join('')}
    
    `;
        
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    console.log(wordEl.innerText);

    if(innerWord === selectedWord) {

        finalMessage.innerText = 'An innocent victim is about to be executed!'+'\n'+'You must stop it by guessing the password!' + 
        '\n' + '(Note: 2 players required: An executioner and witness.' +'\n' + 'Executioner, press Play and enter a word for the witness to guess.' +'\n' + 'Witness, enter letters with keyboard' + ')';
        popup.style.display = 'flex';
        if (ct != 0){
            finalMessage.innerText = "CONGRATULATIONS, YOU SAVED THE VICTIM!" + '\n' + "(Number of attempts: " + String(ct) +')'+'\n' + "Press Play to play to save another!";
            popup.style.display = 'flex';
        }
    }
}

displayWord();

//update the wrong letters
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<h2 style="color:red;">Wrong Guesses:</h2>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //display parts of poor man
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none'
        }
    });

    //Check if lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you were unable to stop the Execution...' + '\n' + 'Press Play to retry.';
        popup.style.display = 'flex';
    }
}

//Show notification for letter already pressed
function showNotification() {
    notification.classList.add('notification-container');
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('notification-container');
        notification.classList.remove('show');
    }, 2000);
}


window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(ct === 2){
            ask_player = prompt("If you want to guess the word, enter it here: ");
            if (String(ask_player).length == 0) {
                //pass
            }
            else {
                if(ask_player != selectedWord){

                }
                else{
                    i = 0;
                    while(i < ask_player.length)
                    {
                        let letter = String(ask_player).charAt(i);
                        correctLetters.push(letter.toLowerCase());
                        i++;
                    }
                    displayWord();
                    ct += 1;
                    finalMessage.innerText = 'An innocent victim is about to be executed!'+'\n'+'You must stop it by guessing the password!' + 
                    '\n' + '(Note: 2 players required: An executioner and witness.' +'\n' + 'Executioner, press Play and enter a word for the witness to guess.' +'\n' + 'Witness, enter letters with keyboard' + ')';
                    popup.style.display = 'flex';
                    if (ct != 0){
                        finalMessage.innerText = "CONGRATULATIONS, YOU SAVED THE VICTIM!" + '\n' + "(Number of attempts: " + String(ct) +')'+'\n' + "Press Play to play to save another!";
                        popup.style.display = 'flex';
        }
                }
            }
        }

        if(selectedWord.includes(letter.toLowerCase())) {
            if(!correctLetters.includes(letter.toLowerCase())) {
                correctLetters.push(letter.toLowerCase());
                ct += 1;

                displayWord();
            } else {
                showNotification();
                ct += 1;
            }     
        } else {
            if(!wrongLetters.includes(letter.toLowerCase())) {
                wrongLetters.push(letter.toLowerCase());

                updateWrongLettersEl();
                ct += 1;
            } else {
                showNotification();
                ct += 1;
            }
        }
  }
});


//Play or play again
playButton.addEventListener('click', () => {
    ct = 0;
    words = [""];
    while(true){
        theWord = prompt("Executioner, enter the password: ");
        if(theWord.length === 0 || theWord.includes(" ")){
            continue
        }
        break
    }
    
    words.push(theWord.toLowerCase());
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[words.length - 1];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = '';

})




