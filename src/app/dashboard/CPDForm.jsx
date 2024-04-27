
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import CPDType from '@/components/CPDType'
import SkillsArea from '@/components/SkillsArea'
import FormateOfTraning from '@/components/FormateOfTraning'
import MagnetButton from '@/components/SubmitButton'
import { useEffect, useState } from 'react'
import { cpdFormKeys, cpdValidationSchema, SelectInput, showToast, TextInput, TOAST_TYPES } from '@/utils'
import { useFormik } from 'formik'
import { useSession } from 'next-auth/react'


export default function CPDForm() {

  const { data: session } = useSession()

  const initialValues = {
    [cpdFormKeys.skills_area]: '',
    [cpdFormKeys.format_of_training]: '',
    [cpdFormKeys.cost_of_cpd]: '',
    [cpdFormKeys.date_completed]: '',
    [cpdFormKeys.hours_logged]: '',
    [cpdFormKeys.title]: '',
    [cpdFormKeys.learn_notes]: '',
    [cpdFormKeys.future_develop]: '',
  };

  const [cpdType, setCpdType] = useState('Formal learning');
  const [initialData, setInitialData] = useState({ ...initialValues }) // This state is later when navigationg from Edit button
  const [loading, setLoading] = useState(false)
  const [skillsArea, setSkillsArea] = useState([])
  const [trainingFormat, setTrainingFormat] = useState([])


  const handleSubmitForm = (values) => {
    setLoading(true)
    const body = { ...values, [cpdFormKeys.type]: cpdType }

    fetch(`/api/cpdForm?user_token=${session?.user.token}`, {
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
        showToast(TOAST_TYPES.SUCCESS, "Your CPD has been Logged successfully")
        formik.resetForm()
      }).catch((_) => {
        setLoading(false)
        showToast(TOAST_TYPES.ERROR, 'Something went wrong on logging your CPD data');
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema: cpdValidationSchema,
    onSubmit: handleSubmitForm
  });

  const getSkillsArea = () => {
    fetch('/api/skillsArea')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json()
      })
      .then((result) => {
        setSkillsArea([...result?.data])
      })
      .catch((_) => {
        showToast(TOAST_TYPES.ERROR('something went wrong on getting skills area'))
      })
  }

  const getTrainingFormat = () => {
    fetch('/api/trainingFormat')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json()
      })
      .then((result) => {
        setTrainingFormat([...result?.data])
      })
      .catch((_) => {
        showToast(TOAST_TYPES.ERROR('something went wrong on getting training format'))
      })
  }

  useEffect(() => {
    getSkillsArea();
    getTrainingFormat()
  }, [])

  return (
    <div className='max-w-7xl sm:px-6 lg:px-8 m-24'>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className='font-semibold text-4xl leading-10 text-gray-900'>Log my CPD</h1>
            <p className=" text-sm leading-6 text-gray-600 mt-6">
              The fields marked with an asterisk (*) are mandatory.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <TextInput
                  label={'Activity title *'}
                  type={'text'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched[cpdFormKeys.title]}
                  error={formik.errors[cpdFormKeys.title]}
                  defaultValue={initialData[cpdFormKeys.title]}
                  ID={cpdFormKeys.title}
                  placeholder={'Type your Activity title here'}
                />
                <CPDType value={cpdType} setValue={setCpdType} />
                <SelectInput
                  label={'Skills Area*'}
                  firstOption={'Choose your Skills Area'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors[cpdFormKeys.skills_area]}
                  touched={formik.errors[cpdFormKeys.skills_area]}
                  options={skillsArea}
                  ID={cpdFormKeys.skills_area}
                  optionValue={'id'}
                  optionLabel={'name'}
                  containerStyle={'py-4'}
                />
                <SelectInput
                  label={'Format of training *'}
                  firstOption={'Choose your format of training'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors[cpdFormKeys.format_of_training]}
                  touched={formik.errors[cpdFormKeys.format_of_training]}
                  options={trainingFormat}
                  ID={cpdFormKeys.format_of_training}
                  optionValue={'id'}
                  optionLabel={'name'}
                />
                {/* <SkillsArea /> */}
                {/* <FormateOfTraning /> */}
              </div>
              <TextInput
                label={' Hours logged *'}
                type={'text'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched[cpdFormKeys.hours_logged]}
                error={formik.errors[cpdFormKeys.hours_logged]}
                defaultValue={initialData[cpdFormKeys.hours_logged]}
                ID={cpdFormKeys.hours_logged}
                placeholder={'number of hours'}
                containerStyle={'sm:col-span-2 sm:col-start-1'}
              />
              <TextInput
                label={'Date completed *'}
                type={'date'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched[cpdFormKeys.date_completed]}
                error={formik.errors[cpdFormKeys.date_completed]}
                defaultValue={initialData[cpdFormKeys.date_completed]}
                ID={cpdFormKeys.date_completed}
                placeholder={'Completed at'}
                containerStyle={'sm:col-span-2'}
              />
              <TextInput
                label={'Cost of CPD'}
                type={'text'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched[cpdFormKeys.cost_of_cpd]}
                error={formik.errors[cpdFormKeys.cost_of_cpd]}
                defaultValue={initialData[cpdFormKeys.cost_of_cpd]}
                ID={cpdFormKeys.cost_of_cpd}
                placeholder={'Cost ...'}
                containerStyle={'sm:col-span-2'}
              />
              <TextInput
                label={'What did you learn notes'}
                type={'text-area'}
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched[cpdFormKeys.learn_notes]}
                error={formik.errors[cpdFormKeys.learn_notes]}
                defaultValue={initialData[cpdFormKeys.learn_notes]}
                ID={cpdFormKeys.learn_notes}
                placeholder={'Make a note of what you learned that can be applied to your professional practice'}
                containerStyle={'col-span-full'}
              />
              <TextInput
                label={'Future development notes'}
                type={'text-area'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched[cpdFormKeys.future_develop]}
                error={formik.errors[cpdFormKeys.future_develop]}
                defaultValue={initialData[cpdFormKeys.future_develop]}
                ID={cpdFormKeys.future_develop}
                placeholder={'Make a note of any areas that you still need to work on or developp further.'}
                rows={3}
                containerStyle={'col-span-full'}
              />
            </div>
          </div>
        </div>
        <MagnetButton onClik={formik.handleSubmit} loading={loading} />
      </form>
    </div>
  )
}
