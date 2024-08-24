import bcrypt from 'bcrypt';
import prisma from './prisma';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};
