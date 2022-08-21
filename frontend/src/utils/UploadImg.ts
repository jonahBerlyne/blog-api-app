export const checkImg = (file: File) => {
 const types = ['image/png', 'image/jpeg'];
 let err = '';
 if (!file) return err = 'File does\'nt exist';

 if (file.size > 1024*1024) { // 1 mb
  err = "The largest image size is 1 mb";
 }

 if (!types.includes(file.type)) {
  err = "Image type has to be png or jpeg";
 }

 return err;
}

export const uploadImg = async (file: File) => {
 const formData = new FormData();
 formData.append('file', file);
 formData.append('upload_preset', `${process.env.CLOUDINARY_UPLOAD_PRESET}`);
 formData.append('cloud_name', `${process.env.CLOUDINARY_CLOUD_NAME}`);

 const res = await fetch(`${process.env.CLOUDINARY_API_URL}`, {
  method: "POST",
  body: formData
 });

 const data = await res.json();
 return { 
  public_id: data.public_id, 
  url: data.secure_url 
 };
}