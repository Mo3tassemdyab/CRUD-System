let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");



let mood = 'Create';
let tmp;
// get total
submit.style.background = '#198754' 

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#04AA6D";
  } else {
    total.innerHTML = "";
    total.style.background = "#0dcaf0";
  }
}

// create product
let allProduct;
if (localStorage.product != null) {
  allProduct = JSON.parse(localStorage.product);
} else {
  allProduct = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // count
  if( title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100 ){
    if (mood == 'Create') {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          allProduct.push(newPro);
        }
      }else{
        allProduct.push(newPro);
      }    
   
    }else{
      allProduct[tmp] = newPro;
      mood = 'Create';
      submit.innerHTML = 'Create';
    submit.style.background = '#198754' 
  
      count.style.display = 'block';
      }
  
    clearInputs();
    
  }


  //  save local storage
  localStorage.setItem("product", JSON.stringify(allProduct));

  displayProducts();
};

// clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read

function displayProducts() {
    getTotal();
  let table = "";
  for (let i = 0; i < allProduct.length; i++) {
    table += `  <tr>
                        <td>${[i+1]}</td>
                        <td>${allProduct[i].title}</td>
                        <td>${allProduct[i].price}</td>
                        <td>${allProduct[i].taxes}</td>
                        <td>${allProduct[i].ads}</td>
                        <td>${allProduct[i].discount}</td>
                        <td>${allProduct[i].total}</td>
                        <td>${allProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button  onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");

  if (allProduct.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()" id='deleteBtn'>Delete All (${allProduct.length})</button`;
    let deleteStyle = document.getElementById('deleteBtn');
    deleteStyle.style.background = '#dc3545'
  } else {
    btnDelete.innerHTML = "";
  }
}
displayProducts();

// delete

function deleteProduct(i) {
  allProduct.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(allProduct));
  displayProducts();
}

function deleteAll() {
  localStorage.clear();
  allProduct.splice(0);
  displayProducts();
}

// update

function updateData(i){
    title.value = allProduct[i].title;
    price.value = allProduct[i].price;
    taxes.value = allProduct[i].taxes;
    discount.value = allProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = allProduct[i].category;
    submit.innerHTML = 'Update';
    mood = 'Update';
    submit.style.background = '#ffa500'
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// search

let searchMood = 'title';
searchTitle.style.background = '#008CBA'
 searchCategory.style.background = '#008CBA'
function search(id)
{
    let search = document.getElementById('search');
if (id == 'searchTitle') {
    searchMood = 'title';
  }else{
    searchMood =' category';

  
    
  }
  search.placeholder = 'Search By ' + searchMood;
search.focus();
search.value = '';
displayProducts();

}


function searchData(value){
    let table = '';


    for(let i = 0; i < allProduct.length; i++){
        if (searchMood == 'title') {
            
    
                if (allProduct[i].title.includes(value.toLowerCase())) {
                    table+=  `  <tr>
                    <td>${[i]}</td>
                    <td>${allProduct[i].title}</td>
                    <td>${allProduct[i].price}</td>
                    <td>${allProduct[i].taxes}</td>
                    <td>${allProduct[i].ads}</td>
                    <td>${allProduct[i].discount}</td>
                    <td>${allProduct[i].total}</td>
                    <td>${allProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button  onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>`
                }
        

        }
        
        else{
       
                if (allProduct[i].category.includes(value.toLowerCase())) {
                    table +=  `  <tr>
                    <td>${[i]}</td>
                    <td>${allProduct[i].title}</td>
                    <td>${allProduct[i].price}</td>
                    <td>${allProduct[i].taxes}</td>
                    <td>${allProduct[i].ads}</td>
                    <td>${allProduct[i].discount}</td>
                    <td>${allProduct[i].total}</td>
                    <td>${allProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button  onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>`
                }
              }
            }
      
  document.getElementById("tbody").innerHTML = table;


}

// clean data


