
//main func
const loadPage = async () => {
    let data = await getJsonData();
    await setWorksSelect(data)
    await loadImages(data)
}


async function getJsonData() {
    return await fetch('../../data/data.json')
        .then((res) => {

            return res.json();
        })
}


async function loadImages(data) {
    let imagesArticles = document.getElementsByClassName('image-item')
    for (let i = 0; i < imagesArticles.length; i++) {
        let imageTitle = data.files[i].title
        let imageTitleh2 = document.createElement('h2')
        imageTitleh2.appendChild(document.createTextNode(imageTitle))
        var image = new Image();
        image.src = "http://127.0.0.1:5500/imgs/" + data.files[i].img.link //+ data.files[i].img.link
        console.log(data.files[i].img.link)
        imagesArticles[i].appendChild(imageTitleh2);
        imagesArticles[i].appendChild(image);
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
