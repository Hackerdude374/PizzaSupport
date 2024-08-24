import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword, verifyPassword, getUserByEmail } from '../../lib/auth';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user && await verifyPassword(password, user.password)) {
      // Save user session or token logic here (e.g., JWT or session)
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } else if (req.method === 'POST' && req.query.register) {
    const { email, password, name } = req.body;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json({ success: true });
  }
}
