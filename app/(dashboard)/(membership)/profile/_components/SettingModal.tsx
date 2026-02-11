"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { X, Loader2, AlertCircle, Camera, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { apiClient } from "@/apiClient/client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AVATAR_OPTIONS = Array.from({ length: 20 }, (_, i) => 
  `https://api.dicebear.com/9.x/notionists/svg?seed=Avatar${i}&backgroundColor=b6e3f4,c0aede,d1d4f9`
);

const toast = {
  success: (msg: string) => console.log(`Success: ${msg}`),
  error: (msg: string) => console.error(`Error: ${msg}`),
};


interface AvatarOption {
  id: number;
  image_url: string;
}

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------
interface UserData {
  username: string;
  email: string;
  avatarUrl: string;
}

interface Userpayload{
  names: string;
  email: string;
  avatar_id: number
}

interface SettingsModalProps {
  initialData?: UserData;
  onClose?: () => void;
  onSave?: (data: UserData) => Promise<void>;
  onBackToDashboard?: () => void;
}

interface SettingsFieldProps {
  label: string;
  name: keyof UserData;
  value: string;
  onSave: (key: keyof UserData, newValue: string) => void;
  validate?: (value: string) => string | null;
}

// ----------------------------------------------------------------------
// SUB-COMPONENT: SETTINGS FIELD
// ----------------------------------------------------------------------
const SettingsField = memo(({
  label,
  name,
  value,
  onSave,
  validate,
}: SettingsFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value);
    setError(null);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleValidate = useCallback(() => {
    if (validate) {
      const validationError = validate(inputValue);
      setError(validationError);
      return validationError === null;
    }
    return true;
  }, [inputValue, validate]);

  const handleSave = () => {
    const isValid = handleValidate();
    if (isValid && inputValue !== value) {
      onSave(name, inputValue);
      setIsEditing(false);
    } else if (isValid) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setInputValue(value);
    setError(null);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className="group space-y-1">
      {/* Label - Kept centered for header symmetry, or can be moved left if preferred */}
      <label 
        htmlFor={`input-${name}`}
        className="block w-full text-[10px] font-bold uppercase tracking-widest text-center text-white/60 mb-2"
      >
        {label}
      </label>

      <div
        className={cn(
          "relative flex items-center justify-between py-2", // Removed padding-x for cleaner underline look
          // Border Logic: 2px White Bottom Border
          "border-b-2",
          isEditing ? "border-purple-500" : "border-white", 
          error && "border-red-500",
          // Removed hover backgrounds
          "bg-transparent"
        )}
      >
        <div className="flex-1 min-w-0 relative">
          {isEditing ? (
            <>
              <input
                id={`input-${name}`}
                ref={inputRef}
                name={name}
                type={name === "email" ? "email" : "text"}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    if (error) setError(null);
                }}
                onKeyDown={handleKeyDown}
                aria-invalid={!!error}
                // Alignment: Text Left
                className="w-full text-left bg-transparent border-none text-sm font-mono text-white focus:outline-none placeholder:text-gray-600 p-0"
              />
              {error && (
                <span className="absolute -bottom-8 left-0 text-[10px] text-red-400 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3" /> {error}
                </span>
              )}
            </>
          ) : (
            <span
              role="button"
              tabIndex={0}
              // Alignment: Text Left
              className="block w-full text-left font-mono text-sm text-gray-200 truncate cursor-pointer focus:outline-none"
              onClick={() => setIsEditing(true)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditing(true)}
              title="Click to edit"
            >
              {value}
            </span>
          )}
        </div>

       
      </div>
    </div>
  );
});
SettingsField.displayName = "SettingsField";

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------
const SettingsModal = ({
  initialData = { 
    username: "User123", 
    email: "Babim@gmail.com", 
    avatarUrl: AVATAR_OPTIONS[0] 
  },
  onClose,
  onSave,
  onBackToDashboard,
}: SettingsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarOptions, setAvatarOptions] = useState<AvatarOption[]>([]);
  const [formData, setFormData] = useState<UserData>(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
     useEffect(() => {
      apiClient
        .get("/avatars") // Adjust endpoint if needed
        .then((res) => setAvatarOptions(res.data))
        .catch(() => toast.error("Failed to load avatars"));
    }, []);

  const validateUsername = (val: string) => {
    if (val.length < 3) return "Min 3 chars required";
    if (val.length > 20) return "Max 20 chars allowed";
    return null;
  };

  const validateEmail = (val: string) => {
    if (!EMAIL_REGEX.test(val)) return "Invalid email format";
    return null;
  };

  const handleFieldUpdate = useCallback((key: keyof UserData, newValue: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [key]: newValue };
      setHasChanges(JSON.stringify(updated) !== JSON.stringify(initialData));
      return updated;
    });
  }, [initialData]);

  const handleSaveChanges = async () => {
    if (!hasChanges) return;
    setIsLoading(true);
    try {
        if (onSave) await onSave(formData);
        else await new Promise((resolve) => setTimeout(resolve, 1500));
        
        toast.success("Profile saved");
        setHasChanges(false);
        setIsAvatarMenuOpen(false);
        if (onClose) onClose();
    } catch (error) {
        toast.error("Failed to save");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex items-center justify-center min-h-[50vh]">
      <div className="relative w-full bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Avatar Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-4 border-white/5 overflow-hidden shadow-2xl bg-[#1a1a1a]">
              <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
              className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-500 text-white p-2.5 rounded-full shadow-lg border-2 border-[#0a0a0a] transition-all duration-200"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
            className="mt-4 text-xs font-bold uppercase tracking-widest text-purple-400 hover:text-purple-300 flex items-center gap-1.5 focus:outline-none"
          >
            Change Avatar
            {isAvatarMenuOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className={cn(
            "w-full grid grid-cols-5 gap-3 mt-4 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white/5 rounded-xl px-2",
            isAvatarMenuOpen ? "max-h-[300px] py-4 opacity-100 border border-white/10" : "max-h-0 py-0 opacity-0 border-none"
          )}>
            {avatarOptions.map((avatar, index) => (
              <button
                key={index}
                onClick={() => handleFieldUpdate("avatarUrl", avatar.image_url)}
                className={cn(
                  "aspect-square rounded-full border-2 overflow-hidden transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500",
                  formData.avatarUrl === avatar.image_url ? "border-purple-500 ring-2 ring-purple-500/20 scale-110" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={avatar.image_url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-8 px-2">
          <SettingsField
            label="Username"
            name="username"
            value={formData.username}
            onSave={handleFieldUpdate}
            validate={validateUsername}
          />

          <SettingsField
            label="Email Address"
            name="email"
            value={formData.email}
            onSave={handleFieldUpdate}
            validate={validateEmail}
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-white/5">
          <Button
            variant="ghost"
            disabled={isLoading}
            className="w-full sm:w-auto text-muted-foreground hover:text-white hover:bg-white/5"
            onClick={onBackToDashboard}
          >
            Back to Dashboard
          </Button>

          <Button
            disabled={isLoading || !hasChanges}
            className={cn(
                "w-full sm:w-auto min-w-[140px] shadow-lg transition-all font-semibold",
                hasChanges 
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-900/20" 
                    : "bg-white/5 text-white/40 cursor-not-allowed"
            )}
            onClick={handleSaveChanges}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;