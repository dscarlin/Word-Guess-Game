const figcaption = document.getElementById('figcaption');
const dinopic = document.getElementById('dinopic');
const dinopad = document.querySelector('.dinopad');
    figcaption.onmouseover = function(){
        dinopic.firstChild.style.width= "40vw";
        dinopic.style.transition = ".6s";
        dinopic.style.transform = "rotate(0)";
        dinopic.style.right = "10rem"
        dinopad.style.bottom = "20rem";
        }
    figcaption.onmouseout = function(){
        dinopic.firstChild.style.width= "20rem";
        dinopic.style.transform = "rotateZ(-15deg) rotateY(60deg) rotateX(-20deg) scale(1)";
        dinopic.style.right = "unset";
        dinopad.style.bottom = "unset";
    }
    
    dinopic.onmouseover = function(){
        dinopic.firstChild.style.width= "40vw";
        document.querySelector('audio').play();
        dinopic.style.transform = "rotate(0)"
        dinopic.style.right = "10rem"
        dinopad.style.bottom = "20rem";
        }
    dinopic.onmouseout = function(){
        dinopic.firstChild.style.width= "20rem";
        dinopic.style.transform = "rotateZ(-15deg) rotateY(60deg) rotateX(-20deg) scale(1)";
        dinopic.style.right = "unset";
        dinopad.style.bottom = "unset";
    }




const dinosaurCollection = {
    'TYRANNOSAURUS':'assets/images/tyrannosaurus.jpg',
    'DIMETRODON':'assets/images/dimetrodon.png',
    'SPINOSAURUS':'assets/images/spinosaurus.jpg',
    'BRACHIOSAURUS':'assets/images/brachiosaurus.jpeg',
    'STEGOSAURUS':'assets/images/stegosaurus.jpeg',
    'VELOCIRAPTOR':'assets/images/velociraptor.jpeg',
    'DIPLODOCUS':'assets/images/diplodocus.jpeg',
    'APATOSAURUS':'assets/images/apatosaurus.jpeg',
    'OVIRAPTOR':'assets/images/oviraptor.jpeg',
    'ALBERTOSAURUS':'assets/images/albertosaurus.jpeg'};
let wins = 0;
let guessLetters;
let guesses;
let newWord;
let hangWord;
let oldWords =[];
function set(){
    //letters already guessed
    guessLetters = [];
    //clear guess letter div
    document.querySelector('.letters').innerHTML= "Letters Already Guessed: " + guessLetters;
    //starting guesses
    guesses = 12;
    //print starting guesses
    document.querySelector('.guesses').innerHTML= "Guesses Left: " + guesses;
    //define array for dinosaur names
    const wordBank = []
    //populate array for accessing random dinosaur name
    for (var key in dinosaurCollection)
        wordBank.push(key);
    //random number variable for index of wordBank
    let rand = Math.floor(Math.random()*wordBank.length);
    //choose random word from wordbank
    newWord = wordBank[rand];
    console.log("bank index and new word: " +rand +" "+ newWord);
    //Make sure that the same word is not chosen within 3 rounds
    function noRepeats(){
        if (oldWords.indexOf(newWord) != -1){
            console.log("THIS IS THE INDEX OF NEW WORD: "+ oldWords.indexOf(newWord))
            newWord = wordBank[rand + 1];
            rand++
            noRepeats();}
    }
    noRepeats();
    console.log(newWord);
    console.log("untrimmed: "+ oldWords);
    if (oldWords.length > 5)
        oldWords.shift();
    console.log("trimmed: "+ oldWords);
    //Re-assign oldWord to new word for comparison next round
    oldWords.push(newWord);
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
document.getElementById('hangword').focus();
document.ontouchstart = function(){		
    document.getElementById('hangword').focus()
   };
//main function for key events
document.onkeyup = function (event){
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
                    document.querySelector('.guesses').innerHTML= "Guesses Left: " + guesses;
                    //add letter to array of guessed letters
                    guessLetters.push(capLetter);
                    //print array of guessed letters 
                    document.querySelector('.letters').innerHTML= "Letters Already Guessed: " + guessLetters;
                    //starting guesses
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
                document.getElementById('dinopic').innerHTML = '<img   width="100%"src="'+ dinosaurCollection[newWord]+'" alt="dinosaur picture"/>';
                document.getElementById('figcaption').innerHTML = newWord;
                console.log(newWord)
                set();
                

            }
        }
    }
}


