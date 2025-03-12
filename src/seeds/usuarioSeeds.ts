import { faker } from "@faker-js/faker/.";
import { User } from "../models/userModel";

export const usuarioFake: User = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password()
};