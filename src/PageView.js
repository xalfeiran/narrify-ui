// src/PageView.js
import { useEffect } from 'react';

export default function PageView() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: window.location.pathname + window.location.search,
      });
    }
  }, []);

  return null;   // nothing to render
}
