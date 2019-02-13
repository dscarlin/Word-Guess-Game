let wins = 0;

const wordBank = ['TYRANNOSAURUS','DIMETRODON','SPINOSAURUS','BRACHIOSAURUS'];
function play(){
    //letters already guessed
    const guessLetters = [];
    const rand = Math.floor(Math.random()*wordBank.length);
    //starting guesses
    let guesses = 12;
    //print starting guesses
    document.querySelector('.guesses').innerHTML= guesses
    //choose random word from wordbank
    let newWord = wordBank[rand];
    //hangman blanks node
    const hangWord = document.querySelector('.hangword')
    //build letter blanks for hangword
    for (i=0;i<newWord.length;i++){
        hangWord.innerHTML+=" _"
    }
    //main function for key events
    document.addEventListener('keyup',function key(){
        //capitalize key letter for comparison
        const capLetter = event.key.toUpperCase();
        //check boolean that the key letter has not been guessed already
        if(guessLetters.indexOf(capLetter)==-1 && capLetter.match(/[A-Z]{1,1}/) && capLetter.length<2){
            //decrement guesses since letter has not been guessed already
            guesses--;
             //print number of guesses left
            document.querySelector('.guesses').innerHTML= guesses;
            //check boolean that the key letter is not in newWord
            if(newWord.indexOf(capLetter)==-1){
               //add letter to array of guessed letters
                guessLetters.push(capLetter);
                //print array of guessed letters 
                document.querySelector('.letters').innerHTML= guessLetters;
                }
            else {

                index = newWord.indexOf(capLetter);
                let str = hangWord.innerHTML.replace(/\s/g,"");
                console.log(str);
                let newStr = str.substring(0,index) + newWord[index] + str.substring(index+1,(newWord.length))
                console.log(newStr)
                let splitStr = newStr.split("").join(" ")
                console.log(splitStr);
                hangWord.innerHTML = splitStr
                if (newWord==str){
                    wins++;
                    play();

                }
            }
    }
    })
}
play()

//&& capLetter.match(/^[A-Z]+$/)