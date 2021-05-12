# Backend

## Session
****
 **Sign up**
`GET` api/signup

*object request:*
```
  {
    firstName: <string>;
    lastName: <string>;
    email: <string>;
    password: <string>;
    confirmPassword: <string>;
  }
```

*object response:*
```
  {
    error: <boolean>,
    message: <string>;
  }
```

* * *
 **Login**
`POST` api/login

*object request:*
```
  {
    email: <string>,
    password: <string>
  }
```

*object response:*
```
  {

    "error": <boolean>,
    "message": <string>;
    "session":  {
        firstName:  <string>,
        lastName:  <string>,
        email:  <string>,
        basketId:  <string>
    }
  }
```

* * *
 **Verify Active Session**
`GET` api/session
*object response:*
```
  {
    error: <boolean>,
    session: {
        isLoggedIn: <boolean>,
        firstName: <string>,
        lastName: <string>,
        email: <string>,
        basketId: <string>
	  }
  }
```

* * *
 **Logout**
`DELETE` api/logout
*object response:*
```
  {
    error: <boolean>,
    message: <string>
  }
```

## Products
****

 **Products**
`GET` api/products
*object response:*
```
  {
    error: <boolean>,
    payload: [{
            _id: <string>,
            name: <string>,
            price: <number>,
            description: <string>,
            mediaUrl: <string>,
            rating: <number>
    }]
  }
```
* * *
 **Product**
`GET` api/product/[id]

*object response:*
```
  {

    error: <boolean>,
    payload: {
        _id: <string>,
        name: <string>,
        price: <number>,
        description: <string>,
        mediaUrl: <string>,
        rating: <number>
    }
  }
```
* * *
 **Product**
`DELETE` api/product/[id]

*object response:*
```
  {

    "error": <boolean>,
    "message": <string>,
  }
```



## Baskets
****

 **Baskets**
`GET` api/baskets
*object response:*
```
  {
    error: <boolean>,
    message: [{
        _id: <string>,
        name: <string>,
        price: <number>,
        mediaUrl: <string>,
        quantity?: <number>
    }]
  }
```
***
 **Baskets**
`POST` api/baskets/[id]
*object response:*
```
  {
    error: <boolean>,
    message: [{
        _id: <string>,
        name: <string>,
        price: <number>,
        mediaUrl: <string>,
        quantity?: <number>
    }]
  }
```
***
 **Baskets**
`GET` api/baskets/[id]
*object response:*
```
  {
    error: <boolean>,
    message: [{
        _id: <string>,
        name: <string>,
        price: <number>,
        mediaUrl: <string>,
        quantity?: <number>
    }]
  }
```

# Frontend
## How to use

* Clone the project
* execute ```npm install```
* execute ```npm run dev```
* Open browser in localhost:3000

## Url project
https://e-commerce-delta-dun.vercel.app/
