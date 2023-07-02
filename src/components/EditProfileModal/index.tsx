"use client"
import { useState } from 'react'
import Input from '../Input';
import axios from "axios"
import Image from 'next/image';
import { ref } from 'firebase/storage';
import { storage, auth } from '../../../firebase/firebase.config';
import { uploadBytes, getDownloadURL, } from 'firebase/storage';
import Modal from '../Modal';
import { updateProfile } from 'firebase/auth';

export default function EditProfileForm({
   userID,
   userData,
}: {
   userID: string,
   userData: any

}) {
   const [profile, setSignup] = useState({
      username: userData.username,
      location: userData.location,
      avatar: userData.avatar,
      bio: userData.bio,
      imageType: userData.imageType,
   })
   const [buttontxt, setButtonTxt] = useState<string>("change");
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [errorMessageState, setErrorMessageState] = useState<boolean>(false)
   const [errorMessageLocation, setErrorMessageLocation] = useState<string>("")
   const [disabled, setDisabled] = useState<boolean>(false);
   const [Avatar, setAvatar] = useState<string>(userData.avatar);
   const [errorMessageClass, setErrorMessageClass] = useState<string>("text-red-500")


   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setButtonTxt("changing...");
      setDisabled(true)
      try {
         const request = await axios.put(`/api/profile/${userID}`, { profile, auth },
         )
         // @ts-ignore
         await updateProfile(auth.currentUser, {
            displayName: profile.username,
            photoURL: profile.avatar
         })
         setButtonTxt("changed!");
      }
      catch (error) {
         console.log(error)
         setButtonTxt("Please try creating an account again with new details.");
      }
      setDisabled(false)
   }

   const handleChange = async (event: any) => {
      if (event.target.name === "avatar") {
         setDisabled(true)
         setAvatar(URL.createObjectURL(event.target.files[0]))
         try {
            let newProfileImageURL = event.target.files[0];
            if (event.target.files[0]) {
               setErrorMessageState(true)
               setErrorMessageClass('text-red-500')
               setErrorMessage("Image is uploading please wait...")
               setErrorMessageLocation('image')
               const storageRef = ref(storage, `profileImages/${event.target.files[0].name}`);
               await uploadBytes(storageRef, event.target.files[0]);
               newProfileImageURL = await getDownloadURL(storageRef);
               setSignup({ ...profile, imageType: event.target.files[0].type, avatar: newProfileImageURL })
               setDisabled(false)
               setErrorMessageClass('text-green-500')
               setErrorMessage("Image has been uploaded!")
            }
         }
         catch (error) {
            setDisabled(false)
            setErrorMessage("Failed to select an image, or the image is too large (under 20mbs)")
         }
      }
      else {
         setSignup({ ...profile, [event.target.name]: event.target.value });
      }
   };
   return <>
      <Modal buttonText={'edit profile'} title="edit profile" disabled={disabled} buttonClass='' confirmationText={buttontxt} buttonClick={(event: React.FormEvent<HTMLFormElement>) => { handleSubmit(event) }}>
         <form className='flex flex-col w-full p-10'>
            <fieldset className='flex flex-col w-full gap-2'>
               <div className='flex items-end'>
                  <Image src={Avatar} width={250} height={250} style={{ objectFit: "fill" }} className="w-52 h-52 rounded-full hidden md:flex" alt="your image large version" />
                  <Image src={Avatar} width={250} height={250} style={{ objectFit: "fill" }} className="w-36 h-36 rounded-full " alt="your image medium version" />
                  <Image src={Avatar} width={250} height={250} style={{ objectFit: "fill" }} className="w-16 h-16 rounded-full hidden md:flex" alt="your image small version" />
               </div>
               <input type="file" name="avatar" accept="image/png, image/gif, image/jpeg" onChange={handleChange} />
               {errorMessageState && errorMessageLocation === "image" && <p className={errorMessageClass}>{errorMessage}</p>}
               <Input label type="text" required name="username" placeholder="username" value={profile.username} onChange={handleChange} />
               <Input label type="text" name="location" placeholder="location" value={profile.location} onChange={handleChange} />
               <Input label type="text" name="bio" input={false} rows={4} placeholder="bio" value={profile.bio} onChange={handleChange} />
            </fieldset>
         </form>
      </Modal>
   </>
}