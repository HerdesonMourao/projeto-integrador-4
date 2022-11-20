import { CardType } from "./constants/CardType";
import { User } from "./User";

export interface Cards {
  id: number;
  user_id: User;
  card_number: string;
  type: CardType;
  flags: string;
  limit: number;
  current_value: number;
  closing_day: number;
  is_activated: boolean;
  created_at: Date;
  userId: number;
}
