"use client"

import { useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import axios from "axios"
import Image from 'next/image';
import { ref } from 'firebase/storage';
import { storage } from '../../../firebase/firebase.config';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
   const [signup, setSignup] = useState({
      email: "",
      password: "",
      username: "",
      location: "",
      avatar: "",
      bio: "",
      imageType: "",
      hideProfile: false,
   })
   const [buttontxt, setButtonTxt] = useState<string>("next");
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [errorMessageState, setErrorMessageState] = useState<boolean>(false)
   const [errorMessageLocation, setErrorMessageLocation] = useState<string>("")
   const [disabled, setDisabled] = useState<boolean>(false);
   const [Avatar, setAvatar] = useState<string>("/logo.svg");
   const [errorMessageClass, setErrorMessageClass] = useState<string>("text-red-500")

   const router = useRouter()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (number === 0) {
         if (signup.username.length < 3) {
            setErrorMessage("username needs to be above 3 characters.")
            setErrorMessageLocation('username')
            setErrorMessageState(true)
            return
         }
         var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
         if (!validEmail.test(signup.email) === true || signup.email === "") {
            setErrorMessage("you set an invalid email.")
            setErrorMessageLocation('email')
            setErrorMessageState(true)
            return
         }
         if (signup.password.length < 8) {
            setErrorMessage("password needs to be above 8 characters.")
            setErrorMessageLocation('password')
            setErrorMessageState(true)
            return
         }
         setErrorMessageState(false)
         setNumber(number + 1)
      }
      if (number === 1) {
         setErrorMessageState(false)
         setNumber(number + 1)
         setButtonTxt("submit");
      }
      if (number === 2) {
         setButtonTxt("creating");
         setDisabled(true)
         console.log(signup)
         try {
            const request = await axios.post('/api/profile', { signup },
            )
            setButtonTxt("created!");
            router.push('/home')
         }
         catch (error) {
            console.log(error);
            setErrorMessage("please try again with new details")
            setErrorMessageLocation('error')
            setErrorMessageState(true)
            setButtonTxt("error");
            setDisabled(false)
         }
         setDisabled(false)
      }
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
               setErrorMessage("image is uploading please wait...")
               setErrorMessageLocation('image')
               const storageRef = ref(storage, `profileImages/${event.target.files[0].name}`);
               await uploadBytes(storageRef, event.target.files[0]);
               newProfileImageURL = await getDownloadURL(storageRef);
               setSignup({ ...signup, imageType: event.target.files[0].type, avatar: newProfileImageURL })
               setDisabled(false)
               setErrorMessageClass('text-green-500')
               setErrorMessage("image has been uploaded!")
            }
         }
         catch (error) {
            setDisabled(false)
            setErrorMessage("failed to select an image, or the image is too large (under 20mbs)")
         }
      }
      else {
         setSignup({ ...signup, [event.target.name]: event.target.value });
      }
   };

   const [number, setNumber] = useState<number>(0);
   const handleBack = () => {
      setErrorMessageState(false)
      setButtonTxt("next")
      setNumber(number - 1)
   }

   return <>
      <form className='flex flex-col w-full'>
         <fieldset className='flex flex-col w-full'>
            <AnimatePresence>
               {number === 0 ? <>
                  <motion.div className='flex flex-col w-full gap-2' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} exit={{ opacity: 0 }} >
                     <Input label type="text" required name="username" placeholder="username" value={signup.username} onChange={handleChange} />
                     {errorMessageState && errorMessageLocation === "username" && <p className='text-red-500'>{errorMessage}</p>}
                     <Input label type="email" required name="email" placeholder="email" value={signup.email} onChange={handleChange} />
                     {errorMessageState && errorMessageLocation === "email" && <p className='text-red-500'>{errorMessage}</p>}
                     <Input label type="password" required name="password" placeholder="password" value={signup.password} onChange={handleChange} />
                     {errorMessageState && errorMessageLocation === "password" && <p className='text-red-500'>{errorMessage}</p>}
                  </motion.div>
               </>
                  :
                  number === 1 ?
                     <motion.div className='flex flex-col w-full gap-2' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Input label type="text" name="location" placeholder="location" value={signup.location} onChange={handleChange} />
                        <Input label type="text" name="bio" input={false} placeholder="bio" value={signup.bio} onChange={handleChange} />
                     </motion.div>

                     :
                     <>
                        <motion.div className='flex flex-col w-full gap-2' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} exit={{ opacity: 0 }}>
                           <div className='flex items-end'>
                              <Image src={Avatar} width={250} height={250} style={{ objectFit: "fill" }} className="w-52 h-52 rounded-full hidden md:flex" alt="your image" />
                              <Image src={Avatar} width={250} height={250} style={{ objectFit: "fill" }} className="w-36 h-36 rounded-full" alt="your image" />
                              <Image src={Avatar} width={250} height={250} style={{ objectFit: "fill" }} className="w-16 h-16 rounded-full hidden md:flex" alt="your image" />
                           </div>
                           <input type="file" name="avatar" accept="image/png, image/gif, image/jpeg" onChange={handleChange} />
                           {errorMessageState && errorMessageLocation === "image" && <p className={errorMessageClass}>{errorMessage}</p>}
                           <div className='flex gap-1'>
                              <label className='text-gray-800 text-sm'>Hide Profile</label>
                              <input type="checkbox" checked={signup.hideProfile} name="hideProfile" onChange={handleChange} />
                           </div>
                        </motion.div>
                        {errorMessageState && errorMessageLocation === "error" && <p className={errorMessageClass}>{errorMessage}</p>}
                     </>
               }
            </AnimatePresence>
            <div className='grid grid-cols-3 md:grid-cols-4 w-full justify-center gap-5 py-4' dir="rtl">
               <Button type="submit" onClick={handleSubmit} disabled={disabled} ><p>{buttontxt}</p></Button>
               {number != 0 ? <Button type="button" onClick={handleBack} disabled={disabled} className=""><p>back</p></Button> : <div></div>}
               <div className='hidden md:block col-span-3 md:col-span-1'></div>
               <p className='text-left whitespace-nowrap self-start font-semibold'>Step {number + 1} of 3</p>
            </div>
         </fieldset>
      </form>
   </>
}