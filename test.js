const cont=document.getElementById("container");
const key="AIzaSyDeMDh07Q3MM-WArhhsYpcpZzp1wlJ42Rs";

const baseurl="https://www.googleapis.com/youtube/v3";

//whenever we make the network call we will receive 
//fetch(url)
//A promise object can br handled in two ways
//1.Using .then or .catch(promise chaining)
//2. by using async / await

// function loadcomments(){
// //  let videoId=;
//  const response =fetch(`${url}?key=${key}&videoId=${link}&maxResults=30&part=snippet`)
//  prom.then((response)=>{
//    let p=response.json()//json method return a promise which will coolect all theb packets of data
//    //p is going tofullfiled

//    p.then ((data)=>{
//   data.items.forEach((iteam)=>{
//     //  const authorName=iteam.sinppet.topLevelComment.authorDisplayName;
//     //  const commentText=iteam.sinppet.topLevelComment.snippet.textDisplay;
//     //  const likecount=iteam.sinppet.topLevelComment.snippet.likeCount;
 



// bu using async await

async function loadcomments(){
    let videoId="";
    let url=`${url}?key=${key}&videoId=${link}&maxResults=30&part=snippet`
    const responce= await fetch(url);
    const result=await responce.json();

    result.items.forEach((item)=>{
        const repliesCount=item.snippet.totalReplyCount;

        const{
            authorDisplayName,
            textDisplay,
            likeCount,
            authorProfileImageUrl:profileUrl,
            PublishedAt
    
        }=item.snippet.topLevelComment.snippet;

    })
    

}