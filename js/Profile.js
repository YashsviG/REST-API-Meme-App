function getToken() {
  return "JWT" + " " + localStorage.getItem("token");
}
getInfo = () => {
    let name = $("#name");
    let email = $("#email");
    let password = $("#password");
    let id = localStorage.getItem("id");
    const data = {
        id:id,
    }

    console.log(data);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",getToken())

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch("http://localhost:4000/api/v1/user/"+id, requestOptions)
        .then(response => response.json())
        .then(data=>{console.log(data)
        name.val(data.username)
        email.val(data.email)
        password.val(data.password)
        })

        .catch(error => console.log('error', error));
};
getInfo();

updateInfo=()=>{
  let id = localStorage.getItem("id");
  let name = $("#name").val()
  let email = $("#email").val()
  let pass = $("#password").val()
  const data = {
    name : name,
    email : email,
    password:pass
}

console.log(data);
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization",getToken())

let requestOptions = {
method: 'PUT',
body:JSON.stringify(data),
mode:'cors',
headers: myHeaders,
redirect: 'follow'
};
fetch("http://localhost:4000/api/v1/user/"+id, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
  getInfo();

}

deleteInfo = () => {
 
  let id = localStorage.getItem("id");
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization",getToken())

  let requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
  };
  fetch("http://localhost:4000/api/v1/user/"+id, requestOptions)
      .then(response => {response.json()
      window.location.href = "../views/login.html"}
      )
      .catch(error => console.log('error', error));

  }

  launchCreate = () => 
  {
    window.location.href = "../views/createMemePage.html";
  }
  launchViewMemePage = () =>
  {
    window.location.href = "../views/viewMemePage.html";
  }

  launchViewMeme = () =>
  {
    window.location.href = "../views/MemeList.html";
  }

  launchViewYourMeme = () =>
  {
    window.location.href = "../views/yourMemeList.html";
  }