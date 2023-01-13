//Create an amazon buy,check balance and give tracking number
const store = {
    sunglasses: {
        inventory: 817,
        cost: 9.99
    },
    pants: {
        inventory: 236,
        cost: 7.99
    },
    bags: {
        inventory: 17,
        cost: 12.99
    }
};

let checkAvailability=order=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let itemArray=order.items;
            let availableItem=itemArray.every(item=> store[item[0]].inventory>item[1]);
            if(availableItem){
                itemArray.forEach(item=>{
                    return store[item[0]].inventory-item[1];

                })
            }
            if(availableItem){
                let total = 0;
               itemArray.forEach(item=>{
                   total += store[item[0]].cost* item[1];
               })
                console.log(`Items available. Total cost of all items will be ${total}`);
                resolve([order,total]);
            }else{
                reject("Some items ordered are out of stock");
            }
        },defaultTimeout())
    })
}

let processPayment=(resolvedValue)=>{
    let order=resolvedValue[0];
    let total=resolvedValue[1];
    return new Promise((resolve, reject)=>{

        setTimeout(()=>{
        let payment= order.giftCardBalance > total;
        if (payment){
            order.giftCardBalance =  order.giftCardBalance - total;
            console.log(`Payment processed. Balance = ${order.giftCardBalance}` + ". Wait for trackingNumber");
            let trackingNum=trackFunction();
            resolve([order,trackingNum]);
        }else{
            reject("Sorry but you don't have enough funds to complete payment");
        }
        },defaultTimeout())
    })
}
function shipOrder(resolvedValue){
    let trackingNum=resolvedValue[1];
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(`The order has been shipped. Your tracking number is ${trackingNum}`);
        },defaultTimeout());
    })
}
function defaultTimeout(){
    return Math.random()*2000;
}
function trackFunction(){
    return Math.floor(Math.random()*10000);
}
function onSuccess(resolvedValue){
    console.log(resolvedValue)
}
function onFailure(issueValue){
    console.log(issueValue);
}
const order = {
    items: [['sunglasses', 1], ['bags', 2]],
    giftCardBalance: 100
};
checkAvailability(order)
                .then(processPayment)
                .then(shipOrder)
                .then(onSuccess)
                .catch(onFailure);