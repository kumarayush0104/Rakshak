import { NextResponse } from 'next/server';
import { uploadFile, getFile } from '../../../server/controllers/fileController.js';
import { isAuthenticated } from '../../../server/middlewares/authMiddleware.js';
import multerMiddleware from '../../../server/middlewares/multer.js';

export const config = {
  api: {
    bodyParser: false
  }
};

export async function POST(request) {
  try {
    await isAuthenticated(request);
    
    // Handle file upload using multer
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const result = await uploadFile({
      file,
      originalname: file.name,
      buffer: await file.arrayBuffer()
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('id');
    
    if (!fileId) {
      return NextResponse.json({ error: 'File ID required' }, { status: 400 });
    }

    const file = await getFile(fileId);
    return new NextResponse(file.buffer, {
      headers: {
        'Content-Type': file.mimetype,
        'Content-Disposition': `attachment; filename="${file.originalname}"`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
