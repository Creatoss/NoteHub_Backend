export const createUserValdator = {
    username : {
        isLength : {
            Option : {
                max : 32 ,
                min : 5 
            },
            errorMessage : "Username length error"
        },
    notEmpty : {errorMessage : "empty "} ,
    isString : {ErrorMessage : "is not string"} 
    },
    email : 
    {
    isEmail : {errorMessage : "invalid Email" } ,
    },
    password:
    {
    isLength : {
        options : {
            min : 5 , 
            max : 32 , 
        },
        errorMessage : 
            "username length error"
    },
    notEmpty : {errorMessage : "empty "} ,
    isString : {errorMessage : "is not string"}
},
    
phone : {
    isNumeric : {errorMassage : "is not number" }
}
}