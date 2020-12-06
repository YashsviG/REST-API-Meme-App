function getToken() {
    return "JWT" + " " + localStorage.getItem("token");
  }
  const container = $("#memeList");
  let populateMemeList = (memeList)=>{
    
    memeList.forEach((meme)=>{
       
        
        let memeView = $(`<div class="col mb-4" style="flex: 0 0 33.333%;display: flex;">
        <div class="card">
        <div class="card-body" id="${meme.id}">
        <h5 class="card-title">${meme.title}</h5>
        <h5 class="card-title">${meme.description}</h5>
        <div class="container">
        <input type ="button" onclick ="editMemePage(${meme.id})" value ="Edit this MemePage" class="btn btn-primary"/>
        <input type ="button" onclick ="deletMemePage(${meme.id})" value ="Delete this MemePage" class="btn btn-danger"/>
        </div>
        </div></div></div>`);
         container.append(memeView);
    })
}

  getUserMemePage = () => {
      var author_id = $('#author');
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
      fetch("http://localhost:4000/api/v1/user/"+id+"/memePage", requestOptions)
          .then(response => response.json())
          .then(data=>{console.log(data)
            populateMemeList(data);
          })
          .catch(error => console.log('error', error));
  };
  getUserMemePage();
  

  editMemePage = (memeId) =>
  {
      window.location.href= "../views/editMemePage.html";
      localStorage.setItem("MEMEID", memeId);
      // let memeView = $(`<div class="col mb-4" style="flex: 0 0 33.333%;display: flex;">
      //   <div class="card">
      //   <div class="card-body" id="${meme.id}">
      //   <h5 class="card-title">${meme.title}</h5>
      //   <h5 class="card-title">${meme.description}</h5>
      //   <div class="container">
      //   <input type ="button" onclick ="editMemePage(${meme.id})" value ="Edit this MemePage" class="btn btn-primary"/>
      //   <input type ="button" onclick ="deletMemePage(${meme.id})" value ="Delete this MemePage" class="btn btn-danger"/>
      //   </div>
      //   </div></div></div>`);
      //   container.append(memeView);
      // let id = localStorage.getItem("id");
      // const data = {
      //     id: id,
      //     description: "Hello",
      //     title: "HI"
      // }

      // console.log(data);
      // let myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Authorization",getToken())

      // let requestOptions = {
      // method: 'PUT',
      // body:JSON.stringify(data),
      // headers: myHeaders,
      // redirect: 'follow'
      // };
      // fetch("http://localhost:4000/api/v1/memePage/"+memeId, requestOptions)
      //     .then(response => response.json())
      //     .then(data=>{console.log(data)
      //       //window.location.href="../views/viewMemePage.html"
      //     })
      //     .catch(error => console.log('error', error));
    } 

  deletMemePage = (memeId) =>
  {
      let id = localStorage.getItem("id");
      const data = {
          id:id,
      }
  
      console.log(data);
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization",getToken())
  
      let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
      };
      fetch("http://localhost:4000/api/v1/memePage/"+memeId, requestOptions)
          .then(response => response.json())
          .then(data=>{console.log(data)
            window.location.href ="../views/viewMemePage.html"
          })
  
          .catch(error => console.log('error', error));
  };