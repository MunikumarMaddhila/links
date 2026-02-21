import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaLinkedin, FaGithub, FaYoutube, FaWhatsapp, FaFacebook, FaGlobe, FaWeixin, FaTelegram, FaPinterest, FaSnapchat, FaReddit, FaComments, FaDove, FaPlayCircle, FaCommentDots } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";

const socialPlatforms = [
  { key: "whatsapp", label: "WhatsApp", icon: FaWhatsapp, color: "#25D366" },
  { key: "instagram", label: "Instagram", icon: FaInstagram, color: "#E4405F" },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedin, color: "#0077B5" },
  { key: "facebook", label: "Facebook", icon: FaFacebook, color: "#1877F3" },
  { key: "youtube", label: "YouTube", icon: FaYoutube, color: "#FF0000" },
  { key: "github", label: "GitHub", icon: FaGithub, color: "#333" },
  { key: "x", label: "X", icon: FaXTwitter, color: "#000" },
  { key: "wechat", label: "WeChat", icon: FaWeixin, color: "#09B83E" },
  { key: "telegram", label: "Telegram", icon: FaTelegram, color: "#26A5E4" },
  { key: "pinterest", label: "Pinterest", icon: FaPinterest, color: "#E60023" },
  { key: "snapchat", label: "Snapchat", icon: FaSnapchat, color: "#FFFC00" },
  { key: "sharechat", label: "ShareChat", icon: FaComments, color: "#FF6E40", gradient: "linear-gradient(135deg, #FF5E9D 0%, #FF9C5E 35%, #5EC8FF 65%, #FFE15E 100%)" },
  { key: "reddit", label: "Reddit", icon: FaReddit, color: "#FF4500" },
  { key: "threads", label: "Threads", icon: FaThreads, color: "#000000" },
  { key: "imo", label: "IMO", icon: FaCommentDots, color: "#3D7EBB" },
  { key: "other", label: "Other", icon: FaGlobe, color: "#38bdf8" },
];

export interface SocialMediaCardProps {
  socialLinks: Record<string, string>;
  onUpdateSocialLink: (platform: string, link: string) => void;
  openPreviewSidebar?: () => void;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ socialLinks, onUpdateSocialLink, openPreviewSidebar }) => {
  const [selected, setSelected] = useState<string>(socialPlatforms[0].key);
  const [inputFields, setInputFields] = useState([
    { value: socialLinks[selected] || "" }
  ]);

  const handleSelect = (key: string) => {
    setSelected(key);
    setInputFields([{ value: socialLinks[key] || "" }]);
  };

  const handleSave = (index: number) => {
    onUpdateSocialLink(selected, inputFields[index].value);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { value: "" }]);
  };

  return (
  <Card className="border border-[#e0f2fe] max-w-2xl mx-auto mt-8">
    <CardHeader>
      <CardTitle className="text-lg font-bold text-gray-900 mb-1">Social Media</CardTitle>
      <p className="text-gray-600 mb-4">Manage your social media links</p>
      <div className="grid grid-cols-8 gap-4 mb-4">
        {socialPlatforms.map(({ key, label, icon: Icon, color, gradient }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleSelect(key)}
            title={label}
            className={`rounded-full w-12 h-12 flex items-center justify-center shadow-sm transition-all border-2 ${selected === key ? '' : 'border-transparent'} ${selected === key ? 'scale-105' : ''}`}
            style={{ 
              background: selected === key ? (gradient || color) : '#F3F4F6', 
              borderColor: selected === key ? color : 'transparent' 
            }}
          >
            <Icon
              className="w-7 h-7"
              style={{ color: selected === key ? '#fff' : color }}
            />
          </button>
        ))}
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      {inputFields.map((field, idx) => {
        const platform = socialPlatforms.find(p => p.key === selected);
        const Icon = platform?.icon;
        return (
          <div key={idx} className="flex items-center gap-2 w-full mb-2">
            {/* Left: Selected platform icon */}
            <span 
              className="flex items-center justify-center rounded-full w-10 h-10" 
              style={{ background: platform?.gradient || platform?.color }}
            >
              {Icon && <Icon className="h-6 w-6 text-white" />}
            </span>
            {/* Center: Input field */}
            <Input
              id={`social-link-${idx}`}
              value={field.value}
              onChange={e => {
                const newFields = [...inputFields];
                newFields[idx].value = e.target.value;
                setInputFields(newFields);
                if (openPreviewSidebar) openPreviewSidebar();
              }}
              placeholder={`Enter your ${selected} link`}
              className="rounded-lg border-gray-300 shadow-sm flex-1"
            />
            {/* Right: Add button only for last field */}
            {idx === inputFields.length - 1 && (
              <Button
                variant="outline"
                className="ml-2"
                onClick={handleAddField}
              >
                Add
              </Button>
            )}
            {/* Save button removed as requested */}
          </div>
        );
      })}
      <div className="flex justify-center">
        <Button
          className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 px-8"
          onClick={() => handleSave(0)}
        >
          Save Link
        </Button>
      </div>
    </CardContent>
  </Card>
  );
};

export default SocialMediaCard;
