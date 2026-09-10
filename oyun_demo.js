//let spawn_position_x = Math.floor(Math.random() * 10) + 800;
//let spawn_position_y = Math.floor(Math.random() * 10) + 600;
let enemies = [];
let hp_text = document.getElementById("hp");
let enemie_speed = 1;
let last_damaged = 0;
let i_frame = 2000;
let player_hp = 4;
const canvas = document.getElementById("canvass");
let keys = { w: false, a: false, s: false, d: false};
let player_speed = 3;
const ctx = canvas.getContext("2d");
var zero_y = canvas.height / 2;
var zero_x = canvas.width / 2;
let player_image = new Image();
let enemie_image = new Image();
enemie_image.src = "oyunresim/demoenimie.png"
player_image.src = "oyunresim/demoplayer.png"
function test_draw(){
    ctx.beginPath();
    ctx.drawImage(player_image, zero_x, zero_y, 36, 44);
    ctx.closePath();
    requestAnimationFrame(test_draw)
}


function get_player_position(){
    if (keys.w) {
         if (zero_y > 0)
            zero_y -= player_speed
    }
        if (keys.a) {
            if (zero_x > 0)
            zero_x -= player_speed
    }
        if (keys.s) {
        if (zero_y + 40 < canvas.height)
            zero_y += player_speed
    }
        if (keys.d) {
            if (zero_x + 50 < canvas.width)
                zero_x += player_speed
    }
}
function enemie_location_updater(){
    enemies.forEach((enemie) => {
        if (zero_x > enemie.x)
            enemie.x += enemie_speed
        if (zero_x < enemie.x)
            enemie.x -= enemie_speed
        if (zero_y > enemie.y)
            enemie.y += enemie_speed
        if (zero_y < enemie.y)
            enemie.y -= enemie_speed


    }
);

};






setInterval(() => {
    enemies.push({x :  Math.floor(Math.random() * 10) + 800, y : Math.floor(Math.random() * canvas.height)})

}, 5000)

    document.addEventListener("keydown" , function(e){
    keys[e.key] = true;
    });
    document.addEventListener("keyup" , function(e){
    keys[e.key] = false;
    });

function closebutton(){
    button = document.getElementById("button")
    button.disabled = true;
}


function gameLoop(){
    

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    get_player_position();
    enemie_location_updater();
    for (let enemie of enemies) {
    ctx.drawImage(enemie_image, enemie.x, enemie.y, 30,30)
    let dx = zero_x - enemie.x;
    let dy = zero_y - enemie.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if(distance < 40 && Date.now() - last_damaged > i_frame){
        last_damaged = Date.now()
        player_hp -= 1
        console.log("touched")
    }
    }
    
    ctx.drawImage(player_image, zero_x, zero_y, 50, 40);
    ctx.closePath();
    hp_text.textContent = player_hp;
    requestAnimationFrame(gameLoop)
}