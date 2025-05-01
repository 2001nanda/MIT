import { Providers } from "@/redux-toolkit/provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@/public/assets/scss/globals.scss";
import { detectLanguage } from "../i18n/server";
import { I18nProvider } from "../i18n/i18n-context";

export const metadata = {
  title: "MyIconicTrip",
  description: "themes.pixelstrap.com",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lng = await detectLanguage();
  console.log(lng);
  const CLIENT_ID = "391892050305-dt4946p8rcmlhl10lmrnc7khpuc7150s.apps.googleusercontent.com"; // 🔹 Replace with your actual Google Client ID

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <I18nProvider language={lng}>
        <html lang={lng}>
          <head>
            <link href="https://fonts.googleapis.com/css?family=Vampiro+One&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,800;0,900;1,700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Nunito:300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Dancing+Script&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500,600,700,800,900&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Pacifico&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Bangers&display=swap" rel="stylesheet" />
          </head>
          <body>
            <Providers>
              <>{children}</>
            </Providers>
          </body>
        </html>
      </I18nProvider>
    </GoogleOAuthProvider>
  );
}
