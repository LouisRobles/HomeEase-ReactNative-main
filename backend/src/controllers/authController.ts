import { Request, Response } from 'express';
import prisma from '@config/database';
import { hashPassword, comparePassword } from '@utils/passwordHash';
import { generateToken } from '@utils/jwt';
import { validateEmail, validatePassword, validatePhone } from '@utils/validators';
import { errorResponse } from '@utils/errorResponse';

type SignupRole = 'CLIENT' | 'WORKER';

const getTrimmedString = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : '';
};

const getPasswordString = (value: unknown): string => {
  return typeof value === 'string' ? value : '';
};

const normalizeEmail = (value: unknown): string => {
  return getTrimmedString(value).toLowerCase();
};

const normalizeSignupRole = (value: unknown): SignupRole | null => {
  const role = getTrimmedString(value).toUpperCase();

  if (role === 'CLIENT' || role === 'WORKER') {
    return role;
  }

  return null;
};

export const signup = async (req: Request, res: Response) => {
  try {
    const fullName = getTrimmedString(req.body.fullName);
    const email = normalizeEmail(req.body.email);
    const phone = getTrimmedString(req.body.phone);
    const password = getPasswordString(req.body.password);
    const role = normalizeSignupRole(req.body.role);

    // Validation
    if (!fullName || !email || !phone || !password || !req.body.role) {
      return res.status(400).json(errorResponse(400, 'Missing required fields'));
    }

    if (!role) {
      return res
        .status(400)
        .json(errorResponse(400, 'Role must be either CLIENT or WORKER'));
    }

    if (!validateEmail(email)) {
      return res.status(400).json(errorResponse(400, 'Invalid email format'));
    }

    if (!validatePassword(password)) {
      return res.status(400).json(
        errorResponse(
          400,
          'Password must be at least 8 characters with 1 uppercase letter and 1 number'
        )
      );
    }

    if (!validatePhone(phone)) {
      return res.status(400).json(errorResponse(400, 'Invalid phone number'));
    }

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json(errorResponse(409, 'Email already registered'));
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          fullName,
          email,
          phone,
          password: hashedPassword,
          role,
        },
      });

      if (role === 'WORKER') {
        await tx.workerProfile.create({
          data: {
            userId: createdUser.id,
          },
        });
      } else {
        await tx.clientProfile.create({
          data: {
            userId: createdUser.id,
          },
        });
      }

      return createdUser;
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // FIXED: Added return keyword here
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json(errorResponse(500, 'Internal server error'));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = getPasswordString(req.body.password);

    if (!email || !password) {
      return res.status(400).json(errorResponse(400, 'Email and password required'));
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json(errorResponse(401, 'Invalid credentials'));
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json(errorResponse(401, 'Invalid credentials'));
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // FIXED: Added return keyword here
    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json(errorResponse(500, 'Internal server error'));
  }
};

export const sendPasswordResetEmail = async (req: Request, res: Response) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!validateEmail(email)) {
      return res.status(400).json(errorResponse(400, 'Invalid email'));
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return success anyway for security
      return res.json({
        success: true,
        message: 'If email exists, password reset link sent',
      });
    }

    // TODO: Send actual email with reset token
    // For now, just return success

    // FIXED: Added return keyword here
    return res.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json(errorResponse(500, 'Internal server error'));
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const email = normalizeEmail(req.body.email);
    const newPassword = getPasswordString(req.body.newPassword);

    if (!validateEmail(email)) {
      return res.status(400).json(errorResponse(400, 'Invalid email'));
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json(
        errorResponse(
          400,
          'Password must be at least 8 characters with 1 uppercase letter and 1 number'
        )
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json(errorResponse(404, 'User not found'));
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // FIXED: Added return keyword here
    return res.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json(errorResponse(500, 'Internal server error'));
  }
};
