const container=document.getElementById("table");

function addtoUi(obj){
        const tr=document.createElement("tr");
        const td=document.createElement("td");
        td.innerText=obj.pname;
        const td1=document.createElement("td");
        td1.innerText=obj.desc;
        const td2=document.createElement("td");
        td2.innerText=obj.price;

        const td3=document.createElement("td");
        const remove=document.createElement("button");
        remove.innerText="Remove";
        td3.appendChild(remove);

        const td4=document.createElement("td");
        td4.innerText=obj.quantity;

        const td5=document.createElement("td");
        const add=document.createElement("button");
        add.innerText="Add";
        td5.appendChild(add);

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        container.appendChild(tr);

        add.addEventListener("click",()=>{
            let arr=JSON.parse(localStorage.getItem("cart"));
            arr.forEach((ele,i,a)=>{
                if(ele.pname== obj.pname && ele.desc == obj.desc){
                    let price1=obj.price/obj.quantity;
                    a[i].price=parseInt(a[i].price)+price1;
                    a[i].quantity++;
                    td4.innerText=a[i].quantity;
                    td2.innerText=a[i].price;
                    obj.price=a[i].price;
                    obj.quantity=a[i].quantity;
                    localStorage.removeItem("cart");
                    localStorage.setItem("cart",JSON.stringify(arr));
                    return;
                }
            })
        })

        remove.addEventListener("click",()=>{
            let arr=JSON.parse(localStorage.getItem("cart"));
            let p=obj.price/obj.quantity;
            obj.price-=p;
            obj.quantity--;
            td4.innerText=obj.quantity;
            td2.innerText=obj.price;
            if(obj.quantity==0){
                console.log("obj.quantity")
                container.removeChild(tr);
                arr=arr.filter((ele)=>{
                    return (ele.pname!=obj.pname && ele.desc!=obj.desc);
                })
            }
            else{
                console.log("go inside forEach");
            arr.forEach((ele,i,a)=>{
                if(ele.pname== obj.pname && ele.desc == obj.desc){
                     a[i].quantity=obj.quantity;
                     a[i].price=obj.price;
                }
            })
        }
        localStorage.removeItem("cart");
        localStorage.setItem("cart",JSON.stringify(arr));
        })
}

window.onload=()=>{
    let cart=JSON.parse(localStorage.getItem("cart"));
    if(cart){
        //console.log("adding");
        const tr=document.createElement("tr");
        const td=document.createElement("th");
        td.innerText="Product Name";
        const td1=document.createElement("th");
        td1.innerText="Product Description";
        const td2=document.createElement("th");
        td2.innerText="Price";
        const td3=document.createElement("th");
        td3.innerText="Remove";
        const td4=document.createElement("th");
        td4.innerText="Quantity";
        const td5=document.createElement("th");
        td5.innerText="Add";
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        container.appendChild(tr);

        cart.forEach((ele)=>{
            addtoUi(ele);
        })
    }
   
}