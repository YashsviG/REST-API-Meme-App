function getToken() {
    return "JWT" + " " + localStorage.getItem("token");
  }
  editMemePage = () => {
    let id = localStorage.getItem("id");
    let memeId = localStorage.getItem("MEMEID");
   
    let description = $('#description').val();
    let title = $('#title').val();
    const data = {
        id: id,
        description: description,
        title: title
    }
    console.log(data);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",getToken())

    let requestOptions = {
    method: 'PUT',
    body:JSON.stringify(data),
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch("http://localhost:4000/api/v1/memePage/"+memeId, requestOptions)
        .then(response => response.json())
        .then(data=>{console.log(data)
          window.location.href = "../views/viewMemePage.html";
        })
        .catch(error => console.log('error', error));
};
