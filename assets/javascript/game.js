//------------------------------------------ GLOBAL VARIABLES -------------------------------------------------//


//-------------- game data ----------------//
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



//----------- gameplay variables -----------//
let wins = 0;
//letters already guessed
let guessLetters = [];
//number of guesses left per round
let guesses;
//word chosen from wordBank
let newWord;
//words from previous (up to 5) rounds
const oldWords =[];
//string of letters from hangword for gameplay
let str;
//string of hangword contents after letters switched for key letter
let joinStr;
//stores html from hangword with spaces removed for comparing to new word
let compare;



//------------- js DOM variables -------------//
//hangman blanks node access variable
const hangWord = document.querySelector('#hangword');
//caption for dinosaur pic
const figcaption = document.getElementById('figcaption');
//div that dinosaur pic img element is placed in
const dinopic = document.getElementById('dinopic');
//div that dinopic and caption are inside of
const dinopad = document.querySelector('#dinopad');
//audio element
const audio = document.querySelector('audio');
//div for displaying wins 
const winsDiv = document.querySelector('#wins');
//div for letters already guessed
const letters = document.querySelector('#letters')
//div for number of guesses left
const guessLeft = document.querySelector('#guesses')
//div for instructions
const instruct = document.querySelector('#instruct')



//------------------------------------------ FUNCTIONS ------------------------------------------------//

//------------------- functions for game set ------------//
        //random number variable for index of wordBank
        function rand(){
            return Math.floor(Math.random()*wordBank.length);
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
            //normalize board style for gameplay
            hangWord.style.color = "white"
            hangWord.style.textDecoration = "unset"
            //print instructions
            instruct.innerHTML = "Press any key to get started!"
            //clear guessed letters
            guessLetters=[]
            //clear guess letter div
            letters.innerHTML= "Letters Already Guessed: " + guessLetters;
            //starting guesses
            guesses = 12;
            //print starting guesses
            guessLeft.innerHTML= "Guesses Left: " + guesses;
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
            
            }


//--------------------- functions for event listeners --------------//


        //---------- mobile setup -----------//
        
        function mobileSetup(){
            openKeyboard();
            preventMouseover();
            }

        function openKeyboard(){
            document.getElementById('dummy').focus()
            };


        //--- auxilary UI event handler funcs ----//

        function dinoAction(){
            dinopic.style.transition = ".6s";
            dinopic.style.transform = "scale(1.2)";
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
        
        function preventMouseover(){
            dinopic.removeEventListener('onmouseover', dinoAction);
            }


        //--------- gameplay event func -----------//
       
        function playGame(event){
            if (newWord!==compare){
                //clear instructions
                instruct.innerHTML = ""
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
                                guessLeft.innerHTML= "Guesses Left: " + guesses;
                                //add letter to array of guessed letters
                                guessLetters.push(capLetter);
                                //print array of guessed letters 
                                letters.innerHTML= "Letters Already Guessed: " + guessLetters;
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
                        joinStr = str.join(" ",",");
                        //console.log(splitStr);
                        //print adjusted hangword string
                        hangWord.innerHTML = joinStr;
                        //grab html from hangword and remove spaces with regEx to compare with newWord
                        compare = hangWord.innerHTML.replace(/\s/g,"");
                        // check if successful i.e. word guessed correct
                        if (newWord===compare){
                            //increment wins
                            wins++;
                            //print wins
                            winsDiv.innerHTML = "Wins: " + wins;
                            roar();
                            stars();
                            dinopic.innerHTML = '<img   src="'+ dinosaurCollection[newWord]+'" alt="dinosaur picture"/>';
                            figcaption.innerHTML = newWord;
                            hangWord.style.color = "orange";
                            hangword.style.textDecoration = "underline";
                            }
                        }
                    }
                }
            else{
                console.log(newWord);
                set();   
                }    
            }
        //-------------- win func ----------//
        function stars(){   
            var stage = new PIXI.Container();
            console.log(stage);
            var renderer = PIXI.autoDetectRenderer(window.innerWidth-4, window.innerHeight-4, );
            console.log(renderer);
            var _stars = [], _glows = [];
            var _nextStar = 0;
            var width, height, fontSize, textPixels, yOffset;
            var textCanvas, textCtx;

            var percent = 0;
            document.body.appendChild(renderer.view);
            renderer.render(stage);
            initCanvas();

            function begin(){
            resize();
            requestAnimationFrame( animate );
            };    

            var textures = [
            PIXI.Texture.fromImage("https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/neon-star.png"),
            PIXI.Texture.fromImage("https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/neon-star1.png"),
            PIXI.Texture.fromImage("https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/neon-star2.png"),
            PIXI.Texture.fromImage("https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/neon-star3.png"),
            PIXI.Texture.fromImage("https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/neon-star4.png")
            ];

            //create stars
            for (var i = 0; i < 600; i++) {
            createStar(textures[i%5]);
            console.log(i%5);
            }


            function createStar(text) {
            var star = new PIXI.Sprite(text);
            console.log("firststar: "+star)
            star.width = 5 + Math.random()*20;
            console.log(star.width);
            star.height = 5 + Math.random()*20;
            star.anchor.x = 0.5;
            console.log(star.anchor.x);
            star.anchor.y = 0.5;
            
            stage.addChild(star);
            star.alpha = 0;
            star.launched = false;
            _stars.push(star);
            console.log(_stars)
            
            
            }

            launchStar();

            function launchStar() {
            var star = _stars[_nextStar];
            console.log("star: " +star); 
            _nextStar = _nextStar == _stars.length-1 ? 0 : _nextStar + 1;
            star.launched = true;
            star.alpha = 1;
            var pos = textPixels[Math.floor(Math.random()*textPixels.length)];
            star.position.x = pos.x;
            star.position.y = yOffset + pos.y;
            
            star.vx = 1 + Math.random()*1;
            star.vy = -1 + Math.random()*-1;
            star.vr = -0.2 + Math.random()*0.4;
            star.p = 0;
            
            };



            function launchStarBatch() {
            for (var i = 0; i < 6; i++) {
                launchStar();
                
            }
            };
            
            function animate() {
            launchStarBatch();
            console.log("tarbatch laucnhed ------------------------------")
            requestAnimationFrame( animate );
            for (var i = 0; i < _stars.length; i++) {
                if(_stars[i].launched) {
                console.log("launched star --------------------------")
                var angle = Math.PI * (1-_stars[i].p);
                _stars[i].rotation += _stars[i].vr;
                _stars[i].position.x += _stars[i].vx + 0.5 * Math.cos(angle) + _stars[i].vx;
                _stars[i].position.y += _stars[i].vy + 0.5 * Math.sin(angle) + _stars[i].vy; 
                // _stars[i].vy += 0.04;
                _stars[i].p += _stars[i].vr;
                _stars[i].alpha -= 0.01;
                }
            }
            
            
            
            // render the stage   
           
            }

            // canvas
            function initCanvas() {
            textCanvas = document.getElementById('text');
            console.log(textCanvas);
            textCtx = textCanvas.getContext('2d');
            console.log(textCtx)
            begin();
            }

            function sampleCanvas() {
            textCtx.textAlign = 'center';
            textCtx.textBaseline = "top";
            textCtx.font = fontSize+'px "arial"';
            textCtx.fillStyle = 'aliceblue';
            
            textCtx.fillText('tyrannosaurus', width / 2, 0);

            var pix = textCtx.getImageData(0, 0, width, height).data;
            console.log("pix length: "+pix.length)
            textPixels = [];
            for (var i = pix.length; i >= 0; i -= 4) {
                if (pix[i] != 0) {
                var x = (i / 4) % width;
                var y = Math.floor(Math.floor(i / width) / 4);

                if ((x && x % 6 == 0) && (y && y % 6 == 0)) textPixels.push({
                    x: x,
                    y: y
                });
                }
            }
            console.log(textPixels)
            }

            window.addEventListener('resize', resize);



            function resize() {
            width = window.innerWidth;
            console.log("width: "+width)
            height = window.innerHeight;
            console.log("height: "+height)

            fontSize = width*0.14;
            if (fontSize > 50) fontSize = 50;
            yOffset = height*0.6 - (fontSize/2);
            renderer.resize(width, height);
            
            sampleCanvas();
            }

            


            }
//------------------------------------- GAME PLAY ACTIONS ----------------------------------------------//


//---------- Set Initial Board---------------//

set()
alert('Welcome to Dinosaur Hangman!\n\nFor mobile => touch the empty blanks to open your keypad.')
roar();
console.log(PIXI);
//initialize mobile keyboard

hangWord.addEventListener('touchend', mobileSetup);

//------------------------------- Gameplay -------------------------------------//

//MAIN FUNCTION - listener for key event
document.addEventListener('keypress', playGame);

//Auxillary UI experience -- cpu 
dinopic.addEventListener('mouseover', dinoAction)
dinopic.addEventListener('mouseout', dinoReturn);
dinopic.onclick = roar;

//Auxillary UI experience -- mobile 
dinopic.addEventListener('touchend', dinoAction);
document.body.addEventListener('touchend', dinoReturn);
//dinopad.addEventListener('touchend', dinoReturn );
dinopic.addEventListener('touchend', roar);













