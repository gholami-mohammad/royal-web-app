export enum Gender {
  female = 'female',
  male = 'male',
}

export class User {
  id!: number;
  username!: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  image?: string;
}
