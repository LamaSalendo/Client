import "./App.css";

import {
  Categories,
  Class,
  Coupon as CouponType,
  Item,
  Order as OrderType,
  RecentOrders,
  User,
} from "./Types";
import {
  Coupon,
  Header,
  Home,
  Navbar,
  Order,
  ShoppingCart,
} from "./components";
import React, { useEffect, useState } from "react";

import DefaultImage from "./images/default-placeholder.png";
import Profile from "./components/Profile/Profile";
import { idText } from "typescript";
import logo from "./logo.svg";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [recentOrders, setRecentOrders] = useState<RecentOrders[]>([]);
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [shoppingCart, setShoppingCart] = useState<OrderType[]>([]);
  const [Categories, setCategories] = useState<Categories[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [User, setUser] = useState<User>({
    age: "",
    class: {
      name: "",
      id: "",
    },
    id: "",
    username: "",
    credit: 0,
    currency: "",
  });

  const isLoggedIn = () => {
    return false;
  };

  if (!isLoggedIn) {
  }

  const getUserFromLoginData = async () => {
    const User = await (await fetch("api/login")).json();
    return User;
  };

  const getRecentOrders = async () => {
    return await (await fetch("api/order/recent")).json();
  };

  const getCoupons: () => CouponType[] = () => {
    const coupons: CouponType[] = [
      {
        id: "hjhdjshd",
        image: DefaultImage,
        info: "Iiskskid",
        name: "kostenlose Bonbons",
        rules: {
          amount: 1,
          class: "9A",
          items: [
            {
              id: "isds",
              name: "sjdskj",
              price: 0.99,
              categoryID: "1",
              image: DefaultImage,
              currency: "EUR",
            },
          ],
          stackable: false,
          type: "fixed",
          value: 1,
        },
      },
      {
        id: "hjhdjshdsdf",
        image: DefaultImage,
        info: "Iiskfdskid",
        name: "Brot",
        rules: {
          amount: 1,
          class: "9A",
          items: [
            {
              id: "fd",
              name: "sjdskjdf",
              price: 0.99,
              categoryID: "2",
              image: DefaultImage,
              currency: "EUR",
            },
          ],
          stackable: false,
          type: "fixed",
          value: 1,
        },
      },
      {
        id: "hjhdjshd",
        image: DefaultImage,
        info: "Iiskskid",
        name: "Bonbons",
        rules: {
          amount: 1,
          class: "9A",
          items: [
            {
              id: "isds",
              name: "sjdskj",
              price: 0.99,
              categoryID: "3",
              image: DefaultImage,
              currency: "EUR",
            },
          ],
          stackable: false,
          type: "fixed",
          value: 1,
        },
      },
      {
        id: "hjhdjshd",
        image: DefaultImage,
        info: "Iiskskid",
        name: "Bonbons",
        rules: {
          amount: 1,
          class: "9A",
          items: [
            {
              id: "isds",
              name: "sjdskj",
              price: 0.99,
              categoryID: "3",
              image: DefaultImage,
              currency: "EUR",
            },
          ],
          stackable: false,
          type: "fixed",
          value: 1,
        },
      },
      {
        id: "hjhdjshd",
        image: DefaultImage,
        info: "Iiskskid",
        name: "Bonbons",
        rules: {
          amount: 1,
          class: "9A",
          items: [
            {
              id: "isds",
              name: "sjdskj",
              price: 0.99,
              categoryID: "1",
              image: DefaultImage,
              currency: "EUR",
            },
          ],
          stackable: false,
          type: "fixed",
          value: 1,
        },
      },
    ];
    return coupons;
  };

  const getItems = async () => {
    return await (await fetch("/api/items")).json();
  };

  const getCategories = async () => {
    return await (await fetch("api/category")).json();
  };

  useEffect(() => {
    getUserFromLoginData().then(({ success, message: user, redirectURI }) => {
      if (!success) {
        window.location.href = redirectURI;
        return;
      }
      setUser(user);
    });
    getCategories().then((res) => {
      setCategories((prev) => res);
    });
    getRecentOrders().then((res) => {
      setRecentOrders((prev) => res);
    });
    setCoupons(getCoupons());
    getItems().then((res) => {
      setItems(res);
    });
    //setItems(getItems());
  }, []);

  const AddToShoppingCart = (order: OrderType) => {
    console.log(order);
    setShoppingCart((prev) => {
      const a = prev;
      if (prev.map((item) => item.id).includes(order.id)) {
        const oldOrderLocation = a.findIndex((item) => item.id === order.id);
        a[oldOrderLocation].amount += order.amount;
        return a;
      }
      a.push(order);
      return a;
    });
    setCurrentPage("shoppingcart");
  };

  const ChangeAmountOfItemInShoppingCart = (id: string, amount: number) => {
    setShoppingCart((prev) => {
      const a = prev;
      const Index = a.findIndex((item) => item.id === id);
      if (Index === -1) return prev;
      a[Index].amount = amount;
      return a;
    });
  };

  const DeleteItemInShoppingCart = (id: string) => {
    setShoppingCart((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <div className="h-full bg-color-four ">
      <div className="fixed w-screen top-0 h-10 z-10">
        <Header />
      </div>
      <div className="relative top-10 bg-color-four">
        <Home visible={currentPage === "home"} coupons={coupons} />
        <Profile
          visible={currentPage === "profile"}
          user={User}
          recentOrders={recentOrders}
          AddToShoppingCart={AddToShoppingCart}
        />
        <Order
          visible={currentPage === "order"}
          items={items}
          AddToShoppingCart={AddToShoppingCart}
          categories={Categories}
        />
        <ShoppingCart
          visible={currentPage === "shoppingcart"}
          shoppingCart={shoppingCart}
          AddToShoppingCart={AddToShoppingCart}
          DeleteItemInShoppingCart={DeleteItemInShoppingCart}
          ChangeAmountOfItemInShoppingCart={ChangeAmountOfItemInShoppingCart}
          setShoppingCart={setShoppingCart}
        />
        <Coupon visible={currentPage === "coupons"} />
      </div>
      <div className="h-12 w-screen fixed bottom-0">
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          shoppingcart={shoppingCart}
        />
      </div>
    </div>
  );
}

export default App;
