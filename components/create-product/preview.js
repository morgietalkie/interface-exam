import e from "cors";
import React, { useState } from "react";
import { FaRegHeart, FaDesktop, FaMobileAlt } from "react-icons/fa";

export default function ProductPreview(product) {
  // if (product.images.length > 1) {
  //   let selectedImageNumber = parseInt(product.images[1].slice(5));
  //   let selectedImage = product.images[0][selectedImageNumber].data_url;
  // }

  console.log(product.images[0].length > 1);
  return (
    <section className="preview desktopPreview">
      <div className="productPreviewContainer">
        <div className="imageContainer">
          <div className={`imageWrapper ${product.images[0].length > 1 ? "displayImageGrid" : ""}`}>
            {product.images[0].length > 1 && (
              <div className="smallImages">
                {product.images[0].map((image, index) => (
                  <img src={product.images[0][index].data_url} alt={product.title} />
                ))}
              </div>
            )}
            {product.images[0] != 0 ? <img src={product.images[0][parseInt(product.images[1].slice(5))].data_url} alt={product.title} /> : <img src={"../../static/imagePlaceholder.png"} alt="" />}
          </div>
          <div className="imageDots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="textWrapper">
          <h2 className="companyName">CompanyName</h2>
          <h1>{product.title != 0 ? product.title : "Produkt titel"}</h1>
          <textarea
            // oninser={(e) => {
            //   console.log(e.target);
            // }}
            value={product.description != 0 ? product.description : "Produkt beskrivelse"}
          ></textarea>
          <p className="price">{product.price != 0 ? product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00 DKK" : "____ DKK"}</p>
          <form action="">
            <label htmlFor="sizeOptions">Vælg størrelse</label>
            <select name="sizeOptions" id="sizeOptions">
              <option value="s">s</option>
              <option value="m">m</option>
              <option value="l">l</option>
              <option value="xl">xl</option>
            </select>
            <button className="addToCart">Tilføj til kurv</button>
            <button className="likeProduct">
              <FaRegHeart />
            </button>
          </form>
        </div>
      </div>

      <div className="previewButtons">
        <button
          onClick={(e) => {
            document.querySelector(".preview").classList.add("mobilePreview");
            document.querySelector(".preview").classList.remove("desktopPreview");
            document.querySelector(".buttonActivated").classList.remove("buttonActivated");
            e.target.classList.add("buttonActivated");
          }}
        >
          <FaMobileAlt />
        </button>
        <button
          className="buttonActivated"
          onClick={(e) => {
            document.querySelector(".preview").classList.remove("mobilePreview");
            document.querySelector(".preview").classList.add("desktopPreview");
            document.querySelector(".buttonActivated").classList.remove("buttonActivated");
            e.target.classList.add("buttonActivated");
          }}
        >
          <FaDesktop />
        </button>
      </div>
    </section>
  );
}
