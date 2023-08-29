const score = document.querySelector(".score")
const score2 = document.querySelector(".score2")
const summaryBoxes = document.querySelector(".summary-boxes")
const examResultVerbatim = document.querySelector(".exam-result-verbatim")
const examResultVerbatim2 = document.querySelector(".exam-result-verbatim2")
const correctCountVerbatim = document.querySelector(".correct-count-verbatim")
const correctCountVerbatim2 = document.querySelector(".correct-count-verbatim2")
const wrongCountVerbatim = document.querySelector(".wrong-count-verbatim")
const wrongCountVerbatim2 = document.querySelector(".wrong-count-verbatim2")
const skipCountVerbatim = document.querySelector(".skip-count-verbatim")
const skipCountVerbatim2 = document.querySelector(".skip-count-verbatim2")

//media source path
const mediaSrcImg = "https://res.cloudinary.com/dzblavrli/image/upload/drivelicense/"
const mediaSrcVid = "https://res.cloudinary.com/dzblavrli/video/upload/drivelicense/"

//question elements hoisting
const mediaImg = document.querySelector(".question-media-img-result")
const mediaVideo = document.querySelector(".question-media-video-result")
const A = document.querySelector(".a")
const B = document.querySelector(".b")
const C = document.querySelector(".c")
const YES = document.querySelector(".yes")
const NO = document.querySelector(".no")

//navi elements
const backToHomePage = document.querySelector(".exit-btn")
const examTryAgain = document.querySelector(".try-again-btn")

//popup elements ----
const popupModal = document.getElementById("popupResults")

//placeholder info 
const placeholderInfo = document.querySelector(".placeholder-info")

function displayPopupResults(){
    popupModal.classList.add("display-results-popup")
}

function closePopupResults(){
    popupModal.classList.remove("display-results-popup")
}
// -----

function openLglPopup(){
    lglPopup.classList.add("open-lgl-popup")
}

function closeLglPopup(){
    lglPopup.classList.remove("open-lgl-popup")
}

//function
function createSummaryBoxes(parentDiv, questObject, i) {
    const box = document.createElement("p");

    //on click show question details
    box.addEventListener("click", () => {

        //hide placeholder info firstly
        placeholderInfo.style.display = "none"

        //clear answer class list
        A.classList.remove("sb-green")
        A.classList.remove("sb-red")
        A.classList.remove("marked")
        B.classList.remove("sb-green")
        B.classList.remove("sb-red")
        B.classList.remove("marked")
        C.classList.remove("sb-green")
        C.classList.remove("sb-red")
        C.classList.remove("marked")
        YES.classList.remove("sb-green")
        YES.classList.remove("sb-red")
        YES.classList.remove("marked")
        NO.classList.remove("sb-green")
        NO.classList.remove("sb-red")
        NO.classList.remove("marked")

        //question media handling
        if (questObject.media.toLowerCase().slice(-4) === ".jpg") {

            mediaImg.style.display = "block"
            mediaVideo.style.display = "none"
            mediaImg.src = mediaSrcImg + "/img/" + questObject.media

        } else if (questObject.media.toLowerCase().slice(-4) === ".wmv") {

            mediaImg.style.display = "none"
            mediaVideo.style.display = "block"
            mediaVideo.src = mediaSrcVid + "/video/" + questObject.media.replace("wmv", "mp4")
            mediaVideo.controlsList = "noplaybackrate nodownload"

        } else {

            mediaImg.style.display = "block"
            mediaVideo.style.display = "none"
            mediaImg.src = mediaSrcImg + "/img/no_media.jpg"

        }

        const yesNo = document.querySelector(".yn")
        const ABC = document.querySelector(".abc")
        //questions type handling
        if (questObject.type === "PODSTAWOWY") {
            yesNo.style.display = "flex"
            ABC.style.display = "none"
        } else {
            yesNo.style.display = "none"
            ABC.style.display = "block"

            //fill answers content dynamically
            let abcAnswers = questObject.abc_answers.split(" - ")
            A.innerHTML = abcAnswers[0]
            B.innerHTML = abcAnswers[1]
            C.innerHTML = abcAnswers[2]
        }

        //mark correct and user answer
        switch (questObject.quest_correct_answer) {
            case "A":
                A.classList.add("sb-green")
                A.classList.add("marked")
                break;
            case "B":
                B.classList.add("sb-green")
                B.classList.add("marked")
                break;
            case "C":
                C.classList.add("sb-green")
                C.classList.add("marked")
                break;
            case "T":
                YES.classList.add("sb-green")
                YES.classList.add("marked")
                break;
            case "N":
                NO.classList.add("sb-green")
                NO.classList.add("marked")
                break;
        }

        if (questObject.quest_correct_answer !== questObject.userAnswer) {
            switch (questObject.userAnswer) {
                case "A":
                    A.classList.add("sb-red")
                    A.classList.add("marked")
                    break;
                case "B":
                    B.classList.add("sb-red")
                    B.classList.add("marked")
                    break;
                case "C":
                    C.classList.add("sb-red")
                    C.classList.add("marked")
                    break;
                case "T":
                    YES.classList.add("sb-red")
                    YES.classList.add("marked")
                    break
                case "N":
                    NO.classList.add("sb-red")
                    NO.classList.add("marked")
                    break
            }
        }

        const questionContentText = document.querySelector(".question-content-txt")
        const questionLegalSource = document.querySelector(".lgl-info-txt")
        const lglDiv = document.querySelector(".lgl-info")
        const lglPopup = document.querySelector(".lgl-info-popup")
        const questScoreDiv = document.querySelector(".quest-score")
        const scoreValue = document.querySelector(".score-value")

        questScoreDiv.style.display = "flex"
        lglDiv.classList.add("display-lgl-info")
        questionContentText.innerHTML = questObject.quest_txt
        questionLegalSource.innerHTML = questObject.legal_source
        scoreValue.innerHTML = questObject.score



    })

    box.classList.add("summary-box")
    if (questObject.isCorrect) {
        box.classList.add("sb-green")
    } else {
        box.classList.add("sb-red")
    }
    box.innerHTML = i
    parentDiv.appendChild(box)
}

window.onload = (event) => {

    //get variables from exam page
    let summaryQuestions = new Map(JSON.parse(localStorage.summaryQuestions));
    let userScore = sessionStorage.getItem("userScore");

    //new variables
    let correctCount = 0;
    let wrongCount = 0;
    let skipCount = 0;

    for (let [key, value] of summaryQuestions) {

        createSummaryBoxes(summaryBoxes, value, key)

        if (value.isCorrect) {
            correctCount++;
        } else {
            if (value.userAnswer == undefined) {
                skipCount++;
            } else {
                wrongCount++;
            }
        }
    }

    score.innerHTML = userScore + "/74"
    score2.innerHTML = userScore + "/74"

    correctCountVerbatim.innerHTML = correctCount
    correctCountVerbatim2.innerHTML = correctCount
    wrongCountVerbatim.innerHTML = wrongCount
    wrongCountVerbatim2.innerHTML = wrongCount
    skipCountVerbatim.innerHTML = skipCount
    skipCountVerbatim2.innerHTML = skipCount

    if (userScore >= 68) {
        examResultVerbatim.style.color = "green"
        examResultVerbatim.innerHTML = "POZYTYWNY"

        examResultVerbatim2.style.color = "green"
        examResultVerbatim2.innerHTML = "POZYTYWNY"

    } else {
        examResultVerbatim.style.color = "red"
        examResultVerbatim.innerHTML = "NEGATYWNY"

        examResultVerbatim2.style.color = "red"
        examResultVerbatim2.innerHTML = "NEGATYWNY"
    }
}

//navi buttons functionality
backToHomePage.addEventListener("click", () => {
    window.location.href = "./";
})

examTryAgain.addEventListener("click", () => {
    window.location.href = "./examPage";
})


