import { NextResponse } from 'next/server';
import { loginController, registerController } from '../../../server/controllers/authController.js';
import { isAuthenticated } from '../../../server/middlewares/authMiddleware.js';

// Initialize MongoDB connection
import '../../../server/db/db.js';

export async function POST(request) {
  try {
    const { pathname } = new URL(request.url);
    const body = await request.json();

    if (pathname.endsWith('/login')) {
      return NextResponse.json(await loginController(body));
    }
    else if (pathname.endsWith('/register')) {
      return NextResponse.json(await registerController(body));
    }

    return NextResponse.json({ error: 'Route not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { pathname } = new URL(request.url);
    
    if (pathname.endsWith('/test')) {
      await isAuthenticated(request);
      return NextResponse.json({ message: 'Protected route' });
    }

    return NextResponse.json({ error: 'Route not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
