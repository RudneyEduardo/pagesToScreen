//main func
const loadPage = async () => {
    let data = await getJsonData();
    await setWorksSelect(data);
    let workId = getWorkIdParam();
    await loadTitles(workId, data);
    await loadParagraphs(workId, data)
    await loadImages(workId, data)
    populateDivs(workId, data)
}

const loadTitles = async (workId, data) => {
    let title = document.getElementById('pageTitle')
    let text = document.createTextNode(data.files[workId].title)
    title.appendChild(text)
}

const loadParagraphs = async (workId, data) => {
    let firstP = document.getElementById('firstParagraph')
    let principalP = document.getElementById('principalText')
    let textFP = document.createTextNode(data.files[workId].firstParagraph)
    let textPP = document.createTextNode(data.files[workId].principalText)
    firstP.appendChild(textFP)
    principalP.appendChild(textPP)
}

const loadImages = async (workId, data) => {
    var image = new Image();
    image.src = "http://127.0.0.1:5500/imgs/"+data.files[workId].principalImage.link;
    document.getElementById("principalImage").appendChild(image);
    
}

async function getJsonData() {
    return await fetch('./data.json')
        .then((res) => {
            return res.json();
        })
}


const populateDivs = (workId) => {
    console.log("WORK ID: ", workId)
}

const getWorkIdParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "workId" in eg "pages/works/index?workId=0 => scott pilgrim"
    return params.workId; //Will receive the page value to show

}

function selectWork() {
    let selectValue = document.getElementById('worksSelect').value
    //send to work page
    window.location.href = `/pages/works/index.html?workId=${selectValue}`;
}

async function setWorksSelect(data) {
    //Get data from local json
    console.log(data)
    //add dynamically text to select
    let worksSelect = document.getElementById("worksSelect")

    for (let i = 0; i < data.files.length; i++) {
        let option = document.createElement("option");
        option.value = i
        option.text = data.files[i].title;
        worksSelect.add(option);
    }
}




