import { onAuthStateChanged, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function EditPage() {
  useEffect(() => {
    onAuthStateChanged(auth, (users) => {
      console.log(users);
    });
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const imgRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imgRef, selectedFile);

    const downloadURL = await getDownloadURL(imgRef);
    updateProfile(auth.currentUser, {
      photoURL: downloadURL,
    });
  };

  const deleteImg = () => {
    updateProfile(auth.currentUser, {
      photoURL: "",
    });
  };

  return (
    <div>
      <div>
        <img src="" alt="" />
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={deleteImg}>imgDelete</button>
      </div>
      <div>
        <input type="text" placeholder="이름" />
        <input type="text" placeholder="닉네임" />
        <input type="text" placeholder="소개글" />
        <input type="text" placeholder="#자기 스펙" />
      </div>
    </div>
  );
}

export default EditPage;
