import bcrypt from "bcrypt";


export default class Crypt {
  
  static async hashString(string: string) {
    try {
      const hashedString =  await bcrypt.hash(string, 10);
      return hashedString;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static async checkHash(plainString: string, hashedString: string) {
    try {
      const isMatch = await bcrypt.compare(plainString, hashedString);
      return isMatch;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

}