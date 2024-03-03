const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

const createMulterInstance = (uploadsDir) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      const fileName = `${uuid.v4()}.${ext}`;
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("invalid image file!", false);
    }
  };

  return multer({ storage, fileFilter });
};

const uploadsDir = path.join(__dirname, "..", "public/");
const upload = createMulterInstance(uploadsDir);

module.exports = { upload };
