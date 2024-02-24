const mcontainer =document.getElementById("container");
const container= document.getElementById("list");

function addtoUi(obj){
    const tr=document.createElement("tr");
    const td1=document.createElement("td");
    td1.innerText=obj.pname;
    const td2=document.createElement("td");
    td2.innerText=obj.desc;
    const td3=document.createElement("td");
    td3.innerText=obj.price;
    const td4=document.createElement("td");
    const btn=document.createElement("button");
    btn.innerText="Add to Cart";
    td4.appendChild(btn);
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    container.appendChild(tr);

    btn.addEventListener("click",()=>{
        let add=false;
        let array=JSON.parse(localStorage.getItem("cart"));
        if(array){
            array.forEach((ele,i,arr)=>{
                if(ele.pname==obj.pname && ele.desc==obj.desc){
                    let price1=ele.price/ele.quantity;
                    arr[i].price=parseInt(arr[i].price)+price1;
                    arr[i].quantity=arr[i].quantity+1;
                    add=true;
                }
                //console.log(ele);
            })
            if(!add){
                obj.quantity=1;
                array.push(obj);
            }
            localStorage.removeItem("cart");
            localStorage.setItem("cart",JSON.stringify(array));
        }
        else{
            obj.quantity=1;
            let a=[];
            a.push(obj);
            localStorage.setItem("cart",JSON.stringify(a));
        }
       window.location.href="../Cart/cart.html";
    })
}

window.onload=()=>{
    let arr=JSON.parse(localStorage.getItem("todo"));
    let i=0;
    if(arr){
        if(arr.length<5){
        arr.forEach((ele)=>{
            //console.log(`${ele.pname}  ${ele.desc} ${ele.price} `);
            addtoUi(ele);
        })
    }
    else{
        let j;
        for(j=0;j<5;j++){
            addtoUi(arr[j]);
        }
        const lmore=document.createElement("button");
        lmore.innerText="Load More";
        mcontainer.appendChild(lmore);
        lmore.addEventListener("click",()=>{
            mcontainer.removeChild(lmore);
            let i=j;
            for(;i<j+5 && i<arr.length ;i++){
                addtoUi(arr[i]);
            }
            j=i;
            if(arr.length>j){
                mcontainer.appendChild(lmore);
            }
        })
    }
    }
}