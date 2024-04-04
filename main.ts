namespace SpriteKind {
    export const Minimap = SpriteKind.create()
    export const player_2d = SpriteKind.create()
    export const Sprite_Helper = SpriteKind.create()
    export const Placeholder = SpriteKind.create()
    export const Paula_sprite = SpriteKind.create()
    export const Character = SpriteKind.create()
    export const civillian = SpriteKind.create()
    export const platformer = SpriteKind.create()
    export const Boss = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Pavillion_Enter_Location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Entra?")) {
        if (done1 == 0) {
            activity_count += 1
            done1 = 1
            story.startCutscene(function () {
                controller.moveSprite(Player2d, 0, 0)
                Speech_talking_indicator = textsprite.create("Paula", 6, 1)
                Speech = textsprite.create("Es el exposition?", 12, 1)
                Speech.setStayInScreen(true)
                Speech_talking_indicator.setStayInScreen(true)
                tiles.placeOnTile(Speech_talking_indicator, tiles.getTileLocation(1, 11))
                tiles.placeOnTile(Speech, tiles.getTileLocation(1, 12))
                pause(5000)
                Speech_talking_indicator.setText("Luis")
                Speech_line_2 = textsprite.create("exoticas aqui.", 12, 1)
                tiles.placeOnTile(Speech_line_2, tiles.getTileLocation(1, 13))
                Speech_line_2.setStayInScreen(true)
                Speech.setText("Si. Muchos cosas")
                pause(5000)
                sprites.destroy(Speech_line_2)
                Speech_talking_indicator.setText("Paula")
                Speech.setText("Interesante!")
                pause(5000)
                sprites.destroy(Speech_talking_indicator)
                sprites.destroy(Speech)
                controller.moveSprite(Player2d, 100, 100)
            })
        }
        _2dify()
        pavillion()
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`Paris`)
        tiles.placeOnRandomTile(player_3D, assets.tile`pavilion_exit_location`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    if (enter_allowed == 0) {
        tiles.setCurrentTilemap(tilemap`Blank_map`)
        Render.setViewMode(ViewMode.tilemapView)
        if (game.ask("Entra?")) {
            _2dify()
            _4cat = 1
            if (done3 == 0) {
                activity_count += 1
                done3 = 1
            }
            tiles.setCurrentTilemap(tilemap`Cuatros_Gatos`)
            tiles.placeOnRandomTile(Player2d, assets.tile`wood_floor_enter_location`)
        } else {
            Render.setViewMode(ViewMode.raycastingView)
            tiles.setCurrentTilemap(tilemap`barcelona`)
            tiles.placeOnRandomTile(player_3D, assets.tile`myTile1`)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`fountain`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Entra?")) {
        Render.setViewMode(ViewMode.raycastingView)
        if (done5 == 0) {
            activity_count += 1
            done5 = 1
        }
        tiles.setCurrentTilemap(tilemap`pavillion`)
        tiles.placeOnRandomTile(player_3D, assets.tile`Enter`)
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`barcelona`)
        tiles.placeOnRandomTile(player_3D, assets.tile`myTile4`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Church_Enter_Location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Entra?")) {
        _2dify()
        church()
        if (done2 == 0) {
            activity_count += 1
            done2 = 1
        }
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`Paris`)
        tiles.placeOnRandomTile(player_3D, assets.tile`church_exit_location`)
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutscene_activator == 2) {
        if (cutscene_activator == 2 && player_platformer.isHittingTile(CollisionDirection.Bottom)) {
            player_platformer.vy = -250
        }
    }
})
sprites.onOverlap(SpriteKind.player_2d, SpriteKind.Enemy, function (sprite, otherSprite) {
    tiles.setCurrentTilemap(tilemap`Bull_run`)
    tiles.placeOnRandomTile(Player2d, assets.tile`bullrun_end`)
    scene.cameraFollowSprite(Player2d)
    Bull = sprites.create(assets.image`Bull_3`, SpriteKind.Enemy)
    Bull.setScale(0.5, ScaleAnchor.Middle)
    tiles.placeOnTile(Bull, tiles.getTileLocation(0, 4))
    tiles.replaceAllTiles(assets.tile`bullrun_end`, sprites.vehicle.roadHorizontal)
    Paula.setFlag(SpriteFlag.Invisible, true)
    scene.setBackgroundImage(assets.image`Blank_BG_3`)
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
    Render.move(player_3D, 0)
    Render.moveWithController(0)
}
function _4cat_cutscene () {
    cutscene_activator = 1
    story.startCutscene(function () {
        controller.moveSprite(Player2d, 0, 0)
        Speech_talking_indicator = textsprite.create("Luis", 6, 1)
        Speech = textsprite.create("Que veo?", 12, 1)
        Speech.setStayInScreen(true)
        Speech_talking_indicator.setFlag(SpriteFlag.Ghost, true)
        Speech_talking_indicator.setStayInScreen(true)
        tiles.placeOnTile(Speech_talking_indicator, tiles.getTileLocation(4, 0))
        tiles.placeOnTile(Speech, tiles.getTileLocation(4, 1))
        pause(2000)
        Speech.setText("Veo personas corro con ")
        Speech_line_2 = textsprite.create("toros. Donde esta?", 12, 1)
        tiles.placeOnTile(Speech_line_2, tiles.getTileLocation(4, 2))
        Speech_line_2.setStayInScreen(true)
        Speech_talking_indicator.setText("Paula")
        pause(5000)
        sprites.destroy(Speech_line_2)
        Speech_talking_indicator.setText("Luis")
        Speech.setText("En Pamplona. Vamos!")
        pause(5000)
        sprites.destroy(Speech_talking_indicator)
        sprites.destroy(Speech)
        controller.moveSprite(Player2d, 100, 100)
        cutscene_activator = 0
    })
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutscene_activator == 2) {
        if (cutscene_activator == 2 && player_platformer.isHittingTile(CollisionDirection.Bottom)) {
            player_platformer.vy = -250
        }
    }
})
scene.onOverlapTile(SpriteKind.player_2d, assets.tile`Ring_L`, function (sprite, location) {
    sprites.destroy(Bull)
    if (fight == 0) {
        story.startCutscene(function () {
            fight = 1
            controller.moveSprite(Player2d, 0, 0)
            Speech_talking_indicator = textsprite.create("Paula", 6, 1)
            Speech = textsprite.create("Que fue eso?", 12, 1)
            Speech.setStayInScreen(true)
            Speech_talking_indicator.setStayInScreen(true)
            tiles.placeOnTile(Speech_talking_indicator, tiles.getTileLocation(22, 1))
            tiles.placeOnTile(Speech, tiles.getTileLocation(22, 2))
            pause(2000)
            Speech_talking_indicator.setText("Luis")
            Speech.setText("Es el encierro.")
            pause(5000)
            Speech.setText("Personas corre enfrente ")
            Speech_line_2 = textsprite.create("del toros.", 12, 1)
            tiles.placeOnTile(Speech_line_2, tiles.getTileLocation(22, 3))
            Speech_line_2.setStayInScreen(true)
            pause(5000)
            Speech.setText("Es parte del festival")
            Speech_line_2.setText("de San Fermin.")
            pause(5000)
            Speech.setText("Es un festival muy")
            Speech_line_2.setText("grande.")
            pause(5000)
            Speech_talking_indicator.setText("Paula")
            Speech.setText("Interesante!")
            sprites.destroy(Speech_line_2)
            pause(5000)
            sprites.destroy(Speech_talking_indicator)
            textSprite2 = textsprite.create("Salta para A o W.", 15, 2)
            textSprite2.setStayInScreen(true)
            sprites.destroy(Speech)
            pause(5000)
            sprites.destroy(textSprite2)
            controller.moveSprite(Player2d, 100, 100)
            sprites.destroy(Player2d)
            player_platformer = sprites.create(assets.image`Platformer_sprite`, SpriteKind.platformer)
            player_platformer.ay = 500
            controller.moveSprite(player_platformer, 100, 0)
            Bull_fight = sprites.create(assets.image`Bull_2`, SpriteKind.Boss)
            Bull_fight.vx = 70
            Bull_fight.ay = 500
            tiles.setCurrentTilemap(tilemap`bull_fight`)
            scene.cameraFollowSprite(player_platformer)
            tiles.placeOnRandomTile(Bull_fight, assets.tile`Bull_start0`)
            tiles.placeOnRandomTile(player_platformer, assets.tile`player_start`)
            info.setLife(3)
            bull_health = 3
            cutscene_activator = 2
        })
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`bullrun_start0`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Entra?")) {
        _2dify()
        tiles.setCurrentTilemap(tilemap`Bull_run`)
        tiles.placeOnRandomTile(Player2d, assets.tile`bullrun_end`)
        scene.cameraFollowSprite(Player2d)
        if (done4 == 0) {
            activity_count += 1
            done4 = 1
        }
        Bull = sprites.create(assets.image`Bull2`, SpriteKind.Enemy)
        Bull.setScale(0.5, ScaleAnchor.Middle)
        tiles.placeOnTile(Bull, tiles.getTileLocation(0, 4))
        tiles.replaceAllTiles(assets.tile`bullrun_end`, assets.tile`myTile3`)
        Paula.setFlag(SpriteFlag.Invisible, true)
        scene.setBackgroundImage(assets.image`Blank_BG_2`)
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`Pamplona`)
        tiles.placeOnRandomTile(player_3D, assets.tile`bullrun_end`)
    }
})
scene.onOverlapTile(SpriteKind.player_2d, assets.tile`wood_floor_exit_location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    if (game.ask("Salido?")) {
        if (Pavillion_active == 1) {
            _3Dify()
            tiles.placeOnRandomTile(player_3D, assets.tile`pavilion_exit_location`)
        } else if (_4cat == 1) {
            _3Dify()
            scene.setBackgroundImage(assets.image`Barcelona_BG`)
            tiles.setCurrentTilemap(tilemap`barcelona`)
            tiles.placeOnRandomTile(player_3D, assets.tile`myTile1`)
            _4cat = 0
        } else {
            _3Dify()
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
sprites.onOverlap(SpriteKind.platformer, SpriteKind.Boss, function (sprite, otherSprite) {
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -100
        if (bull_immune == 0) {
            bull_immune = 1
            bull_health += -1
            pause(2000)
            pause(1000)
            bull_immune = 0
        }
    } else {
        if (immunity_play == 0) {
            info.changeLifeBy(-1)
            immunity_play = 1
            for (let index = 0; index < 3; index++) {
                player_platformer.setFlag(SpriteFlag.Invisible, true)
                pause(200)
                player_platformer.setFlag(SpriteFlag.Invisible, false)
                pause(200)
                player_platformer.setFlag(SpriteFlag.Invisible, true)
                pause(200)
                player_platformer.setFlag(SpriteFlag.Invisible, false)
                pause(200)
                player_platformer.setFlag(SpriteFlag.Invisible, true)
                pause(200)
                player_platformer.setFlag(SpriteFlag.Invisible, false)
            }
            immunity_play = 0
        } else {
        	
        }
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
scene.onOverlapTile(SpriteKind.player_2d, assets.tile`Bull Start0`, function (sprite, location) {
    for (let value of tiles.getTilesByType(assets.tile`Bull pen`)) {
        tiles.setWallAt(value, false)
    }
    Bull.setFlag(SpriteFlag.GhostThroughWalls, true)
    Bull.setVelocity(123, 0)
    animation.runImageAnimation(
    Bull,
    assets.animation`Run Run Run R`,
    200,
    true
    )
})
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
    Render.move(player_3D, 60)
    Render.moveWithController(2)
    tiles.placeOnTile(Paula, tiles.locationInDirection(tiles.locationOfSprite(player_3D), CollisionDirection.Left))
    Paula.setScale(0.5, ScaleAnchor.Bottom)
    Paula.follow(Paula_Follower, 40)
    Pavillion_active = 0
    _4cat = 0
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Leave0`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Salido?")) {
        enter_allowed = 1
        Render.setViewMode(ViewMode.raycastingView)
        tiles.placeOnRandomTile(player_3D, sprites.castle.tileGrass3)
        tiles.setCurrentTilemap(tilemap`barcelona`)
        tiles.placeOnRandomTile(player_3D, assets.tile`myTile4`)
        enter_allowed = 0
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`pavillion`)
        tiles.placeOnRandomTile(player_3D, assets.tile`Enter`)
    }
})
function pavillion () {
    tiles.setCurrentTilemap(tilemap`Spanish_Pavillion`)
    tiles.placeOnRandomTile(player_3D, assets.tile`Guernica 0-2`)
    scene.setBackgroundImage(assets.image`Blank_Background`)
    tiles.placeOnRandomTile(Player2d, assets.tile`wood_floor_enter_location`)
    tiles.placeOnRandomTile(Paula, assets.tile`wood_floor_exit_location`)
    Pavillion_active = 1
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(Player2d, 100, 100)
    story.cancelAllCutscenes()
})
info.onLifeZero(function () {
    sprites.destroy(player_platformer)
    Game_over = textsprite.create("Game Over. Try again? ", 15, 10)
    Game_over_2 = textsprite.create("Press A. ", 15, 10)
    Game_over.setStayInScreen(true)
    Game_over_2.setStayInScreen(true)
    tiles.placeOnTile(Game_over, tiles.getTileLocation(1, 2))
    tiles.placeOnTile(Game_over_2, tiles.getTileLocation(1, 3))
    pause(100)
    pauseUntil(() => controller.A.isPressed())
    sprites.destroy(Game_over, effects.confetti, 1000)
    sprites.destroy(Game_over_2, effects.confetti, 1000)
    sprites.destroy(Bull_fight)
    player_platformer = sprites.create(assets.image`Platformer_sprite`, SpriteKind.platformer)
    player_platformer.ay = 500
    controller.moveSprite(player_platformer, 100, 0)
    Bull_fight = sprites.create(assets.image`Bull`, SpriteKind.Boss)
    Bull_fight.vx = 70
    Bull_fight.ay = 500
    tiles.setCurrentTilemap(tilemap`bull_fight`)
    tiles.placeOnRandomTile(Bull_fight, assets.tile`Bull_start0`)
    tiles.placeOnRandomTile(player_platformer, assets.tile`player_start`)
    info.setLife(3)
    scene.cameraFollowSprite(player_platformer)
    bull_health = 3
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`exit_placeholder`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (paris == 1) {
        if (game.ask("Va a Barcelona?")) {
            Render.setViewMode(ViewMode.raycastingView)
            tiles.setCurrentTilemap(tilemap`barcelona`)
            scene.setBackgroundImage(assets.image`Barcelona_BG`)
            tiles.placeOnRandomTile(player_3D, assets.tile`enter_placeholder`)
            paris = 0
            barcelona = 1
        } else {
            Render.setViewMode(ViewMode.raycastingView)
            tiles.setCurrentTilemap(tilemap`Paris`)
            tiles.placeOnRandomTile(player_3D, assets.tile`enter_placeholder`)
        }
    } else if (barcelona == 1) {
        if (game.ask("Va a Pamplona?")) {
            Render.setViewMode(ViewMode.raycastingView)
            scene.setBackgroundImage(assets.image`Pamplona_BG`)
            tiles.setCurrentTilemap(tilemap`Pamplona`)
            tiles.placeOnRandomTile(player_3D, assets.tile`enter_placeholder`)
            barcelona = 0
            pamplona = 1
        } else {
            Render.setViewMode(ViewMode.raycastingView)
            tiles.setCurrentTilemap(tilemap`barcelona`)
            tiles.placeOnRandomTile(player_3D, assets.tile`enter_placeholder`)
        }
    } else if (pamplona == 1) {
        if (game.ask("Va a Paris?")) {
            Render.setViewMode(ViewMode.raycastingView)
            tiles.setCurrentTilemap(tilemap`Paris`)
            scene.setBackgroundImage(assets.image`Paris_BG`)
            tiles.placeOnRandomTile(player_3D, assets.tile`enter_placeholder`)
            pamplona = 0
            paris = 1
        } else {
            Render.setViewMode(ViewMode.raycastingView)
            tiles.setCurrentTilemap(tilemap`Pamplona`)
            tiles.placeOnRandomTile(player_3D, assets.tile`enter_placeholder`)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass2, function (sprite, location) {
    felip = 1
    tiles.loadMap(tiles.createMap(tilemap`Blank_map`))
    player_3D.setFlag(SpriteFlag.Invisible, true)
    Paula.setFlag(SpriteFlag.Invisible, true)
    Render.setViewMode(ViewMode.tilemapView)
    story.startCutscene(function () {
        Render.move(player_3D, 0)
        Render.moveWithController(0)
        Speech_talking_indicator = textsprite.create("Paula", 6, 1)
        Speech = textsprite.create("Donde esta?", 12, 1)
        Speech.setStayInScreen(true)
        Speech_talking_indicator.setStayInScreen(true)
        tiles.placeOnTile(Speech_talking_indicator, tiles.getTileLocation(22, 1))
        tiles.placeOnTile(Speech, tiles.getTileLocation(22, 2))
        pause(2000)
        Speech_talking_indicator.setText("Luis")
        Speech.setText("Es San Felip Neri.")
        pause(5000)
        Speech.setText("Es una plaza.")
        pause(5000)
        Speech.setText("Francisco Franco bomba")
        Speech_line_2 = textsprite.create("la plaza.", 12, 1)
        tiles.placeOnTile(Speech_line_2, tiles.getTileLocation(22, 3))
        Speech_line_2.setStayInScreen(true)
        pause(5000)
        Speech.setText("Muchos personas muerto.")
        Speech_line_2.setText("Es muy triste.")
        pause(5000)
        sprites.destroy(Speech)
        sprites.destroy(Speech_line_2)
        sprites.destroy(Speech_talking_indicator)
        Render.moveWithController(2)
        tiles.setCurrentTilemap(tilemap`pavillion`)
        tiles.placeOnRandomTile(player_3D, sprites.castle.tileGrass3)
        Render.setViewMode(ViewMode.raycastingView)
        felip = 0
        player_3D.setFlag(SpriteFlag.Invisible, false)
        Paula.setFlag(SpriteFlag.Invisible, false)
    })
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
    cutscene_activator = 1
    story.startCutscene(function () {
        controller.moveSprite(Player2d, 0, 0)
        Speech_talking_indicator = textsprite.create("Luis", 6, 1)
        Speech = textsprite.create("Que veo?", 12, 1)
        Speech.setStayInScreen(true)
        Speech_talking_indicator.setFlag(SpriteFlag.Ghost, true)
        Speech_talking_indicator.setStayInScreen(true)
        tiles.placeOnTile(Speech_talking_indicator, tiles.getTileLocation(1, 3))
        tiles.placeOnTile(Speech, tiles.getTileLocation(1, 4))
        pause(2000)
        Speech.setText("Veo quatros gatos.")
        Speech_talking_indicator.setText("Paula")
        pause(2000)
        Speech_talking_indicator.setText("Luis")
        Speech.setText("Es el resturante!")
        Speech_line_2 = textsprite.create("Vamos!", 12, 1)
        tiles.placeOnTile(Speech_line_2, tiles.getTileLocation(1, 5))
        Speech_line_2.setStayInScreen(true)
        pause(5000)
        sprites.destroy(Speech_talking_indicator)
        sprites.destroy(Speech)
        sprites.destroy(Speech_line_2)
        controller.moveSprite(Player2d, 100, 100)
        cutscene_activator = 0
    })
}
let finish = 0
let done6 = 0
let textSprite: TextSprite = null
let A_Press_Indicator = 0
let mySprite: Sprite = null
let pamplona = 0
let barcelona = 0
let Game_over_2: TextSprite = null
let Game_over: TextSprite = null
let immunity_play = 0
let bull_immune = 0
let Pavillion_active = 0
let done4 = 0
let bull_health = 0
let Bull_fight: Sprite = null
let textSprite2: TextSprite = null
let fight = 0
let Bull: Sprite = null
let player_platformer: Sprite = null
let cutscene_activator = 0
let done2 = 0
let done5 = 0
let done3 = 0
let _4cat = 0
let enter_allowed = 0
let Speech_line_2: TextSprite = null
let Speech: TextSprite = null
let Speech_talking_indicator: TextSprite = null
let Player2d: Sprite = null
let activity_count = 0
let done1 = 0
let paris = 0
let Paula: Sprite = null
let Paula_Follower: Sprite = null
let menu = 0
let player_3D: Sprite = null
let felip = 0
felip = 1
story.startCutscene(function () {
    Render.setViewMode(ViewMode.tilemapView)
    game.splash("Paula", "El Expositon esta aqui?")
    game.splash("Luis", "Si. El exposition esta en Paris.")
    game.splash("Paula", "Vamos!")
    Render.setViewMode(ViewMode.raycastingView)
    game.showLongText("Usas WASD a caminas.", DialogLayout.Bottom)
    player_3D = Render.getRenderSpriteVariable()
    tiles.setCurrentTilemap(tilemap`Paris`)
    menu = 0
    felip = 1
    scene.setBackgroundImage(assets.image`Paris_BG`)
    Render.move(player_3D, 60, -250)
    Paula_Follower = sprites.create(assets.image`Hidden_Player_Sprite`, SpriteKind.Sprite_Helper)
    Paula = sprites.create(assets.image`Paula`, SpriteKind.Paula_sprite)
    Paula.follow(Paula_Follower, 40)
    Paula.setScale(0.5, ScaleAnchor.Bottom)
    Paula_Follower.setFlag(SpriteFlag.Invisible, true)
    paris = 1
    felip = 0
})
game.onUpdate(function () {
    if (felip == 0) {
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
    }
})
game.onUpdate(function () {
    if (cutscene_activator == 2) {
        if (cutscene_activator == 2 && Bull_fight.isHittingTile(CollisionDirection.Left)) {
            Bull_fight.vx = 70
            animation.runImageAnimation(
            Bull_fight,
            assets.animation`Run Run Run R`,
            200,
            true
            )
        } else if (Bull_fight.isHittingTile(CollisionDirection.Right)) {
            Bull_fight.vx = -70
            animation.runImageAnimation(
            Bull_fight,
            assets.animation`Run Run Run L`,
            200,
            true
            )
        }
        if (bull_health <= 0) {
            bull_health = 5000
            pause(100)
            sprites.destroy(Bull_fight, effects.fire, 2000)
            story.startCutscene(function () {
                controller.moveSprite(player_platformer, 0, 0)
                Speech_talking_indicator = textsprite.create("Paula", 6, 1)
                Speech = textsprite.create("Que fue eso?", 12, 1)
                Speech.setStayInScreen(true)
                Speech_talking_indicator.setStayInScreen(true)
                tiles.placeOnTile(Speech_talking_indicator, tiles.getTileLocation(1, 2))
                tiles.placeOnTile(Speech, tiles.getTileLocation(1, 3))
                pause(2000)
                Speech_talking_indicator.setText("Luis")
                Speech.setText("Es el corrida de")
                Speech_line_2 = textsprite.create("toros.", 12, 1)
                Speech_line_2.setStayInScreen(true)
                tiles.placeOnTile(Speech_line_2, tiles.getTileLocation(1, 4))
                pause(5000)
                Speech.setText("Torreros attaca los")
                Speech_line_2.setText("toros.")
                pause(5000)
                Speech.setText("El torrero ")
                Speech_line_2.setText("mataron el toro.")
                pause(5000)
                sprites.destroy(Speech_line_2)
                Speech_talking_indicator.setText("Paula")
                Speech.setText("Interesante!")
                pause(5000)
                sprites.destroy(Speech_talking_indicator)
                sprites.destroy(Speech)
                sprites.destroy(player_platformer)
                if (done6 == 0) {
                    done6 = 1
                    activity_count += 1
                }
                if (activity_count == 6) {
                    Render.setViewMode(ViewMode.tilemapView)
                    tiles.setCurrentTilemap(tilemap`level12`)
                    if (game.ask("Ganaste!", "fin del videoquego?")) {
                        game.setGameOverMessage(true, "Ganaste!")
                        game.gameOver(true)
                    } else {
                        activity_count = 0
                        Render.setViewMode(ViewMode.raycastingView)
                        tiles.setCurrentTilemap(tilemap`Paris`)
                    }
                } else {
                    finish = 1
                }
                _3Dify()
                tiles.setCurrentTilemap(tilemap`Pamplona`)
                scene.setBackgroundImage(assets.image`Pamplona_BG`)
                tiles.placeOnRandomTile(player_3D, assets.tile`bullrun_end`)
            })
        }
    }
})
game.onUpdate(function () {
    if (finish == 1 && activity_count == 6) {
        Render.setViewMode(ViewMode.tilemapView)
        tiles.setCurrentTilemap(tilemap`level12`)
        if (game.ask("Ganaste!", "fin del videoquego?")) {
            game.setGameOverMessage(true, "Ganaste!")
            game.gameOver(true)
        } else {
            activity_count = 0
            Render.setViewMode(ViewMode.raycastingView)
            tiles.setCurrentTilemap(tilemap`Paris`)
        }
    }
})
