const key="AIzaSyDeMDh07Q3MM-WArhhsYpcpZzp1wlJ42Rs";

const baseurl="https://www.googleapis.com/youtube/v3";
  

const comments=document.getElementById("comments")
window.addEventListener("load",()=>{
    let videoId=document.cookie.split("=")[1];

    if(YT){
        new YT.Player("video-placeholder",
    {
        height:"300",
    
        width:"500",
        videoId:videoId,
    });
    loadcomments(videoId)
    }
})

async function loadcomments(videoId){
    
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
     

        const div=document.createElement("div");
        div.className="comment";
        div.innerHTML=`

        <img src="${profileUrl}" width="50" height="50" class="author-profile" alt="author profile"/>
        <b>${authorDisplayName

        }<b>

        <p>${textDisplay}</p>
        `
        comments.appendChid(div);
    })
    

}

