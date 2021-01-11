
offset = 0
let tweetID = 0;
async function index(parameters){
    const result = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        params: parameters,
        withCredentials: true, 
    });
    return await result.data;
}

async function create(parameters){
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true, 
        data: {
            body: parameters.body,
            parent: parameters.parent,
            type: parameters.type}
    });
    return await result;

}
async function read(parameters){
    const result = await axios({
        method: 'get',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${parameters}`,
        params: parameters,
        withCredentials: true, 
    });
    return await result;

}
async function readretweet(parameters) {
    const result = await axios({
        method: 'get',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${parameters}`,
        params: parameters,
        withCredentials: true, 
    });
    return await result;
}
async function update(parameters){
    const result = await axios({
        method: 'put',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${parameters.id}`,
        withCredentials: true, 
        data: {body: parameters.value}
    });
    return await result;
}
async function destroy(parameters){
    const result = await axios({
        method: 'delete',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${parameters.target.id}`,
        withCredentials: true, 
    });
    return await result;
    
}
async function like(parameters){
    const result = await axios({
        method: 'put',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${parameters.target.id}/like`,
        withCredentials: true, 
    });
    return await result;

}
async function unlike(parameters){
    const result = await axios({
        method: 'put',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${parameters.target.id}/unlike`,
        withCredentials: true, 
    });
    return await result;
}
async function reply(parameters) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true, 
        data: {
            body: parameters.body,
            parent: parameters.parent,
            type: "reply"}
    });
    return await result;
}
async function retweet(parameters) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true, 
        data: {
            body: parameters.body,
            parent: parameters.parent,
            type: "retweet"}
    });
    return await result;
}
function likeHandler (event) {
    like(event).then (() => {
    let bobet = read(event.target.id)
    bobet.then(tweets => {
    $(`#${tweets.data.id}span`).replaceWith(`<span id= ${tweets.data.id}span><button class="unedit" id=${tweets.data.id}></button>${tweets.data.likeCount} people including you liked this</span>`)

    document.getElementById(`${tweets.data.id}`).addEventListener("click", unlikeHandler)
    })
    })
    
}
function unlikeHandler (event) {
    unlike(event).then(() => {
    let barbet = read(event.target.id)
    barbet.then(tweets => {
    $(`#${tweets.data.id}span`).replaceWith(`<span id= ${tweets.data.id}span><button class="edit" id=${tweets.data.id}></button>${tweets.data.likeCount} people liked this</span>`)
    document.getElementById(`${tweets.data.id}`).addEventListener("click", likeHandler)
    })
    })
}
function deleteHandler (event) {
    destroy(event).then(() => {
        $('#root').replaceWith(`<div id="root" class="main"></div>`)
        loadtweets()
    })
}
function editHandler(event) {
document.getElementById("editForm").style.display = ""
document.getElementById("root").style.opacity = .2
document.getElementsByClassName("change")[0].value = ''
document.getElementsByClassName("change")[0].setAttribute("id" , event.target.id)
document.getElementsByClassName("postUpdate")[0].addEventListener("click", handleUpdate)
document.getElementById("cancelForm").addEventListener("click", handleCancel)
read(event.target.id).then(tweet => {
    document.getElementsByClassName("change")[0].value = tweet.data.body
})
}
function handleUpdate() {
    let events =document.getElementsByClassName("change")[0]
     document.getElementById("root").style.opacity = 1
     update(events).then(() => {
     $('#root').replaceWith(`<div id="root" class="main"></div>`)
     loadtweets()
     })
     document.getElementsByClassName("change")[0].value = ''
}

function replyHandler(event) {
document.getElementById("root").style.opacity = .2
read(event.target.id).then(tweet =>{
    $('body').append(` <div class="replydiv">${tweet.data.author} <div>${tweet.data.body}</div><form><textarea cols = "50" rows = "8" placeholder="type your reply here" id="replyArea" maxlength = "280"></textarea></form><button id="postReply">reply</button><button id="cancelR">Cancel</button></div>`)
    document.getElementById('postReply').addEventListener('click', postReplyHandler)
    document.getElementById('cancelR').addEventListener('click', handleCancelReply)
    tweetID = tweet.data.id
})
}

function postReplyHandler() {
    let replyparam = {
        parent: 0,
        body: "",
        type: "reply"
    }
   read(tweetID).then(tweeted => {
    replyparam.body = document.getElementById("replyArea").value
   replyparam.parent = tweetID 
   create(replyparam).then(() => {
       $('#root').replaceWith(`<div id="root" class="main"></div>`)
       loadtweets()
       tweetID = 0;
       let element = document.getElementsByClassName('replydiv')[0]
       element.parentNode.removeChild(element)
       document.getElementById("root").style.opacity = 1 

  
  })
   })
}

function retweetHandler(event) {
    document.getElementById("root").style.opacity = .2
read(event.target.id).then(tweet =>{
    $('body').append(` <div class="retweetdiv">${tweet.data.author} <div>${tweet.data.body}</div><form><textarea cols = "50" rows = "8" placeholder="type your retweet here" id="retweetArea" maxlength= "280"></textarea></form><button id="postRetweet">Retweet</button><button id="cancelRT">Cancel</button></div>`)
    document.getElementById('postRetweet').addEventListener('click', postRetweetHandler)
    document.getElementById('cancelRT').addEventListener('click', handleCancelRetweet)
    tweetID = tweet.data.id
})
}

function postRetweetHandler() {
    let retweetparam = {
        parent: 0,
        body: "",
        type: "retweet"
    } 
    read(tweetID).then(tweeted => {
     retweetparam.body = document.getElementById("retweetArea").value
    retweetparam.parent = tweetID 
    create(retweetparam).then(() => {
        $('#root').replaceWith(`<div id="root" class="main"></div>`)
        loadtweets()
        tweetID = 0;
    let retweeter = readretweet(retweetparam.parent)
    retweeter.then(tweets => {
    $(`#${tweets.data.id}retweet`).replaceWith(`<span id= ${tweets.data.id}retweet><button class="retweet" id=${tweets.data.id}>retweet</button>${tweets.data.retweetCount} retweets</span>`)
    for(let e of document.getElementsByClassName("retweet")) {
        e.addEventListener("click", retweetHandler)
        }
       }) 
        let element = document.getElementsByClassName('retweetdiv')[0]
        element.parentNode.removeChild(element)
        document.getElementById("root").style.opacity = 1 

   
   })
    })
   
    

}
function handleCancelRetweet() {
    let element = document.getElementsByClassName('retweetdiv')[0]
    element.parentNode.removeChild(element)
    document.getElementById("root").style.opacity = 1
}

function handleForm() {
    document.getElementById("poster").style.display = ""
    let bob = document.getElementById("message").value = ""
    document.getElementById("postButton").addEventListener("click", handlePost)
    document.getElementById("cancel").addEventListener("click", handleCancel)
    document.getElementById("root").style.opacity = .2
}

function handleCancel() {
    document.getElementById("poster").style.display = "none"
    document.getElementById("editForm").style.display = "none"
    document.getElementById("root").style.opacity = 1
}
function handleCancelReply() {
    let element = document.getElementsByClassName('replydiv')[0]
        element.parentNode.removeChild(element)
        document.getElementById("root").style.opacity = 1
}

function handlePost() {
let bob = {
   body: document.getElementById("message").value
} 
create(bob).then(() => {
$('#root').replaceWith(`<div id="root" class="main"></div>`)
 loadtweets()
 document.getElementById("root").style.opacity = 1
})

}
function viewHandler(event) {
read(event.target.id).then(list => {
    $('body').append(`<div id= "viewer"><div id="starter">Replies to ${list.data.author} message:" ${list.data.body}" </div></div>`)
    document.getElementById("starter").insertAdjacentHTML('afterend', `<button id="listGone">Cancel</button>`)
    document.getElementById("root").style.opacity = .2
    document.getElementById('listGone').addEventListener("click", replyDeleter) 
    if(list.data.replies == undefined) {
        document.getElementById("starter").insertAdjacentHTML('afterend', `<br><div>Looks like there are no replies yet :(</div> <br>`)
    } else {
         for(let i of list.data.replies) {
        document.getElementById("starter").insertAdjacentHTML('afterend', `<div>${i.body}</div> <br>`)
        document.getElementById("starter").insertAdjacentHTML('afterend', `<br><div>${i.author}</div>`)
    }      
    }
   
})
}
function replyDeleter() {
    document.getElementById("viewer").remove();
    document.getElementById("root").style.opacity = 1
}
const twitterfeed = index({})
 function loadtweets() {
    const $root = $('#root');
const twitterfeed = index({where: {type: ['tweet', 'retweet', 'reply']}})
twitterfeed.then(tweets => { 
    document.getElementById("poster").style.display = "none"
      for(let t of tweets) {
        if(t.isMine == true) {
            if(t.type == "retweet" ) {
                if(t.parent == undefined) {
                    $root.append(`<div class="tweet"><div>${t.author}</div>
                    <div>The original tweet has been deleted :( </div>
                   <div>${t.body}</pre></div>
                   <div id="clickers">
                   <span id= ${t.id}span><button class="edit" id=${t.id}></button>${t.likeCount} people liked this</span><span>
                   <button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
                   <span><span><button class= "reply" id=${t.id}></button></span>
                   <button class ="delete" id=${t.id}></button></span>
                   <span>
                   <button class ="update" id=${t.id}></button></span>
                   <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
                   </div>
                   </div>`)
                } else {
                $root.append(`<div class="tweet"><div>${t.author}</div>
                 <div>Retweeted ${t.parent.author} tweet: "${t.parent.body}"</div>
                <div>${t.body}</pre></div>
                <div id="clickers">
                <span id= ${t.id}span><button class="edit" id=${t.id}></button>${t.likeCount} people liked this</span><span>
                <button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
                <span><span><button class= "reply" id=${t.id}></button></span>
                <button class ="delete" id=${t.id}></button></span>
                <span>
                <button class ="update" id=${t.id}></button></span>
                <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
                </div>
                </div>`)
            }
               } else if(t.type == "reply") {
                   if(t.parent == undefined) {
                    $root.append(`<div class="tweet"><div>${t.author}</div>
                <div>The original tweet has been deleted</div>
                <div style: margin-top: 20px><pre>${t.body}</pre></div>
                <div id="clickers">
                <span id= ${t.id}span><button class="edit" id=${t.id}></button>${t.likeCount} people liked this</span><span>
                <button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
                <span><span><button class= "reply" id=${t.id}></button></span>
                <button class ="delete" id=${t.id}></button></span>
                <span>
                <button class ="update" id=${t.id}></button></span>
                <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
                </div>
                </div>`)
                   } else { $root.append(`<div class="tweet"><div>${t.author}</div>
                <div>Replied to ${t.parent.author}'s tweet: "${t.parent.body}"</div>
                <div style: margin-top: 20px><pre>${t.body}</pre></div>
                <div id="clickers">
                <span id= ${t.id}span><button class="edit" id=${t.id}></button>${t.likeCount} people liked this</span><span>
                <button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
                <span><span><button class= "reply" id=${t.id}></button></span>
                <button class ="delete" id=${t.id}></button></span>
                <span>
                <button class ="update" id=${t.id}></button></span>
                <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
                </div>
                </div>`)}
               
               } else {
        $root.append(`<div class="tweet"><div>${t.author}</div><div><pre>${t.body}</pre></div>
        <div id="clickers">
        <span id= ${t.id}span><button class="edit" id=${t.id}></button>${t.likeCount} people liked this</span><span>
        <button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
        <span><span><button class= "reply" id=${t.id}></button></span>
        <button class ="delete" id=${t.id}></button></span>
        <span>
        <button class ="update" id=${t.id}></button></span>
        <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
        </div>
        </div>`)
               }
       }
        else if(t.isLiked == false) {
        if(t.type =="retweet") {
            if(t.parent == undefined) {
                $root.append(`<div class="tweet" ><div>${t.author}</div><div>The original tweet has already been deleted</div>
        <div>${t.body}</div>
        <div id="clickers">
        <span id= ${t.id}span><button class="edit" id=${t.id}></button>${t.likeCount} people liked this</span>
        <span id = ${t.id}retweet><button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
        <span><button class= "reply" id=${t.id}></button></span>
        <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
        </div>
        </div>`)
            } else { $root.append(`<div class="tweet" ><div>${t.author}</div><div>Retweeted ${t.parent.author} tweet: "${t.parent.body}"</div>
        <div>${t.body}</div>
        <div id="clickers">
        <span id= ${t.id}span><button class="edit" id=${t.id}></button>${t.likeCount} people liked this</span>
        <span id = ${t.id}retweet><button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
        <span><button class= "reply" id=${t.id}></button></span>
        <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
        </div>
        </div>`)}
            } else if (t.type == "reply") {
                if(t.parent == undefined) {
                    $root.append(`<div class="tweet" ><div>${t.author}</div><div>The original tweet has already been deleted</div>
                    <div>${t.body}</div>
                    <div id="clickers">
                    <span id= ${t.id}span><button class="edit" id=${t.id}></button>${t.likeCount} people liked this</span>
                    <span id = ${t.id}retweet><button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
                    <span><button class= "reply" id=${t.id}></button></span>
                    <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
                    </div>
                    </div>`)
                } else {$root.append(`<div class="tweet" ><div>${t.author}</div><div>Replied to ${t.parent.author} tweet: "${t.parent.body}"</div>
                <div>${t.body}</div>
                
                <div id="clickers">
                <span id= ${t.id}span><button class="edit" id=${t.id}></button>${t.likeCount} people liked this</span>
                <span id = ${t.id}retweet><button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
                <span><button class= "reply" id=${t.id}></button></span>
                <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
                </div>
                </div>`)}
            } else {
        $root.append(`<div class="tweet" id=${t.id}tweet><div>${t.author}</div><div>${t.body}</div>
        <div id="clickers">
        <span id= ${t.id}span><button class="edit" id=${t.id}></button>${t.likeCount} people liked this</span>
        <span id = ${t.id}retweet><button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
        <span><button class= "reply" id=${t.id}></button></span>
        <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
        </div>
        </div>`)
            }
        
        } else {
            if(t.type == 'retweet'){
                if (t.parent == undefined) {
                    $root.append(`<div class="tweet"><div>${t.author}</div>
                    <div>The original tweet has been deleted</div>
                    <div>${t.body}</div>
                    <div id="clickers">
                    <span id= ${t.id}span><button class="unedit" id=${t.id}></button>${t.likeCount} people including you liked this</span>
                    <span id= ${t.id}retweet><button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
                    <span><button class= "reply" id=${t.id}></button></span>
                    <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
                   </div>
                   </div>`)
                } else {
                    $root.append(`<div class="tweet" ><div>${t.author}</div>
                    <div>Retweeted ${t.parent.author} tweet: "${t.parent.body}"</div>
                    <div>${t.body}</div>
                    <div id="clickers">
                    <span id= ${t.id}span><button class="unedit" id=${t.id}></button>${t.likeCount} people including you liked this</span>
                    <span id= ${t.id}retweet><button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
                    <span><button class= "reply" id=${t.id}></button></span>
                    <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
                   </div>
                   </div>`)
                }
            } else if (t.type == 'reply') { 
                if(t.parent == undefined) {
                    $root.append(`<div class="tweet"><div>${t.author}</div>
                    <div>The original tweet has been deleted</div>
                    <div>${t.body}</div>
                    <div id="clickers">
                    <span id= ${t.id}span><button class="unedit" id=${t.id}></button>${t.likeCount} people including you liked this</span>
                    <span id= ${t.id}retweet><button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
                    <span><button class= "reply" id=${t.id}></button></span>
                    <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
                   </div>
                   </div>`)
                } else {
                    $root.append(`<div class="tweet"><div>${t.author}</div>
                    <div>Replied to ${t.parent.author} tweet: "${t.parent.body}"</div>
                    <div>${t.body}</div>
                    <div id="clickers">
                    <span id= ${t.id}span><button class="unedit" id=${t.id}></button>${t.likeCount} people including you liked this</span>
                    <span id= ${t.id}retweet><button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
                    <span><button class= "reply" id=${t.id}></button></span>
                    <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
                   </div>
                   </div>`)
                }
            } else {
            $root.append(`<div class="tweet"><div>${t.author}</div><div>${t.body}</div>
            <div id="clickers">
            <span id= ${t.id}span><button class="unedit" id=${t.id}></button>${t.likeCount} people including you liked this</span>
            <span id= ${t.id}retweet><button class= "retweet" id=${t.id}></button>${t.retweetCount} retweets</span>
            <span><button class= "reply" id=${t.id}></button></span>
            <button class = "replyView" id =${t.id}>view replies (${t.replyCount})</button>
           </div>
           </div>`)
            }
            
        }
        
   }
    for(let e of document.getElementsByClassName("edit")) {
         e.addEventListener("click", likeHandler)
    }
    for(let e of document.getElementsByClassName("unedit")) {
        e.addEventListener("click", unlikeHandler)
   }
   for(let e of document.getElementsByClassName("delete")) {
        e.addEventListener("click", deleteHandler)
        }
    for(let e of document.getElementsByClassName("update")) {
        e.addEventListener("click", editHandler)
        }
    for(let e of document.getElementsByClassName("reply")) {
        e.addEventListener("click", replyHandler)
        }
    for(let e of document.getElementsByClassName("retweet")) {
        e.addEventListener("click", retweetHandler)
        }
    for(let e of document.getElementsByClassName("replyView")) {
        e.addEventListener("click", viewHandler)
        }
    
})
document.getElementById("poster").style.display = "none"
document.getElementById("editForm").style.display = "none"
document.getElementById("create").addEventListener("click", handleForm)
}

$(function () {
$('body').append(`<div id='sider'><button id ="create">+</button></div>`)
$('body').append(`<div id ="poster">Share something with your friends <br></br>
<form><textarea id="message" placeholder="whats happinin fool" cols = "50" rows = "8" maxlength= "280"></textarea></form> 
<button id="postButton">Post</button>
<button id="cancel" >Cancel</button></div> `)
$('body').append(`<div id="editForm"><form><textarea class="change" placeholder="what do you want to change" cols = "50" rows = "8" maxlength= "280"></textarea></form><button class= "postUpdate">Update</button><button id="cancelForm">Cancel</button></div>`)
window.onscroll = function(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        offset += 1;
        const paginated = index({skip:offset, limit: 2 })
        paginated.then(tweets => {
            for (let t of tweets) {
                let tweetidentify = t.id + "tweet"
                if (document.getElementById(tweetidentify)===null) {
                    $("#root").append(loadtweets());
                } else continue;
            }
        })
    }
};
    loadtweets();
});
