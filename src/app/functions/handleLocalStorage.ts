export function GetUserInfo(){
    const keys = ['fullName', 'userName', "departmentTxt", "lang", "description"]
    return GetValuesFromLocalStorage(keys);
}

export function GetValuesFromLocalStorage(keys:string[]){
    var object: any = {};
    for(let key of keys){
        object[key] = localStorage.getItem(key);
    } 
    return { 
        ...object
    };
}