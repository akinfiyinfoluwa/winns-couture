"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: string;
}

const dummyNotifications: Notification[] = [
  {
    id: "1",
    message: "Payment received: ₦150.00 from John Doe",
    read: false,
    timestamp: "2025-09-04T10:00:00Z",
  },
  {
    id: "2",
    message: "New order #12345 placed by Jane Smith",
    read: false,
    timestamp: "2025-09-04T09:30:00Z",
  },
  {
    id: "3",
    message: "Payment received: ₦250.00 from Peter Jones",
    read: false,
    timestamp: "2025-09-03T18:00:00Z",
  },
  {
    id: "4",
    message: "Order #98765 shipped",
    read: true,
    timestamp: "2025-09-03T15:00:00Z",
  },
];

export const NotificationButton = () => {
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 rounded-full"
        onClick={toggleDropdown}
      >
        <FiBell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 z-50 min-w-[300px] rounded-md border bg-white p-2 shadow-lg",
            "origin-top-right animate-in fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          )}
        >
          <div className="px-2 py-1.5 text-sm font-semibold">Notifications</div>
          <div className="my-1 h-[1px] bg-gray-100" />
          {notifications.length === 0 ? (
            <p className="px-2 py-1.5 text-sm text-gray-500">
              No new notifications.
            </p>
          ) : (
            <div className="max-h-60 overflow-y-auto">
              {notifications.filter(n => !n.read).map((notification, index, arr) => (
                <React.Fragment key={notification.id}>
                  <div
                    className={cn(
                      "flex flex-col items-start rounded-sm px-2 py-1.5 text-sm transition-colors",
                      !notification.read && "bg-blue-50/50" // Highlight unread
                    )}
                  >
                    <p className="text-gray-800">{notification.message}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </span>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs text-blue-600 hover:no-underline"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  </div>
                  {index < arr.length - 1 && (
                    <div className="my-1 h-[1px] bg-gray-100" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};