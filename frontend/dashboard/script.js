let url='http://localhost:8080'
const socket=io('http://localhost:8080/',{transports:['websocket']})
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
let username=""
let userID=0;
let userAvatar=""
let verify=""
fetch(`${url}/users/${email}`,{
    method:"GET",
    headers:{
        'content-type':'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
.then(res=>res.json())
.then(data=>{
    if(data.verify===true)
    {
        document.getElementById('user-verified').style.display='block'
        document.getElementById('user-verification').style.display='none'
    }
    userID=data._id
    username=data.name
    verify=data.verify
    displayProfile(data)
    console.log(data)
})
.catch(err=>console.log(err))


const displayProfile=(data)=>{
    const avatar=document.getElementById('user-avatar')
    const name=document.getElementById('username')
    const mail=document.getElementById('useremail')
    const imagepath=data.avatar.replace(/\\/g,"/")
    console.log(`avatar name is- ${imagepath}`)
    avatar.src=`../../../backend/${imagepath}`
    userAvatar=`../../../backend/${imagepath}`
    name.textContent=data.name
    mail.textContent=data.email
}

//verification
document.getElementById("user-verification").addEventListener('click',()=>{
    alert('email send')
    fetch(`${url}/users/verify/${userID}`,{
        method:"GET",
        headers:{
            'content-type':'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res=>res.json())
.then(data=>{
    console.log(data)})
.catch(err=>console.log(err))
})


//update image
document.getElementById('update-avatar').addEventListener('click', () => {
    document.getElementById('avatar').click();
});

document.getElementById('avatar').addEventListener('change',async() => {
    const avatarFile = document.getElementById('avatar').files[0];
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
        const response = await fetch(`${url}/users/update-avatar/${userID}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });
        const data = await response.json();
        console.log('notify all the user about dp change');
        socket.emit('updated-avatar', email);
    } catch (err) {
        console.log(err);
    }
});


//logout

document.getElementById('log-out').addEventListener('click',()=>{
    fetch(`${url}/users/logout/${email}`,{
        method:"GET",
        headers:{
            'content-type':'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.msg==='logout successfull')
        {
            window.location.href='../signin/index.html'
        }
    })
    .catch(err=>console.log(err))
})

//sockets
socket.emit('user-email',(email))

socket.on('active-user',(x)=>{
    //  const dot = '<span style="color: green; font-size: 50px;>&bull;</span>';
    document.getElementById('connected-user').innerHTML=`<p style="color:green;">online- ${x}</p>`
})
socket.emit('xyz',(email))
socket.on("updated-avatar-to-all",(email)=>{
    console.log("Received updated-avatar-to-all event with email:", email);
    document.getElementById('notifications').textContent=`user ${email} has changed his profile`
})
socket.on("new-user",(email)=>{
    document.getElementById('notifications').textContent=`user ${email} has joined`
})

//send message
document.getElementById('send-msg').addEventListener('click',()=>{
    const text=document.getElementById('input-msg').value
    const obj={
        text,
        name:username,
        userAvatar
    }
    socket.emit('send-message',obj)
    displayMsg({text,name:"You",userAvatar})
    document.getElementById('input-msg').value=""
})
socket.on('broadcast-msg',(obj)=>{
    displayMsg(obj)
})

const displayMsg=(obj)=>{
    const chatarea=document.getElementById('chat-area')
    const msg=document.createElement('div')
    let time=new Date()
    time=time.toString().slice(16, 24);
    msg.innerHTML=`<p><img src="${obj.userAvatar}" style="height:40px"><p>(${obj.name})</p>${obj.text}</p><p style="position:absolute; right:0 ;opacity:0.7; margin-right:20px;">${time}</p>`
    if(obj.name==='You')
    {
        msg.classList.add('outgoing','message');
    }else{
        msg.classList.add('incoming','message');
    }
    chatarea.appendChild(msg);
    chatarea.scrollTop = chatarea.scrollHeight;
}

document.getElementById('private-message').addEventListener('click',()=>{
    if(verify===true)
    {
        window.location.href=`../dm/index.html?email=${email}`
    }else{
        alert('you are not verified to access this')
    }
})