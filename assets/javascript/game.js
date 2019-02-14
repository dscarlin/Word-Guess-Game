let wins = 0;

const wordBank = ['TYRANNOSAURUS','DIMETRODON','SPINOSAURUS','BRACHIOSAURUS','STEGOSAURUS','VELOCIRAPTOR','DIPLODOCUS','APATOSAURUS','OVIRAPTOR','ALBERTOSAURUS'];
let guessLetters;
let guesses;
let newWord;
let hangWord;
function set(){
    //letters already guessed
    guessLetters = [];
    //clear guess letter div
    document.querySelector('.letters').innerHTML= guessLetters;
    //random number variable for index of wordBank
    const rand = Math.floor(Math.random()*wordBank.length);
    //starting guesses
    guesses = 12;
    //print starting guesses
    document.querySelector('.guesses').innerHTML= guesses;
    //choose random word from wordbank
    newWord = wordBank[rand];
    console.log("bank index and new word: " +rand +" "+ newWord);
    //hangman blanks node access variable
    hangWord = document.querySelector('.hangword');
    //clear hangword div
    hangWord.innerHTML = "";
    //build letter blanks for hangword
    for (i=0;i<newWord.length;i++){
        hangWord.innerHTML+=" _"
    };
    console.log("new word after blanks: "+ newWord);
    let str = "";
}
set()
//main function for key events
document.onkeyup = function(event){
    console.log("event key:"+ event.key);
    //capitalize key letter for comparison
    const capLetter = event.key.toUpperCase();
    console.log("capLetter: "+capLetter);
    //check that key pressed is aplphabetic and a single letter
    if  (capLetter.match(/[A-Z]{1,1}/) && capLetter.length<2){
        //check if key letter is not in newWord
        if(newWord.indexOf(capLetter)==-1){
            //check boolean that the key letter has not been guessed already
            if(guessLetters.indexOf(capLetter)==-1){
                //check if out of guesses
                if (guesses<1){
                    alert("You are out of Guesses! The game will restart after closing this box.");
                    set();}
                //if still have guesses left
                else {
                    //decrement guesses since letter has not been guessed already
                    guesses--;
                    //print number of guesses left
                    document.querySelector('.guesses').innerHTML= guesses;
                    //add letter to array of guessed letters
                    guessLetters.push(capLetter);
                    //print array of guessed letters 
                    document.querySelector('.letters').innerHTML= guessLetters;
                }
            }
        }//letter is in newWord
        else {
            //Array for storing indices of all occurrences of key letter in newWord
            let indexArray = [];
            // grab html from hangword div remove beginning whitespace and turn into array
            str = hangWord.innerHTML.trim().split( " ");
            console.log("first: " +str +" length:"+str.length );
            // iterate through new word and add index of all occurrences that match key letter
            for (i=0;i<newWord.length;i++){
                if (capLetter === newWord[i]){
                    indexArray.push(i);
                }
            }
            console.log("newWord in else: "+newWord);
            console.log("index array: "+indexArray);
            // iterate through index array and assign key letter to each of those indices in array from hangword div
            for (i=0;i<indexArray.length;i++){
                let index = indexArray[i];
                str[index]= capLetter;
                console.log("each iteration of subbing array: "+str[index] + index);
            }
            console.log("second: " +str);
            console.log(event.key);
            console.log("");
            //turn array from hangword div back into string with spaces
            let joinStr = str.join(" ",",");
            //console.log(splitStr);
            //print adjusted hangword string
            hangWord.innerHTML = joinStr;
            //grab html from hangword and remove spaces with regEx to compare with newWord
            const compare = hangWord.innerHTML.replace(/\s/g,"");
            // check if successful i.e. word guessed correct
            if (newWord===compare){
                //increment wins
                wins++;
                //print wins
                document.querySelector('.wins').innerHTML = wins;
                set();
                

            }
        }
    }
}


