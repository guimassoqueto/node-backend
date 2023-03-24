import multer from 'multer';
import path from 'path';
import { v4 as uuid4 } from 'uuid';

const uploadsLocation = path.format({
  root: path.resolve(__dirname),
  dir: "uploads"
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsLocation)
  },
  filename: function (_req, file, cb) {
    const extension = file.mimetype.split("/").pop();
    cb(null, `${uuid4()}.${extension}`);
  },
})

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

export const fileUpload = multer({
  storage: storage,
  fileFilter: (_req, file, callback) => {
    checkFileType(file, callback);
  }
});