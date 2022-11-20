import { Request, Response } from 'express';
import { prismaClient } from '../database';
import { createUserDTO, createUserRequestSchema } from '../dtos';

class userController {
  public async store(request: Request, response: Response) {
    try {
      await createUserRequestSchema.validate(request.body, {
        abortEarly: true,
      });
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors
      })
    }

    const {
      name,
      username,
      password,
      cpf,
      email,
      phone,
      public_place,
      house_number,
      district,
      zip_code,
      city
    }: createUserDTO = request.body;

    try {
      const verifyUsername = await prismaClient.user.findFirst({
        where: {
          username: username
        }
      });

      if (verifyUsername) {
        return response.status(404).json({
          error: true,
          message: "Username nao esta disponivel, tente outro",
        });
      }

      const verifyCpf = await prismaClient.user.findFirst({
        where: {
          cpf: cpf
        }
      });

      if (verifyCpf) {
        return response.status(404).json({
          error: true,
          message: "CPF ja esta cadastrado, tente outro",
        });
      }

      const verifyEmail = await prismaClient.user.findFirst({
        where: {
          email: email
        }
      });

      if (verifyEmail) {
        return response.status(404).json({
          error: true,
          message: "Email ja esta cadastrado, tente outro",
        });
      }

      const createUser = await prismaClient.user.create({
        data: {
          name,
          username,
          password,
          cpf,
          email,
          phone,
          public_place,
          house_number,
          district,
          zip_code,
          city
        }
      })

      return response.status(200).json({
        message: "Usuario cadastrado com sucesso",
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar cadastrar um usuario: ${err.message}`,
      });
    }
  }
}

export default new userController();