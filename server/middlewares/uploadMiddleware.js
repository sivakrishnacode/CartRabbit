import multer from "multer";


const filterFilter = (req, file, cd) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

  if(!allowedTypes.includes(file.mimetype)){
    const err = new Error('Incorrect File')
    err.code  = 'Incorrect Filetype'
    return cb(null, true)
  }
  cd(null, true)
}

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
 
});

const upload = multer({
  storage: multerStorage,
  dest: './uploads',
  filterFilter,
  limits: {
    fileSize: 50000000
  }
 });
export default upload