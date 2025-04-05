import { NextResponse } from 'next/server';
import { printQR } from '../../../server/controllers/qrcodeController.js';
import { isAuthenticated } from '../../../server/middlewares/authMiddleware.js';

export async function POST(request) {
  try {
    await isAuthenticated(request);
    const { qrData } = await request.json();
    
    if (!qrData) {
      return NextResponse.json({ error: 'QR data required' }, { status: 400 });
    }

    const result = await printQR(qrData);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
