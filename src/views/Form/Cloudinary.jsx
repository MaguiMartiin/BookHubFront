// sube la imagen a cloudinary
//recibe el archivo y lo sube a cloudinary
const cloudinary = async (file) =>{
     const data = new FormData();
           data.append("file", file);
           data.append("upload_preset", "imageBook")
           const res = await fetch(
                   `https://api.cloudinary.com/v1_1/dgypqbuc6/image/upload`,
                   {
                     method: "POST",
                     body: data,
                   }
                 )
                 const files = await res.json();
                 return files.secure_url
   }
   export default cloudinary;