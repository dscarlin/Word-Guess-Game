//------------------------------------------GLOBAL VARIABLES-------------------------------------------------//


//--------------game data----------------//
//collection of dinosaur names and related data
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

//define array for dinosaur names
const wordBank = []



//-----------gameplay variables-----------//
let wins = 0;
//letters already guessed
let guessLetters = [];
//number of guesses left per round
let guesses;
//word chosen from wordBank
let newWord;
//words from previous (up to 5) rounds
let oldWords =[];

//-------------js DOM variables-------------//
//hangman blanks node access variable
const hangWord = document.querySelector('.hangword');
//caption for dinosaur pic
const figcaption = document.getElementById('figcaption');
//div that dinosaur pic img element is placed in
const dinopic = document.getElementById('dinopic');
//div that dinopic and caption are inside of
const dinopad = document.querySelector('.dinopad');
//audio element
const audio = document.querySelector('audio');
//div for displaying wins 
const winsDiv = document.querySelector('.wins');
const event = document.event;


//------------------------------------------ FUNCTIONS ------------------------------------------------//

//-------------------functions for game set ------------//
        //random number variable for index of wordBank
        function rand(){return Math.floor(Math.random()*wordBank.length);
            }


        //makes sure no word is repeated in 5 rounds
        function noRepeats(){
            if (oldWords.indexOf(newWord) != -1){
                console.log("THIS IS THE INDEX OF NEW WORD: "+ oldWords.indexOf(newWord));
                newWord = wordBank[rand()];
                noRepeats();}
            }


        //sets up game screen between rounds
        function set(){
            //clear guess letter div
            document.querySelector('.letters').innerHTML= "Letters Already Guessed: " + guessLetters;
            //starting guesses
            guesses = 12;
            //print starting guesses
            document.querySelector('.guesses').innerHTML= "Guesses Left: " + guesses;
            //populate array for accessing random dinosaur name
            for (var key in dinosaurCollection)
                wordBank.push(key);
            //choose random word from wordbank
            newWord = wordBank[rand()];
            console.log("bank index and new word: " + wordBank.indexOf(newWord) +" "+ newWord);
            //Make sure that the same word is not chosen within 5 rounds 
            noRepeats();
            console.log(newWord);
            console.log("untrimmed: "+ oldWords);
            if (oldWords.length > 5)
                oldWords.shift()
            console.log("trimmed: "+ oldWords);
            //Re-assign oldWord to new word for comparison next round
            oldWords.push(newWord);
            //clear hangword div
            hangWord.innerHTML = "";
            //build letter blanks for hangword
            for (i=0;i<newWord.length;i++){
                hangWord.innerHTML+=" _"
            };
            console.log("new word after blanks: "+ newWord);
            let str = "";
            }

//---------------------functions for event listeners--------------//

        //-------mobile keyboard initialize------//
        
        function openKeyboard(){
            document.getElementById('dummy').focus()
            };

        //---auxilary UI event handler funcs----//


        function dinoAction(){
            dinopic.style.transition = ".6s";
            dinopic.style.transform = "scale(1.4)";
            figcaption.style.color = "orange";
            figcaption.style.textDecoration = "underline";
            figcaption.style.background = "#0f77d24d";
            figcaption.style.transform = "rotate(0)"
            dinopad.style.bottom = "5rem";
            }

        function dinoReturn(){
            dinopic.style.transform = "rotateZ(-15deg) rotateY(60deg) rotateX(-20deg) scale(1)";
            figcaption.style.color = "white";
            figcaption.style.textDecoration = "unset";
            figcaption.style.background = "unset";
            figcaption.style.transform = "rotateX(60deg) rotateZ(-30deg)";
            dinopad.style.bottom = "unset";
            }

        function roar(){
            audio.play()
            }


        //---------gameplay event func-----------//

        
        
//-------------------------------------GAME PLAY ACTIONS----------------------------------------------//

//Set Initial Board
set()
alert('Welcome to Dinosaur Hangman! For mobile => touch the empty blanks to open your keypad.')
roar();
document.getElementById('dummy').focus()
//initialize keyboard on touching hangword div -- mobile
hangWord.addEventListener('touchend', openKeyboard)




//Auxillary UI experience -- cpu
dinopad.addEventListener('mouseover', dinoAction);
dinopad.addEventListener('mouseout', dinoReturn);
dinopic.ondblclick = roar;

//Auxillary UI experience -- mobile
dinopad.addEventListener('touchend', dinoAction);
document.body.ontouchstart = function(){ dinopad.blur()};
//dinopad.addEventListener('touchend', dinoReturn );
dinopad.addEventListener('touchstart', roar);


//Gameplay
//main function for key events
document.addEventListener('keyup', function (event){
    console.log("event key:"+ event.key);
    //capitalize key letter for comparison
    const capLetter = event.key.toUpperCase();
    console.log("capLetter: "+capLetter);
    //check that key pressed is aplphabetic and a single letter
    if  (capLetter.match(/[A-Z]{1,1}/) && capLetter.length<2){
        //check boolean that key letter is not in newWord
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
                winsDiv.innerHTML = wins;
                dinopic.innerHTML = '<img   src="'+ dinosaurCollection[newWord]+'" alt="dinosaur picture"/>';
                figcaption.innerHTML = newWord;
                roar();
                console.log(newWord)
                set();   
                }
            }
        }
    })











