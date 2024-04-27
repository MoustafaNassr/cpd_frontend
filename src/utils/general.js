import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

export const baseAPIURL = "https://cpd-admin.apexnile.com/api/"

export const getImage = (src) => {
  return `https://cpd-admin.apexnile.com${src}`
}

export const getNameFromEmail = (email) => {
  return email?.split("@")[0]
}

export const downloadFile = (url, fileName) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}



