import { Token } from "../token/token";
import { UserEntityDto } from "../user/user-entity-dto";

export class AuthResponseDto {
    userEntity!:UserEntityDto;
    token!:string;
}
