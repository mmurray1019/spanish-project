namespace SpriteKind {
    export const Minimap = SpriteKind.create()
    export const player_2d = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Pavillion_Enter_Location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Enter?")) {
        pavillion()
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`Paris`)
        tiles.placeOnRandomTile(player_3D, assets.tile`pavilion_exit_location`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Church_Enter_Location`, function (sprite, location) {
	
})
scene.onOverlapTile(SpriteKind.player_2d, assets.tile`wood_floor_exit_location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    if (game.ask("Exit?")) {
        _3Dify()
        tiles.placeOnRandomTile(player_3D, assets.tile`pavilion_exit_location`)
    } else {
        tiles.setCurrentTilemap(tilemap`Spanish_Pavillion`)
        tiles.placeOnRandomTile(Player2d, assets.tile`wood_floor_enter_location`)
    }
})
function _3Dify () {
    tiles.placeOnTile(Player2d, tiles.getTileLocation(0, 0))
    Render.setViewMode(ViewMode.raycastingView)
    Player2d.setFlag(SpriteFlag.Invisible, true)
    sprites.destroy(Player2d)
    controller.moveSprite(Player2d, 0, 0)
    scene.setBackgroundImage(assets.image`Paris_BG`)
    tiles.setCurrentTilemap(tilemap`Paris`)
    scene.cameraFollowSprite(player_3D)
    Render.setSpriteAttribute(player_3D, RCSpriteAttribute.ZOffset, -11)
}
function pavillion () {
    Render.setViewMode(ViewMode.tilemapView)
    Player2d = sprites.create(assets.image`Player 3D`, SpriteKind.player_2d)
    controller.moveSprite(Player2d)
    cameraOffsetScene.cameraFollowWithOffset(Player2d, 0, -30)
    player_3D.setImage(assets.image`Hidden_Player_Sprite`)
    player_3D.setFlag(SpriteFlag.Invisible, true)
    // let mySprite20240315T170412053Z = sprites.create(img`fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccc
    // cfffffffffffffffffffffffffffffffffffcccffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffcbcffcbcccbbcccbccccccccccf
    // cccffffffffffffffffffffffffffffffffcfffffcbbbdddbbfffffffffffffffffffffffccccccccfcccccccffffffffffffcdbbcbbbccbbcbbcccccccccff
    // ccccffffffffffffffffffcfffffffffccfffffcd111dbbddddbcfffffffffffffffccccccccccccccccccccccffffffffffffccccffffffffffffccccccfff
    // ccccccfffffcffffcccfccccfffffffcccffffd11111ddddddddddcffffffffffffccccccccccccccccccccccfffffccccffffffffffffffffffffcccccffff
    // ddcccccffffdfffffdcccccccccfffccccccbdd111d1ddbddddddddbcccffffffbbcccccccccccccccccccccccccccffcccfffccfffffffccccccccccffffff
    // ddbbcccbcfcdfffffbbcccccccccccccccccbddddd1ddddddddddddbccccfcffcdd1dbbccccccccccccccccccccccccccffffffffcfffffcbbbbbfccfffffff
    // ddbdbcbbbccdfffffbdccbfcccccccccccccccbdbddddddddddddbffffbbfccccddd11111dbccccccbccbcffffffcbbbbffccfffccccfffc11ddbccffffffff
    // bdddddcbbccddcbbbdbcbbffccccccccccccccbcbcbdddddddddbbbbcfbdffcccdddd1111111ddbbccccccfffcbbdbbccfcccfffbcbccffc1dddbcfffffcfff
    // cddbdbbbbcfbddddddddbccfcccccccccccccccccffbbbbcdbdcbcffccddbffccddd1111111111111dbbbccbdddddccccfccccccdbbcccfc11ddbcffffcbfff
    // cbbbbbbdbccfcb11d11dbcddcccccccccccccccccccccffffffcfccffcdddfffcdd111111111111111ddddddddddccccbcccccfbddcccccc111dbcffffdcbff
    // bbbcbdddbccccc11d11dbb1d1bccccccccccccccccbccfffffffffccccbbcfffcdd11ddd11111ddddddddddddddccccbdffcccfddddddcccdddbcffccbbbbbf
    // bbbbdbdbbccccfbdbd11ddd1ddcccccccccccccccdcdccccccfcccccccbdbffffddddddddddddddddddddddddbcccbd1dccccccd1ddccccccffcfffbdddddcf
    // bbbdbbbbbcccccbddd1dbd1dd1cccccccccccccccbbbdbcccccccbccccd1dffffdddddddddddddddddddddbbbbdd1111ccccccccbbbccccddffcccffcbdddbf
    // bbdbbbbbbcccccdddd1dbdddd1bccccccccccccccbbbbdddbcccddbbccb1dffcdddddddddddddddddddd1d111d11111dccccccfcddccccd1dcccccfffcddccf
    // bbdbbbbbbcccccdddd1111dd11bcccbccccccccccbbbccbdddbbdddbccddccd11d1dddddddddddddddd111111d11111bccccccfcddbcccd11bccccfffbdbfff
    // bbdbbbbbbccccbbddd11111111bcccb1ddccccccccdbbbbddddddbddcbddd1111111dddddddddddddd1d1111111111dcdcbcccffd1bcccd1dccbbcffcddcfff
    // bbbcbbbbbccccbbddd11111d1dbcccccb1dcccccccbcbd1d11dddcbbbcdd1dddddd11ddddddddddbbd1d1111111111bbdcbcccffd1dcccd1ddbddbffbddffcc
    // bbbccbbbbcccccbbd1d111dd11bcccccffbdbcccccd1ddd1d1ddbbdbbcdddccccd1dddbbbbbbbbbbbd11111111111dbdbbbcccffbddcccd111111dcfddbcfff
    // bbccccccbcccccbbd1d11111d1ccccccffffccccccdddbdbbcbbbdddbbcdbccccd111ddbbbbbbbbbbd11111111111dbbcbbcccffbddcccd11111dbdcddccfff
    // bcccccccccccccdddbd11111d1ccccccffffccccccbbbdccfffccbddbbcdbccbcd1111ddbbbbbbbbbd1111111111dbcdcdbcccffcddcccb111dddddddbccfff
    // bfccccccccccbcbcdbcb111d11ccccccccccccccccb1dddbcfffbbbddbbfcccccd1111dddbbbbbbbbdd111111111cdccbbbcccfccd1cccbdd1dddddddcccfff
    // bffcccccccbd1cb1d1ccb1111dcccccccccccccccccbccccccffcbfdddbbfccccd1111ddddbbbbbbbbbd1111111bccccccbcccfddd1bccbdbdd11dcdbfccfff
    // bffcccccccb11dd111dccb1d1dcccccccccccccccccfffffffffcdfdddbdffcccd11111ddddbbbbbbbbbb11111dffffffcccccc11ddbccb1dddddbccccccfff
    // ccccccccccb1111111dcccd11bcccccccccccccccccfffffffffcdfbddbdbfcbbd11111dddddbbbbbbccb11111cfcccccccccccd11ddccdddbbbddccccccfff
    // ccfcccccccd11111dddccbc11bccccccccccccccccccccbbbbcfcdffdddd1cbbcb11111ddddddbbcccccb1111bcfffffffcccccd111dccd11ccccdcccfccffc
    // ccfcccccccd11d1ddddbbbcb1bcccccccccccccccbbbbbbbbdbbcdcfdddd1bcccb111111ddddddccccccb11dcccfffffffcccccd111dccdd1bccbddcbdbcfff
    // ccffcccccb11bd1ddbccbbbc1bccccccccccccccddbbbdbbdcdbbbdcdddd11cfcb111111dd1111dbbbccccccccccfffffcccccf1111dccd11dccddddddbcfff
    // cccccccccd1dcb111dccbbbcddcccccccccccccdbbbbbbbd1cbbbbddd1111dbccb1111111111111111dccccccccbfffffcddbcfd11ddccddddccdbbddcccfff
    // cccccccccd1dcb1111cfcbccbdccccbbccccccbdbbbbbbbb1fbbbbbdd11ccddccb11111111111111111dbccccccbcfffffddbcfb111dccddddcbdcddcfccfff
    // ccccccccd11bcb1111cfffcccdcccbdbccccccbbbbcffbbddfbdddb111dffffccb11111111111111111d1bcccccbbcfffcd1bcffd11dddddddbddcdcffccfff
    // cccccccc111dccd11bcffccccdccbddbccccccbbbccccbddbcddddd111cffcd1ddd11111111d1111111ddddccccbbbffffd1bcffcbdbddddbbbcccfcbcccfff
    // cccccccd1111ccdddccffccccdbbdddddbbccccbccccbbbdbcdddddd1dccc111dddd111111111111111dddddbcbbbbcfffd1bcffcccccccccccccccdbcbcccc
    // ccccccc11111bcddcccffccccdccc1dd111dd1dddbcfbbbdbcdddddbdbffd1dddddd111111111111111dddddddbbbbbfffd1bcffccccccccccccccccbbdcccc
    // ccccccb111d1dccbccccffcccdccd1dddddddbddbbcfbbbddcdddddddcfc1ddddddd1111111111111111ddbbbbbbbbbcff11bcffcccccccccccccccccbdcfff
    // ccccbb1d1dd11bccbcccccccc1cc1ddddd1ddbbbbbcfbbdddcdddddbdcfc1ddddddd11111111111111111dddbbbbbbbbffd1bcffccccccccccccccccccbcdcf
    // fcfbbb1ddd111ddbbbbcfcfcb1bcddddd1dcfbbbbbcfbddddbddddddbbcc11dddddd1111111111d1111111ddddddd1dbcf11bcffccccccccccccccccccccdcf
    // cfcbbd1dbd11dddbbbbcfccbbbccddddbcfcbdbbbbccddddddddddddbbbcd1dddddd1111111111111d11111dd1dddddbbcbdbcffccccccccccccccccccccccf
    // fccbb11dbd11d1dbbbbcffcbdcccdddbfffdddbbbbcd1ddddddddddddbdd1dddddd111111111111111111111dd1111dbbbbdbcffccccccccccccccccccccccf
    // cccbd11bbbbdd11dbbbbcccbddccdddbffbddbbbbbbdddddd11ddbbddd1111ddddd111111111111111ddd1ddddb111dbbbdddcffcccccccccccccccccccccbf
    // ccbbdddddddbdddd1ddbcccbddcccddcfccddbbbbbcdddddddddddddddddddddd11dd11dddd111111dddd11111db111dbbdddcffccccccccccccccccccccccf
    // ccd11111ddddddddd1ddcccbddbcfddcccfbdbbbdbcd1dddddddddddddd1dd1d1d11dddddd1d111ddbbdd111d11db111dbdddcffcccccccccccccfcccccccff
    // ccd111dddd11bddbd1dbcccbbdbccbbccffcddddddbddddddbdddddddddddddddd1ddddddddbd1ddbbddd1dddd1dccd11bdbd1dffcccccccccccffffcccccff
    // cc1d11bd1ddd11dddbddcccbbdbccbcccccccddddddddddbdddddddddddddddddddddddddddbbddbbbbdddddbbdbbbcd1dbd111bccccccccccccfffffcccfff
    // cb1111dd1ddd11ddd1dbcccbbbbcccccccbcbddddbbdddddddddbddddddbddddd11111111ddddddbbbbdddbbbbbbbdbcdddbd1d1ccccccccccccffffffccfff
    // cbddddbd1dd11ddd1d1bbccbbcbcccccddcd1ddcbdbcdddddddbcdddddd1ddddddd1111111dbdddbbbbbddbbbbcbbddccbddbdd1bccccccccccfffffffccfff
    // fc1d1dbdddd11ddbdddbbccbccccfbd1dbddddcfbbbcbbddbbdcccccffffbdddd11111111ddbdddbbbbddd1dbbbbbd1dccd1ddd1dcccccccccfcffffffccffc
    // ffcddbbddddddddddbdbbccbddcccdddbbdddbcfbddcbcccb1dbbfffffffddddd1111111dbbbddddbbbddd1dbbbbbbddbcbd1dddbbbbcccccfffffffffccfff
    // ccccccbddddd1dd1ddbbccbbdbcccdddbbddbbbfbddcbcccd1dbbfccffffbdddd111111dbbbdbbddbbbdddbbbdbbbddddbcd1dddbbdddcccccfffcffffccfff
    // cbbcccddbdbddddd1dbbbddbbbbbcddbcddbbbbcbddbcccbd1dddbcccfffbdddd1d111dbbbddbb1dbbbddbbbbddddddbbccbddddbdddddbccfffcfffffcbbcf
    // ccbcccddddbdddddbdb1bddcbbdddbdbbdbbbbbbcddbccbbd1dddddcccffbdddd1dddddbbbdddd1dbbbdddbbbbdbbbdbcccccccdbd1ddddddddbbcccccbdddf
    // cccccbccccccccccccddbbbbbbdd1ddbb1bbbbbbcddbccbbb1ddddddcccfbdddd1ddddbbbbdbddddbbbbbbbbbbdddddbccccccbdbd1d1dddddddddbddddddbc
    // fcccbdccccccccccccbbddbb1b1d11dcbdcbbbbbbbddccbbbbbcdddddbccbddddddddbbbbbdbddddbdbbbbbbbbddddbbccccccbbbdddddddddddbbbbdbdddcc
    // cbccb1dccbccccccccbb1ddb11d111dbbbccbbcbbdddfbbbbbbbbdddddbcbddddddddbbbbbbbbbddddbbbbbbbbbdddbbbcccccbbbdd1dddddddbbdddbddddcc
    // cddcbddbcdcfcccccccd1111111111111bcccccbcbddccbcbccccbddddddbdddddbbbbbbbbbbbbbddbdbbbbbbbbddbbbbcccccbcbddddddbbbccffffbddddcf
    // cbddbdddddcffcccbbb11111111111dd1bccbbbbbbddbccbbbbcffcbddddbddddbbbbcbbbddbbbdddbbbbbbbbbbddbbbbcccccbcbbdddddbccccccffbddbdbf
    // cfcdddbbddbbddd11dbdd11111111dddddcccccccbdddbcbbbbcfffffbddccbbbbbbbbbdddbcccddddbbbbbbcbbddbbbbbccccbcbbdddddccccccccfddddbdc
    // cddddddbddbddddd1dbddd11d1111dddcdcffccbbdbcddbcbdbbccffffcbccccccdbbbbddcccccdddbccbbbbddddddbbbbccccbccbddddbcccccccccddbbddd
    // cdddbbdbddddddd11dbddd11dd11bdddccccbbcbbdcdddbfcddddddbbbcbbbbbbbdbbdbbccccccdddbcccccbbdddbdbbbbccccbccbddddccccccccccbcdddbc
    // cbbddddbdcbdddddddbd1111dd1ddddddfcbbbcbbbbd1dbcfddddddbbddddddddddbddbccccccbdddbcccccbbdddbddbbbbccbbcfbdddcccccccccccdbdbcbf
    // cffbdbbcffffccbdddddd111d1dcbbddbcfccbccddbdddcfcbdddddddddddddddddbddfbffccccbdddcccccbbbdbcccccccccbbffcbbccccccccccccbbccfcf
    // cffcbcffffffffffccbbbd111dccdbbbbbffcccbdccbddcccfbdddddddddbbbbddbbdbffffffccfcbbccccccbbbccfffccccccccccccccccccccccccccccccc
    // ccccccccccccccccccccccddbcccfbddddfffcccbcccbdccffffcdddbcfffccbbccdfffffffffcccccccccccccccccccccccccccccccccccccccccccccccccc
    // cccccccccccccccccccccccccccbcccbbccccccccccccbcfffffffcccccccccbcffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccc
    // `, SpriteKind.Player)
    tiles.setCurrentTilemap(tilemap`Spanish_Pavillion`)
    tiles.placeOnRandomTile(player_3D, assets.tile`Guernica 0-2`)
    scene.setBackgroundImage(assets.image`Blank_Background`)
    tiles.placeOnRandomTile(Player2d, assets.tile`wood_floor_enter_location`)
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu == 0) {
        if (Render.isViewMode(ViewMode.raycastingView)) {
            menu = 1
            Render.toggleViewMode()
            Render.move(Render.getRenderSpriteInstance(), 0, 0)
            scene.setBackgroundImage(assets.image`Blank_Background`)
            player_3D.setImage(assets.image`Player 3D`)
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
        player_3D.setImage(assets.image`Hidden_Player_Sprite`)
        tiles.setCurrentTilemap(tilemap`Paris`)
        scene.setBackgroundImage(assets.image`Paris_BG`)
        Render.move(player_3D, 60)
        Render.moveWithController(2)
        Render.toggleViewMode()
        sprites.destroy(Minimap_sprite)
        menu = 0
    } else if (menu == 2) {
        menu = 0
        sprites.destroy(Not_Avalible)
        tiles.loadMap(Current_tilemap)
        controller.moveSprite(Player2d, 0, 0)
        Player2d.setImage(assets.image`Player 3D`)
    }
})
function church () {
    Render.setViewMode(ViewMode.tilemapView)
    Player2d = sprites.create(assets.image`Player 3D`, SpriteKind.player_2d)
    scene.cameraFollowSprite(Player2d)
    player_3D.setImage(assets.image`Hidden_Player_Sprite`)
    tiles.setCurrentTilemap(tilemap`Spanish_Pavillion`)
}
let Not_Avalible: TextSprite = null
let Current_tilemap: tiles.WorldMap = null
let Minimap_sprite: Sprite = null
let myMinimap: minimap.Minimap = null
let Player2d: Sprite = null
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
