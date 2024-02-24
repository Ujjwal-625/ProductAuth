const container=document.getElementById("list");
const pname=document.getElementById("pname");
const desc=document.getElementById("desc");
const price=document.getElementById("price");
const btn=document.getElementById('btn');
const mainContainer=document.getElementById("container");
let id=0;
function init(){
    let obj={};
    obj.pname=pname.value.trim(' ');
    obj.desc=desc.value.trim(' ');
    obj.price=price.value.trim(' ');
    obj.id=id++;
    if(obj.pname!='' && obj.desc!='' && obj.price!='')
    addToUi(obj);
    addToLs(obj);
    pname.value="";
    desc.value="";
    price.value="";
}
addEventListener('keypress',(e)=>{
    if(e.key=='Enter'){
     init();
    }
 })
btn.addEventListener('click',init);

function addToUi(obj){
    const tr=document.createElement("tr");
    const tdpname=document.createElement("td");
    tdpname.innerText=obj.pname;
    const tdDesc=document.createElement("td");
    tdDesc.innerText=obj.desc;
    const tdprice=document.createElement("td");
    tdprice.innerText=obj.price;
    tr.appendChild(tdpname);
    tr.appendChild(tdDesc);
    tr.appendChild(tdprice);
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    const del=document.createElement("button");
    del.setAttribute("class","button");
    del.innerText="Delete";
    const upd=document.createElement("button");
    upd.setAttribute("class","button");
    upd.innerText="Update";
    td1.appendChild(del);
    td2.appendChild(upd);
    tr.appendChild(td1);
    tr.appendChild(td2);
    container.appendChild(tr);

    //delete function
    del.addEventListener("click",()=>{
        container.removeChild(tr);
        let arr=JSON.parse(localStorage.getItem("todo"));
        arr=arr.filter((ele)=>{
            if(ele.id!=obj.id){
                return ele;
            }
        })
        localStorage.removeItem("todo");
        localStorage.setItem("todo",JSON.stringify(arr)); 
    })
    //update
    upd.addEventListener("click",()=>{
        const form=document.createElement("form");
        const p1=document.createElement("p");
        const p2=document.createElement("p");
        const p3=document.createElement("p");
        const p4=document.createElement("p");
        const l1=document.createElement("label");
        l1.setAttribute("for","upname");
        l1.innerText="Pname";
        const i1=document.createElement("input");
        i1.setAttribute("type","text");
        i1.setAttribute("id","upname")

        const l2=document.createElement("label");
        l2.setAttribute("for","updesc");
        l2.innerText="Desc";
        const i2=document.createElement("input");
        i2.setAttribute("type","text");
        i2.setAttribute("id","updesc");

        const l3=document.createElement("label");
        l3.setAttribute("for","upPrice");
        l3.innerText="Price";
        const i3=document.createElement("input");
        i3.setAttribute("type","number");
        i3.setAttribute("id","upPrice");

        const i4=document.createElement("button");
        i4.innerText="Submit";
        p1.appendChild(l1);
        p1.appendChild(i1);
        p2.appendChild(l2);
        p2.appendChild(i2);
        p3.appendChild(l3);
        p3.appendChild(i3);
        p4.appendChild(i4);
        form.appendChild(p1);
        form.appendChild(p2);
        form.appendChild(p3);
        form.appendChild(p4);
        mainContainer.appendChild(form);

        i4.addEventListener("click",(ele)=>{
            if(i1.value.trim(' ')!='' && i3.value.trim(' ')!='' && i2.value.trim(' ')!=''){
            tdpname.innerText=i1.value;
            tdDesc.innerText=i2.value;
            tdprice.innerText=i3.value;
            }
            let arr=JSON.parse(localStorage.getItem("todo"));
            arr=arr.filter((ele)=>{
                return ele.id!=obj.id;
            })
            obj.pname=i1.value;
            obj.desc=i2.value;
            obj.price=i3.value;
            arr.push(obj);
            localStorage.removeItem("todo");
            localStorage.setItem("todo",JSON.stringify(arr));
            mainContainer.removeChild(form);
        })
    })

}
function addToLs(obj){
    let arr=JSON.parse(localStorage.getItem("todo"));
    if(arr){
        arr.push(obj);
        localStorage.setItem("todo",JSON.stringify(arr));
    }
    else{
        let demo=[];
        demo.push(obj);
        localStorage.setItem("todo",JSON.stringify(demo));
    }
}
window.onload=()=>{
    let login=JSON.parse(localStorage.getItem("login"));
    if(login && login[0].role=="Admin"){
    let arr=JSON.parse(localStorage.getItem("todo"));
    if(arr.length>5){
        let i;
        for(i=0;i<5;i++){
            addToUi(arr[i]);
        }
        const lmore=document.createElement("button");
        lmore.setAttribute("class","button");
        lmore.innerText="Load More";
        container.appendChild(lmore);
        lmore.addEventListener("click",()=>{
            container.removeChild(lmore);
            let j=i;
            for(j;j<i+5 && j<arr.length;j++){
                addToUi(arr[j]);
            }
            i=j;
            if(i<arr.length){
                container.appendChild(lmore);
            }
        })
    }
    else{
        arr.forEach((ele)=>{
            addToUi(ele);
        })
    }
}
else {
    window.location.href="../login/login.html";
}
}