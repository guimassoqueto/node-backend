import validator from 'validator';


export default function checkPostUser(body: any): boolean {
  const { name, email } = body;
  return validator.isEmail(email) && !validator.isEmpty(name);
}