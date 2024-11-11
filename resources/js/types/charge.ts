import { PaymentAssurance } from "./payment-assurance";

export type Charge = {
  id: number;
  payment_assurance_id: any;
  name: string;
  price: any;
  payment_assurance?: PaymentAssurance;
}
