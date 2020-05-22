//"use strict";function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}var playing=!0,timer=function(){return setInterval(function(){var a=document.getElementById("counter"),b=parseInt(a.innerText);a.innerText=b+1},1e3)},interval=timer(),minus=document.getElementById("minus"),plus=document.getElementById("plus"),heart=document.getElementById("heart"),pause=document.getElementById("pause"),commentForm=document.getElementsByTagName("form")[0];minus.addEventListener("click",function(){var a=document.getElementById("counter"),b=parseInt(a.innerText);a.innerText=b-1}),plus.addEventListener("click",function(){var a=document.getElementById("counter"),b=parseInt(a.innerText);a.innerText=b+1}),heart.addEventListener("click",function(){var a=document.getElementById("counter"),b=parseInt(a.innerText),c=document.querySelector(".likes"),d=void 0;if([].concat(_toConsumableArray(c.children)).map(function(a){return parseInt(a.dataset.num)}).includes(b)){d=document.querySelector('[data-num="'+b+'"]');var e=parseInt(d.children[0].innerText);d.innerHTML=b+" has been liked <span>"+(e+1)+"</span> times"}else(d=document.createElement("li")).setAttribute("data-num",b),d.innerHTML=b+" has been liked <span>1</span> time",c.appendChild(d)}),pause.addEventListener("click",function(){playing?(playing=!1,clearInterval(interval),this.innerText="resume"):(playing=!0,interval=timer(),this.innerText="pause"),[].concat(_toConsumableArray(document.getElementsByTagName("button"))).forEach(function(a){"pause"!==a.id&&(a.disabled=!playing)})}),commentForm.addEventListener("submit",function(a){a.preventDefault();var b=this.children[0],c=b.value;b.value="";var d=document.querySelector(".comments"),e=document.createElement("p");e.innerText=c,d.appendChild(e)});
//storing UI state:
const countLikes = {}
const comments = [];
let count = 0;
let proceed = true;

//displays
const countDisplay = document.getElementById("counter");
const countLikesDisplay =  document.querySelector("ul.likes");
//const commentDisplay =  document.getElementsByTagName("ul")[0];
const newCommentContent = document.getElementById("comment-input");

//nodes that listen to events:
const decrementor = document.getElementById("minus");
const incrementor = document.getElementById("plus");
const liker = document.getElementById("heart");
const pauseToggler = document.getElementById("pause");
//const commentSubmitter = document.querySelector("button#sumbit"); //not sure why this doesn't work, but it doesn't
const commentSubmitter = document.getElementsByTagName("form")[0];
const eventListeningNodes = [decrementor, incrementor, liker, commentSubmitter]; //to disable when paused

//event listening:
decrementor.addEventListener("click", incrementCount(-1));
incrementor.addEventListener("click", incrementCount());

liker.addEventListener("click", function(){
    currentLikesForCount = countLikes[count];
    if (currentLikesForCount == null){
      countLikes[count] = 1;
    }
    countLikes[count] += 1;
    refreshCountLikesDisplay();
});

pauseToggler.addEventListener("click", function() {
  proceed = !proceed;
  this.innerText = proceed ? "pause" : "resume";

  for (let i = 0; i < eventListeningNodes.length; i++){
    eventListeningNodes[i].disabled = !proceed;
  }
});

commentSubmitter.addEventListener("click", function() {
    comments.push(newCommentContent.innerText);
    refreshCommentDisplay();
});

function incrementCount(increment = 1){
  count += increment;
  refreshCountDisplay();
}

function refreshCountDisplay(){
  countDisplay.innerText = count;
}

function refreshCountLikesDisplay(){
  let countLikesListHtml = "";
  for(let count in countLikes){
    countLikesListHtml += `<li>${count} has ${countLikes[count]} likes</li>`;
  }
  countLikesDisplay.innerHTML = countLikesListHtml;
}

function refreshCommentDisplay(){
  let commentListHTML = "<ul>";
  for(let i = 0; i < comments.length; i++){
      commentListHTML.push(`<li>${comments[0]}</li>`);
  }
  commentListHtml += "</ul>";
  commentDisplay.innerHTML = commentListHtml;
}

//incrementing count every second:
window.setInterval(function() {
  if (proceed){
    incrementCount();
  }
}, [1000]);
