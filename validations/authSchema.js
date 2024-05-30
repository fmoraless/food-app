import { object, string, ref } from 'yup';

export const signupSchema = object().shape({
  email: string().required('Correo es requerido').email('Correo no es válido'),
  password: string()
    .required('Contraseña es requerida')
    .min(6, 'Contraseña debe tener al menos 6 caracteres'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirmación de contraseña es requerida'),
});

export const signinSchema = object().shape({
  email: string().required('Correo es requerido').email('Correo no es válido'),
  password: string()
    .required('Contraseña es requerida')
    .min(6, 'Contraseña debe tener al menos 6 caracteres'),
});
