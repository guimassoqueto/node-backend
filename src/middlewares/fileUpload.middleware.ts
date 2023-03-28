import multer from 'multer';
import path from 'path';


const memStorage = multer.memoryStorage();
export const memoryUpload = multer({ 
  storage: memStorage,
  fileFilter: (_req, file, callback) => {
    checkFileType(file, callback);
  },
});


function checkFileType(file: Express.Multer.File, callback: multer.FileFilterCallback) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|webp/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  } 
  return callback(null, false);
}

