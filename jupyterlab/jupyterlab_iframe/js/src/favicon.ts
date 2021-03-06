// @ts-ignore
import {imagedataToSVG} from "imagetracerjs";
// @ts-ignore
import pixels from "image-pixels";
// @ts-ignore
import scale from "scale-that-svg";

class FaviconNotFoundError extends Error{
  public constructor(message: string){
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const getSiteDom = async (url: string): Promise<Document> => fetch(url).then(async (res) => {
  const parser = new DOMParser();
  return parser.parseFromString(await res.text(), "text/xml");
});

export const getFavicon = async (site: string): Promise<string> => {
  let faviconUri: string;
  const dom = await getSiteDom(site);
  const nodeList = Array.prototype.slice.call(dom.getElementsByTagName("link"), 0);

  for (let node of nodeList) {
    if ((node.getAttribute("rel").includes("icon"))){
      faviconUri = node.getAttribute("href");
      break;
    }
  }

  if (typeof faviconUri == "undefined"){
    throw new FaviconNotFoundError(site);
  }

  let siteUrl = new URL(site);
  if (siteUrl.pathname === "/iframes/proxy"){
    const faviconUrl = `${new URL(faviconUri, siteUrl.searchParams.get("path")).href}`;
    siteUrl.searchParams.set("path", faviconUrl);
  } else {
    siteUrl = new URL(faviconUri);
  }
  const data = await pixels(siteUrl.href);
  const unscaledSvg = imagedataToSVG(data);
  return scale(unscaledSvg, { scale: 52 / data.width });
};
