import { roomDescriptions } from "./text-data.js";
import { npcDialogue } from "./text-data.js";
import { Item } from "./text-data.js";
import { nl } from "./text-data.js";

//defines console and text log
const consoleInput = document.querySelector(".console-input")
const historyContainer = document.querySelector(".console-history")
const inventoryContainer = document.querySelector(".inv-list")

//initiallize the textbox id
let textBoxId = 0;
//change this number as you wish its really just a optimiser
let textBoxLength = 25;
//starts the game
let hasGameStarted = false;
//talking flag
let isTalking = false;
let isInving = false;
let isUsingKey = false;
let dialogueCounter = 0;
let isEnterKey = false;
let itemCounter = 0;
let oldInput = "";
let currentSelectedKey = "";
let points = 0;
let moves = 0;
let isDead = false;
//just the default room

//ADDS A TEXTBOX
const addTextBox = function(input, isPlayer, isNameOfRoom = false) {
    //updates the textbox id
    textBoxId += 1;
    //creates a new div element
    const textLogElement = document.createElement("div");
    //assigns the class console input log to the new element
    if (isPlayer){
        textLogElement.classList.add("console-input-log");
    } else {
        textLogElement.classList.add("console-output-log");
    }
    if (isNameOfRoom) {
        textLogElement.classList.add("name-of-room-true");
    }
    //sets the id to the next textboxid
    textLogElement.setAttribute("id", textBoxId);
    //the actual text displayed to the user
    if (isPlayer) {
        textLogElement.textContent = ` > ${input}`;
    } else {
        textLogElement.innerHTML = input;
    }
    //adds the new element to the history container
    historyContainer.append(textLogElement)
}

const addInvItem = function(input) {

    const itemElement = document.createElement("div");

    itemElement.classList.add("item");
    itemElement.setAttribute("id", input.toLowerCase());

    itemElement.textContent = input;

    inventoryContainer.append(itemElement)
}
const removeInvItem = function(input) {

    const itemToRemove = document.getElementById(input)

    if (itemToRemove){
        itemToRemove.remove();
    }
}
const player = {
    health: 100,
    base_damage: 10,
    damage_modifier: 0,
    base_armor: 5,
    armor_modifier: 0,
    current_room: 0,
    money:0,
}
let inventory = [ ]
const roomLogic = function(input) {
    if (roomDescriptions[player.current_room][input].wall) {
        if (roomDescriptions[player.current_room][input].item){
            addTextBox(roomDescriptions[player.current_room][input].text + ", " + roomDescriptions[player.current_room][input].itemText, false)
        } else {
            addTextBox(roomDescriptions[player.current_room][input].text, false)
        }
    } 
    if (!roomDescriptions[player.current_room][input].wall) {
        addTextBox(roomDescriptions[player.current_room][input].text, false);
        player.current_room = roomDescriptions[player.current_room][input].room;
        if (typeof roomDescriptions[player.current_room].name !== "undefined"){
            addTextBox(roomDescriptions[player.current_room].name, false, true)
        }
        addTextBox(roomDescriptions[player.current_room].text, false);
        
    }
} 
const takeLogic = function(input) {
    if (roomDescriptions[player.current_room][input].item){
        addInvItem(roomDescriptions[player.current_room][input].object.name)
        roomDescriptions[player.current_room][input].item = false;
        addTextBox("you take the " + roomDescriptions[player.current_room][input].object.name, false);
        itemCounter++;
        inventory.push(roomDescriptions[player.current_room][input].object)
    } else {
        addTextBox("there isnt anything there", false);
    }

}
const room = function(input) {
    switch(input) {
        case "north":
            roomLogic("north")
            break;
        case "south":
            roomLogic("south")
            break;
        case "east":
            roomLogic("east")
            break;
        case "west":
            roomLogic("west")
            break;
        case "up":
            roomLogic("up")
            break;
        case "down":
            roomLogic("down")
            break;
        case "northTake":
            takeLogic("north")
            break;
        case "southTake":
            takeLogic("south")
            break;
        case "eastTake":
            takeLogic("east")
            break;
        case "westTake":
            takeLogic("west")
            break;
        case "upTake":
            takeLogic("up")
            break;
        case "downTake":
            takeLogic("down")
            break;
        }

}
const keyLogic = function(input) {
    if (typeof roomDescriptions[player.current_room][input].door !== "undefined") {
        if(roomDescriptions[player.current_room][input].door) {
            if(currentSelectedKey.name.toLowerCase() == roomDescriptions[player.current_room][input].keyName.toLowerCase()) {
                roomDescriptions[player.current_room][input].door = false;
                roomDescriptions[player.current_room][input].wall = false;
                addTextBox(roomDescriptions[player.current_room][input].doorText, false);
                if(roomDescriptions[player.current_room][input].deletesKey){
                    removeInvItem(roomDescriptions[player.current_room][input].keyName.toLowerCase());
                    addTextBox("The key crumbles after use", false);
                    console.log(inventory);
                    inventory = inventory.filter(item => item !== currentSelectedKey);
                    console.log(inventory);
                }
            } else {
                addTextBox("that key doesnt work here", false);
            }
        } else {
            addTextBox("the door is unlocked", false);
        }
    } else {
        addTextBox("there isnt a door there", false);
    }
}
const isValidCommand = function(input) {
    //the way this is set up is with flags activating and looping cascade events
    // it is trying to be as generalized as possible to retain reusability and simplification
    // now all that you need to do is return if something cascades and displays twice
    let inputText = input
    
    if (!isTalking && !isInving && !isUsingKey && hasGameStarted){
        moves++;
        switch(inputText) {
            case "help":
                addTextBox(`movement-${nl}north${nl}east${nl}south${nl}west${nl}up${nl}down${nl}or the first letters of each${nl}type take or t after moving to try to take an item from that direction${nl}or alternatively type "take (direction) or t(direction letter)${nl}inventory, inv, or i, will open the inventory, its a bit buggy, ${nl}and food items will be consumed instantly, any weapons and armor dont do anything currently${nl}if you want some lore type talk to hear voices in any given area`, false);
                break;
            case "hp":
            case "health":
                addTextBox("You have " + player.health + " health left", false);
                break;
            case "look":
                addTextBox(roomDescriptions[player.current_room].text, false);
                break;
            case "n":
            case "north":
                room("north")
                console.log("north")
                break;
            case "s":
            case "south":
                room("south")
                console.log("south")
                break;
            case "e":
            case "east":
                room("east")
                console.log("east")
                break;
            case "w":
            case "west":
                room("west")
                console.log("west")
                break;
            case "u":
            case "up":
                room("up")
                console.log("up")
                break;
            case "d":
            case "down":
                room("down")
                console.log("down")
                break;
            case "speak":
            case "talk":
                if (roomDescriptions[player.current_room].npc.exists) {
                    isTalking = true;
                    
                } else {
                    addTextBox("no one here", false);
                }
                break;
            case "t":
            case "take":
            case "pick up":
            case "pu":
                switch(oldInput){
                    case "n":
                    case "north":
                        room("northTake")
                        console.log("northTake")
                        break;
                    case "s":
                    case "south":
                        room("southTake")
                        console.log("southTake")
                        break;
                    case "e":
                    case "east":
                        room("eastTake")
                        console.log("eastTake")
                        break;
                    case "w":
                    case "west":
                        room("westTake")
                        console.log("westTake")
                        break;
                    case "u":
                    case "up":
                        room("upTake")
                        console.log("upTake")
                        break;
                    case "d":
                    case "down":
                        room("downTake")
                        console.log("downTake")
                        break;
                    default:
                        addTextBox("tell me where to take from first", false);
                    }
                break;
            case "take n":
            case "take north":
            case "tn":
                room("northTake")
                console.log("northTake")
                break;
            case "take s":
            case "take south":
            case "ts":
                room("southTake")
                console.log("southTake")
                break;
            case "take e":
            case "take east":
            case "te":
                room("eastTake")
                console.log("eastTake")
                break;
            case "take w":
            case "take west":
            case "tw":
                room("westTake")
                console.log("westTake")
                break;
            case "take u":
            case "take up":
            case "tu":
                room("upTake")
                console.log("upTake")
                break;
            case "take d":
            case "take down":
            case "td":
                room("downTake")
                console.log("downTake")
                break;
            case "start":
                addTextBox("start what again", false);
                break;
            case "i":
            case "inv":
            case "inventory":
                isInving = true;
                console.log("fire");
                break;
            default:
                addTextBox("dont recognize that bud", false);
                break;
        }
    }
    if (!hasGameStarted) {
        switch(inputText) {
            case "start":
                player.current_room = 1;
                hasGameStarted = true;
                addTextBox(roomDescriptions[player.current_room].name, false, true);
                addTextBox(`You wake up on the floor in an unfamiliar room with nothing ${nl}but the clothes on your back, you look around${nl}you have the bizzare ability to tell what direction is what at all times`, false);
                addTextBox(roomDescriptions[player.current_room].text, false);
                break;
            case "help":
                addTextBox("insert help list later", false);
                break;
            default:
                addTextBox("type start to begin dude", false);
                break;
        }
    }
    if (isTalking && !isInving && !isUsingKey) {     
        if (npcDialogue[roomDescriptions[player.current_room].npc.npcId][dialogueCounter]) {
            
            switch(inputText){
                case "y":
                case "yes":
                    addTextBox(npcDialogue[roomDescriptions[player.current_room].npc.npcId][dialogueCounter], false);
                    dialogueCounter += 1;
                    break;
                case "n":
                case "no":
                    addTextBox(npcDialogue[roomDescriptions[player.current_room].npc.npcId][dialogueCounter], false);
                    dialogueCounter += 1;
                    break;
                case "l":
                case "leave":
                    isTalking = false;
                    dialogueCounter = 0;
                    addTextBox(roomDescriptions[player.current_room].text, false);
                    break;
                case "talk":
                    addTextBox(npcDialogue[roomDescriptions[player.current_room].npc.npcId][dialogueCounter], false);
                    dialogueCounter += 1;
                    break;
                default:
                    addTextBox("what?", false);
                    addTextBox(npcDialogue[roomDescriptions[player.current_room].npc.npcId][dialogueCounter], false);
                    dialogueCounter += 1;
                    break;
            }
        } 
        if (!npcDialogue[roomDescriptions[player.current_room].npc.npcId][dialogueCounter]){
            isTalking = false;
            dialogueCounter = 0;
            addTextBox(roomDescriptions[player.current_room].text, false);
        }
    }
    if (isInving && !isUsingKey && !isTalking) {

        if (itemCounter > 0){
            
            for (let i = 0; i < inventory.length; i++){
                if(inventory[i]){
                    if(inventory[i].name.toLowerCase() === inputText.toLowerCase()) {
                        if (inventory[i].isWeapon) {
                            addTextBox("This is a weapon and I'll add its functionality later", false);
                        }
                        if (inventory[i].isArmor) {
                            
                            addTextBox("This is armor and you better add its functionality later or so help me God", false);
                        }
                        if (inventory[i].isFood) {
                            player.health += inventory[i].value;
                            addTextBox("you healed " + inventory[i].value + " health", false);
                            removeInvItem(inventory[i].name.toLowerCase())
                            inventory = inventory.filter(item => item !== inventory[i])
                            points++;
                            isInving = false;
                        }
                        if (inventory[i].isKey) {
                            isUsingKey = true;
                            currentSelectedKey = inventory[i]
                            addTextBox("In What direction should I use this key?", false);
                        } 
                        if (!inventory[i].isKey && !inventory[i].isFood && !inventory[i].isArmor && !inventory[i].isWeapon) {
                            addTextBox("this " + inventory[i].name + " seems to not have any qualities", false);
                        }
                        isInving = false;
                        return;
                    }
                    if(inputText.toLowerCase() === "leave" || inputText.toLowerCase() === "l" || inputText.toLowerCase() === "back" || inputText.toLowerCase() === "b") {
                        addTextBox("alright closing the inventory", false);
                        isInving = false;
                        return;
                    }
                } 
            }
            addTextBox("what item do you want to use? (type name of item)(type leave to back out)", false);
            
        } else {
            addTextBox("you dont have any items", false);
        }
        
    }
    if (isUsingKey && !isTalking && !isInving) {
        
        switch(input){
            case "n":
            case "north":
                keyLogic("north")
                console.log("northKey")
                break;
            case "s":
            case "south":
                keyLogic("south")
                console.log("south")
                break;
            case "e":
            case "east":
                keyLogic("east")
                console.log("eastKey")
                break;
            case "w":
            case "west":
                keyLogic("west")
                console.log("westKey")
                break;
            case "u":
            case "up":
                keyLogic("up")
                console.log("upKey")
                break;
            case "d":
            case "down":
                keyLogic("down")
                console.log("downKey")
                break;
            default:
                addTextBox("that isnt a direction for you silly", false);
                break;
        }
        points++;
        isUsingKey = false;
    }
    oldInput = inputText;
    consoleInput.value = "";
    historyContainer.scrollTop = historyContainer.scrollHeight;
}
function deleteOldTextBox(id, length) {
    //the cutoff value
    const cutoff = id - length;
    //loops through any undeleted element
    for (let i = 1; i <= cutoff; i++) {
        const elementToRemove = document.getElementById(i);
        if (elementToRemove) {
            elementToRemove.remove();
        }
    }
}
const enterPressed = function(input) {
    
    addTextBox(input, true);
    consoleInput.value = "";
    historyContainer.scrollTop = historyContainer.scrollHeight;
    setTimeout(isValidCommand, 400, input.toLowerCase())
    
    
}
//GAMEPLAY LOOP
const loop = function() {
    if(!isDead){
        let inputText = consoleInput.value.trim();
        //delete the oldest textbox that is textboxlength ago
        deleteOldTextBox(textBoxId, textBoxLength)
        
        //actual game logic, can technically just be a walking simulator without anything
        if (isEnterKey){
            //does anything when the enter key is pressed
            enterPressed(inputText);

            //makes this run once
            isEnterKey = false;
        }
    } else{
        deleteOldTextBox(textBoxId, textBoxLength)
        addTextBox(`Y O U A R E D E A D`, true);
        consoleInput.value = "";
        historyContainer.scrollTop = historyContainer.scrollHeight;
    }
    //does everything every frame(unefficient)

    //loop the main function}
    window.requestAnimationFrame(loop);
}

//KEY EVENTS

consoleInput.addEventListener("keyup", (e) => {
    //gets the raw console input text and trims whitespace on either end 
    let inputText = consoleInput.value.trim();
    if (e.key === "End") {
        //input text and is player
        addTextBox(`you died`, false);
        isDead = true;
    }
    //if there is not text
    if (inputText.length === 0) {
        return; 
    }
    //if there is more than 100 characters
    if (inputText.length >= 100) {
        return;
    }
    //if enter key is pressed add the console input
    if (e.key === "Enter") {
        //input text and is player
        isEnterKey = true;
        
    }
    
});
const rags = new Item(false, true, false, false, 10, "The clothes on your back")
addInvItem(rags.name)
itemCounter++;
inventory.push(rags)
console.log(inventory)
addTextBox(`Text based rpg (insert name later)${nl}Beta 1.0${nl}${nl}thanks for playing${nl}by CookieMage27${nl}type start to begin${nl}type help for commands list`, false);
addTextBox("", false);
//initiallize the loop

window.requestAnimationFrame(loop);
