import path from "node:path"
import fs from "node:fs"
import multer from "multer"

const __dirname = new URL(".", import.meta.url).pathname

const uploadsDir = path.resolve(__dirname, "../../uploads")

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  },
})

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const mimeType = fileTypes.test(file.mimetype)

    if (extName && mimeType) {
      return cb(null, true)
    }

    return cb(new Error("Only images are allowed"))
  },
})

export const uploadMiddleware = upload.single("image")
