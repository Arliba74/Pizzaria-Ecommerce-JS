const  selector = (el) => document.querySelector(el); 
const  selectorAll = (el) => document.querySelectorAll(el); 
let cart = [];
let modalKey = 0;

let modalCount = 1;

pizzaJson.map((item, index) => {
    
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.',',')}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();

        let  key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalKey = key;
        console.log(pizzaJson[key]);
        
        selector('.pizzaBig img').src = pizzaJson[key].img;
        selector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        selector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;


        selector('.pizzaInfo--size.selected').classList.remove('selected');

        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) =>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            
            size.querySelector('span').innerHTML= pizzaJson[key].sizes[sizeIndex];
        })
        
       
        selector('.pizzaInfo--qt').innerHTML = modalCount;

        selector('.pizzaWindowArea').style.opacity = 0;
        selector('.pizzaWindowArea').style.display = 'flex';

        setTimeout( () =>{
            selector('.pizzaWindowArea').style.opacity = 1;
        }, 200);
     })

    selector('.pizza-area').appendChild(pizzaItem);    
})

function handleCloseModal(){
    selector('.pizzaWindowArea').style.opacity = 0;
    setTimeout( () =>{
        selector('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

selectorAll('.pizzaInfo--cancelButton,.pizzaInfo--cancelMobileButton').forEach((item) =>{
        item.addEventListener('click',handleCloseModal);
    })

selector('.pizzaInfo--qtmais').addEventListener('click',() =>{
    modalCount++;
    selector('.pizzaInfo--qt').innerHTML = modalCount;
})

selector('.pizzaInfo--qtmenos').addEventListener('click',() =>{
    if( modalCount > 1){
        modalCount--;
        selector('.pizzaInfo--qt').innerHTML = modalCount;
   }
    
})

selectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener( 'click', (e) => {
        selector('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
})

selector('.pizzaInfo--addButton').addEventListener('click', ()=> {
    let size = parseInt(selector('.pizzaInfo--size.selected').getAttribute('data-key'));

    cart.push({
        id: pizzaJson[modalKey].id,
        size,
        quant: modalCount
    });
    handleCloseModal();
})