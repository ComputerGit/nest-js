import {
  IsString,
  IsEmail,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EmployeeRoleType } from '../../domain/value-objects/employee-role.vo';
import { AddressType } from '../../domain/value-objects/address.vo';

class AddressDto {
  @IsEnum(AddressType)
  type: AddressType;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  empId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(EmployeeRoleType)
  role: EmployeeRoleType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];
}
