let commentsArr = []

//main func
const loadPage = async () => {
    let data = await getJsonData();
    await setWorksSelect(data)
}


async function getJsonData() {
    return await fetch('../../data/data.json')
        .then((res) => {

            return res.json();
        })
}

document.getElementById('commentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const comment = document.getElementById('comment').value;
    await setCommentsData(comment)
});



function setCommentsData(data) {
    // Caminho para o arquivo JSON local
    commentsArr.push(data)
    localStorage.setItem('comments', commentsArr)
    let comments = document.getElementById('commentsList')
    comments.innerHTML = ''
    let localStorageArr = localStorage.getItem('comments').split(',')
    console.log(localStorageArr)
    localStorageArr.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.textContent = comment;
        comments.appendChild(commentItem);
    });

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
