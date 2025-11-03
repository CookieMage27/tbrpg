class Item {
    constructor(isWeapon, isArmor, isFood, isKey, value, name){
        this.isWeapon = isWeapon
        this.isFood = isFood
        this.isKey = isKey
        this.isArmor = isArmor
        this.value = value
        this.name = name
    }
}

const nl = "<br>"
const roomDescriptions = {

    0: {
        north: {
            room:0,
            wall:true,
            door:false,
            keyName: "",
            deletesKey:false,
            item:false,
            object: new Item(false, false, false, false, 0, "B L A N K"),
            text: "this is north",
            itemText: "there is B L A N K",
        },
        east: {
            room:0,
            wall:true,
            item:false,
            text: "",
        },
        south: {
            room:0,
            wall:true,
            item:false,
            text: "",
        },
        west: {
            room:0,
            wall:true,
            item:false,
            text: "",
        },
        down: {
            room:0,
            wall:true,
            item:false,
            text: "",
        },
        up: {
            room:0,
            wall:true,
            item:false,
            text: "",
        },
        npc: {
            exists: true,
            npcId: 0,
        },
        name: "Default Pointer Room",
        text: "default room because you didnt put in a new pointers",
    },
    1: {
        north: {
            room:2,
            wall:true,
            door:true,
            keyName: "First Key",
            deletesKey:true,
            item:true,
            object: new Item(false, false, true, false, 20, "Potion"),
            text: "You walk over to the north door",
            doorText: "the key opens the door",
            itemText: "there is a Potion on the floor next to it",
        },
        east: {
            room:1,
            wall:true,
            item:true,
            object: new Item(false, false, false, true, 1, "First Key"),
            text: "You walk over to the east wall, there is a shelf",
            itemText: "on that shelf there is a Key",
        },
        south: {
            room:10,
            wall:true,
            door:true,
            item:false,
            keyName: "Candle",
            deletesKey:true,
            text: `You walk over to the south, there is a painting on the wall, it ${nl}appears to be a memorial to someone, there is a candleholder${nl}on a small table right below it`,
            doorText:`The candle fits into the holder perfectly, the painting and table${nl}slowly disappear, revealing a hole to the outside`,
        },
        west: {
            room:3,
            wall:false,
            item:false,
            text: `You walk over to the west to the small dim corridor${nl}as you walk it gets darker. It becomes cave-like,${nl} but it brightens up again as your eyes adjust`,
        },
        down: {
            room:1,
            wall:true,
            item:false,
            text: "looking at your feet, there are just floorboards",
        },
        up: {
            room:1,
            wall:true,
            item:false,
            text: "looking at the ceiling, there is a small light bulb lighting the room",
        },
        npc: {
            exists: true,
            npcId: 0,
        },
        name: "Starting Area",
        text: `The room has a broken chair in the corner, there are no windows.${nl}There is a door to the north, a rather large painting to the south,${nl}a dim corridor to the west and a shelf on the east wall`,

    },
    2: {
        north: {
            room:2,
            wall:true,
            item:true,
            object: new Item(true, false, false, false, 1, "Knife"),
            text: "you walk over to the counter",
            itemText: "on the counter there is a Knife",
        },
        east: {
            room:5,
            wall:false,
            item:false,
            text: "you go east, walking over the tiles to the first area of the living room",
        },
        south: {
            room:1,
            wall:false,
            item:false,
            text: "you go south",
        },
        west: {
            room:4,
            wall:false,
            item:false,
            text: "you go west, walking over the even scarier tiles to get to the dining area",
        },
        down: {
            room:0,
            wall:true,
            item:false,
            text: "the more you start at the floor tiles the more they seem to grow, you look away",
        },
        up: {
            room:0,
            wall:true,
            item:false,
            text: "there is a hole to what seems to be the attic up there, but the walls are all fleshy",
        },
        npc: {
            exists: true,
            npcId: 1,
        },
        name:`The Kitchen`,
        text: `The floor seems to have once been kitchen tiles, but they seem to have grown into each other${nl}there is a counter to the north, a dining room to the west, and what ${nl}appears to be a living room to the east, and a door to the starting room to the south`,

    },
    3: {
        north: {
            room:3,
            wall:true,
            item:true,
            object: new Item(false, false, false, true, 0, "Golden Key"),
            text: `you walk over to a small cubby in the wall`,
            itemText: "there is a golden key sitting there",
        },
        east: {
            room:1,
            wall:false,
            item:false,
            text: "you head back through the corridor back to the starting area",
        },
        south: {
            room:3,
            wall:true,
            item:false,
            text: "you walk over to the wall, almost bonking your head on a stalagtite, you dont see anything on the wall",
        },
        west: {
            room:3,
            wall:true,
            item:false,
            text: "literally an empty wall",
        },
        down: {
            room:11,
            wall:false,
            item:false,
            text: `you decide to jump down the hole anyway, as you fall, you notice that there is no${nl} handholds back up, you think to yourself that this is where those people online ${nl}must live who know nothing about pop culture`,
        },
        up: {
            room:3,
            wall:true,
            item:false,
            text: "the ceiling has natural forming spikes",
        },
        npc: {
            exists: true,
            npcId: 2,
        },
        name: "Cave-Like dead end",
        text: `as you enter, you see a cubby formation in the rock formation, you alse see a deep bottomless${nl} looking hole in the floor going downward, you cannot see a bottom,${nl} I dont suggest jumping down`,
    },
    4: {
        north: {
            room:4,
            wall:true,
            item:false,
            text: `Just some yellow wallpaper`,
        },
        east: {
            
            room:2,
            wall:false,
            item:false,
            text: "you head back out to the kitchen",
        },
        south: {
            room:4,
            wall:true,
            item:false,
            text: "Just some yellow wallpaper, its a bit moldy though",
        },
        west: {
            room:4,
            wall:true,
            item:true,
            object: new Item(false, false, true, false, 317, "Cake"),
            text: "There is a small table",
            itemText: "on the table there is a Cake, guess it wasn't a lie",
            
        },
        down: {
            room:4,
            wall:false,
            item:false,
            text: `wet soggy carpet, as you look down, feeling like you entered the room again, ${nl}what a weird case of deja vu`,
        },
        up: {
            room:4,
            wall:true,
            item:false,
            text: "there is a large fluorescent tube lighting the ceiling, the humming noise it makes hurts your head",
        },
        npc: {
            exists: true,
            npcId: 3,
        },
        name: "Dining Room",
        text: `Aside from the soggy wet carpet and the yellow wallpaper, there is a table at the east end of the room, thats it`,
    },
    5: {
        north: {
            room:6,
            wall:false,
            item:false,
            text: `you head to the north end of the living room`,
        },
        east: {
            
            room:5,
            wall:true,
            item:true,
            object: new Item(false, false, true, false, -20, "Slimey Hairy Candy"),
            text: "you walk over to the chair to the east",
            itemText: "theres probably some old candy in the cushions",
        },
        south: {
            room:5,
            wall:true,
            item:false,
            text: "theres a tv over here, but its broken, it looks like an old recreation of something modern",
        },
        west: {
            room:2,
            wall:false,
            item:false,
            text: "you head back on over to the kitchen",
        },
        down: {
            room:5,
            wall:true,
            item:false,
            text: `nice solid wooden plank tiling, a bit dusty`,
        },
        up: {
            room:5,
            wall:true,
            item:false,
            text: "there is an old chandelier on the ceiling",
        },
        npc: {
            exists: true,
            npcId: 4,
        },
        name: "South Living Room",
        text: `Aside from the dusty wooden plank tiling, there is a cushion chair to the east, a broken tv, and a divider between the south and north ends of the room`,
    },
    6: {
        north: {
            room:6,
            wall:true,
            item:false,
            text: `a boarded up window, if you had a crowbar you might be able to open it,${nl}but alas that is outside of the scope of this beta`,
        },
        east: {
            
            room:6,
            wall:true,
            item:true,
            object: new Item(false, false, true, false, -70, "Slimier Hairier Candy"),
            text: "you walk over to the sofa to the east",
            itemText: "theres probably some old candy in the cushions",
        },
        south: {
            room:5,
            wall:false,
            item:false,
            text: "theres a tv over here, but its broken, it looks like an old recreation of something modern",
        },
        west: {
            room:7,
            wall:true,
            door:true,
            item:false,
            keyName: "Golden Key",
            deletesKey:false,
            text: `You walk over to the west door, without the key its locked pretty solidly${nl}the golden knob is quite flashy though`,
            doorText:`you push the golden key into the keyhole, it slides like butter in a hot pan, with a woosh of dust it opens on silent hinges${nl}the stairs go up to the attic`,
        },
        down: {
            room:6,
            wall:true,
            item:false,
            text: `nice solid wooden plank tiling, a bit dusty`,
        },
        up: {
            room:6,
            wall:true,
            item:false,
            text: "there is an older chandelier on the ceiling, its so loose your worried it might fall but luckily it doesnt",
        },
        npc: {
            exists: true,
            npcId: 5,
        },
        name: "North Living Room",
        text: `pretty much the same as the south end but theres a couch to the east, a boarded up window to the north, and a locked door to the west`,
    },
    7: {
        north: {
            room:7,
            wall:true,
            item:false,
            text: `the window here isnt boarded up, but all you see outside is swirling chaos,${nl}you start to lose yourself if you look out there for too long, so you look away`,
        },
        east: {
            
            room:6,
            wall:false,
            item:false,
            text: "you head back down the stairs, its quite dark",
        },
        south: {
            room:7,
            wall:true,
            item:true,
            object: new Item(false, false, false, true, 10, "Candle"),
            text: "you walk over to the south end and find some boxes",
            itemText: "theres a candle on top of one of them",
        },
        west: {
            room:7,
            wall:true,
            item:false,
            text: `You walk over to the west wall, skirting around the hole, nothin there`,
        },
        down: {
            room:2,
            wall:false,
            item:false,
            text: `you fall down the hole in the attic to the kitchen, the walls are all fleshy though,${nl} very gross, when you hit the bottom your legs ache a lot (would be -50 damage)`,
        },
        up: {
            room:6,
            wall:true,
            item:false,
            text: `some beams supporting the ceiling, you think you see eyes up there staring back${nl}but your probably imagining it`,
        },
        npc: {
            exists: true,
            npcId: 6,
        },
        name: "The Attic",
        text: `musty dusty attic, big gaping hole in the floor leading to the kitchen,${nl}which would probably damage you if i had time to implement that, there are some boxes to the south${nl}and a small round window to the north`,
    },
    10: {
        north: {
            room:1,
            wall:false,
            item:false,
            text: "you head out of the winning area to the starting area. you dont want to lose do you?",
        },
        east: {
            room:10,
            wall:false,
            item:false,
            text: "nothin left to do in this beta, you won!",
        },
        south: {
            room:10,
            wall:false,
            item:false,
            text: "nothin left to do in this beta, you won!",
        },
        west: {
            room:10,
            wall:false,
            item:false,
            text: "nothin left to do in this beta, you won!",
        },
        down: {
            room:10,
            wall:true,
            item:true,
            object: new Item(false, false, true, false, 729, "Twenty Seven Cookies"),
            text: "nothin left to do in this beta, you won",
            itemText: "but there is a pile of cookies on the floor!",
        },
        up: {
            room:10,
            wall:false,
            item:false,
            text: "no way out, you fell down remember",
        },
        npc: {
            exists: true,
            npcId: 9,
        },
        name: "YOU WIN YAY",
        text: `the outside area has a sign telling you that you won, and nothing but a pile of cookies on the floor`,
    },
    11: {
        north: {
            room:11,
            wall:false,
            item:false,
            text: "no way out",
        },
        east: {
            room:11,
            wall:false,
            item:false,
            text: "no way out 2: electric boogalo",
        },
        south: {
            room:11,
            wall:false,
            item:false,
            text: "no way out",
        },
        west: {
            room:11,
            wall:false,
            item:false,
            text: "no way out",
        },
        down: {
            room:11,
            wall:true,
            item:true,
            object: new Item(false, false, true, false, 27, "Cookie"),
            text: "no way out",
            itemText: "but there is a cookie",
        },
        up: {
            room:11,
            wall:false,
            item:false,
            text: "no way out, you fell down remember",
        },
        npc: {
            exists: true,
            npcId: 10,
        },
        name: "Bottom of the Pit(YOU LOST HAHA)",
        text: `you hit the bottom, there is no way out.${nl}there is a untouched cookie under a rock underneath you`,
    }
}

const npcDialogue = {
    0: {
        0:`W H E R E I S M Y F L E S H ${nl}${nl}`,
    },
    1: {
        0:`look away${nl}${nl}`,
    },
    2: {
        0:`im not down here${nl}${nl}`
    },
    3: {
        0:`the complex is real, the cake is a lie${nl}${nl}`
    },
    4: {
        0:`the tv aids the emergency${nl}${nl}`
    },
    5: {
        0:`key of gold in cave untold${nl}${nl}`
    },
    6: {
        0:`You are likely to be eaten by a grue${nl}${nl}`
    },
    9: {
        0:`You won so yay for you${nl}${nl}`
    },
    10: {
        0:`i live under a rock in a cave in a place between universes${nl}${nl}`
    },
}
export { roomDescriptions };
export { npcDialogue };
export { Item };
export { nl };