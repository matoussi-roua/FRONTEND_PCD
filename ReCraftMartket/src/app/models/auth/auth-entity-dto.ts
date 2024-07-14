import { UserEntityDto } from "../user/user-entity-dto";

export class AuthEntityDto {
    userEntity!: UserEntityDto;
    token!: string;
}
