function captureValue(){

    let namediv = document.querySelector('.nameUser')
    let EloUser = document.querySelector('.EloUser')
    namediv.children[0].textContent = ``
    EloUser.innerHTML = ``
  
    let valorInput = document.querySelector('.search').value
    pesquisarUser(valorInput)
         
}

function pesquisarUser(valor){
    
    let inputName = valor
    fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inputName}?api_key=RGAPI-19350159-88e1-41be-84ba-54d56b3c92ca
    `)
    .then(response => {
       return  response.json()
    })
    .then(result => { dataUser(result); })
    .catch(function error() {
        loading()
        erro()
    })
    
}

function dataUser(dataPlayer) {
    let id = dataPlayer.id
    let profileIconId = dataPlayer.profileIconId

    fetch(`https://ddragon.leagueoflegends.com/cdn/12.17.1/img/profileicon/${profileIconId}.png`)
    .then(response => {
        
        loading()
       return  response.url
    })
    .then(result => { showIcon(result); })

    SearchInfo(id)
}

function SearchInfo(idSummener){
   let idpoint = idSummener 
   fetch(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${idpoint}?api_key=RGAPI-19350159-88e1-41be-84ba-54d56b3c92ca`)
   .then(response => {
     
      return response.json()
      
   })
   .then(result => { viewInfo(result)})
   
}

function viewInfo(result){
   
    if(result.length == 1){

        let summonerName = result[0].summonerName
        let eloMain = result[0].tier
        let eloRank = result[0].rank
        let mainWins = result[0].wins
        let mainLoses = result[0].losses

        viewData(summonerName,eloMain,eloRank,mainWins,mainLoses)

    }else if(result.length == 2){

        let summonerName = result[0].summonerName
        let eloFlex = result[0].tier 
        let flexRank = result[0].rank
        let eloMain = result[1].tier
        let eloRank = result[1].rank 
        let mainWins = result[1].wins
        let mainLoses = result[1].wins


        viewData(summonerName,eloMain,eloRank,mainWins,mainLoses,eloFlex,flexRank)

    }

}
  
function viewData(nomePlayer,elomain,elorank,mainwins,mainloses,eloflex,flexrank){

    let nome = nomePlayer
    let eloMain = elomain 
    let eloRank = elorank 
    let mainWins = mainwins
    let mainLoses = mainloses 
    let eloFlex = eloflex 
    let flexRank = flexrank

    if(eloFlex == undefined && flexRank == undefined){
        eloFlex = 'Nenhuma Informação encontrada =/'
        flexRank = 'Nenhuma Informação encontrada =/'
    }
  
    
     let namediv = document.querySelector('.nameUser')
     let EloUser = document.querySelector('.EloUser')

     namediv.children[0].textContent = `${nome}`

     EloUser.innerHTML = `
                    <h1>Ranqueada Solo/Duo : <span style="color:#FF0043;">${eloMain}</span></h1>
                    <h1>Divisão :<span style="color:#FF0043;">${eloRank}</span></h1>
                    <h1>Ranqueada Flex :<span style="color:#FF0043;"> ${eloFlex}</span></h1>
                    <h1>Divisão :<span style="color:#FF0043;">${flexRank}</span></h1>
                    <h1>Vitorias Ranqueadas Solo/duo :  ${mainWins}</h1>
                    <h1>Derrotas Ranqueadas Solo/duo :  ${mainLoses}</h1>
     `
     loading()  
     
}

function showIcon(icon){
    let url = icon
    let icondiv = document.querySelector('#logo')
    icondiv.innerHTML = `
                <img  class="eloimg" src="${url}" alt="logoPlayer">
     `

}
 
function erro(){
    let erro = document.querySelector('.error')
    erro.innerHTML = `<div class="erroclass">O nome inserido é invalido por favor insira novamente!</div>`

    setTimeout(() => {
        erro.innerHTML = ``
    },1200);
}

function loading(){
    
    let namediv2 = document.querySelector('.nameUser')
    
    if(namediv2.children[0].textContent == ''){
       let loading = document.querySelector('#loading')
       loading.innerHTML = `
        <div class="dot-spinner">
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        </div>
       `
    }else{
        let loading = document.querySelector('#loading')
        loading.innerHTML = ``
    }
    
}
    
   


