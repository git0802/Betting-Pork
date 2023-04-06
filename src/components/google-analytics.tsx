import Script from "next/script";

const GoogleAnalytics = ({ ga_id }: { ga_id: string }) => (
  <>
    <Script 
      defer
      strategy="afterInteractive" 
      src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`} />
    <Script
      defer
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga_id}', {
            page_path: window.location.pathname,
          });
        `,
      }}
    />
  </>
);
export default GoogleAnalytics;