function getToken() {
    return "JWT" + " " + localStorage.getItem("token");
  }
const token = getToken()
const userId = localStorage.getItem("id");

const container = $("#memeList");
{/* <div class="col mb-4"><div class="card"><div class="card-body"><h5 class="card-title">Card title</h5><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div> */}

let populateMemeList = (memeList)=>{
    
    memeList.data.forEach((meme)=>{
        console.log("MEME", meme);
        
        let memeView = $(`<div class="col mb-4" style="flex: 0 0 33.333%;display: flex;">
        <div class="card">
        <div class="card-body" id="${meme.id}">
        <h5 class="card-title">${meme.title}</h5>
        <img src = "${meme.images.fixed_height.url}">
        <div class="container">
        
        </div>
        </div></div></div>`);
         container.append(memeView);
    })
}


let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", token);

let requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};
fetch("http://localhost:4000/api/v1/memeList", requestOptions)
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