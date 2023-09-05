const key="AIzaSyDeMDh07Q3MM-WArhhsYpcpZzp1wlJ42Rs";
const baseurl="https://www.googleapis.com/youtube/v3";

const serbutton=document.getElementById("ser-btn")

const serinput=document.getElementById("ser-input")
  const container=document.getElementById("container")


function calculatetime(publishTime){
        
    let publishDate=new Date(publishTime)
    let currDate= new Date();

    let secondsGap= (currDate.getTime()-publishDate.getTime())/1000;

    const secondsperday=24*60*60;
    const secondsperweek=7*secondsperday;
    const secondspermonth=30*secondsperday;
    const secondsperyear=365*secondsperday;
    if(secondsGap< secondsperday){
        return `${Math.ceil(secondsGap/(60*60))}hrs ago`
    }
    if(secondsGap< secondsperweek){
        return `${Math.ceil(secondsGap/secondsperweek)}weeks ago`
    }
    if(secondsGap<secondspermonth){
        return `${Math.ceil(secondsGap/secondspermonth)} months ago`
    }
    
        return `${Math.ceil(secondsGap/secondsperyear)} year ago`
    
}




function navigateToVideoDetails(videoId){
       document.cookie=`id=${videoId}; path=/YOUYUBE-CLONE/play-video.html`;
       window.location.href="http://127.0.0.1:5500/play-video.html";
}
// this will take videoid and return the statics of the video


async  function getVideoStatistics(videoId){
     const endpoint=`${baseurl}/videos?key=${key}&part=statistics&id=${videoId}`;
     try{
        const responce=await fetch(endpoint);
        const result=await responce.json();
        return result.items[0].statistics;
     }
     catch(error){
        alert("failed to fetch statistics for",videoId)

     }
}



//channel logo
async function fetchChannelLogo(videoId){
    const endpoint=`${baseurl}/channels?key=${key}&id=${channelId}&part=snippet`

    try{
        const response=await fetch(endpoint);
        const result=await response.json();
        return result.items[0].snippet.thumbnails.high.url;
    }
    catch (error){
     alert("failed to load channel logo for",channelId)
    }
}

// {/* <div class="video">
//             <img src="https://picsum.photos/200/300" class="thumbnail"alt=""/>
             
        

//         <div class="bottomcontainer">
//         <div class="logo">
//             <img class="logo-1" src="https://picsum.photos/40/40" alt="logo-1">

//         </div>


//         <div class="title-container">
//             <p class="title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, facilis!</p>
//             <p class="gray">THE I SKYER</p>
//             <p class="gray">15k views . 1 week ago</p>

//         </div>
//     </div>
//     </div> */}

function rendervideo(videolist){
    //videolist will be an array of videos
    container.innerHTML='';
    videolist.forEach((video)=>{
    const videocontainer=document.createElement("div");
    videocontainer.className="video";
     videocontainer.innerHTML=`<img src="${video.snippet.thumbnai.high.url}" class="thumbnail"alt="thumbnail"/>
             
        

           <div class="bottomcontainer">
            <div class="logo">
            <img class="logo-1" src="${video.channelLogo}" alt="logo-1">
    
            </div>
    
    
            <div class="title-container">
                <p class="">${video.snippet.tittle}</p>
                 <p class="gray">${video.snippet.channelTitle}</p>
                <p class="gray">${video.statistics.viewCount}. ${calculatetime(video.snippet.publishTime)}</p>
    
           </div>
         </div>`;


         videocontainer.addEventListener("click",()=>{
              navigateToVideoDetails(video.id.videoId)
         })

container.appendChild(videocontainer)
    });
}


async function fetchsearch(searchString){
//searchstring will br the input entered by user


const endpoint=`${baseurl}/search?key=${key}&q=${searchString}&part=snippet&maxResults=20`;
try {
    
    const responce= await fetch(endpoint);
    const result=await responce.json();
    for(let i=0; i<result.items.length;i++){
        let currvideoId=result.items[i].id.videoId;
        let channelId=result.items[i].snippet.channelId;
        let currvideoStatistics=await getVideoStatistics(currvideoId);
        let channelLogo=await fetchChannelLogo(channelId);
        result.items[i].statistics=currvideoStatistics;
        result.items[i].channelLogo=channelLogo;
    }
    rendervideo(result.items);

}
catch (error){
 
    alert("error occured");
}
}

serbutton.addEventListener("click", ()=>{
    
    const servalue=serinput.value;
    fetchsearch(servalue);
});

fetchsearch("");

// getVideoStatistics()