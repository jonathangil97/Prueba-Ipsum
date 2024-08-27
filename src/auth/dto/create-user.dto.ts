import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional } from "class-validator";

export class CreateUserDto {

    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' }) 
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    email: string;
    
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    name: string;

    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    lastName: string;

    @MinLength(7, { message: 'La contraseña debe tener al menos 7 caracteres' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    password: string;

    @IsString({ message: 'La imagen de perfil debe ser una cadena de texto' })
    profileImage?: string;

    @IsString({ message: 'La comida favorita debe ser una cadena de texto' })
    favoriteFood?: string;

    @IsString({ message: 'El artista favorito debe ser una cadena de texto' })
    favoriteArtist?: string;

    @IsString({ message: 'El lugar favorito debe ser una cadena de texto' })
    favoritePlace?: string;

    @IsString({ message: 'El color favorito debe ser una cadena de texto' })
    favoriteColor?: string;
}


