let title= document.getElementById('title')
let price= document.getElementById('price')
let taxes= document.getElementById('taxes')
let ads= document.getElementById('ads')
let discount= document.getElementById('discount')
let count= document.getElementById('count')
let category= document.getElementById('category')
let submit= document.getElementById('submit')
let total= document.getElementById('total')
let btndelete= document.getElementById('deleteAll')

let mood = 'create';
let tmp

// get total
const getTotal = ()=>{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML= result
        total.style.background = '#040'
    }else{
        total.innerHTML= '000'
        total.style.background = 'rgb(238, 93, 26)'
    }
}

// create product
let dataPro
if(localStorage.product != null ){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = []
}
submit.onclick = createProduct = ()=>{
    let newPro = {
        title: title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        total: total.innerHTML,
        count : count.value,
        discount : discount.value,
        category: category.value.toLowerCase(),
    }
    //save data in localstroage
    if(title.value != '' 
    && price.value != ''
    && category.value != ''
    && newPro.count < 101){
        if(mood === 'create'){
            if(newPro.count > 1){
                for (let x= 0; x < newPro.count ; x++){
                    dataPro.push(newPro);// push لاضافة عنصر في نهاية المصفوفة
                }
            }else{
                dataPro.push(newPro)
            }
        }else{
            dataPro[tmp] = newPro;
            mood= 'create'
            submit.innerHTML = 'create product'
            count.style.display= "block"
        }
        clearDate()
    }
    
   
     
    localStorage.setItem('product', JSON.stringify(dataPro)) // لحفظ البيانات القادمة من حقول الادخال 
    clearDate()
    readData()
    
}

// clear inputs
const clearDate = ()=>{
    title.value= ''
    price.value= ''
    ads.value= ''
    taxes.value= ''
    discount.value= ''
    count.value= ''
    category.value= ''
    total.innerHTML = ''
}
//read

const readData = ()=>{
    getTotal()
    let table= ''
    for( let i= 0; i <dataPro.length ; i++){
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = "updata(${i})" id= 'update'>update</button></td>
                <td><button onclick = "deleteOne(${i})" id= 'delete'>delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    if(dataPro.length > 0){
        btndelete.innerHTML = `
        <button onclick= 'deleteAllData()'>delete all (${dataPro.length})</button>  `
    }else{
        btndelete.innerHTML = " "
    }
}
readData()

// delete one 
const deleteOne = (i) =>{
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro)
    readData()
}
// delete all data
const deleteAllData = ()=>{
    localStorage.clear()
    dataPro.splice(0)
    readData()
}

// update

const updata = (i)=>{
     title.value = dataPro[i].title
     price.value = dataPro[i].price
     taxes.value = dataPro[i].taxes
     ads.value = dataPro[i].ads
     discount.value = dataPro[i].discount
     getTotal()
     count.style.display= 'none'
     category.value = dataPro[i].category
     submit.innerHTML = 'update'
     mood = 'update'
     tmp = i
     scroll ({
        top: 0,
        behavior: "smooth"

     })
}

// search

let searchMood = 'title'
const getSearchMood = (id) =>{
    let search = document.getElementById('search')
    if(id == 'searchTitle'){
        searchMood = 'Title'
    }else{
        searchMood = 'Category'
    }
    search.placeholder = `Search By ${searchMood}`
    search.focus()
    search.value = ''
    readData()
}
const searchData = (value) =>{
    let table = ''
    if (searchMood == 'title'){
        for(let z =0; z < dataPro.length ; z++){
            if(dataPro[z].title.includes(value.toLowerCase())){
                table += `
            <tr>
                <td>${z + 1}</td>
                <td>${dataPro[z].title}</td>
                <td>${dataPro[z].price}</td>
                <td>${dataPro[z].taxes}</td>
                <td>${dataPro[z].ads}</td>
                <td>${dataPro[z].discount}</td>
                <td>${dataPro[z].total}</td>
                <td>${dataPro[z].category}</td>
                <td><button onclick = "updata(${z})" id= 'update'>update</button></td>
                <td><button onclick = "deleteOne(${z})" id= 'delete'>delete</button></td>
            </tr>
        `
            }
        }
    }else{
        for(let z =0; z <dataPro.length ; z++){
            if(dataPro[z].category.includes(value.toLowerCase())){
                table += `
            <tr>
                <td>${z + 1}</td>
                <td>${dataPro[z].title}</td>
                <td>${dataPro[z].price}</td>
                <td>${dataPro[z].taxes}</td>
                <td>${dataPro[z].ads}</td>
                <td>${dataPro[z].discount}</td>
                <td>${dataPro[z].total}</td>
                <td>${dataPro[z].category}</td>
                <td><button onclick = "updata(${z})" id= 'update'>update</button></td>
                <td><button onclick = "deleteOne(${z})" id= 'delete'>delete</button></td>
            </tr>
        `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// clean data
