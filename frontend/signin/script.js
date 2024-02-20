let url='http://localhost:8080'

document.getElementById('login-button').addEventListener('click',()=>{
    const email=document.getElementById('login-email').value
    const pass=document.getElementById('login-pass').value
    fetch(`${url}/users/login`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({email,
        pass})
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.msg==='login successfull')
        {
            localStorage.setItem('token',data.access_token)
            window.location.href=`../dashboard/index.html?email=${data.user.email}`
        }
    })
    .catch(err=>console.log(err))
})