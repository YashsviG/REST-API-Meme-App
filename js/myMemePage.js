if(!localStorage.getItem("token") || !localStorage.getItem("userId") ){
    alert("Logged out");
    window.location.href = "../views/login.html";
}
const token = `JWT ${localStorage.getItem("token")}`
const userId = localStorage.getItem("userId");

const container = $("#myQuizzes");

let populateMyMemePage = (memePage)=>{
    memePage.forEach((memePage)=>{
        let viewMemePage = $(`<div id="memePage${meme.id}">
        <p>${memePage.title}</p>
        <p>${memePage.description}</p>
        </div>`);
        viewMemePage.click(()=>{
            console.log("Quiz", meme.id, "clicked!");
            window.location.href = `../views/editMeme.html/?memePage=${meme.id}`
        })
        container.append(viewMemePage);
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
fetch(`http://localhost:4000/api/v1/user/${userId}/memePage`, requestOptions)
.then((response) => {
    console.log(response.status);
    if(response.status != 200) throw response.json();
    return response.json()
})
.then((result) => {
    console.log(result);
    populateMyMemePage(result);
    //Populate Quizzes
})
.catch(error => error.then(msg => alert(msg.message)));

