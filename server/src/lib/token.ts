import jwt from "jsonwebtoken";

export function createVerifyToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
    id: string;
  };
}

export function createAccessToken(id: string, role: string) {
  const payload = { id, role };

  return jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "30d",
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
    payload: {
      id: string;
      role: string;
    };
  };
}
