        let canvas = document.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;   
        //let wordsArray = listResp.split('\n');
        let word = wordsArray[random(wordsArray.length)];
        word = word.toUpperCase();
        console.log(word);
        let letters = word.split("");

        let ctx = canvas.getContext("2d");

        console.log(word);
        let tryLetters = [];
        let bubbles = [];
        let distance = 100;
        let actionError = 0;
        let hangerLevel0 = document.getElementById("hangerLevel0");
        let hangerLevel1 = document.getElementById("hangerLevel1");
        let hangerLevel2 = document.getElementById("hangerLevel2");
        let hangerLevel3 = document.getElementById("hangerLevel3");
        let hangerLevel4 = document.getElementById("hangerLevel4");
        let hangerLevel5 = document.getElementById("hangerLevel5");
        let hangerLevel6 = document.getElementById("hangerLevel6");
        let buttons = document.querySelectorAll(".key");


        let emojiAngry = document.getElementById("emojiAngry");
        let emojiCreying = document.getElementById("emojiCraying");
        let emojiHappy = document.getElementById("emojiHappy");
        let emojiSmill = document.getElementById("emojiSmill");

        class Bubble{
            constructor(xPos, yPos, letter) {
                this.xPos = xPos;
                this.yPos = yPos;
                this.letter = letter;
                this.rev = false;
                this.rediuse = 20;
            }
            drow(){
                
                if(this.rev === false){
                    ctx.beginPath();
                    ctx.fillStyle = 'rgb(0, 255, 0)';
                    ctx.arc(this.xPos, this.yPos, this.rediuse, 0, Math.PI * 2, false);
                    ctx.fill();
                }else{
                    ctx.beginPath();
                    console.log(this.letter);
                    ctx.fillStyle = 'rgb(0, 255, 0)';
                    ctx.font = "36px Georgia";
                    ctx.fillText(this.letter, this.xPos-16.5, this.yPos+12);
                }
                
            }
            set revl(lett){
                
                if(this.rev === false){
                    if(this.letter === lett){
                        this.rev = true;
                        character.emotion = 2;
                    }
                }
            }
        }

        class Hanger{
            constructor(xPos, yPos, img0, img1, img2, img3, img4, img5, img6){
                this.xPos = xPos;
                this.yPos = yPos;
                this.level = 0;
                this.img0 = img0;
                this.img1 = img1;
                this.img2 = img2;
                this.img3 = img3;
                this.img4 = img4;
                this.img5 = img5;
                this.img6 = img6;
            }
            drow(){
                switch(this.level){
                    case 0:
                        ctx.drawImage(this.img0, this.xPos, this.yPos);
                        break;
                    case 1:
                        ctx.drawImage(this.img1, this.xPos, this.yPos);
                        break;
                    case 2:                
                        ctx.drawImage(this.img2, this.xPos, this.yPos);
                        break;
                    case 3:
                        ctx.drawImage(this.img3, this.xPos, this.yPos);
                        break;
                    case 4:
                        ctx.drawImage(this.img4, this.xPos, this.yPos);
                        break;
                    case 5:
                        ctx.drawImage(this.img5, this.xPos, this.yPos);
                        break;
                    case 6:
                        ctx.drawImage(this.img6, this.xPos, this.yPos);
                        break;
                    default:
                        break;
                }
            }
            set updateLevel(level){
                this.level = level;
            }
        }

        class Character{
            constructor(xPos, yPos, img1, img2, img3, img4){
                this.xPos = xPos;
                this.yPos = yPos;
                this.img1 = img1;
                this.img2 = img2;
                this.img3 = img3;
                this.img4 = img4;
                this.emotion = 3;
            }
            drow(){
                switch(this.emotion){
                    case 0:
                        ctx.drawImage(this.img1, this.xPos, this.yPos);
                        break;
                    case 1:
                        ctx.drawImage(this.img2, this.xPos, this.yPos);
                        break;
                    case 2:                
                        ctx.drawImage(this.img3, this.xPos, this.yPos);
                        break;
                    case 3:
                        ctx.drawImage(this.img4, this.xPos, this.yPos);
                        break;
                }
            }
            set updateEmotion(emotion){
                this.emotion = emotion;
            }
        } 


        // Create new Class
        letters.forEach(letter => {    
            bubbles.push(new Bubble(distance,200,letter));
            distance += 40;
        });
        let character = new Character(1160, 370, emojiAngry, emojiCreying, emojiHappy, emojiSmill);
        let hanger = new Hanger(600, 0, hangerLevel0, hangerLevel1, hangerLevel2, hangerLevel3, hangerLevel4, hangerLevel5, hangerLevel6);

        //random function
        function random(max) {
            return Math.floor(Math.random() * max);
        }

        // for searching if the letter exists in the word bubble array
        function search(nameKey, myArray){
            for (i=0; i < myArray.length; i++) {
                if (myArray[i].letter === nameKey) {
                    return myArray[i];
                }
            }
        }

        // to update the display affter a button is clicked
        function updater(letter,button){
            tryLetters.push(letter);
            if(search(letter,bubbles) === undefined){
                button.style = "color:red";
                actionError += 1;
                hanger.level = actionError;
                character.emotion = 0;
            }
            if(actionError === 5){
                    character.emotion = 1;
            }
            if(actionError === 6){
                buttons.forEach(button=>{
                    button.disabled = true;
                    character.emotion = 4;
                    
                });
                alert(word);
            }
            button.disabled = true;
            setGame();
        }

        // the main display function
        function setGame(){
            tryLetters.forEach(letter=>{
                bubbles.forEach(bubble=>{
                    bubble.revl = letter;
                });
            });
            
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            hanger.drow();
            character.drow();
            bubbles.forEach(bubble => {
                bubble.drow();
            });
        }

        buttons.forEach(button =>{
            button.disabled = true;
            button.style = "color: #000000";
        });

        // event listeners for the buttons
        buttons.forEach((button)=>{
            button.addEventListener('click',()=>{
                updater(button.id,button);
            });
        });
        document.getElementById("start").addEventListener('click',()=>{
            bubbles = [];
            tryLetters = [];
            actionError = 0;
            distance = 100;
            buttons.forEach(button =>{
                button.disabled = false;
                button.style = "color: #000000";
            });
            letters.forEach(letter => {    
                bubbles.push(new Bubble(distance,200,letter));
                distance += 40;
            });
            character = new Character(1160, 370, emojiAngry, emojiCreying, emojiHappy, emojiSmill);
            hanger = new Hanger(600, 0, hangerLevel0, hangerLevel1, hangerLevel2, hangerLevel3, hangerLevel4, hangerLevel5, hangerLevel6);
            
            setGame();
        });
