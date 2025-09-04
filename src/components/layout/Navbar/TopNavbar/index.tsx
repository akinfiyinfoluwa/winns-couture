import { cn } from "@/lib/utils";

import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";

const data: NavMenu = [
  {
    id: 1,
    label: "Shop",
    type: "MenuItem",
    children: [],
    url: "/"
  },

  //Deals” and use this section to showcase bundled offers (e.g., 5 complementary items at a discounted rate).

  {
    id: 2,
    type: "MenuList",
    label: "Deals",
    url: "/",
    children: [
      {
        id: 21,
        label: "5 for 4",
        url: "/",
        description: "Get 5 items for the price of 4"
      },
      {
        id: 22,
        label: "Buy 2 Get 1 Free",
        url: "/",
        description: "Buy any 2 items and get the 3rd one free"
      },
      {
        id: 23,
        label: "Seasonal Discounts",
        url: "/",
        description: "Check out our seasonal discounts on selected items"
      }
    ]
  },
  {
    id: 3,
    type: "MenuItem",
    label: "New Arrivals",
    url: "/",
    children: []
  },
  {
    id: 4,
    label: "Brands",
    type: "MenuList",
    children: [
      {
        id: 41,
        label: "My style Express",
        url: "/",
        description: "Explore My style Express collection"
      },
      {
        id: 42,
        label: "The Winifred Akin RTW",
        url: "/",
        description: "Discover The Winifred Akin RTW designs"
      },
      {
        id: 43,
        label: "New arrivals",
        url: "/",
        description: "Latest brand arrivals"
      }
    ]
  }
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              ,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10 text-yellow-600"
            ])}
          >
            WINN&apos;S COUTURE
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map(item => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup>
        <div className="flex items-center">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
          <CartBtn />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
