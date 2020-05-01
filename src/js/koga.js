import imageURL from "/static/content/koga_computer.jpg";
import kogaTwo from "/static/content/koga_white.svg";

export default () => {
  console.log(imageURL);
  document.querySelector("#case .img-one").src = imageURL;
  console.log(kogaTwo);
  document.querySelector("#case .img-two").src = kogaTwo;
};
