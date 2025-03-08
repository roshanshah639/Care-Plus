import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  const allowedFiles = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
  ];

  if (!allowedFiles.includes(file.mimetype)) {
    cb(
      new Error(
        "Invalid file type. Please upload image is one of  jpeg, jpg, png, webp, gif, avif format"
      ),
      false
    );
  } else {
    cb(null, true);
  }
}

const upload = multer({
  storage,
  fileFilter,
});

export { upload };
