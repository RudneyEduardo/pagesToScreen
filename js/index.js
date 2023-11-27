//main func
const loadPage = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "page" in eg "https://example.com/?page=scottPilgrim"
      let value = params.page; //Will receive the page value to show
      
}


function Func() {
    fetch('./data.json')
        .then((res) => {
        return res.json();
    })
    .then((data) => console.log(data));
}



Func()