const addform = document.querySelector("#add-form");
const list = document.querySelector(".todo-list");
const updateform = document.querySelector("#update-form");
const checkbox = document.querySelectorAll('input[name=checkbox]');
const updateitem = document.querySelector("#updateitem");

let toEdit = null;
let previous = null;
let up = null;
let existedItem = true;
//adding new List
let addList = (newlist)=>{
    let newItem = `
    <li class="list-group-item align-item-right">
        <input type="checkbox"> 
        <span>${newlist}</span>
        <i class="fas fa-edit edit text-primary" data-toggle="modal" data-target="#updateModal" value="${newlist}"></i>
        <i class="far fa-trash-alt delete text-danger"></i>
    </li>
    `;
    list.innerHTML +=newItem;
}

//adding new List
addform.addEventListener("submit",e=>{
    e.preventDefault();
    var newlistitem = e.target.newitem.value.trim();
    if(newlistitem !==""){
        //to collect textContents of array of lists
        let arr= [];
         Array.from(list.children).forEach((item,idx)=>{
            arr[idx]=item.textContent;
        });
        for(let i = 0;i<arr.length;i++){
                if(newlistitem==arr[i].trim()){
                    existedItem = false;//if list is already existed
                    break;
                }else{
                    existedItem = true;
                }
            }
        if(existedItem==false){
            alert("List is Already Existed!");
        }else{
            existedItem = true;
            addList(newlistitem);
        }
    }
    else
        alert("Enter a list");
    addform.reset();
})

//deleting list and updating list
list.addEventListener('click',e=>{
    //deleting
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
    //editing
    else if(e.target.classList.contains('edit')){
        toEdit = e.target.previousElementSibling.textContent;
        updateitem.value = toEdit;
        previous = updateitem.value;
    }
            if(e.target.type=='checkbox'){
            if(e.target.checked == true){
                e.target.setAttribute('checked','checked');
                e.target.parentElement.classList.add('line');
            }else{
                e.target.parentElement.classList.remove('line');
                e.target.removeAttribute('checked');
            }
        }
})

//Updated

updateform.addEventListener("submit",e=>{
    e.preventDefault();
    let updatedItemlist = e.target.updateitem.value.trim();
   Array.from(list.children).filter(curr=>curr.textContent.includes(previous))
   .map(curr=>curr)
   .forEach(curr=>{
      curr.innerHTML = `
          <input type="checkbox" name="checkbox"> 
          <span>${updatedItemlist}</span>
          <i class="fas fa-edit edit text-primary" data-toggle="modal" data-target="#updateModal" value="${updatedItemlist}"></i>
          <i class="far fa-trash-alt delete text-danger"></i>
      `;;
      curr.classList.remove('line');
  })
  $("#updateModal").modal('hide');
});

