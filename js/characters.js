//main func
const loadPage = async () => {
    let data = await getJsonData();
    await setWorksSelect(data)
    await setCharacters(data)
}



async function getJsonData() {
    return await fetch('../../data/data.json')
        .then((res) => {

            return res.json();
        })
}


async function setCharacters(data) {
    let characterList = document.getElementById('charactersList')
    data.files.forEach(file => {
        
        file.characters.forEach(character => {
            const characterItem = document.createElement('li');
            characterItem.textContent = character.name + ` - ${file.title}`;
            characterList.appendChild(characterItem);
        })

    });
}


function selectWork() {
    let selectValue = document.getElementById('worksSelect').value
    //send to work page
    window.location.href = `/pages/works/index.html?workId=${selectValue}`;
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
