const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function window_close(x){
    switch (x) {
        case 1:
            document.getElementById("window_info").style.display = "none";
            break;
        case 2:
            document.getElementById("window_info_2").style.display = "none";
            break;
    }

}

function uygulama(x) {
 switch (x) {
    case 1:
        document.getElementById("window_info").style.display = "block";
        break;
    case 2:        
        document.getElementById("window_info_2").style.display = "block";
        break;

}

}



function skip(){
    document.getElementById("acilis_sayfa").style.display = "none";
    document.getElementById("p1").style.display = "none";
    document.getElementById("pc_kisim").style.display="block";
}
const now = new Date()
const txt_connect = "CONNECTING_TO_SYSTEM...";
const txt_domain = "--YAKASHI_S_DOMAIN--";
const txt_date = "DATE_TIME : "+now;
//functions for typewritter

async function connection_typewriter(){
    let text = txt_connect;
    let completed = "";
    let chars = text.split('');
    let uzunluk = text.length;
    uzunluk -= 3;
    var prgrf = document.getElementById("int1");
    await delay(1000);
    for(const char of chars){
        completed += char;
        prgrf.textContent = completed;
        uzunluk -= 1;
        if (uzunluk > 0)
            await delay(125);
        else{
            completed += " ";
            await delay(1000);
            }
};




};


async function domain_typewriter(){
    await delay(6500);
    let text = txt_domain;
    let completed = "";
    let uzunluk = text.length;
    let chars = text.split('');
    var prgrf = document.getElementById("int2");
    await delay(1000);
    for(const char of chars){
        completed += char;
        prgrf.textContent = completed;
        uzunluk -= 1;
        if (uzunluk > 17 || uzunluk < 3)
        await delay(500);
        else
            await delay(100);

};

};

async function date_typewriter(){
    return new Promise(async (resolve) => {
    await delay(11000);
    let text = txt_date;
    let completed = "";
    let chars = text.split('');
    var prgrf = document.getElementById("int3");
    await delay(1000);
    for(const char of chars){
        completed += char;
        prgrf.textContent = completed;
        await delay(100);
};
resolve();
})
};
async function finish_cod() {
    let bolge = document.getElementById("acilis_sayfa");
    let pc_kisim = document.getElementById("pc_kisim");
    await date_typewriter();
    await delay(200);
    bolge.style.animation = "closing_animation 2s forwards";
    await delay(2000);
    skip();
    await delay(200);
    pc_kisim.style.animation = "opening_animation 3s forwards";
}






//CONNECTING_TO_COMPUTER...    --YAKASHI_S_DOMAIN--     DATE_TIME:

