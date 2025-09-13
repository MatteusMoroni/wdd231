fetch('data/members.json')
  .then(response =>{
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
    .then(data => {
        membersArray = data;
        console.log('Array carregado com sucesso:', membersArray);
    })

    
