
const container = document.querySelector(".card-container");
const btn = document.querySelector(".btn");
const link ="https://api.adviceslip.com/advice";
//ANIMATIONS
const play = (cards) => {
    btn.disabled = true;
    let prev;
    let current;
    cards.forEach(card=>{
        if(card.classList.contains("current"))
            current = card;
        else if(card.classList.contains("previous"))
            prev = card
    })
    current.classList.add("fadeOut");
    prev.classList.add("fadeIn");
    setTimeout(()=>{
        current.classList = "card previous";
        prev.classList = "card current";
        btn.disabled = false;
    },2000)
}
//CREATE CURRENT CARD WITH DATA
const initCard = (slip)=>{
    const card = document.createElement("div");
    card.classList = "card current fadeIn";
    card.innerHTML = `
        <h2>Advice #${slip.id}</h2>
        <p>"${slip.advice}"</p>
        <div class="pattern-divider"></div>
    `
    container.appendChild(card);
}
//CHANGE CARDS WITH NEW ADVICE
const newAdvice = (cards) => {
    fetch(link).then(response=>{
        return response.json()
    }).then(data=>{
        const slip = data.slip;
        const prev = document.querySelector(".previous");
        prev.innerHTML=`
        <h2>Advice #${slip.id}</h2>
        <p>"${slip.advice}"</p>
        <div class="pattern-divider"></div>
    `
    }).then(res=>{
        play(cards)
    })
}
//RUN
fetch(link).then(response=>{
    return response.json();
}).then(data=>{
    const slip = data.slip
    initCard(slip);
    const cards = document.querySelectorAll(".card");
    btn.addEventListener("click",()=>{
        newAdvice(cards);
    },false);

});

