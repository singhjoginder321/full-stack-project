import fs from 'fs';
import multer, { StorageEngine } from 'multer';
import path from 'path';

// Define the path for the uploads directory
const uploadsDir = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists, or create it if it does not
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Define disk storage for multer
const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir); // Folder where files will be saved temporarily
  },
  filename: (_req, file, cb) => {
    console.log(file, 'file');
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to ensure unique filenames
  },
});

const upload = multer({ storage });

export default upload;
