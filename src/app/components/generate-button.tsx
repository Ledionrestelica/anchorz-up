"use client";

import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";

interface GenerateButtonProps {
  shortUrl: string;
}

var QRcode = require("qrcode");
import { useState } from "react";

const GenerateButton = ({ shortUrl }: GenerateButtonProps) => {
  // this is a button that generates a QR code for a given URL
  const [qrcode, setQrcode] = useState<string | null>(null);
  const [url, setUrl] = useState<string>(shortUrl);
  const [isOpen, setIsOpen] = useState(false);

  const generateQRCode = async (url: string) => {
    setIsOpen(true);
    try {
      const qrCodeDataURL = await QRcode.toDataURL(url);
      setQrcode(qrCodeDataURL);
    } catch (error) {
      console.error("Failed to generate QR Code:", error);
    }
  };

  return (
    <div className="p-1">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger
          className="flex justify-between items-center px-2"
          onClick={() => generateQRCode(url)}
        >
          <QrCode size={20} />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            QR Code for {url}
            <DialogClose />
          </DialogTitle>
          {qrcode && (
            <div className="mt-4">
              <img
                src={qrcode}
                alt="Generated QR Code"
                className="border rounded"
              />
            </div>
          )}
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateButton;
