import React, { useEffect } from "react";

const CustomHtmlPage = ({ location }) => {
  useEffect(() => {
    // Load and display the custom HTML based on the current route's path
    const loadHtml = () => {
      const path = location.pathname; // Get the current route's path
      fetch(`${path}.html`)
        .then((response) => {
          return response.text();
        })
        .then((htmlContent) => {
          // Display the HTML content (example using iframe)
          const iframe = document.getElementById("html-iframe");
          iframe.contentWindow.document.open();
          iframe.contentWindow.document.write(htmlContent);
          iframe.contentWindow.document.close();
        });
    };

    loadHtml();
  }, [location]);

  return <iframe id="html-iframe" title="Custom HTML" />;
};

export default CustomHtmlPage;
