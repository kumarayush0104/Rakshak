import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate temporary token for QR code access
export const generateTempToken = (fileId) => {
  const payload = {
    fileId,
    temp: true,
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expires in 1 hour
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Verify temporary token
export const verifyTempToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.temp || !decoded.fileId) {
      return null;
    }
    return decoded;
  } catch (error) {
    return null;
  }
};
