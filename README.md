#Forge

An awesome pixel RPG being made for the liberated pixel cup competition.

## What we have done

### Coding:

- Character moves around with W-A-S-D
- The world is stored in an array
- monsters
- collisions
- Normalize x,y coordinates, use context.translate to keep it centred
- Make x,y represent the centre of each drawable object, rather than top left
- Collisions: character -> terrain
- Parse the world file once at initialization instead of on each frame
- Map making palette
- NPC's

### Art:

- Black Shirt
- Black Pants (they were dark green before so I changed their colour)

## What we need to do

### Coding:

- Collisions: monster -> character, character -> monster
- Pre-draw character with clothes into an off-screen buffer to reduce duplicate drawing
- Collision: monster -> terrain
- Move AI into its own function, make character controls a special form of AI
- better AI for monsters each type of monster should have tons of different attributes (can be stored in objects)
- Databases (personal database and online database)
- Server for multiplayer
- Create worlds and maps for singleplayer and multiplayer
- Minimap
- leveling up / exp
- inventory
- Gold
- Materials (you can pay NPC's to make these into something)


### Art:

- Titlescreen / UI
- Art for character (clothes, armour, weapons, hair etc.)
- Art for items in the inventory (clothes, armour, weapons, potions, materials etc.)
- spritesheets for scenery, buildings etc.
- icons (gold etc.)