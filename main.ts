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
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Enter?")) {
        _2dify()
        _4cat = 1
        _2dify()
        tiles.setCurrentTilemap(tilemap`Cuatros_Gatos`)
        tiles.placeOnRandomTile(Player2d, assets.tile`wood_floor_enter_location`)
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`barcelona`)
        tiles.placeOnRandomTile(player_3D, assets.tile`myTile1`)
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
function _4cat_cutscene () {
	
}
scene.onOverlapTile(SpriteKind.player_2d, assets.tile`wood_floor_exit_location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    if (game.ask("Exit?")) {
        _3Dify()
        if (Pavillion_active == 1) {
            tiles.placeOnRandomTile(player_3D, assets.tile`pavilion_exit_location`)
        } else if (_4cat == 1) {
            scene.setBackgroundImage(assets.image`Barcelona_BG`)
            tiles.setCurrentTilemap(tilemap`barcelona`)
            tiles.placeOnRandomTile(player_3D, assets.tile`myTile1`)
            _4cat = 0
        } else {
            tiles.placeOnRandomTile(player_3D, assets.tile`church_exit_location`)
        }
    } else {
        if (Pavillion_active == 1) {
            tiles.setCurrentTilemap(tilemap`Spanish_Pavillion`)
        } else if (_4cat == 1) {
            tiles.setCurrentTilemap(tilemap`Cuatros_Gatos`)
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
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu == 0) {
        Paula.setFlag(SpriteFlag.Invisible, true)
        if (Render.isViewMode(ViewMode.raycastingView)) {
            menu = 1
            Render.toggleViewMode()
            Render.move(player_3D, 0, 0)
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`exit_placeholder`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Va a Barcelona?")) {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`barcelona`)
        scene.setBackgroundImage(assets.image`Barcelona_BG`)
        tiles.placeOnRandomTile(player_3D, assets.tile`enter_placeholder`)
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`Paris`)
        tiles.placeOnRandomTile(player_3D, assets.tile`enter_placeholder`)
    }
})
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
function cat_cutscene () {
	
}
function Barcelona () {
	
}
let textSprite: TextSprite = null
let A_Press_Indicator = 0
let mySprite: Sprite = null
let Not_Avalible: TextSprite = null
let Current_tilemap: tiles.WorldMap = null
let Minimap_sprite: Sprite = null
let myMinimap: minimap.Minimap = null
let Speech_line_2: TextSprite = null
let Speech: TextSprite = null
let Speech_talking_indicator: TextSprite = null
let cutscene_activator = 0
let Pavillion_active = 0
let Player2d: Sprite = null
let _4cat = 0
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
Paula = sprites.create(assets.image`Paula`, SpriteKind.Paula_sprite)
Paula.follow(Paula_Follower, 40)
Paula.setScale(0.5, ScaleAnchor.Bottom)
Paula_Follower.setFlag(SpriteFlag.Invisible, true)
game.onUpdate(function () {
    if (Render.isViewMode(ViewMode.tilemapView) && (A_Press_Indicator == 0 && tiles.tileAtLocationEquals(Player2d.tilemapLocation(), assets.tile`A_indicator_overlap`))) {
        A_Press_Indicator = 1
        textSprite = textsprite.create("")
        textSprite.setIcon(assets.image`A`)
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
        } else if (_4cat == 1) {
            _4cat_cutscene()
        } else {
            cat_cutscene()
        }
    }
    if (Render.isViewMode(ViewMode.raycastingView)) {
        tiles.placeOnTile(Paula_Follower, tiles.locationInDirection(tiles.locationOfSprite(player_3D), CollisionDirection.Left))
    } else if (Render.isViewMode(ViewMode.tilemapView)) {
        tiles.placeOnTile(Paula_Follower, tiles.locationInDirection(tiles.locationOfSprite(Player2d), CollisionDirection.Bottom))
    }
})
