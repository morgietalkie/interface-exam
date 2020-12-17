import Head from "next/head";
import Layout from "../components/Layout";
import { useState, useContext, createContext } from "react";
import { FaCheck, FaBoxes, FaBox, FaExclamationTriangle, FaMinusCircle, FaPlusCircle, FaPen, FaSave, FaTrashAlt } from "react-icons/fa";
import { ChromePicker } from "react-color";
import ImageUploader from "../components/create-product/imageUploader";
import ProductPreview from "../components/create-product/preview";
import { ImageContext, ImageDefaultContext } from "../components/create-product/imageContext";
import End from "../components/create-product/end";

export default function CreateProduct() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [variant, setVariant] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [colorName, setColorName] = useState("");
  const [images, setImages] = useState([""], "image0");
  const [hover, setHover] = useState("");
  const [variantCounter, setVariantCounter] = useState(0);

  const [stockCount, setStockCount] = useState(1);
  const [stock, setStock] = useState([{ size: null, stock: null, stockCount: 0 }]);

  // console.log(stock);
  let variantArray = [{ color: color, colorName: colorName }];

  let productArray = [{ category: category, variant: variant, title: title, description: description, price: price, variants: { color: color, colorName: colorName } }];
  return (
    <Layout>
      <main className="content">
        <Head>
          <title>Opret et produkt</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="createProductContainer">
          {count < 4 && (
            <section className="create-product">
              <div className="stepCounter">
                <div className={getLength(count)}></div>
                <div className="fields">
                  <div className={`field ${count >= 0 ? "stepActive" : ""}`}>{count > 0 ? <FaCheck /> : "1"}</div>
                  <div className={`field ${count >= 1 ? "stepActive" : ""}`}>{count > 1 ? <FaCheck /> : "2"}</div>
                  <div className={`field ${count >= 2 ? "stepActive" : ""}`}>{count > 2 ? <FaCheck /> : "3"}</div>
                  <div className={`field ${count >= 3 ? "stepActive" : ""}`}>{count > 3 ? <FaCheck /> : "4"}</div>
                </div>
              </div>

              {/* FIRST STEP START */}

              {count == 0 && (
                <div className="firstStep">
                  <label htmlFor="setCategory">Vælg en kategori</label>
                  <input required className="defaultInput" placeholder="Indtast og vælg kategori" id="setCategory" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />

                  <label>Varianter</label>

                  <button
                    value="one"
                    onClick={(e) => {
                      setVariant(e.target.value);

                      e.target.classList.add("variantSelected");
                      e.target.nextSibling.classList.remove("variantSelected");
                      setHover(e.target.value);
                    }}
                    className={variant == "one" ? "variantSelected" : ""}
                  >
                    <FaBox /> Et produkt - én variant
                  </button>
                  <button
                    value="multiple"
                    onClick={(e) => {
                      setVariant(e.target.value);
                      e.target.classList.add("variantSelected");
                      e.target.previousSibling.classList.remove("variantSelected");
                      setHover(e.target.value);
                    }}
                    className={variant == "multiple" ? "variantSelected" : ""}
                  >
                    <FaBoxes /> Et produkt - flere varianter
                  </button>
                </div>
              )}

              {/* FIRST STEP ENDING */}

              {/* SECOND STEP START */}

              {count == 1 && (
                <div className={`secondStep`}>
                  <label htmlFor="setTitle">Titel</label>
                  <input required value={title} placeholder="Giv dit produkt en titel" id="setTitle" className="defaultInput" type="text" onChange={(e) => setTitle(e.target.value)} />

                  <label htmlFor="setDescription">Beskrivelse</label>
                  <textarea
                    required
                    id="setDescription"
                    name=""
                    cols="30"
                    rows="10"
                    value={description}
                    placeholder="Beskriv dit produkt"
                    className="defaultInput defaultDescription"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>

                  <label htmlFor="setPrice">Pris</label>
                  <input required value={price} placeholder="99" id="setPrice" className="defaultInput" type="number" onChange={(e) => setPrice(e.target.value)} />
                </div>
              )}

              {/* SECOND STEP ENDING */}

              {/* THIRD STEP START */}

              {count == 2 && variant == "one" && (
                <div className={`thirdStep`}>
                  <label htmlFor="colorPicker">Farve</label>
                  <ChromePicker
                    color={color || "#ac2727"}
                    width="100%"
                    id="colorPicker"
                    disableAlpha={true}
                    onChange={(color) => {
                      setColor(color.hex);
                    }}
                  />

                  <label htmlFor="setTitle">Farvens Navn</label>
                  <input placeholder="Eksempelvis: Kobberrød" value={colorName} id="setTitle" className="defaultInput" type="text" onChange={(e) => setColorName(e.target.value)} />

                  <div className="stockLabels">
                    <label htmlFor="size0">Størrelse</label>
                    <label htmlFor="stock0">Beholdning</label>
                  </div>

                  <div className="stockContainer">
                    {stock.map((item, index) => (
                      <div className="stockWrapper" id={"stock" + index}>
                        <input
                          onChange={(e) => {
                            let newArr = [...stock];
                            newArr[index].size = e.target.value || null;

                            setStock(newArr);
                          }}
                          className="size"
                          value={item.size}
                          type="number"
                        />
                        <input
                          onChange={(e) => {
                            let newArr = [...stock];
                            newArr[index].stock = e.target.value || null;

                            setStock(newArr);
                          }}
                          className="stock"
                          value={item.stock}
                          type="text"
                        />
                        {index >= 1 && (
                          <button
                            onClick={(e) => {
                              e.target.parentNode.style.display = "none";
                            }}
                          >
                            <FaMinusCircle />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    className="addMoreStock"
                    onClick={() => {
                      setStockCount(stockCount + 1);
                      setStock((prevArray) => [...prevArray, { test: { size: null, stock: null, stockCount: stockCount } }]);
                    }}
                  >
                    Tilføj <FaPlusCircle />
                  </button>
                </div>
              )}

              {count == 2 && variant == "multiple" && (
                <div className={`thirdStep`}>
                  <label htmlFor="variantButton">Vælg variant</label>

                  {variantArray.map((variant, i) => (
                    <div
                      onClick={() => {
                        document.querySelector(".overlay").classList.toggle("displayOverlay");
                        document.querySelector(".variantWindow").classList.toggle("displayVariantWindow");
                      }}
                      className="variantItem"
                      id={"variant" + i}
                    >
                      <div className="colorCircle" style={{ backgroundColor: color }}></div>
                      <div className="colorName">{colorName == "" ? "Farvens Navn" : colorName}</div>
                      <button className="editVariant">
                        <FaPen />
                      </button>
                    </div>
                  ))}

                  {variantCounter < 4 && (
                    <button
                      onClick={() => {
                        setVariantCounter(variantCounter + 1);
                        document.querySelector(".overlay").style.opacity = "1";
                        document.querySelector(".variantWindow").classList.add("displayVariantWindow");
                      }}
                      id="variantButton"
                      className="addVariant"
                    >
                      Tilføj variant <FaPlusCircle />
                    </button>
                  )}
                </div>
              )}

              {/* THIRD STEP ENDING */}

              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {count == 2 && variant == "multiple" && <div className="overlay"></div>}
              {count == 2 && variant == "multiple" && (
                <div className="variantWindow">
                  <label htmlFor="colorPicker">Farve</label>
                  <ChromePicker
                    color={color || "#ac2727"}
                    width="100%"
                    id="colorPicker"
                    disableAlpha={true}
                    onChange={(color) => {
                      setColor(color.hex);
                    }}
                  />

                  <label htmlFor="setTitle">Farvens Navn</label>
                  <input placeholder="Eksempelvis: Kobberrød" value={colorName} id="setTitle" className="defaultInput" type="text" onChange={(e) => setColorName(e.target.value)} />

                  <div className="stockLabels">
                    <label htmlFor="size0">Størrelse</label>
                    <label htmlFor="stock0">Beholdning</label>
                  </div>

                  <div className="stockContainer">
                    {stock.map((item, index) => (
                      <div className="stockWrapper" id={"stock" + index}>
                        <input
                          onChange={(e) => {
                            let newArr = [...stock];
                            newArr[index].size = e.target.value || null;

                            setStock(newArr);
                          }}
                          className="size"
                          value={item.size}
                          type="text"
                        />
                        <input
                          onChange={(e) => {
                            let newArr = [...stock];
                            newArr[index].stock = e.target.value || null;

                            setStock(newArr);
                          }}
                          className="stock"
                          value={item.stock}
                          type="text"
                        />
                        {index >= 1 && (
                          <button
                            onClick={(e) => {
                              e.target.parentNode.style.display = "none";
                            }}
                          >
                            <FaMinusCircle />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    className="addMoreStock"
                    onClick={() => {
                      setStockCount(stockCount + 1);
                      setStock((prevArray) => [...prevArray, { test: { size: null, stock: null, stockCount: stockCount } }]);
                    }}
                  >
                    Tilføj <FaPlusCircle />
                  </button>

                  <div className="buttonWrapper">
                    <button
                      onClick={() => {
                        document.querySelector(".overlay").classList.toggle("displayOverlay");
                        document.querySelector(".variantWindow").classList.toggle("displayVariantWindow");
                      }}
                      className="eraseVariant"
                    >
                      <FaTrashAlt /> Slet
                    </button>
                    <button
                      onClick={() => {
                        document.querySelector(".overlay").classList.toggle("displayOverlay");
                        document.querySelector(".variantWindow").classList.toggle("displayVariantWindow");
                      }}
                      className="saveVariant"
                    >
                      <FaSave />
                      Gem
                    </button>
                  </div>
                </div>
              )}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}
              {/* VARIANTS */}

              {/* FOURTH STEP START */}

              {count == 3 && (
                <div className={`thirdStep`}>
                  <label htmlFor="">Upload billeder</label>
                  <ImageContext.Provider value={{ images, setImages }}>
                    <ImageUploader variantArray={variantArray} images={images} />
                  </ImageContext.Provider>
                </div>
              )}

              {/* FOURTH STEP ENDING */}

              {/* BUTTON */}

              {count < 4 && (
                <div className="stepDirections">
                  {count > 0 && (
                    <button className="returnButton" onClick={() => setCount(count + -1)}>
                      Forige trin
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (count == 0 && handleFirstStep(category, variant) != true) {
                        return;
                      }
                      if (count == 1 && handleSecondStep(title, description, price) != true) {
                        return;
                      }
                      if (count == 2 && handleThirdStep(color, colorName, stock) != true) {
                        return;
                      }

                      setCount(count + 1);
                    }}
                    className="greenButton"
                  >
                    Næste
                  </button>
                </div>
              )}
            </section>
          )}
          {count > 0 && count < 4 && <ProductPreview title={title} description={description} price={price} images={images} />}
          {variant == 0 && hover == 0 && (
            <div className="introWrapper">
              <h2>Opret et produkt på få øjeblikke</h2>
              <img src="../static/beginCreateProduct.png" alt="Opret et produkt på få øjeblikke" />
            </div>
          )}

          {hover != 0 && count == 0 && (
            <div className="introWrapper">
              <h2>{hover == "one" ? "Opret produkt i én variant" : "Opret et produkt i flere varianter"} </h2>
              <div className={`colorWrapper  ${hover == "one" ? "oneColor" : ""} ${hover == "multiple" ? "multipleColors" : ""} `}>
                <div className="color color1"></div>
                <div className="color color2"></div>
                <div className="color color3"></div>
              </div>
            </div>
          )}

          {count > 3 && <End></End>}
        </div>

        {/* ERROR HANDLING */}

        <div className="errorMessage">{error}</div>
      </main>
    </Layout>
  );
}

function getLength(count) {
  return "counterLine length" + count;
}

function handleFirstStep(category, variant) {
  if (category == "") {
    displayError("Vælg venligst en kategori");
    return;
  }
  if (variant == "") {
    displayError("Vælg venligst en variant");
    return;
  }

  return true;
}

function handleSecondStep(title, description, price) {
  if (title == "") {
    displayError("Titel mangler");
    return;
  }
  if (description == "") {
    displayError("Beskrivelse mangler");
    return;
  }
  if (price == "") {
    displayError("Angiv produktets pris");
    return;
  }

  return true;
}

function handleThirdStep(color, colorName, stock) {
  if (colorName == "") {
    displayError("Angiv farvens navn");
    return;
  }

  if (stock[0].size == null) {
    displayError("Angiv produktets størrelse");
    return;
  }
  if (stock[0].stock == null) {
    displayError("Angiv hvor mange produkter du har på lager");
    return;
  }

  return true;
}

function displayError(message) {
  document.querySelector(".errorMessage").innerText = message;

  document.querySelector(".errorMessage").classList.add("displayError");

  setTimeout(() => {
    document.querySelector(".errorMessage").classList.remove("displayError");
  }, 2000);
}
