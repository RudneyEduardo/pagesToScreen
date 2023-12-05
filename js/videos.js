//main func
const loadPage = async () => {
    let data = await getJsonData();
    await setWorksSelect(data)
    await setLinks(data)
    await setVideos(data)
}



async function getJsonData() {
    return await fetch('../../data/data.json')
        .then((res) => {

            return res.json();
        })
}

async function setLinks(data) {
    let middleSection = document.getElementById('middle');
    console.log(data.files.length)
    for (let i = 0; i < data.files.length; i++) {
        let section = document.createElement('section')
        section.id = 'title_' + i
        let title = document.createElement('h2');
        let text = document.createTextNode(data.files[i].title)
        title.appendChild(text)
        middleSection.appendChild(section)
        section.appendChild(title)
        middleSection.appendChild(document.createElement('br'))

    }
}
{/* <iframe width="100%" height="400" src="https://www.youtube.com/embed/SEU_ID_DO_VIDEO" frameborder="0" allowfullscreen></iframe> */}
async function setVideos(data) {
    for (let i = 0; i < data.files.length; i++) {
        let videoSection = document.getElementById('title_' + i)
        let iframeTag = document.createElement('iframe')
        iframeTag.width = "50%"
        iframeTag.height = "400"
        iframeTag.src = data.files[i].videoLink.link
        videoSection.appendChild(iframeTag)
    }

}


function selectWork() {
    let selectValue = document.getElementById('worksSelect').value
    //send to work page
    window.location.href = `pagesToScreens/pages/works/index.html?workId=${selectValue}`;
}

async function setWorksSelect(data) {
    //add dynamically text to select
    let worksSelect = document.getElementById("worksSelect")

    for (let i = 0; i < data.files.length; i++) {
        let option = document.createElement("option");
        option.value = i
        option.text = data.files[i].title;
        worksSelect.add(option);
    }
}
