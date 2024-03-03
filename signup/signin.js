
const pname=document.getElementById("username");
const password=document.getElementById("password");

function Signin(){
    let arr=JSON.parse(localStorage.getItem("Users"));
    let userexist=false;
    arr.forEach((ele)=>{
        if(ele.username==pname.value){
            alert("Username Exists try diffrent username");
            userexist=true;
            return;
        }
    })
    if(!userexist){
        let obj={};
        obj.username=pname.value;
        obj.password=password.value;
        obj.role="customer";
        arr.push(obj);
        localStorage.removeItem("Users");
        addToLs(arr);
        alert("Sucessfuly signed up");
        window.location.href="../login/login.html";
    }

    pname.value="";
    password.value="";
}
function addToLs(arr){
    localStorage.setItem("Users",JSON.stringify(arr));
}


addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        Signin();
    }
})

window.onload=()=>
{
    let arr=JSON.parse(localStorage.getItem("Users"));
    // console.log("loaded sign up page");
    if(!arr){
        arr=[
            {
                "username":"Ujjwal",
                "password":"123456",
                "role":"Admin"
            }
        ]
        addToLs(arr);
    }
}
