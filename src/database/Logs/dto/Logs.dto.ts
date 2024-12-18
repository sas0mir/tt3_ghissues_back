import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
//import { Date } from 'mongoose';

export class CreateLogsDto {
  @IsNotEmpty()
  @IsString()
  userIp: string;
  date: Date;
  @IsNotEmpty()
  @IsNumber()
  type: number;
  @IsBoolean()
  success?: boolean;
}
