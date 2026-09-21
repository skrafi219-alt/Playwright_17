import {test,expect,request} from '@playwright/test';
const loginPayLoad={userEmail: "rafi.tgcs219@gmail.com", userPassword: "MBxanptFWYri5$k"};
let token:any;
let orderid:any;
const createOrderPayLoad={orders: [{country: "Indonesia", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const fakePayLoad={"data":[],"message":"No Orders"};
test.beforeAll(async ()=>{

    const apiContext=await request.newContext();
    const apiRes=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayLoad});
    const apiResJson=await apiRes.json();
    token=apiResJson.token;
    console.log(token);

    //create order
    const apiContext2=await request.newContext();
    const apiRes2=await apiContext2.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{

        data:createOrderPayLoad,
        headers:{
                 Authorization:token,
                 "Content-Type":"application/json",
        }
    });
    const apiResJson2=await apiRes2.json();
          orderid=await apiResJson2.orders[0];
          console.log(orderid);
});

test("playwright api Test with UI", async ({page})=>{

    await page.addInitScript(value=>{

        window.localStorage.setItem('token',value)
    },token);

    await page.goto("https://rahulshettyacademy.com/client");
    
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a48b09085b8849b49c88b7f",async route =>{
       
        const response=await page.request.fetch(route.request());
        const body= JSON.stringify(fakePayLoad);

        await route.fulfill({

            response,
            body,

        });
        
    })
    
    
    await page.locator('[routerlink="/dashboard/myorders"]').click();
    await page.waitForLoadState('networkidle');
    //await page.pause();
    

    
});