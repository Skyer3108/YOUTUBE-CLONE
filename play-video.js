const key="AIzaSyBkKtRUSyjS0W3IyNQv4Q9kNG6flLL-Fhk";

const baseurl="https://www.googleapis.com/youtube/v3";
  

const commentsContainer=document.getElementById("comments")




window.addEventListener("load",()=>{
    let videoId=document.cookie.split("=")[1];

    if(YT){
        new YT.Player("video-placeholder",
    {
        height:"500",
    
        width:"700",
        videoId,
    });
    loadcomments(videoId)
    console.log(videoId)
    }
})




async function loadcomments(videoId){
    console.log("comments")


    
    let endpoint=`${baseurl}?key=${key}&videoId=${videoId}&maxResults=30&part=snippet`;
    const responce= await fetch(endpoint);
    const result=await responce.json();

    result.items.forEach((item)=>{
        const repliesCount=item.snippet.totalReplyCount;

        const {
            authorDisplayName,
            textDisplay,
            likeCount,
            authorProfileImageUrl:profileUrl,
            PublishedAt,
    
        }=item.snippet.topLevelComment.snippet;

        console.log(authorDisplayName)
     

        const div=document.createElement("div");
        div.className="comment";
        div.innerHTML=`

        <img src="${profileUrl}" width="50" height="50" class="author-profile" alt="author profile"/>
        <b>${authorDisplayName}<b>

        <p>${textDisplay}</p>
        `
        commentsContainer.appendChid(div);
    })
    

}

