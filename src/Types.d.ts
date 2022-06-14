interface LoginInformation {
  username: string;
  password: string;
}

interface Class {
  name: string;
  id: string;
}

interface CouponProps extends StandardProps {}

interface Categories {
  name: string;
  id: string;
  image: string;
}

interface User {
  username: string;
  id: string;
  class: Class;
  age: string;
  credit: number;
  currency: string;
}

interface NavbarProps {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  shoppingcart: Order[];
}

interface ShoppingCartProps extends StandardProps {
  shoppingCart: Order[];
  setShoppingCart: React.Dispatch<React.SetStateAction<Order[]>>;
  AddToShoppingCart: (Order: Order) => void;
  DeleteItemInShoppingCart: (id: string) => void;
  ChangeAmountOfItemInShoppingCart: (id: string, amount: number) => void;
}

interface Item {
  name: string;
  id: string;
  price: number;
  categoryID: string;
  currency: string;
  image: string;
}

interface Rules {
  class: string;
  items: Item[];
  amount: number;
  stackable: boolean;
  type: "fixed" | "percent";
  value: number;
}

interface Coupon {
  image: string;
  name: string;
  id: string;
  info: string;
  rules: Rules;
}

interface StandardProps {
  visible: boolean;
}

interface HomeProps extends StandardProps {
  coupons: Coupon[];
}

interface Order extends Item {
  amount: number;
  id: string;
}

interface RecentOrders {
  price: number;
  currency: string;
  date: any;
  items: Order[];
  id: string;
}

interface ProfileProps extends StandardProps {
  user: User;
  AddToShoppingCart: (Order: Order) => void;
  recentOrders: RecentOrders[];
}

interface OrderProps extends StandardProps {
  items: Item[];
  AddToShoppingCart: (order: Order) => void;
  categories: Categories[];
}

export {
  LoginInformation,
  NavbarProps,
  HomeProps,
  ProfileProps,
  Class,
  User,
  RecentOrders,
  Order,
  Item,
  Coupon,
  OrderProps,
  ShoppingCartProps,
  CouponProps,
  Categories,
};
