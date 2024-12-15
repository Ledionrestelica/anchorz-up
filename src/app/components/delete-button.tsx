"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Delete } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  // this is a button that takes in the id of a URL and deletes it when clicked
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  async function handleDelete(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3000/api/delete`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete URL");
      }
      setIsLoading(false);
      alert("URL deleted");
      router.refresh();
      return res.json();
    } catch (error) {
      console.error("Error deleting URL:", error);
      alert("Failed to delete URL");
      setIsLoading(false);
    }
  }

  return (
    <div className="p-1 flex items-center justify-center pl-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Delete width={24}></Delete>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete URL</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this URL?
            </DialogDescription>
          </DialogHeader>
          <DialogDescription className="flex gap-4">
            <DialogClose className="bg-neutral-100 text-black px-4 py-2 rounded-md">
              No
            </DialogClose>
            <button
              className="bg-red-600 text-white px-8 py-2 rounded-md"
              onClick={() => handleDelete(id)}
            >
              {isLoading ? "Deleting..." : "Yes"}
            </button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteButton;
