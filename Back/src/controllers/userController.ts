import { Request, Response } from 'express';
import { prismaClient } from '../database';
import { createUserDTO, createUserRequestSchema, updatedUserRequestSchema, updateUserDTO } from '../dtos';

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

  public async index(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const user = await prismaClient.user.findFirst({
        where: {
          id: Number(id)
        }
      });

      if (!user) {
        return response.status(404).json({
          error: true,
          message: 'Usuário não existe'
        });
      }

      let usersList;

      usersList = await prismaClient.user.findMany({
        select: {
          id: true,
          name: true,
          username: true,
          password: true,
          cpf: true,
          email: true,
          phone: true,
          public_place: true,
          house_number: true,
          district: true,
          zip_code: true,
          city: true,
          is_activated: true,
          created_at: true,
          updated_at: true
        },
        where: {
          id: Number(id),
          is_activated: true
        },
        orderBy: {
          name: 'asc'
        }
      })

      return response.status(200).json(
        usersList
      )
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir os usuário registrados: ${err.message}`
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userById = await prismaClient.user.findFirst({
        select: {
          id: true,
          name: true,
          username: true,
          password: true,
          cpf: true,
          email: true,
          phone: true,
          public_place: true,
          house_number: true,
          district: true,
          zip_code: true,
          city: true,
          is_activated: true,
          created_at: true,
          updated_at: true
        },
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if (!userById) {
        return response.status(404).json({
          error: true,
          message: 'Usuário não existe'
        })
      }

      return response.status(200).json(
        userById
      )
    } catch (err) {
      return response.status(404).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir o usuário registrado: ${err.message}`
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      await updatedUserRequestSchema.validate(request.body, { abortEarly: false })
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors
      });
    }

    const {
      name,
      username,
      cpf,
      email,
      phone,
      public_place,
      house_number,
      district,
      zip_code,
      city
    }: updateUserDTO = request.body;

    const { id } = request.params;

    try {
      const userById = await prismaClient.user.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if (!userById) {
        return response.status(404).json({
          error: true,
          message: 'Usuário não existe'
        })
      }

      const verifyUsername = await prismaClient.user.findFirst({
        where: {
          username: username,
          is_activated: true
        }
      });

      if (verifyUsername.id != Number(id)) {
        return response.status(404).json({
          error: true,
          message: "Username nao esta disponivel, tente outro",
        });
      }

      const verifyCpf = await prismaClient.user.findFirst({
        where: {
          cpf: cpf,
          is_activated: true
        }
      });

      if (verifyCpf.id != Number(id)) {
        return response.status(404).json({
          error: true,
          message: "CPF ja esta cadastrado, tente outro",
        });
      }

      const verifyEmail = await prismaClient.user.findFirst({
        where: {
          email: email,
          is_activated: true
        }
      });

      if (verifyEmail.id != Number(id)) {
        return response.status(404).json({
          error: true,
          message: "Email ja esta cadastrado, tente outro",
        });
      }

      const userUpdateById = await prismaClient.user.update({
        where: { id: Number(id) },
        data: {
          name,
          username,
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
        message: 'Usuário atualizado com sucesso'
      })
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar atualizar um usuário: ${err.message}`
      })
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userById = await prismaClient.user.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if (!userById) {
        return response.status(404).json({
          error: true,
          message: 'Usuário não existe'
        })
      }

      const userDeleteById = await prismaClient.user.update({
        where: {
          id: Number(id)
        },
        data: {
          is_activated: false
        }
      });

      return response.status(200).json({
        message: 'Usuário apagado com sucesso'
      })
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar apagar um usuário: ${err.message}`
      })
    }
  }
}

export default new userController();