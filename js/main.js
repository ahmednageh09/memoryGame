document.querySelector (".control-buttons span").onclick = function() {

    let yourName = prompt("What's your name? ");
    
    if (yourName == null || yourName == ""){
    
        document.querySelector(".name span").innerHTML = "UNKNOWN";
        
    } else {
    
        document.querySelector(".name span").innerHTML = yourName;
    };
    document.querySelector(".control-buttons").remove();
};
let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

//create range of keys
// let orderRange = Array.from(Array(blocks.length).keys());
let orderRange = [...Array(blocks.length).keys()];

//Trigger shuffle fuction
shuffle(orderRange);


blocks.forEach((block,index)=>{

    //add css property order to game blocks
    block.style.order = orderRange[index];
    
    //add click event
    block.addEventListener('click',function(){
    //trigger flip block function
        flipBlcok(block);
    });
});

//Flip Block Function
function flipBlcok(selectedBlock){
    //add Class is-flipped
    selectedBlock.classList.add("is-flipped");
    
    //Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter((flippedBlock) =>flippedBlock.classList.contains("is-flipped"));
    
    if(allFlippedBlocks.length === 2) {
    
            // Stop Clicking Function
            stopClicking() ;
            // Check Matched Blocks Function
            checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]) ;
    }
 
}

// Stop Clicking Function
function stopClicking() {

    //add the class no-clicking on Main Cintainer
    blocksContainer.classList.add("no-clicking");
    
    setTimeout(()=>{
    
    //remove no-clinking class after the duration
        blocksContainer.classList.remove("no-clicking");
        
    }, duration);
};

// Check Matched Blocks Function
function checkMatchedBlocks(firstBlock, secondBlock) {
    
    let triesElement = document.querySelector(".tries span");
    
    if(firstBlock.dataset.technology === secondBlock.dataset.technology) {
    
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.getElementById("success").play();

    } else {
    
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        document.getElementById("fail").play();

    setTimeout(() => {

      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');

        }, duration);

    }
}

//shuffle function
function shuffle(array){
    //setting vars
    let current = array.length,
        temp,
        random;
        
    while(current >0){
        
        //Get Random Number
        random = Math.floor(Math.random() * current);
        
        //Decrease Random By One
        current--;
        
        //[1]save current element in stash
        temp = array[current];
        //[2]current element = random element
        array[current] = array[random];
        //[3]random element = get elmemnt fro stash
        array[random] = temp;
    }
}
