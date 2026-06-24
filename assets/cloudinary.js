// Konfigurácia Cloudinary pre nahrávanie fotiek (galéria) – bezplatný plán, bez nutnosti karty.
export const CLOUDINARY = {
  cloudName: "zsphwhpf",
  uploadPreset: "rybnikzahumnie",
};

export async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY.cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY.uploadPreset);
  formData.append("folder", "rybnikzahumnie");
  const res = await fetch(url, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Nahrávanie na Cloudinary zlyhalo.");
  const data = await res.json();
  return data.secure_url;
}

// Nahrá fotku priamo podľa vzdialenej URL adresy (Cloudinary si ju stiahne sám zo servera).
export async function uploadRemoteToCloudinary(remoteUrl) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY.cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", remoteUrl);
  formData.append("upload_preset", CLOUDINARY.uploadPreset);
  formData.append("folder", "rybnikzahumnie/archiv");
  const res = await fetch(url, { method: "POST", body: formData });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Cloudinary: " + errText);
  }
  const data = await res.json();
  return data.secure_url;
}
