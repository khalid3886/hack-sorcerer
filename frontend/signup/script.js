let url='http://localhost:8080'
document.getElementById('signup-button').addEventListener('click',()=>{
    const name=document.getElementById('signup-name').value
    const email=document.getElementById('signup-email').value
    const pass=document.getElementById('signup-pass').value
    fetch(`http://localhost:8080/users/signup`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            name,
            email,
            pass
        })
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.msg==='user has been registered')
        {
            window.location.href=`../signin/index.html`
        }
    })
    .catch(err=>console.log(err))
})
