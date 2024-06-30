import multer, { FileFilterCallback } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

const createMulterInstance = (uploadsDir: string) => {
  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      console.log("Destination:", uploadsDir);
      cb(null, uploadsDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const ext = file.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${ext}`;
      console.log("Generated Filename:", fileName);
      cb(null, fileName);
    },
  });

  const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    console.log("File Mimetype:", file.mimetype);
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      console.log("Invalid file type");
      cb(new Error("Invalid image file!") as any, false);
    }
  };

  return multer({ storage, fileFilter });
};

const uploadsDir = path.join(__dirname, "..", "public/");
console.log("Uploads Directory:", uploadsDir);
const upload = createMulterInstance(uploadsDir);

export { upload };
