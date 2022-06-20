import { Response } from "../models/common-response.model";

export function HandleStringResponse(stringResponse:string) : Response|undefined {
    if(stringResponse.includes('|')){
        const arrResponse: string[] = stringResponse!.split('|');
        if(arrResponse.length === 2){
            return {status: +arrResponse[0], message: arrResponse[1]};
        }else{
            return undefined;
        }
    }else{
        return undefined;
    }
}