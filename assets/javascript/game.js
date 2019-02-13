let wins = 0;

const wordBank = ['TYRANNOSAURUS','DIMETRODON','SPINOSAURUS','BRACHIOSAURUS'];
function play(){
    //letters already guessed
    const guessLetters = [];
    document.querySelector('.letters').innerHTML= guessLetters;
    const rand = Math.floor(Math.random()*wordBank.length);
    //starting guesses
    let guesses = 12;
    //print starting guesses
    document.querySelector('.guesses').innerHTML= guesses;
    //choose random word from wordbank
    const word = wordBank[rand];
    const newWord= word;
    console.log("bank index and new word: " +rand +" "+ newWord);
    //hangman blanks node
    const hangWord = document.querySelector('.hangword');
    hangWord.innerHTML = "";
    //build letter blanks for hangword
    for (i=0;i<newWord.length;i++){
        hangWord.innerHTML+=" _"
    };
    console.log("new word after blanks: "+ newWord);
    let str = "";
    
    //main function for key events
    document.addEventListener('keyup',function key(){
        
        console.log("event key:"+ event.key)
        //capitalize key letter for comparison
        const capLetter = event.key.toUpperCase();
        console.log("capLetter: "+capLetter);
        //check that key pressed is aplphabetic and a single letter
        if  (capLetter.match(/[A-Z]{1,1}/) && capLetter.length<2){
            if(newWord.indexOf(capLetter)==-1){
                //check boolean that the key letter has not been guessed already
                if(guessLetters.indexOf(capLetter)==-1){
                    //decrement guesses since letter has not been guessed already
                    if (guesses<1){
                        alert("You are out of Guesses! The game will restart after closing this box.");
                        play();}
                    else {
                        guesses--;
                        //print number of guesses left
                        document.querySelector('.guesses').innerHTML= guesses;
                        //check boolean that the key letter is not in newWord
                        //add letter to array of guessed letters
                        guessLetters.push(capLetter);
                        //print array of guessed letters 
                        document.querySelector('.letters').innerHTML= guessLetters;
                    }
                }
            }
            else {
                let indexArray = []
                // 
                str = hangWord.innerHTML.trim().split( " ")
                console.log("first: " +str +" length:"+str.length )
                
                for (i=0;i<newWord.length;i++){
                    if (capLetter === newWord[i]){
                        indexArray.push(i)
                    }
                }
                console.log("newWord in else: "+newWord)
                console.log("index array: "+indexArray)
                for (i=0;i<indexArray.length;i++){
                    let index = indexArray[i];
                    str[index]= capLetter
                    console.log("each iteration of subbing array: "+str[index] + index)
                    //  newStr = (newStr.substring(0,index) + newWord[index] + newStr.substring((index+1),newWord.length)).concat();
                }
                console.log("second: " +str);
                console.log(event.key)
                console.log("")
                let splitStr = str.join(" ",",");
                //console.log(splitStr);
                hangWord.innerHTML = splitStr;
                //index = newWord.indexOf(capLetter);
                //
                event.key=null
                //
                const compare = hangWord.innerHTML.replace(/\s/g,"");
                if (newWord==compare){
                    wins++;
                    document.querySelector('.wins').innerHTML = wins;
                   
                    document.removeEventListener('keyup', key());
                    
                    console.log(event.key)
                    hangWord.innerHTML = "<p>You Win!<p><br><button onclick='play()' class='btn btn-success'>Play Again!</button>";
                    
                    ///ADD WINNING FUNCTIONs
                    

                }
            }
        }
    })
}
play()
//
//&& capLetter.match(/^[A-Z]+$/)