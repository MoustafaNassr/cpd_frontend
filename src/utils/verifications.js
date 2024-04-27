import * as Yup from 'yup';
import { cpdFormKeys } from './models';

export const profileValidationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  professionTitle: Yup.string().min(6, 'The minimum number of characters is 6').required('profession Title is required'),
});

export const cpdValidationSchema = Yup.object({
  [cpdFormKeys.skills_area]: Yup.string().notOneOf(['Choose your Skills Area'], 'Skills Area is required').required('Skills Area is required'),
  [cpdFormKeys.format_of_training]: Yup.string().required('Format of Training is required'),
  [cpdFormKeys.cost_of_cpd]: Yup.number('Cost must be a number').positive('Cost must be a positive number'), //.required('Cost of CPD is required'),
  [cpdFormKeys.date_completed]: Yup.date().required('Date Completed is required'),
  [cpdFormKeys.hours_logged]: Yup.number('Logged hours must be a number').positive('Hours must be a positive number').required('Hours Logged is required'),
  [cpdFormKeys.title]: Yup.string().required('Title is required'),
  [cpdFormKeys.learn_notes]: Yup.string(),
  [cpdFormKeys.future_develop]: Yup.string(),
});

