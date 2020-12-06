function getToken() {
  return "JWT" + " " + localStorage.getItem("token");
}

postMeme = () => {

  var memeName = $("#pageName").val();
  var memeDesc =$("#pageDescription").val();
  var memes = {}
  memeContent = [];
  $('.content').each(function() {
  
    memeContent.push($(this).val());
});
  for(var i = 0;i<ct;i++){
    text = memeContent[i]
    memes[i] = {"content":text}
  }
  
  const data = {
    title:memeName,
    description:memeDesc,
    memes: memes
  }
  console.log(data)

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization",getToken())

let requestOptions = {
method: 'POST',
body:JSON.stringify(data),
headers: myHeaders,
redirect: 'follow'
};
fetch("http://localhost:4000/api/v1/memePage/create", requestOptions)
  .then(response => response.json())
  .then(data=>{console.log(data)
  window.location.href = "../views/Profile.html"
    })
  .catch(error => console.log('error', error));
}