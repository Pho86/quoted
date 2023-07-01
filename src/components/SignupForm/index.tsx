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

export default function SignUpForm() {
   const [signup, setSignup] = useState({
      email: "",
      password: "",
      username: "",
      location: "",
      avatar: "",
      bio: "",
      imageType: ""
   })
   const [buttontxt, setButtonTxt] = useState<string>("Next");
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [errorMessageState, setErrorMessageState] = useState<boolean>(false)
   const [errorMessageLocation, setErrorMessageLocation] = useState<string>("")
   const [disabled, setDisabled] = useState<boolean>(false);
   const [Avatar, setAvatar] = useState<string>("/next.svg");
   const [errorMessageClass, setErrorMessageClass] = useState<string>("text-red-500")

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (number === 0) {
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
         setButtonTxt("Submit");
      }
      if (number === 2) {
         setButtonTxt("Sending...");
         setDisabled(true)
         console.log(signup)
         try {
            const request = await axios.post('/api/profile', { signup },
            )
            console.log(request)
            setButtonTxt("Sent!");
         }
         catch (error) {
            console.log(error)
            setButtonTxt("Please try creating an account again with new details.");
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
               setErrorMessage("Image is uploading please wait...")
               setErrorMessageLocation('image')
               const storageRef = ref(storage, `profileImages/${event.target.files[0].name}`);
               await uploadBytes(storageRef, event.target.files[0]);
               newProfileImageURL = await getDownloadURL(storageRef);
               setSignup({ ...signup, imageType: event.target.files[0].type, avatar: newProfileImageURL })
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
         setSignup({ ...signup, [event.target.name]: event.target.value });
      }
   };

   const [number, setNumber] = useState<number>(0);
   const handleBack = () => {
      setErrorMessageState(false)
      setButtonTxt("Next")
      setNumber(number - 1)
   }
   return <>

      <form className='flex flex-col w-full'>
         <fieldset className='flex flex-col w-full'>
            <h2 className='font-bold'>Sign Up</h2>
            <AnimatePresence>
               {number === 0 ? <>
                  <motion.div className='' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                     <Input label type="text" required name="username" placeholder="username" value={signup.username} onChange={handleChange} />
                     <Input label type="email" required name="email" placeholder="email" value={signup.email} onChange={handleChange} />
                     {errorMessageState && errorMessageLocation === "email" && <p className='text-red-500'>{errorMessage}</p>}
                     <Input label type="password" required name="password" placeholder="password" value={signup.password} onChange={handleChange} />
                     {errorMessageState && errorMessageLocation === "password" && <p className='text-red-500'>{errorMessage}</p>}
                  </motion.div>
               </>
                  :
                  number === 1 ?
                     <>
                        <motion.div className='' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                           <Input label type="text" name="location" placeholder="location" value={signup.location} onChange={handleChange} />
                           <Input label type="text" name="bio" input={false} placeholder="bio" value={signup.bio} onChange={handleChange} />

                        </motion.div>
                     </>
                     :
                     <>
                        <motion.div className='' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                           <div className='flex items-end'>
                              <Image src={Avatar} width={250} height={250} style={{ objectFit: "fill" }} className="w-52 h-52 rounded-full" alt="your image" />
                              <Image src={Avatar} width={250} height={250} style={{ objectFit: "fill" }} className="w-36 h-36 rounded-full" alt="your image" />
                              <Image src={Avatar} width={250} height={250} style={{ objectFit: "fill" }} className="w-16 h-16 rounded-full" alt="your image" />
                           </div>
                           <input type="file" name="avatar" accept="image/png, image/gif, image/jpeg" onChange={handleChange} />
                           {errorMessageState && errorMessageLocation === "image" && <p className={errorMessageClass}>{errorMessage}</p>}
                        </motion.div>
                     </>
               }
            </AnimatePresence>
            <div className='grid grid-cols-4 w-full justify-center gap-5 py-4' dir="rtl">
               {number != 0 && <Button type="button" onClick={handleBack} disabled={disabled} className="order-4"><p>back</p></Button>}
               <Button type="submit" onClick={handleSubmit} disabled={disabled} ><p>{buttontxt}</p></Button>
            </div>


            {/* <Button type="submit" onClick={handleSubmit} disabled={disabled}><p>signup</p></Button> */}
         </fieldset>
      </form>
   </>
}