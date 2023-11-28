
//main func
const loadPage = () => {
    setWorksSelect();
    let workId = getWorkIdParam()
    populateDivs(workId)
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

async function setWorksSelect() {
    //Get data from local json
    let data = await getJsonData();
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




