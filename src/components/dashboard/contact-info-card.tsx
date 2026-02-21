import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface ContactInfoCardProps {
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
  };
  onUpdateContactInfo: (info: Partial<ContactInfoCardProps["contactInfo"]>) => void;
  openPreviewSidebar?: () => void;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ contactInfo, onUpdateContactInfo, openPreviewSidebar }) => {
  const [email, setEmail] = useState(contactInfo.email || "");
  const [phone, setPhone] = useState(contactInfo.phone || "");
  const [address, setAddress] = useState(contactInfo.address || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      onUpdateContactInfo({ email: value });
    } else if (name === "phone") {
      setPhone(value);
      onUpdateContactInfo({ phone: value });
    }
    if (openPreviewSidebar) openPreviewSidebar();
  };

  return (
    <Card className="border border-[#e0f2fe] max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900 mb-1">Contact Information</CardTitle>
        <p className="text-gray-600">Add your contact details</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="email" className="font-medium mb-1">Email</Label>
          <Input
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
              onFocus={() => { if (openPreviewSidebar) openPreviewSidebar(); }}
            placeholder="Enter your email"
            className="mt-1 block w-full rounded-md border border-black text-sm p-2 focus:border-black focus:ring-0 shadow-none"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="phone" className="font-medium mb-1">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
              onFocus={() => { if (openPreviewSidebar) openPreviewSidebar(); }}
            placeholder="Enter your phone number"
            className="mt-1 block w-full rounded-md border border-black text-sm p-2 focus:border-black focus:ring-0 shadow-none"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </Label>
          <textarea
            id="address"
            name="address"
            value={address}
            onChange={e => {
              setAddress(e.target.value);
              onUpdateContactInfo({ address: e.target.value });
              if (openPreviewSidebar) openPreviewSidebar();
            }}
              onFocus={() => { if (openPreviewSidebar) openPreviewSidebar(); }}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2 resize-none"
            placeholder="Enter your address"
          />
        </div>
        <div className="flex justify-end pt-2">
          <Button
            className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 px-8"
            onClick={() => {
              onUpdateContactInfo({ email, phone, address });
              if (openPreviewSidebar) openPreviewSidebar();
            }}
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoCard;
