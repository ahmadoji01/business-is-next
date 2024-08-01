import React from "react";
import { Settings } from "@/components/svg";
import Image from "next/image";
import { useUserContext } from "@/provider/user.provider";
import { imageHandler } from "@/utils/request-handler";
const FooterMenu = () => {
  const { user } = useUserContext();

  return (
    <div className="space-y-5 flex flex-col items-center justify-center pb-6">
      <button className="w-11 h-11  mx-auto text-default-500 flex items-center justify-center  rounded-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
        <Settings className=" h-8 w-8" />
      </button>
      <div>
        {user?.avatar && (
          <Image
            src={user?.avatar ? imageHandler(user.avatar.id, user.avatar.filename_download) : "/images/avatar-256.jpg"}
            alt={user?.first_name ?? ""}
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
      </div>
    </div>
  );
};
export default FooterMenu;
