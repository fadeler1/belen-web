'use client';

export default function ProductoContent() {
  return (
    <>
<div className="snapModule productPrimary">
                <div className="contentWrapper productWrapper">

                    <div className="productGallery">
                        <div className="productFilter"></div>
                        <div className="prodImageContainer">
                            <div className="gallerySliderTrack">
                                <div className="gallerySliderSlide">
                                    <img className="productHeroImage" style={{ viewTransitionName: 'product-lirex' }}
                                        src="/static/catalog/lirex.jpg" alt="Lirex Tibolona 2,5 mg 30 Comprimidos" />
                                </div>
                                <div className="gallerySliderSlide">
                                    <img className="productHeroImage" src="/static/catalog/lirex_02.jpg"
                                        alt="Lirex Tibolona 2,5 mg 30 Comprimidos Vista 2" />
                                </div>
                                <div className="gallerySliderSlide">
                                    <img className="productHeroImage" src="/static/catalog/lirex_03.jpg"
                                        alt="Lirex Tibolona 2,5 mg 30 Comprimidos Vista 3" />
                                </div>
                            </div>

                            <button type="button" className="gallerySliderBtn prevBtn" aria-label="Anterior imagen">
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button type="button" className="gallerySliderBtn nextBtn" aria-label="Siguiente imagen">
                                <i className="bi bi-chevron-right"></i>
                            </button>

                            <div className="gallerySliderIndicators">
                                <span className="indicator active"></span>
                                <span className="indicator"></span>
                                <span className="indicator"></span>
                            </div>
                        </div>
                    </div>

                    <div className="productDetailsMain">

                        <div className="productinfoContain">
                            <h1 className="prodTitle">Lirex Tibolona 2,5 mg 30 Comprimidos</h1>
                            <p className="prodDiscount">-20%</p>
                        </div>

                        <div className="productpriceContain">
                            <p className="prodNewprice">$25.272</p>
                            <p className="prodOldprice">$31.590</p>
                            <div className="spacer"></div>
                            <div className="contProdCant">
                                <div className="cantcontrolProduct">
                                    <button type="button" className="btn-menos product">−</button>
                                    <input type="number" className="cantidadinputProduct" value="1" min="1" readOnly />
                                    <button type="button" className="btn-mas product">+</button>
                                </div>
                            </div>
                        </div>

                        <div className="contProductDetailmaster">

                            <div className="contProductDetail">
                                <p className="princActivo">Principio Activo</p>
                                <p className="princActivoValue">Tibolona</p>
                            </div>

                            <div className="contProductDetail">
                                <p className="capsulas">Capsulas por Producto</p>
                                <p className="capsulasValue">30 Comprimidos</p>
                            </div>

                            <div className="contProductDetail">
                                <p className="miligramos">Milígramos por Cápsula</p>
                                <p className="miligramosValue">2.5 mg</p>
                            </div>

                        </div>

                        <div className="infoPrincipal">
                            <button className="botonAddcart">Añadir a tu Compra</button>
                        </div>

                        <div className="servdeliveryCont ">

                            <div className="deliveryOption deliveryHighlight">
                                <p className="deliveryAvailable"><i className="bi bi-check-circle-fill"></i>Disponible</p>
                                <div className="deliveryIcon belenPreferente"></div>
                                <div className="deliveryServiceTitle">
                                    <p className="titleDelivery">Belén Preferente</p>
                                    <p className="leadDelivery">Retira gratis en tu farmacia Belén sin hacer filas</p>
                                </div>
                                <div className="deliveryServicePrice">
                                    <p className="priceDelivery">$0 GRATIS</p>
                                </div>
                            </div>
                            <div className="deliveryOption">
                                <p className="deliveryAvailable"><i className="bi bi-check-circle-fill"></i>Disponible - En tu
                                    Comuna</p>
                                <div className="deliveryIcon belenExpress"></div>
                                <div className="deliveryServiceTitle">
                                    <p className="titleDelivery">Belén Express</p>
                                    <p className="leadDelivery">Servicio entrega rapida en la puerta de tu casa</p>
                                </div>
                                <div className="deliveryServicePrice">
                                    <p className="priceDelivery">$1.320 Aprox.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="snapModule productSecondary">
                <div className="contentWrapper">
                    <div className="productoDescription">
                        <div className="titleContDescription">
                            <div className="iconDescription"></div>
                            <p className="titleDescription">Te contamos <strong>para qué sirve</strong></p>
                        </div>
                        <div className="beneficiosTextContainer">
                            <input type="checkbox" id="toggle" />
                            <div className="beneficiosText">
                                La tibolona ayuda a mejorar los síntomas de la menopausia, como sofocos, bajo estado de
                                ánimo y sequedad o irritación vaginal. La menopausia es la interrupción natural del
                                ciclo menstrual que suele ocurrir entre los 45 y 55 años. Durante esta etapa pueden
                                presentarse diversos cambios hormonales que afectan la calidad de vida de muchas
                                mujeres. La tibolona ayuda a mejorar los síntomas de la menopausia, como sofocos, bajo
                                estado de ánimo y sequedad o irritación vaginal. La menopausia es la interrupción
                                natural del ciclo menstrual que suele ocurrir entre los 45 y 55 años.
                            </div>
                            <label htmlFor="toggle" className="boton"></label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="snapModule beautyOfferTitle">
                <div className="contentWrapper titleWrapper">
                    <div className="captionsMaster">
                        <div className="captionDisplay">
                            <div className="captionsIcon iconRelationProduct"></div>
                            <p className="captionTitle">Otros clientes<span className="break"> Belén vieron</span></p>
                            <div className="moreButtom">
                                <p className="moreButtomtext">Ver más</p>
                                <div className="iconSeemore"></div>
                            </div>
                            <p className="captionLead">Te sugerimos productos que <strong>complementan tu compra</strong> y
                                cuidan de tu
                                bienestar.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="snapModule productContent">
                <div className="contentWrapper">
                    <div className="offerBeautyMaster">
                        <div className="sliderProduct slidebgProductPage" id="slider-product" data-item-width-mobile="66"
                            data-item-width-tablet="40" data-item-width-pc="25" data-show-items-pc="3">

                            <button className="sliderBtn sliderPrev productPrev" aria-label="Anterior slide">
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button className="sliderBtn sliderNext productNext" aria-label="Siguiente slide">
                                <i className="bi bi-chevron-right"></i>
                            </button>

                            <div className="sliderTrack">

                                <div className="sliderItem">
                                    <div className="cardproductMaster heightSlider bioequivalenteColorbg">
                                        <div className="productButtom">
                                            <div className="productbuttomIcon"></div>
                                        </div>
                                        <div className="cardproductinfoMaster">

                                            <div className="productcardImage">
                                                <div className="productFilter"></div>
                                                <img className="imgcardMaster" src="/static/catalog/lirex.jpg"
                                                    alt="Lirex Tibolona 2,5 mg 30 Comprimidos" />
                                            </div>

                                            <div className="cardproductInfo">
                                                <div className="cardproductInfogrid">
                                                    <p className="productLaboratoryXl">Silesia</p>
                                                    <p className="productCategoriesXl babyColor">Bebes</p>
                                                    <div className="spacer"></div>
                                                    <h1 className="productcardTitle">Lirex Tibolona 2,5 mg 30 Comprimidos
                                                    </h1>
                                                    <p className="productDiscountXl">-20%</p>
                                                    <p className="productOldpriceXl">$31.590</p>
                                                    <p className="productNewpriceXl">$25.272</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sliderItem">
                                    <div className="cardproductMaster heightSlider">
                                        <div className="productButtom">
                                            <div className="productbuttomIcon"></div>
                                        </div>
                                        <div className="cardproductinfoMaster">

                                            <div className="productcardImage">
                                                <div className="productFilter"></div>
                                                <img className="imgcardMaster" src="/static/catalog/ricino.jpg"
                                                    alt="Aceite De Ricino 99,5 Líquido 20 mL Genéricos" />
                                            </div>

                                            <div className="cardproductInfo">
                                                <div className="cardproductInfogrid">
                                                    <p className="productLaboratoryXl">Genéricos</p>
                                                    <p className="productCategoriesXl naturalColor">Natural</p>
                                                    <h1 className="productcardTitle">Aceite De Ricino 99,5 Líquido 20 mL
                                                        Genéricos</h1>
                                                    <p className="productDiscountXl">-10%</p>
                                                    <p className="productOldpriceXl">$4.340</p>
                                                    <p className="productNewpriceXl">$3.906</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sliderItem">
                                    <div className="cardproductMaster heightSlider">
                                        <div className="productButtom">
                                            <div className="productbuttomIcon"></div>
                                        </div>
                                        <div className="cardproductinfoMaster">

                                            <div className="productcardImage">
                                                <div className="productFilter"></div>
                                                <img className="imgcardMaster" src="/static/catalog/lipoten.jpg"
                                                    alt="Lipoten Atorvastatina 40 mg 28 Comprimidos Recubiertos" />
                                            </div>

                                            <div className="cardproductInfo">
                                                <div className="cardproductInfogrid">
                                                    <p className="productLaboratoryXl">Exeltis</p>
                                                    <p className="productCategoriesXl bioequivalenteColor">Bioequivalente
                                                    </p>
                                                    <h1 className="productcardTitle">Lipoten Atorvastatina 40 mg 28
                                                        Comprimidos
                                                        Recubiertos</h1>
                                                    <p className="productDiscountXl">-26%</p>
                                                    <p className="productOldpriceXl">$138.582</p>
                                                    <p className="productNewpriceXl">$110.866</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sliderItem">
                                    <div className="cardproductMaster heightSlider">
                                        <div className="productButtom">
                                            <div className="productbuttomIcon"></div>
                                        </div>
                                        <div className="cardproductinfoMaster">

                                            <div className="productcardImage">
                                                <div className="productFilter"></div>
                                                <img className="imgcardMaster" src="/static/catalog/simonds.jpg"
                                                    alt="Pantalla Solar Hipoalergénico 750 mL" />
                                            </div>

                                            <div className="cardproductInfo">
                                                <div className="cardproductInfogrid">
                                                    <p className="productLaboratoryXl">Simonds</p>
                                                    <p className="productCategoriesXl bellezaColor">Belleza</p>
                                                    <h1 className="productcardTitle">Pantalla Solar Hipoalergénico 750 mL
                                                    </h1>
                                                    <p className="productDiscountXl">-23%</p>
                                                    <p className="productOldpriceXl">$19.490</p>
                                                    <p className="productNewpriceXl">$17.490</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sliderItem">
                                    <div className="cardproductMaster heightSlider">
                                        <div className="productButtom">
                                            <div className="productbuttomIcon"></div>
                                        </div>
                                        <div className="cardproductinfoMaster">

                                            <div className="productcardImage">
                                                <div className="productFilter"></div>
                                                <img className="imgcardMaster" src="/static/catalog/magesio.jpg"
                                                    alt="Gea Magnesio 400 Mg 60 Cápsulas" />
                                            </div>

                                            <div className="cardproductInfo">
                                                <div className="cardproductInfogrid">
                                                    <p className="productLaboratoryXl">Labgea</p>
                                                    <p className="productCategoriesXl naturalColor">Natural</p>
                                                    <h1 className="productcardTitle">Gea Magnesio 400 Mg 60 Cápsulas</h1>
                                                    <p className="productDiscountXl">-30%</p>
                                                    <p className="productOldpriceXl">$14.290</p>
                                                    <p className="productNewpriceXl">$9.990</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sliderItem">
                                    <div className="cardproductMaster heightSlider">
                                        <div className="productButtom">
                                            <div className="productbuttomIcon"></div>
                                        </div>
                                        <div className="cardproductinfoMaster">

                                            <div className="productcardImage">
                                                <div className="productFilter"></div>
                                                <img className="imgcardMaster" src="/static/catalog/neurobionta.jpg"
                                                    alt="Dolo Neurobionta Diclofenaco 50 mg 20 Comprimidos" />
                                            </div>

                                            <div className="cardproductInfo">
                                                <div className="cardproductInfogrid">
                                                    <p className="productLaboratoryXl">P&G</p>
                                                    <p className="productCategoriesXl babyColor">Bebes</p>
                                                    <h1 className="productcardTitle">Dolo Neurobionta Diclofenaco 50 mg 20
                                                        Comprimidos
                                                    </h1>
                                                    <p className="productDiscountXl">-10%</p>
                                                    <p className="productOldpriceXl">$21.990</p>
                                                    <p className="productNewpriceXl">$19.971</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="snapModule promoAdTwo">
                <div className="contentWrapper">
                    <div className="publicityBottomMaster">
                        <div className="contnoProduct">
                            <div className="bannerNoproduct">
                                <div className="textContNoProduct">
                                    <p className="noproductTitle">Buscas un remedio y<br /> ... no está!!</p>
                                    <p className="noproductLead">No te preocupes si no apareció, un llamado telefónico y
                                        nosotros te lo conseguimos con el mismo cariño y rapidez de siempre.</p>
                                </div>
                                <div className="imageContNoProduct">
                                    <img src="/static/images/Banner_sinProducto.png"
                                        alt="No se encontraron tus productos" />
                                </div>
                                <div className="benefitsContNoProduct">
                                    <p className="noproductBenefits"> Te lo traemos ✓</p>
                                    <p className="noproductBenefits"> Al mejor precio ✓</p>
                                    <p className="noproductBenefits"> Cuidamos de ti ✓</p>
                                </div>
                            </div>
                            <div className="infoNoproduct">
                                <div className="contbuttonCall">
                                    <div className="button-7"><i className="bi bi-telephone-fill"></i></div>
                                    <p className="noproductTel"> <a href="tel:+56951051609">Conversa con nosotros</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="snapModule mainFooter">
                <div className="dataMinsal">
                    <a href="tel:+566003607777">
                        <p className="telefonoMinsal">
                            <i className="bi bi-telephone-fill"></i>
                            &nbsp; Minsal 600 360 7777
                        </p>
                    </a>
                </div>

                <div className="footerMaster">
                    <div className="modFooter">
                        <div className="infoFooter">
                            <div className="footerLogo">
                                <div className="footerIconlogo"></div>
                            </div>
                            <div className="footerLegal colOne">
                                <p className="linkInfolegal">Despacho</p>
                                <p className="linkInfolegal">Políticas de Privacidad</p>
                                <p className="linkInfolegal">Términos y Condiciones</p>
                            </div>
                            <div className="footerLegal colTwo">
                                <p className="linkInfolegal">Despacho</p>
                                <p className="linkInfolegal">Políticas de Privacidad</p>
                                <p className="linkInfolegal">Términos y Condiciones</p>
                            </div>
                        </div>
                        <p className="footerLegaltext">Autorización expendido de Medicamentos ISP Res. Ex. 1796 del
                            27.04.2026</p>
                    </div>
                </div>
            </div>
    </>
  );
}
