
import { IMAGES } from '@/images';
import { getImage, Loading, profileValidationSchema, showToast, TextInput, TOAST_TYPES } from '@/utils';
import { CameraIcon } from '@heroicons/react/20/solid';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';



export default function Profile() {

  // hooks---------------------------------
  const { data: session } = useSession()

  const [imageSrc, setImageSrc] = useState(() => {
    if (session?.user.user.profile_image) return getImage(session?.user.user.profile_image);
    return IMAGES.PROFILE.userImage
  })
  const initialValues = {
    firstName: session?.user.user.first_name,
    lastName: session?.user.user.last_name,
    email: session?.user.user.email,
    professionTitle: session?.user.user.profession_title,
    profileImage: imageSrc
  };

  // States-------------------------------
  const [data, setData] = useState({ ...initialValues })
  const [loading, setLoading] = useState(false)

  const [profileImage, setProfileImage] = useState(null)

  const editProfileData = async (values) => {
    setLoading(true)
    const body = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      // profile_image: profileImage ?? imageSrc,  // will be needed later 
      profession_title: values.professionTitle
    }

    fetch(`/api/profile?user_token=${session?.user.token}`, {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json()
      })
      .then((result) => {
        setLoading(false)
        showToast(TOAST_TYPES.SUCCESS, "Your data has been changed successfully")
      }).catch((_) => {
        setLoading(false)
        showToast(TOAST_TYPES.ERROR, 'Something went wrong on edditing your profile data');
      })
  }

  const handleChangeImage = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]))
    setProfileImage(e.target.files[0])
  }

  const formik = useFormik({
    initialValues,
    validationSchema: profileValidationSchema,
    onSubmit: editProfileData
  });

  useEffect(() => {
    setProfileImage(imageSrc)
  }, [])


  return (
    <div className="space-y-10 divide-y divide-gray-900/10 mx-auto max-w-7xl sm:px-6 lg:px-8 mb-10">
      <div className="">
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-full">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className='col-span-6 flex flex-col items-center justify-center gap-4'>
                <Image src={imageSrc} width={100} height={100} className='rounded-md object-contain' />
                {/* will be neede later */}
                {/* <label htmlFor="profile-image">
                  <CameraIcon color='gray' fontSize={10} width={20} height={20} className='hover:cursor-pointer' />
                </label> */}
                {/* <input className='hidden' id='profile-image' type="file" accept='image/jpeg, image/png, image/jpg' onChange={handleChangeImage} /> */}
              </div>
              <TextInput
                label={'First Name'}
                type={'text'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.firstName}
                error={formik.errors.firstName}
                defaultValue={data.firstName}
                ID={'firstName'}
                placeholder={'Enter your first name'}
                containerStyle={'sm:col-span-3'}
              />
              <TextInput
                label={'Second Name'}
                type={'text'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.lastName}
                error={formik.errors.lastName}
                defaultValue={data.lastName}
                ID={'lastName'}
                placeholder={'Enter your last name'}
                containerStyle={'sm:col-span-3'} />
              <TextInput
                label={'Email'}
                type={'email'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.email}
                error={formik.errors.email}
                defaultValue={data.email}
                ID={'email'}
                placeholder={'Enter your e-mail'}
                containerStyle={'sm:col-span-4'}
              />
              <TextInput
                label={'Profession Title'}
                type={'text'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.professionTitle}
                error={formik.errors.professionTitle}
                defaultValue={data.professionTitle}
                ID={'professionTitle'}
                placeholder={'Enter your Profession Title'}
                containerStyle={'sm:col-span-4'}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="button"
              disabled={!formik.isValid}
              onClick={formik.handleSubmit}
              className="rounded-md min-w-30 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? (
                <Loading />
              ) :
                "Save"
              }
            </button>
          </div>
        </form>
      </div >
    </div >
  )
}
