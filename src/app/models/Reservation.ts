export interface Reservation {
  key?: any;
  userId: string;
  materielId: string;
  quantity: number;
  date: string;
  email: string;
  status: string;
  nom?: string; // Optional: name of the user
  prenom?: string; // Optional: last name of the user
  nomMat?: string;
  role?: string ;
  qtStock?:number;


}
