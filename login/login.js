const uname=document.getElementById("username");
const password=document.getElementById("password");
const role=document.getElementById("role");
function logIN(){
    let obj={};
    obj.username=uname.value;
    obj.password=password.value;
    obj.role=role.value;
    // console.log(obj);
    let arr=JSON.parse(localStorage.getItem("Users"));
    let lin=false;
    if(arr && arr.length>=1){
        arr.forEach((ele)=>{
            if(ele.username==obj.username && ele.password==obj.password && ele.role==obj.role){
                console.log(`${ele.username} ${ele.password} ${ele.role}`);
                lin=true;
                if(ele.role=="Admin"){
                    let array=[];
                    array.push(obj);
                    localStorage.setItem("login",JSON.stringify(array));
                    window.location.href="../AdminPage/todo.html";
                }
                else{
                    let array=[];
                    array.push(obj);
                    localStorage.setItem("login",JSON.stringify(array));
                    window.location.href="../custProducts/products.html";
                }
            }
        })
    }
    else{
        window.location.href="../signup/sign.html";
        console.log("empty local storage");
    }
    if(!lin){
        alert("invalid username or password");
    }
    uname.value="";
    password.value="";
    role.value="Admin";
}
addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        logIN();
    }
})