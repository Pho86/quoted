"use client"

import { useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import axios from "axios"
import Image from 'next/image';
import { ref } from 'firebase/storage';
import { storage } from '../../../firebase/firebase.config';
import { uploadBytes, getDownloadURL } from 'firebase/storage';

export default function SignUpForm() {
   const [signup, setSignup] = useState({
      email: "",
      password: "",
      username: "",
      location: "",
      avatar: { name: "" },
      bio: "",
      imageType: ""
   })
   const [buttontxt, setButtonTxt] = useState("Send Email");
   const [errorMessage, setErrorMessage] = useState("");
   const [disabled, setDisabled] = useState(false);
   const [Avatar, setAvatar] = useState("/images/avatar.png");
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      setButtonTxt("Sending...");
      setDisabled(true)
      e.preventDefault()
      console.log(signup)
      try {
         const request = await axios.post('/api/login', { signup },
         )
         console.log(request)
         setButtonTxt("Sent!");
      }
      catch (error) {
         console.log(error)
         setButtonTxt("An error occurred.");
      }
      setDisabled(false)
   }
   const handleChange = async (event: any) => {
      if (event.target.name === "avatar") {
         setAvatar(URL.createObjectURL(event.target.files[0]))
         try {
            let newProfileImageURL = event.target.files[0];
            if (event.target.files[0]) {
               const storageRef = ref(storage, `profileImages/${event.target.files[0].name}`);
               await uploadBytes(storageRef, event.target.files[0]);
               newProfileImageURL = await getDownloadURL(storageRef);
               setSignup({ ...signup, imageType: event.target.files[0].type, avatar: newProfileImageURL })
            }
         }
         catch (error) {
            setErrorMessage("Failed to select an image, or the image is too large (under 20mbs)")

         }
      }
      else {
         setSignup({ ...signup, [event.target.name]: event.target.value });
      }
   };
   return <>
      <form className='flex flex-col w-full'>
         <fieldset className='flex flex-col w-full'>
            <Input label type="email" required name="email" placeholder="email" value={signup.email} onChange={handleChange} />
            <Input label type="password" required name="password" placeholder="password" value={signup.password} onChange={handleChange} />
            <Input label type="text" required name="username" placeholder="username" value={signup.username} onChange={handleChange} />
            <Input label type="text" required name="location" placeholder="location" value={signup.location} onChange={handleChange} />
            <Image src={Avatar} width={250} height={250} alt="next" />
            <input type="file" name="avatar" accept="image/png, image/gif, image/jpeg" onChange={handleChange} />
            <Input label type="text" name="bio" placeholder="bio" value={signup.bio} onChange={handleChange} />
            <Button type="submit" onClick={handleSubmit} disabled={disabled}><p>signup</p></Button>
         </fieldset>
      </form>
   </>
}