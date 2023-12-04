let slideIndex = 0;
showSlides();
setImageCaptions();
setWorksSelect();
setImageCarrousel();

async function getJsonData() {
  return await fetch('./data.json')
    .then((res) => {
      return res.json();
    })
}

async function setImageCaptions() {
  //Get data from local json
  let data = await getJsonData();
  //add dynamically text to caption
  let captions = document.getElementsByClassName('text');
  for (let i = 0; i < captions.length; i++) {
    let text = document.createTextNode(data.works[i].title)
    captions[i].appendChild(text)
  }
}

{/* <div class="mySlides fade">
      <div class="numbertext">3 / 3</div>
      <img src="./imgs/trilogiaScott.jpeg" alt="test3" style="width:100%">
      <div class="text"></div>
    </div> */}


async function setImageCarrousel(){
  let data = await getJsonData();
  let containers = document.getElementsByClassName('mySlides')
  for(let i = 0; i < containers.length; i++){
    var image = new Image();
    image.src = "http://127.0.0.1:5500/imgs/" +data.works[i].imgLink;
    image.style = "width:100%"
    containers[i].appendChild(image);
    
}
  console.log(containers)
}


function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function selectWork() {
  let selectValue = document.getElementById('worksSelect').value
  //send to work page
  window.location.href = `/pages/works/index.html?workId=${selectValue}`;
}

async function setWorksSelect() {
  //Get data from local json
  let data = await getJsonData();
  //add dynamically text to select
  let worksSelect = document.getElementById("worksSelect")

  for (let i = 0; i < data.works.length; i++) {
    let option = document.createElement("option");
    option.value = i
    option.text = data.works[i].title;
    worksSelect.add(option);
  }
}

