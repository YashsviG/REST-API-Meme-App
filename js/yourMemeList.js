function getToken() {
    return "JWT" + " " + localStorage.getItem("token");
  }
const token = getToken()

const container = $("#memeList");

let populateMemeList = (memeList)=>{
        let memeView = $(`<div class="col mb-4" style="flex: 0 0 33.333%;display: flex;">
        <div class="card">
        <div class="card-body" id="${memeList.content}">
        <h5 class="card-title">${memeList.meme_id}</h5>
        <img src = "https://media.giphy.com/media/l4EoUzvXmUR7jsUXC/giphy.gif">
        <div class="container">
        
        </div>
        </div></div></div>`);
         container.append(memeView);
}

let id = localStorage.getItem("id");
      const data = {
          id:id,
      }
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", token);

let requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};
fetch("http://localhost:4000/api/v1/meme/"+id, requestOptions)
.then((response) => {
    console.log(response.status);
    if(response.status != 200) throw response.json();
    return response.json()
})
.then((result) => {
    console.log(result);
    populateMemeList(result);
})
.catch(error => error.then(msg => alert(msg.message)));