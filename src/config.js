export const imageURL =
  "https://awsprod-api-b2bmarketplace.appclone.xyz/bai/public/";
export const imageURLTemp =
  "https://awsprod-api-b2bmarketplace.appclone.xyz/bai/tmp/";

// export function assetResolver(url) {
//     if (url)
// }

export function imageURLResolver(url, type = "public") {
  // console.log(url)
  var pattern = /^((http|https):\/\/)/;
  if (pattern.test(url)) {
    return url;
  } else {
    let path = type === "public" ? imageURL : imageURLTemp;
    return path + url;
  }
}
