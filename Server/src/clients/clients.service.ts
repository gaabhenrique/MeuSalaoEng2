import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientInput: CreateClientInput) {
    const client = await this.clientRepository.create(createClientInput);
    return this.clientRepository.save(client);
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOne(id: number) {
    return this.clientRepository.findOneBy({ id });
  }

  async update(id: number, updateClientInput: UpdateClientInput) {
    const client = await this.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    Object.assign(client, updateClientInput);

    return this.clientRepository.save(client);
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const result = await this.clientRepository.delete(client.id);

    if (result.affected > 0) {
      return client;
    }
  }
}
