import Link from "next/link";

interface SiteChromeProps {
  homeHref?: string;
  cartMode?: "home" | "inner";
}

export default function SiteChrome({
  homeHref = "/",
  cartMode = "home",
}: SiteChromeProps) {
  const isHome = cartMode === "home";
  const qty = isHome ? 88 : 1;
  const prices = isHome
    ? ["$125.512", "$125.512", "$125.512"]
    : ["$2.990", "$25.272", "$288.952"];
  const subtotal = isHome ? "$135.576" : "$340.240";
  const discount = isHome ? "-$32.062" : "-$23.026";
  const total = isHome ? "$125.512" : "$317.214";
  return (
    <>
      <nav className="navBar">
        <div className="navContainer">
          <Link href={homeHref} className="navLogo">
            <img src="/static/icons/logoFb.svg" alt="Farmacia Belén" />
          </Link>
          <div className="navUserGreeting">
            <span className="greetingTitle">
              <strong>Buen día,</strong>
            </span>
            <span className="break"></span>
            <span className="greetingName">María Teresa</span>
          </div>
          <div className="navSearch">
            <form action="/search" className="searchForm">
              <input
                type="text"
                name="q"
                placeholder="Busca por nombre o compuesto del medicamento"
                className="searchInput"
              />
              <div className="containerButtomSearch">
                <button type="submit" className="buttomSearch">
                  <div className="buttomSearchIcon"></div>
                </button>
              </div>
            </form>
          </div>
          <div className="navActions">
            <button className="accessclientBtn" type="button">
              <div className="iconAccessClient"></div>
              <p className="accesClientitle">Cliente</p>
            </button>
            <button className="cartBottom" type="button">
              <div className="iconbottomCart">
                <span className="cartBadge">3</span>
                <img src="/static/icons/cartIcon.svg" alt="carrito de compras" />
              </div>
              <p className="cartBottomtitle">Compras</p>
            </button>
          </div>
        </div>
      </nav>

      <div id="debugLimitLine"></div>

      <div className="newsToast">
        <div className="icontoastCont">
          <div className="iconToast"></div>
        </div>
        <div className="toastText">
          <span className="toastTag">Aviso de Utilidad Pública</span>
          <span className="toastText">Horario extendido hasta las 22:00 hrs</span>
        </div>
        <div className="toastcloseCont">
          <button className="toastClose" type="button"></button>
        </div>
      </div>

      <div className="shopCart">
        <div className="shopcartContainer">
          <div className="captionDisplay shopcartPadding">
            <div className="captionsIcon iconShopcart"></div>
            <p className="captionTitle shopcartTitlemaster">
              Tus Compras<span className="break"> en Belén</span>
            </p>
            <button className="shopcartClose" type="button">
              Cerrar X
            </button>
            <p className="captionLead shopcartLeadmaster">
              Tienes <strong>3 productos en tu carrito</strong> verifica si esta
              correcta tu compra antes de continuar.
            </p>
          </div>
          <div className="shopcartInfoCont">
            <div className="shopcartProduct">
              <div className="shopcartProductList">
                <div className="cardShopcart">
                  <button className="shopcartRemoveproduct" type="button"></button>
                  <div className="shopcartProductImage">
                    <div className="productFilter"></div>
                    <img
                      src="/static/catalog/ibuprofeno.jpg"
                      alt="Ibuprofeno 100 mg/5mL Suspensión 100 mL"
                    />
                  </div>
                  <div className="shopcartProductInfo">
                    <div className="shopcartPriceCont">
                      <div className="shopcartPriceInfo">
                        <p className="shopcartProductLaboratory">Opko</p>
                        <p className="shopcartProductTitle">
                          Ibuprofeno 100 mg/5mL Suspensión 100 mL
                        </p>
                      </div>
                      <div className="shopcartData">
                        <div className="cantcontrolShopcart">
                          <button
                            type="button"
                            className="btn-menos shopcart"
                            data-producto="45k"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            className="cantidadinputshopcart"
                            id="cant-45k"
                            defaultValue={qty}
                            min={0}
                            readOnly
                          />
                          <button
                            type="button"
                            className="btn-mas shopcart"
                            data-producto="45k"
                          >
                            +
                          </button>
                        </div>
                        <p className="shopcartProductPrice">{prices[0]}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cardShopcart">
                  <button className="shopcartRemoveproduct" type="button"></button>
                  <div className="shopcartProductImage">
                    <div className="productFilter"></div>
                    <img
                      src="/static/catalog/lirex.jpg"
                      alt="Lirex Tibolona 2,5 mg 30 Comprimidos"
                    />
                  </div>
                  <div className="shopcartProductInfo">
                    <div className="shopcartPriceCont">
                      <div className="shopcartPriceInfo">
                        <p className="shopcartProductLaboratory">
                          {isHome ? "Silecia" : "Silesia"}
                        </p>
                        <p className="shopcartProductTitle">
                          Lirex Tibolona 2,5 mg 30 Comprimidos
                        </p>
                      </div>
                      <div className="shopcartData">
                        <div className="cantcontrolShopcart">
                          <button
                            type="button"
                            className="btn-menos shopcart"
                            data-producto="45k"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            className="cantidadinputshopcart"
                            id="cant-lirex"
                            defaultValue={qty}
                            min={0}
                            readOnly
                          />
                          <button
                            type="button"
                            className="btn-mas shopcart"
                            data-producto="45k"
                          >
                            +
                          </button>
                        </div>
                        <p className="shopcartProductPrice">{prices[1]}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cardShopcart">
                  <button className="shopcartRemoveproduct" type="button"></button>
                  <div className="shopcartProductImage">
                    <div className="productFilter"></div>
                    <img
                      src="/static/catalog/lipoten.jpg"
                      alt="Lipoten Atorvastatina 40 mg 28 Comprimidos Recubiertos"
                    />
                  </div>
                  <div className="shopcartProductInfo">
                    <div className="shopcartPriceCont">
                      <div className="shopcartPriceInfo">
                        <p className="shopcartProductLaboratory">Exeltis</p>
                        <p className="shopcartProductTitle">
                          Lipoten Atorvastatina 40 mg 28 Comprimidos Recubiertos
                        </p>
                      </div>
                      <div className="shopcartData">
                        <div className="cantcontrolShopcart">
                          <button
                            type="button"
                            className="btn-menos shopcart"
                            data-producto="45k"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            className="cantidadinputshopcart"
                            id="cant-lipoten"
                            defaultValue={qty}
                            min={0}
                            readOnly
                          />
                          <button
                            type="button"
                            className="btn-mas shopcart"
                            data-producto="45k"
                          >
                            +
                          </button>
                        </div>
                        <p className="shopcartProductPrice">{prices[2]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shopcartTicket">
              <div className="shopcartTicketList">
                <div className="shopcartTicketTitle">
                  <h3 className="shopcartTitle">Resumen de tu Compra</h3>
                </div>
                <div className="shopcartTicketDiscount">
                  <div className="sctdProduct">
                    <p className="sctdtextSub">Items</p>
                    <p className="sctdnumSub">3</p>
                  </div>
                  <div className="sctdSubtotal">
                    <p className="sctdtextSub">Subtotal</p>
                    <p className="sctdnumSub">{subtotal}</p>
                  </div>
                  <div className="sctdDiscount">
                    <p className="sctdtextSub">Descuento</p>
                    <p className="sctdnumSub" style={{ color: "#e52d27" }}>
                      {discount}
                    </p>
                  </div>
                </div>
                <div className="shopcartTicketPrice">
                  <p className="sctdtextSub">Total</p>
                  <p className="sctdtextTotal">{total}</p>
                </div>
                {!isHome && (
                  <div className="shopcartCheckoutContainer">
                    <button className="shopcartCheckout" type="button">
                      <p className="shopcartCheckoutText">ir al Sistema de Pago</p>
                      <i className="bi bi-arrow-right-circle"></i>
                    </button>
                  </div>
                )}
              </div>
              {isHome && (
                <div className="shopcartCheckoutContainer">
                  <button className="shopcartCheckout" type="button">
                    <p className="shopcartCheckoutText">ir al Sistema de Pago</p>
                    <i className="bi bi-arrow-right-circle"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
