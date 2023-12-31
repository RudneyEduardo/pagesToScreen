//main func
const loadPage = async () => {
    let data = await getJsonData();
    await setWorksSelect(data);
    let workId = getWorkIdParam();
    await loadTitles(workId, data);
    await loadParagraphs(workId, data)
    await loadImages(workId, data)
    await loadVolumes(workId, data)
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
    let Fulltext = data.files[workId].principalText.split('.')
    for(let i = 0; i < Fulltext.length; i++){
        let textPP = document.createTextNode(Fulltext[i])
        principalP.appendChild(textPP)
        principalP.appendChild(document.createElement('br'))
    }
    firstP.appendChild(textFP)
    
}

const loadImages = async (workId, data) => {
    var image = new Image();
    image.src = "http://127.0.0.1:5500/imgs/" + data.files[workId].principalImage.link;
    image.style = "width: 50%;height: 800px;float: right;padding-left: 10%"
    document.getElementById("principalImage").appendChild(image);

}

const loadVolumes = async (workId, data) => {
    let volumesArticle = document.getElementById('volumes')
    if(data.files[workId].volumes){
        for(let i = 0; i < data.files[workId].volumes.length; i++){
            let textNode = document.createTextNode(' - '+data.files[workId].volumes[i].volume)
            if(i == 0){
                volumesArticle.appendChild(document.createElement('br'))
            }
            volumesArticle.appendChild(textNode)
            volumesArticle.appendChild(document.createElement('br'))
        }
    }else{
        document.getElementById('volumesHeader').innerHTML = ''
    }
    
}   

async function getJsonData() {
    return await fetch('../../data/data.json')
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




