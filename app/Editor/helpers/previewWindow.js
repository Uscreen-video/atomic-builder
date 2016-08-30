let openWindow = void 0;

const mock = (content, css, script) => {
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
      <body>
        ${content}
        <script type="text/javascript" src="${script}"></script>
      </body>
    </html>
    `;
};

const createWindow = content => {
  if (openWindow) openWindow.close();
  openWindow = window.open('about:blank', 'Export from Atomic Builder');
  const styles = document.getElementsByTagName('link') || [];
  const scripts = document.getElementsByTagName('script') || [];
  let css = '';
  let script = '';

  for (const i in styles){
    const href = styles[i].getAttribute && styles[i].getAttribute('href');
    if (href && href.includes('main')) css = href;
  }
  for (const i in scripts){
    const src = scripts[i].getAttribute && scripts[i].getAttribute('src');
    if (src && src.includes('widgets')) script = src;
  }
  const html = mock(content, css, script);
  openWindow.document.write(html);
  if (process.env.NODE_ENV === 'development') {
    const style = document.head.getElementsByTagName('style')[0];
    openWindow.document.head.appendChild(style.cloneNode(true));
  }
  openWindow.onBeforeUnload = () => openWindow = void 0;
};

export default {
  create: createWindow,
  isOpen: () => !!openWindow
};
