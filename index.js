import { catsData } from '/data.js'

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")

emotionRadios.addEventListener('change', highlightCheckedOption)
getImageBtn.addEventListener("click",renderCat)
memeModalCloseBtn.addEventListener('click', closeModal)

function closeModal(){
    memeModal.style.display = "none";
}
function highlightCheckedOption(e){
    const radios =document.getElementsByClassName("radio")
        for(let radio of radios){
            radio.classList.remove("highlight")
        }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function getEmotionsArray(cats){
    const emotionsArray = [];
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
            emotionsArray.push(emotion)}
        }
    }
    return emotionsArray
}
function renderCat(){
    const catObject = getSingleCatObject();
    memeModalInner.innerHTML = `<img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >`
    memeModal.style.display  = "flex"
}
function getSingleCatObject(){
    const catsArray = getMatchingCatsArray();
    if(catsArray.length === 1){
    return  catsArray[0]
    }
    else{
        let randomNumber = Math.floor(Math.random() * (catsArray.length + 1) );
    return catsArray[randomNumber]
     
    }
}

function getMatchingCatsArray(){
    
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
    const matchingCatsArray = catsData.filter(function(cats){
        if(isGif == false){
       return cats.emotionTags.includes(selectedEmotion)}
       else{
        return cats.emotionTags.includes(selectedEmotion) && cats.isGif
       }
        
    })
    return matchingCatsArray
}}

function renderEmotionsRadios(cats){
 const emotions = getEmotionsArray(cats)
 let radioItems = " ";
 for (let emotion of emotions){
    radioItems += `<div class="radio">
                        <label for="${emotion}">${emotion}</label>
                        <input 
                            type ="radio"
                            id = "${emotion}"
                            value = "${emotion}"
                            name = "emotions"
                        >
                    </div>`
 }
 emotionRadios.innerHTML = radioItems;
}
renderEmotionsRadios(catsData)
