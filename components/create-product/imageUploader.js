import React from "react";
import { useState, useContext } from "react";
import ImageUploading from "react-images-uploading";
import { ImageContext } from "../create-product/imageContext";

import { IoIosCloudUpload, IoIosMore } from "react-icons/io";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

export default function ImageUploader(variantArray) {
  // const [defaultImage, setDefaultImage] = useState("");
  const maxNumber = 4;

  const [defaultImage, setDefaultImage] = useState("image0");
  const { images, setImages } = useContext(ImageContext);

  function imageClicked(target) {
    setDefaultImage(target.id);

    setImages([images[0], target.id]);
  }

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit

    if (defaultImage == "undefined") {
      setDefaultImage("image0");
    }

    setImages([imageList, defaultImage]);
    // console.log(imageList);
  };

  return (
    <div className="imageLoader">
      <ImageUploading multiple value={images[0]} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI

          <div className="uploadContainer">
            <div className="upload__image-wrapper">
              <div className="colorIdentifier">
                <div className="color" style={{ backgroundColor: variantArray.variantArray[0].color || "#AC2727" }}></div>
                <div className="colorName">{variantArray.variantArray[0].colorName}</div>
              </div>
              {images[0].length == 0 && (
                <button className="dragAndDrop" style={isDragging ? { opacity: "0.6", color: "green" } : undefined} onClick={onImageUpload} {...dragProps}>
                  <IoIosCloudUpload className="uploadIcon" /> Tilføj produktbilleder her <br />
                  <span>Kun JPG eller PNG billeder</span>
                </button>
              )}
              <div className={`imageList ${images[0].length > 1 ? "shrinkImages" : ""}`}>
                {imageList.map((image, index) => (
                  <div key={index} className={`image-item `}>
                    <img
                      src={image["data_url"]}
                      id={`image${index}`}
                      className={`${defaultImage == "image" + index ? "imageSelected" : ""}`}
                      alt=""
                      width="100%"
                      onClick={(e) => {
                        imageClicked(e.target, imageList);
                      }}
                    />
                    <div className="image-item__btn-wrapper">
                      <button className="moreSettingsButton">
                        <IoIosMore />
                      </button>

                      <div className="buttonWrapper">
                        <button
                          onClick={(e) => {
                            imageClicked(e.target, imageList);
                          }}
                          id={`image${index}`}
                          className="makeDefault"
                        >
                          <FaCheckCircle /> Vælg
                        </button>
                        <button
                          className="removeImage"
                          onClick={() => {
                            if (defaultImage == "image" + index) {
                              onImageRemove(index);
                            } else {
                              setDefaultImage("image0");
                              onImageRemove(index);
                            }
                          }}
                        >
                          <FaTrashAlt /> Fjern
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="greenButton uploadImages" onClick={onImageUpload} {...dragProps}>
              <IoIosCloudUpload className="uploadIcon" /> Upload billede her
            </button>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
