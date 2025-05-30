// src/useAnalytics.js
import { useEffect } from 'react';

const GA_ID = 'G-SH947189RP';   //  <-- your measurement-ID

export default function useAnalytics() {
  useEffect(() => {
    // 1) Bail if the library is already there
    if (window.gtag) return;

    // 2) Dynamically inject <script async src=".../gtag/js">
    const gaScript = document.createElement('script');
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    gaScript.async = true;
    document.head.appendChild(gaScript);

    // 3) Bootstrap the global gtag()
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // 4) Init when the file is loaded (or immediately if cached)
    gaScript.onload = () => {
      gtag('js', new Date());
      gtag('config', GA_ID, { send_page_view: false }); // we’ll send views manually
    };

    // Clean-up (optional)
    return () => {
      document.head.removeChild(gaScript);
      delete window.gtag;
    };
  }, []);
}
