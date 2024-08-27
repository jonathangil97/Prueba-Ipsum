import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';

import { CreateUserDto, UpdateAuthDto, RegisterUserDto, LoginDto } from './dto';

import { User } from './entities/user.entity';

import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {


  constructor( 
    @InjectModel( User.name ) 
    private userModel: Model<User>,

    private jwtService: JwtService
  ) {}

      //crear usuario
  async create(createUserDto: CreateUserDto): Promise<User> {

    try {
      
      // 1. encriptar password
      const {password, ...userData} = createUserDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10), ...userData});
      
      return await newUser.save();
      
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('user already existing');
      } 
    throw new InternalServerErrorException('Error terrible creating user');
  }
  
}

  // logica del register

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {

    const user = await this.create( registerUserDto );
    console.log(registerUserDto);

    return {
      user: user,
      token: this.getJwt({ id: user._id }),
    }

  }


  //se crea la logica del login

  async login(loginDto: LoginDto) : Promise<LoginResponse> {

    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email});
      if (!user ) {
        throw new UnauthorizedException ('Not valid credentials - email');
    }

    if (!bcryptjs.compareSync( password, user.password ) ) {
      throw new UnauthorizedException ('Credentials not valid - password')

    }
    
    const { password:_, ...rest } = user.toJSON();

    return {
      user: user,
      token: this.getJwt({id: user._id}),
    }
}


  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwt(payload: JwtPayload) { 
    const token = this.jwtService.sign(payload);
    return token;
  }

}
