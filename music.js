let currentsongname=document.getElementById('currentsongname');

// song data 
let songdat=[
{imgpath:'./photos/swoopna1.jpg',songname:'story of my life', songpath:'mymusic/mp1.mp3'},
{imgpath:'./photos/swoopna2.jpg', songname:'its you always you  ', songpath:'mymusic/mp2.mp3'},
{imgpath:'/photos/swoopna3.jpeg', songname:'only getting older',songpath:'mymusic/mp3.mp3'},
{imgpath:'./photos/swoopna2.jpg', songname:'i ma in a field of dandolines', songpath:'mymusic/mp4.mp3'},
{imgpath:'/photos/swoopna3.jpeg', songname:'monkeydance',songpath:'mymusic/mp5.mp3'},
{imgpath:'./photos/swoopna2.jpg', songname:'girls like you', songpath:'mymusic/mp6.mp3'},
{imgpath:'/photos/swoopna3.jpeg', songname:'mind fills like a foreign land',songpath:'mymusic/mp7.mp3'}
];
console.log(songdat);
console.log(songdat[1]);
console.log(songdat[1].imgpath);


let songlist=document.querySelector('.songlist');
for(let i=0; i<songdat.length; i++)
{
    songlist.innerHTML +=`
<div class="songbox">
<div><img class="songboximg" src="${songdat[i].imgpath}" alt=""></div>
<div class="songboxmusicname">${songdat[i].songname}</div>
<div class="songboxplaycontainer">
 <span class="songboxcurrenttime">0:00</span>
 <i class="fa-regular fa-circle-play songlistplaybtn"></i>
</div>
</div>            
`;
};

let myaudio=new Audio();
let pause=document.querySelector('#pause');

pause.addEventListener('click',()=>{
    if(myaudio.paused || myaudio.currentTime<=0)
    {
        pause.classList.add('fa-circle-pause');
        pause.classList.remove('fa-circle-play');
        myaudio.src=songdat[0].songpath;
        myaudio.play();

        let firstindexbtn=document.querySelector('.songlistplaybtn');
        firstindexbtn.classList.remove('fa-circle-play');
        firstindexbtn.classList.add('fa-circle-pause');

        currentsongname.innerHTML=`${songdat[0].songname}`;
        

    }
    else{
        pause.classList.add('fa-circle-play');
        pause.classList.remove('fa-circle-pause');
        
        let firstindexbtn=document.querySelector('.songlistplaybtn');
        firstindexbtn.classList.add('fa-circle-play');
        firstindexbtn.classList.remove('fa-circle-pause');
        myaudio.pause();
    }
})

myaudio.addEventListener('timeupdate',()=>{
let progressbar=document.querySelector('#progressbar')
    let progress=parseInt((myaudio.currentTime/myaudio.duration)*100);
    progressbar.value=progress;
    
    let min=Math.floor(myaudio.currentTime/60);
    let sec=Math.floor(myaudio.currentTime%60);
    let mytime=`${min}:${sec}`;
    document.getElementById('currenttime').innerText=mytime;

    let durationmin=Math.floor(myaudio.duration/60);
    let durationsec=Math.floor(myaudio.duration%60);
    let totalduration=`${durationmin}:${durationsec}`;
    document.getElementById('duration').innerText=totalduration;
})

progressbar.addEventListener('change',()=>{
    myaudio.currentTime=progressbar.value*myaudio.duration/100;
})





let songindex=0;
myaudio.addEventListener('ended',()=>{
    console.log('music end');
    if(songindex==songdat.length)
    {
        songindex=0;
        myaudio.src=songdat[songindex].songpath;
        myaudio.currentTime=0;
        myaudio.play();
        currentsongname.innerHTML=`${songdat[songindex].songname}`
    }
    else{
        songindex +=1;
        myaudio.src=songdat[songindex].songpath;
        myaudio.currentTime=0;
        myaudio.play();    
        currentsongname.innerHTML=`${songdat[songindex].songname}`
        
    }
})


let next=document.getElementById('next');
next.addEventListener('click',()=>{
    if(songindex==songdat.length)
    {
        songindex=0;
        myaudio.src=songdat[songindex].songpath;
        myaudio.currentTime=0;
        myaudio.play();
        pause.classList.add('fa-circle-pause');
        pause.classList.remove('fa-circle-play');
        currentsongname.innerHTML=`${songdat[songindex].songname}`
        
    }
    else{
        songindex +=1;
        myaudio.src=songdat[songindex].songpath;
        myaudio.currentTime=0;
        myaudio.play();
        pause.classList.add('fa-circle-pause');
        pause.classList.remove('fa-circle-play');
        currentsongname.innerHTML=`${songdat[songindex].songname}`
        
        
    }
})



let previous=document.getElementById('previous');
previous.addEventListener('click',()=>{
    if(songindex<=0)
    {
        songindex=0;
        myaudio.src=songdat[songindex].songpath;
        myaudio.currentTime=0;
        myaudio.play();
        pause.classList.add('fa-circle-pause');
        pause.classList.remove('fa-circle-play');
        currentsongname.innerHTML=`${songdat[songindex].songname}`
        

    }
    else{
        songindex -=1;
        myaudio.src=songdat[songindex].songpath;
        myaudio.currentTime=0;
        myaudio.play();
        pause.classList.add('fa-circle-pause');
        pause.classList.remove('fa-circle-play');
        currentsongname.innerHTML=`${songdat[songindex].songname}`
        
    }
})

console.log(`songindex after prev fun${songindex}`)

let songlistplaybtn=document.querySelectorAll('.songlistplaybtn')
songlistplaybtn.forEach((element,i)=>{
    element.addEventListener('click',()=>{
       if(element.classList.contains('fa-circle-play'))
       {
             songlistplaybtn.forEach((ele)=>{
               ele.classList.remove('fa-circle-pause');
               ele.classList.add('fa-circle-play');
             })

         element.classList.remove('fa-circle-play');
         element.classList.add('fa-circle-pause');
         pause.classList.remove('fa-circle-play');
         pause.classList.add('fa-circle-pause');
         myaudio.src=songdat[i].songpath;
         myaudio.currentTime=0;
         myaudio.play()

         
        
       }
       else{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
        pause.classList.add('fa-circle-play');
        pause.classList.remove('fa-circle-pause');
        myaudio.pause();
       }
       
    })
})
