import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const gensalt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, gensalt);
}

export async function comaprePassword(password: string, hashPassword: string) {
  return await bcrypt.compare(password, hashPassword);
}
