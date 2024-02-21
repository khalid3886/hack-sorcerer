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

