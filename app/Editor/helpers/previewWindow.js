let openWindow = void 0;

const mock = (content, css) => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="mobile-web-app-capable" content="yes">
        <link rel="stylesheet" href="${css}">
        <title>Atomic Builder Preview</title>
      </head>
      <body>${content}</body>
    </html>
    `;
};

const createWindow = content => {
  if (openWindow) openWindow.close();
  openWindow = window.open('about:blank', 'Export from Atomic Builder');
  const styles = document.getElementsByTagName('link') || [];
  let css = '';
  for (const i in styles){
    const href = styles[i].getAttribute && styles[i].getAttribute('href');
    if (href && href.includes('main')) css = href;
  }
  const html = mock(content, css);
  openWindow.document.write(html);
  openWindow.onBeforeUnload = () => openWindow = void 0;
};

export default {
  create: createWindow,
  isOpen: () => !!openWindow
};
