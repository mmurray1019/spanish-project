namespace SpriteKind {
    export const Minimap = SpriteKind.create()
    export const player_2d = SpriteKind.create()
    export const Sprite_Helper = SpriteKind.create()
    export const Placeholder = SpriteKind.create()
    export const Paula_sprite = SpriteKind.create()
    export const Character = SpriteKind.create()
    export const civillian = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Pavillion_Enter_Location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Enter?")) {
        _2dify()
        pavillion()
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`Paris`)
        tiles.placeOnRandomTile(player_3D, assets.tile`pavilion_exit_location`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Church_Enter_Location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Enter?")) {
        _2dify()
        church()
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`Paris`)
        tiles.placeOnRandomTile(player_3D, assets.tile`church_exit_location`)
    }
})
function _2dify () {
    Paula.follow(Paula_Follower, 70)
    Paula.setScale(0.9, ScaleAnchor.Bottom)
    Render.setViewMode(ViewMode.tilemapView)
    Player2d = sprites.create(assets.image`Luis`, SpriteKind.player_2d)
    controller.moveSprite(Player2d)
    cameraOffsetScene.cameraFollowWithOffset(Player2d, 0, -30)
    player_3D.setImage(assets.image`Hidden_Player_Sprite`)
    player_3D.setFlag(SpriteFlag.Invisible, true)
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu == 0) {
        Paula.setFlag(SpriteFlag.Invisible, true)
        if (Render.isViewMode(ViewMode.raycastingView)) {
            menu = 1
            Render.toggleViewMode()
            Render.move(Render.getRenderSpriteInstance(), 0, 0)
            scene.setBackgroundImage(assets.image`Blank_Background`)
            player_3D.setImage(assets.image`Luis`)
            Render.moveWithController(0, 0, 0)
            myMinimap = minimap.minimap(MinimapScale.Original, 2, 0)
            Minimap_sprite = sprites.create(minimap.getImage(minimap.minimap(MinimapScale.Quarter, 2, 0)), SpriteKind.Minimap)
            Minimap_sprite.setStayInScreen(true)
            myMinimap = minimap.minimap(MinimapScale.Quarter, 0, 0)
            minimap.includeSprite(myMinimap, player_3D, MinimapSpriteScale.Double)
            player_3D.setImage(assets.image`Hidden_Player_Sprite`)
            Minimap_sprite.setImage(minimap.getImage(myMinimap))
            tiles.setCurrentTilemap(tilemap`Blank_map`)
        } else if (Render.isViewMode(ViewMode.tilemapView)) {
            menu = 2
            Current_tilemap = tiles.getLoadedMap()
            controller.moveSprite(Player2d, 0, 0)
            Player2d.setImage(assets.image`Hidden_Player_Sprite`)
            tiles.setCurrentTilemap(tilemap`Blank_map`)
            Not_Avalible = textsprite.create("Map Not Avalible", 8, 2)
            tiles.placeOnTile(Not_Avalible, Player2d.tilemapLocation())
        }
    } else if (menu == 1) {
        Paula.setFlag(SpriteFlag.Invisible, false)
        player_3D.setImage(assets.image`Hidden_Player_Sprite`)
        tiles.setCurrentTilemap(tilemap`Paris`)
        scene.setBackgroundImage(assets.image`Paris_BG`)
        Render.move(player_3D, 60)
        Render.moveWithController(2)
        Render.toggleViewMode()
        sprites.destroy(Minimap_sprite)
        menu = 0
    } else if (menu == 2) {
        Paula.setFlag(SpriteFlag.Invisible, false)
        menu = 0
        sprites.destroy(Not_Avalible)
        tiles.loadMap(tiles.createMap(tilemap`Spanish_Pavillion`))
        controller.moveSprite(Player2d, 100, 100)
        Player2d.setImage(assets.image`Luis`)
    }
})
scene.onOverlapTile(SpriteKind.player_2d, assets.tile`wood_floor_exit_location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    if (game.ask("Exit?")) {
        _3Dify()
        if (Pavillion_active == 1) {
            tiles.placeOnRandomTile(player_3D, assets.tile`pavilion_exit_location`)
        } else {
            tiles.placeOnRandomTile(player_3D, assets.tile`church_exit_location`)
        }
    } else {
        if (Pavillion_active == 1) {
            tiles.setCurrentTilemap(tilemap`Spanish_Pavillion`)
        } else {
            tiles.setCurrentTilemap(tilemap`Sante-Chapelle`)
        }
        tiles.placeOnRandomTile(Player2d, assets.tile`wood_floor_enter_location`)
    }
})
function Guernica_Pedistal_Cutscene () {
    cutscene_activator = 1
    tiles.loadMap(tiles.createMap(tilemap`Spanish_Pavillion`))
    story.startCutscene(function () {
        controller.moveSprite(Player2d, 0, 0)
        Speech_talking_indicator = textsprite.create("Paula", 6, 1)
        Speech = textsprite.create("Es Guernica!", 12, 1)
        Speech_talking_indicator.setStayInScreen(true)
        Speech.setStayInScreen(true)
        Speech_talking_indicator.setFlag(SpriteFlag.Ghost, true)
        Speech.setFlag(SpriteFlag.Ghost, false)
        Speech.z = -2
        tiles.placeOnTile(Speech_talking_indicator, tiles.getTileLocation(1, 3))
        tiles.placeOnTile(Speech, tiles.getTileLocation(1, 4))
        pause(2000)
        Speech.setText("Yo Veo Simbolos")
        pause(5000)
        Speech.setText("Guernica tiene information")
        Speech_line_2 = textsprite.create("de la lanza!", 12, 1)
        Speech_line_2.setStayInScreen(true)
        tiles.placeOnTile(Speech_line_2, tiles.getTileLocation(1, 5))
        pause(5000)
        Speech.setText("Donde esta una casa ")
        Speech_line_2.setText("grande?")
        pause(5000)
        Speech_talking_indicator.setText("Luis")
        Speech.setText("Es la Sante-Chapelle! ")
        Speech_line_2.setText("Vamos!")
        pause(5000)
        sprites.destroy(Speech_talking_indicator)
        sprites.destroy(Speech)
        sprites.destroy(Speech_line_2)
        controller.moveSprite(Player2d, 100, 100)
        cutscene_activator = 0
    })
}
function Paris_civillians () {
    mySprite2 = sprites.create(assets.image`civillian_1`, SpriteKind.civillian)
    mySprite3 = sprites.create(img`
        . . . . . . f f f . . . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . f 1 6 6 6 1 6 f . . . . 
        . . . f 1 6 6 6 6 6 1 6 f . . . 
        . . . f 6 6 f f f f 6 1 f . . . 
        . . . f 6 f f d d f f 6 f . . . 
        . . f 6 f d f d d f d f 6 f . . 
        . . f 6 f d 3 d d 3 d f 6 f . . 
        . . f 6 6 f d d d d f 6 6 f . . 
        . f 6 6 f 3 f f f f 3 f 6 6 f . 
        . . f f d 3 5 3 3 5 3 d f f . . 
        . . f d d f 3 5 5 3 f d d f . . 
        . . . f f 3 3 3 3 3 3 f f . . . 
        . . . f 3 3 5 3 3 5 3 3 f . . . 
        . . . f f f f f f f f f f . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    mySprite4 = sprites.create(img`
        . . . . . . . c c c . . . . . . 
        . . . . . . c b 5 c . . . . . . 
        . . . . c c c 5 5 c c c . . . . 
        . . c c b c 5 5 5 5 c c c c . . 
        . c b b 5 b 5 5 5 5 b 5 b b c . 
        . c b 5 5 b b 5 5 b b 5 5 b c . 
        . . f 5 5 5 b b b b 5 5 5 c . . 
        . . f f 5 5 5 5 5 5 5 5 f f . . 
        . . f f f b f e e f b f f f . . 
        . . f f f 1 f b b f 1 f f f . . 
        . . . f f b b b b b b f f . . . 
        . . . e e f e e e e f e e . . . 
        . . e b c b 5 b b 5 b f b e . . 
        . . e e f 5 5 5 5 5 5 f e e . . 
        . . . . c b 5 5 5 5 b c . . . . 
        . . . . . f f f f f f . . . . . 
        `, SpriteKind.Player)
    mySprite5 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
}
function _3Dify () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Placeholder)
    tiles.placeOnTile(Player2d, tiles.getTileLocation(0, 0))
    Render.setViewMode(ViewMode.raycastingView)
    Player2d.setFlag(SpriteFlag.Invisible, true)
    sprites.destroy(Player2d)
    controller.moveSprite(Player2d, 0, 0)
    scene.setBackgroundImage(assets.image`Paris_BG`)
    tiles.setCurrentTilemap(tilemap`Paris`)
    scene.cameraFollowSprite(player_3D)
    Render.setSpriteAttribute(player_3D, RCSpriteAttribute.ZOffset, -11)
    tiles.placeOnTile(Paula, tiles.locationInDirection(tiles.locationOfSprite(player_3D), CollisionDirection.Left))
    Paula.setScale(0.5, ScaleAnchor.Bottom)
    Paula.follow(Paula_Follower, 40)
}
function pavillion () {
    tiles.setCurrentTilemap(tilemap`Spanish_Pavillion`)
    tiles.placeOnRandomTile(player_3D, assets.tile`Guernica 0-2`)
    scene.setBackgroundImage(assets.image`Blank_Background`)
    tiles.placeOnRandomTile(Player2d, assets.tile`wood_floor_enter_location`)
    tiles.placeOnRandomTile(Paula, assets.tile`wood_floor_exit_location`)
    Pavillion_active = 1
}
function church () {
    tiles.setCurrentTilemap(tilemap`Sante-Chapelle`)
    tiles.placeOnRandomTile(Paula, assets.tile`wood_floor_exit_location`)
    tiles.placeOnRandomTile(Player2d, assets.tile`wood_floor_enter_location`)
    for (let value of tiles.getTilesByType(assets.tile`Column`)) {
        mySprite = sprites.create(assets.image`Column_Placeholder`, SpriteKind.Placeholder)
        tiles.placeOnTile(mySprite, value)
        mySprite.z = 2
    }
    for (let value of tiles.getTilesByType(assets.tile`Wood_Floor2`)) {
        mySprite = sprites.create(assets.image`Cat_column_placeholder`, SpriteKind.Placeholder)
        tiles.placeOnTile(mySprite, value)
        mySprite.z = 2
    }
    scene.setBackgroundImage(assets.image`Blank_Background`)
}
/**
 * Don't forget to add people in paris
 */
let textSprite: TextSprite = null
let A_Press_Indicator = 0
let mySprite: Sprite = null
let mySprite5: Sprite = null
let mySprite4: Sprite = null
let mySprite3: Sprite = null
let mySprite2: Sprite = null
let Speech_line_2: TextSprite = null
let Speech: TextSprite = null
let Speech_talking_indicator: TextSprite = null
let cutscene_activator = 0
let Pavillion_active = 0
let Not_Avalible: TextSprite = null
let Current_tilemap: tiles.WorldMap = null
let Minimap_sprite: Sprite = null
let myMinimap: minimap.Minimap = null
let Player2d: Sprite = null
let Paula: Sprite = null
let Paula_Follower: Sprite = null
let menu = 0
let player_3D: Sprite = null
story.startCutscene(function () {
    game.showLongText("Use WSAD or arrow keys to move.", DialogLayout.Bottom)
})
player_3D = Render.getRenderSpriteVariable()
Render.move(player_3D, 60, -250)
tiles.setCurrentTilemap(tilemap`Paris`)
menu = 0
scene.setBackgroundImage(assets.image`Paris_BG`)
Paula_Follower = sprites.create(assets.image`Hidden_Player_Sprite`, SpriteKind.Sprite_Helper)
let Enemy_follower = sprites.create(assets.image`Hidden_Player_Sprite`, SpriteKind.Sprite_Helper)
let Enemy_follower_2 = sprites.create(assets.image`Hidden_Player_Sprite`, SpriteKind.Sprite_Helper)
Paula = sprites.create(assets.image`Paula`, SpriteKind.Paula_sprite)
let Mario = sprites.create(assets.image`Mario`, SpriteKind.Character)
let Javier = sprites.create(assets.image`Javier`, SpriteKind.Character)
Paula.follow(Paula_Follower, 40)
Mario.follow(Enemy_follower_2, 40)
Javier.follow(Enemy_follower, 60)
Paula.setScale(0.5, ScaleAnchor.Bottom)
Mario.setScale(0.4, ScaleAnchor.Bottom)
Javier.setScale(0.7, ScaleAnchor.Bottom)
Enemy_follower.setFlag(SpriteFlag.Invisible, true)
Enemy_follower_2.setFlag(SpriteFlag.Invisible, true)
Paula_Follower.setFlag(SpriteFlag.Invisible, true)
game.onUpdate(function () {
    if (Render.isViewMode(ViewMode.tilemapView) && (A_Press_Indicator == 0 && tiles.tileAtLocationEquals(Player2d.tilemapLocation(), assets.tile`A_indicator_overlap`))) {
        A_Press_Indicator = 1
        textSprite = textsprite.create("")
        textSprite.setIcon(img`
            ..........666666666666..........
            ........6667777777777666........
            ......66677777777777777666......
            .....6677777779999777777766.....
            ....667777779966669977777766....
            ....677777799668866117777776....
            ...66777779966877861197777766...
            ...66777799668677686699777766...
            ...88777796688888888669777788...
            ...88777788888888888888777788...
            ...88977888679999997688877988...
            ...88977886777777777768877988...
            ...88997777777777777777779988...
            ...88799777777777777777711788...
            ...88679997777777777779117688...
            ..cc866679999999999999976668cc..
            .ccbc6666679999999999766666cbcc.
            .fcbcc66666666666666666666ccbcf.
            .fcbbcc666666666666666666ccbdcf.
            .f8bbbccc66666666666666cccbddcf.
            .f8cbbbbccccccccccccccccbdddbcf.
            .f8ccbbbbbccccccccccccb111ddccf.
            .f6ccccbbbddddddddddddd111dcccf.
            .f6ccccccbbddddddddddddddbbcccf.
            .f6cccccccccccccbbbbbbbbbdbcccf.
            ..f6cccccccccbbbbbbbbbbbddbccf..
            ..f6cccccccccbbbbbbbbbbbddbccf..
            ..ff6ccccccccbbbbbbbbbbbddbcff..
            ...ff6cccccccbbbbbbbbbbbddbff...
            ....ffcccccccbbbbbbbbbbbdbff....
            ......ffccccbbbbbbbbbbbbff......
            ........ffffffffffffffff........
            `)
        textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
        textSprite.setPosition(143, 106)
    } else if (Render.isViewMode(ViewMode.tilemapView) && (A_Press_Indicator == 1 && !(tiles.tileAtLocationEquals(Player2d.tilemapLocation(), assets.tile`A_indicator_overlap`)))) {
        textSprite.setIcon(assets.image`Hidden_Player_Sprite`)
        sprites.destroy(textSprite)
        A_Press_Indicator = 0
    }
    if (cutscene_activator == 0 && (A_Press_Indicator == 1 && controller.A.isPressed())) {
        if (Pavillion_active == 1) {
            Guernica_Pedistal_Cutscene()
        } else {
        	
        }
    }
    if (Render.isViewMode(ViewMode.raycastingView)) {
        tiles.placeOnTile(Paula_Follower, tiles.locationInDirection(tiles.locationOfSprite(player_3D), CollisionDirection.Left))
        tiles.placeOnTile(Enemy_follower, tiles.locationInDirection(tiles.locationInDirection(tiles.locationInDirection(tiles.locationOfSprite(player_3D), CollisionDirection.Right), CollisionDirection.Right), CollisionDirection.Right))
        tiles.placeOnTile(Enemy_follower_2, tiles.locationInDirection(tiles.locationInDirection(tiles.locationOfSprite(player_3D), CollisionDirection.Right), CollisionDirection.Right))
        Mario.follow(Enemy_follower_2, 40)
        Javier.follow(Enemy_follower, 60)
        Mario.setFlag(SpriteFlag.Invisible, false)
        Javier.setFlag(SpriteFlag.Invisible, false)
    } else if (Render.isViewMode(ViewMode.tilemapView)) {
        tiles.placeOnTile(Paula_Follower, tiles.locationInDirection(tiles.locationOfSprite(Player2d), CollisionDirection.Bottom))
        Mario.follow(Enemy_follower_2, 0)
        Mario.setFlag(SpriteFlag.Invisible, true)
        Javier.setFlag(SpriteFlag.Invisible, true)
        Javier.follow(Enemy_follower, 0)
    }
})
