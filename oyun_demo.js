//let spawn_position_x = Math.floor(Math.random() * 10) + 800;
//let spawn_position_y = Math.floor(Math.random() * 10) + 600;
let attack_image_left = new Image();
let attack_image_up = new Image();
let attack_image_down = new Image();
let attack_image = new Image();
let attack_dx = 0;
let attack_dy = 0;
let attack_distance = 0;
attack_image_left.src = "oyunresim/atatck_l.png";
attack_image_down.src = "oyunresim/attack_down.png";
attack_image_up.src = "oyunresim/attack_up.png";
attack_image.src = "oyunresim/attack.png";
let facing = "";
let last_attack = 0;
let attack_speed = 500;
let attack_img_speed = 200;
let enemies = [];
let attack_x = 0;
let attack_y = 0;
let space_pressed = false;
let i_frame_text = document.getElementById("i_frame_info");
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



function get_player_position(){
    if (keys.w) {
        facing = "up";
         if (zero_y > 0)
            zero_y -= player_speed;

    }
        if (keys.a) {
            facing = "left";
            if (zero_x > 0)
            zero_x -= player_speed;
    }
        if (keys.s) {
            facing = "down";
        if (zero_y + 40 < canvas.height)
            zero_y += player_speed;
    }
        if (keys.d) {
            facing = "right";
            if (zero_x + 50 < canvas.width)
                zero_x += player_speed;
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



function closebutton(){
    button = document.getElementById("button")
    button.disabled = true;
}


    document.addEventListener("keydown" , function(e){
    keys[e.key] = true;
    if (e.key === " " && Date.now() - last_attack > attack_speed){
        last_attack = Date.now()
        space_pressed = true;
        console.log("keydown_space")
    }
    });


    document.addEventListener("keyup" , function(e){
    keys[e.key] = false;
    if (e.key === " "){
        space_pressed = false;
        console.log("keyup_space")
    }
    });


function attack_image_draw(){
    if ( Date.now() - last_attack < attack_img_speed) {
     switch (facing) {
        case "right":
            ctx.drawImage(attack_image, attack_x, attack_y, 39, 44 );
            break;
     
        case "left":
            ctx.drawImage(attack_image_left, attack_x, attack_y, 39, 44);
            break;

        case "up":
            ctx.drawImage(attack_image_up, attack_x, attack_y, 39, 44 );
            break;

        case "down":
            ctx.drawImage(attack_image_down, attack_x, attack_y, 39, 44 );
            break;
     }   
        
    }

}

function attack_check(){
    switch (facing) {
        case "right": attack_x = zero_x + 40; attack_y = zero_y; break;
        case "left": attack_x = zero_x - 50; attack_y = zero_y; break;
        case "up": attack_x = zero_x; attack_y = zero_y - 50; break;
        case "down": attack_x = zero_x; attack_y = zero_y + 50; break;
    }


}




function gameLoop(){
    

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    get_player_position();
    attack_check();
    attack_image_draw();







    enemie_location_updater();
    for (let i = enemies.length -1 ;i >= 0; i--) {
    let enemie = enemies[i];
    ctx.drawImage(enemie_image, enemie.x, enemie.y, 30,30)
    let dx = zero_x - enemie.x;
    let dy = zero_y - enemie.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if(distance < 38 && Date.now() - last_damaged > i_frame){
        last_damaged = Date.now();
        player_hp -= 1;
        console.log("touched");
        i_frame_text.textContent = "I_FRAME_ACTIVE";
    }
    attack_dx = attack_x - enemie.x;
    attack_dy = attack_y - enemie.y;
    attack_distance = Math.sqrt(attack_dx*attack_dx + attack_dy*attack_dy);
    if (attack_distance <= 50 && Date.now() - last_attack < attack_img_speed) {
        enemies.splice(i, 1);
        continue;
    }


    }
    if (Date.now() - last_damaged > i_frame) {
        i_frame_text.textContent = "";
    }

    ctx.drawImage(player_image, zero_x, zero_y, 40, 40);
    ctx.closePath();
    hp_text.textContent = player_hp;
    requestAnimationFrame(gameLoop)
}