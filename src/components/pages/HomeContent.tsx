'use client';

export default function HomeContent() {
  return (
    <>
      <div className="snapModule heroSlider">
                <div className="contentWrapper sliderWrapper">
                    <div className="modHero">

                        <div className="modHeroCard modHeroCard--active colorSlideOne">


                            <div className="heroInfo cardOne">
                                <p className="heroDate">Hasta el 15 de Julio</p>
                                <h2 className="heroTitle">
                                  Mes del cuidado<span className="break" /> de la piel
                                </h2>
                                <h3 className="heroLead">
                                  Descuentos en todas las cremas y bloqueadores.
                                </h3>
                                <div className="buttomHero">
                                    <p className="heroButtomtext">Ver Productos</p>
                                </div>
                            </div>

                            <div className="bginfoHero bgOne"></div>

                            <div className="heroImage">
                                <img src="/static/images/hero_slide_01.png" alt="Cremas y bloqueadores con descuentos"
                                    className="heroImageMove" />
                            </div>

                            <div className="heroGradientProtector"></div>

                        </div>

                        <div className="modHeroCard modHeroCard--next colorSlideTwo">

                            <div className="heroInfo">
                                <p className="heroDate">Hasta el 30 de Agosto</p>
                                <h2 className="heroTitle">Bienvenidos a<span className="break"></span> nuestro sitio</h2>
                                <h3 className="heroLead">Te regalamos un descuento en tu primera compra.</h3>
                                <div className="buttomHero">
                                    <p className="heroButtomtext">Ver Detalles</p>
                                </div>
                            </div>

                            <div className="bginfoHero bgTwo"></div>

                            <div className="heroImage">
                                <img src="/static/images/hero_slide_02.png" alt="Descuento primera compra"
                                    className="heroImageMove" />
                            </div>

                            <div className="heroGradientProtector"></div>

                        </div>

                        <div className="modHeroCard colorSlideFour">

                            <div className="heroInfo cardFour">
                                <p className="heroDate">Letus Labooratorio</p>
                                <h2 className="heroTitle">Citrato de Magnesio<span className="break"></span> $12.990</h2>
                                <h3 className="heroLead">Revitaliza tu cuerpo con Magnesio 400 mg.</h3>
                                <div className="buttomHero">
                                    <p className="heroButtomtext">Conoce más</p>
                                </div>
                            </div>

                            <div className="bginfoHero bgFour"></div>

                            <div className="heroImage">
                                <img src="/static/images/hero_slide_04.png" alt="Descuento primera compra"
                                    className="heroImageMove" />
                            </div>

                            <div className="heroGradientProtector"></div>

                        </div>

                        <div className="modHeroCard colorSlideThree">

                            <div className="heroInfo cardThree">
                                <p className="heroDate">Belen Express y Preferente</p>
                                <h2 className="heroTitle">Recibe como<span className="break"></span> tú prefieras</h2>
                                <h3 className="heroLead">Belén Express y Preferente, local o despacho.</h3>
                                <div className="buttomHero">
                                    <p className="heroButtomtext">Conoce más</p>
                                </div>
                            </div>

                            <div className="bginfoHero bgThree"></div>

                            <div className="heroImage">
                                <img src="/static/images/hero_slide_03.png" alt="Descuento primera compra"
                                    className="heroImageMove" />
                            </div>

                            <div className="heroGradientProtector"></div>

                        </div>

                        <div className="heroPreviews">
                            <div className="heroPreview heroPreview--active previewColorOne">
                                <img src="/static/images/hero_slide_01.png" alt="Preview 1" />
                            </div>
                            <div className="heroPreview previewColorTwo">
                                <img src="/static/images/hero_slide_02.png" alt="Preview 2" />
                            </div>
                            <div className="heroPreview previewColorFour">
                                <img src="/static/images/hero_slide_04.png" alt="Preview 4" />
                            </div>
                            <div className="heroPreview previewColorThree">
                                <img src="/static/images/hero_slide_03.png" alt="Preview 3" />
                            </div>
                        </div>

                        <div className="heroProgress">
                            <div className="heroProgressBar"></div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="snapModule catTitle">
                <div className="contentWrapper titleWrapper">
                    <div className="captionsMaster">
                        <div className="captionDisplay">
                            <div className="captionsIcon iconCategories"></div>
                            <p className="captionTitle">Categorías<span className="break"> destacadas</span></p>
                            <div className="moreButtom">
                                <p className="moreButtomtext">Ver más</p>
                                <div className="iconSeemore"></div>
                            </div>
                            <p className="captionLead">Puedes selecciona una categoria, <strong>si necesitas buscar
                                    tranquilo</strong>
                                podrás encontrar el producto que buscas.

                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="snapModule catContent">
                <div className="contentWrapper">
                    <div className="categoriesContent">
                        <ul className="categoriesLayout">

                            <li className="categoriesButton">
                                <div className="categoriesContainer">
                                    <div className="categoriesButtom categoriesbutton">
                                        <img className="categoriesButtomImage" src="/static/images/CategoryImages_Baby.jpg"
                                            alt="" />
                                    </div>
                                </div>
                                <p className="categoriesTitleButton">Bebés</p>
                            </li>

                            <li className="categoriesButton">
                                <div className="categoriesContainer">
                                    <div className="categoriesButtom">
                                        <img className="categoriesButtomImage"
                                            src="/static/images/CategoryImages_Natural.jpg" alt="" />
                                    </div>
                                </div>
                                <p className="categoriesTitleButton">Natural</p>
                            </li>

                            <li className="categoriesButton">
                                <div className="categoriesContainer">
                                    <div className="categoriesButtom">
                                        <img className="categoriesButtomImage"
                                            src="/static/images/CategoryImages_Bioequivalente.jpg" alt="" />
                                    </div>
                                </div>
                                <p className="categoriesTitleButton">Bioequivalente</p>
                            </li>

                            <li className="categoriesButton">
                                <div className="categoriesContainer">
                                    <div className="categoriesButtom">
                                        <img className="categoriesButtomImage"
                                            src="/static/images/CategoryImages_Belleza.jpg" alt="" />
                                    </div>
                                </div>
                                <p className="categoriesTitleButton">Belleza</p>
                            </li>
                            <li className="categoriesButton">
                                <div className="categoriesContainer">
                                    <div className="categoriesButtom">
                                        <img className="categoriesButtomImage"
                                            src="/static/images/CategoryImages_Perfumeria.jpg" alt="" />
                                    </div>
                                </div>
                                <p className="categoriesTitleButton">Perfumeria</p>
                            </li>
                            <li className="categoriesButton">
                                <div className="categoriesContainer">
                                    <div className="categoriesButtom">
                                        <img className="categoriesButtomImage"
                                            src="/static/images/CategoryImages_Veterinaria.jpg" alt="" />
                                    </div>
                                </div>
                                <p className="categoriesTitleButton">Veterinaria</p>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            <div className="snapModule popTitle">

                <div className="bannerBestsellers">
                    <div className="bestsellersImage"></div>
                    <div className="topBestsellers"></div>
                </div>

                <div className="contentWrapper bestSellers titleWrapper">
                    <div className="captionsMaster bestellersMargin">
                        <div className="captionDisplay">
                            <div className="captionsIcon iconBestsellers"></div>
                            <p className="captionTitle">Populares de<span className="break"> Belén.</span></p>
                            <div className="moreButtom">
                                <p className="moreButtomtext">Ver más</p>
                                <div className="iconSeemore"></div>
                            </div>
                            <p className="captionLead">Estos productos son los que <strong>más compran nuestros
                                    clientes</strong> Belén.</p>
                        </div>
                    </div>


                </div>
            </div>
            <div className="snapModule popContentFull">
                <div className="contentWrapper wrapperBestsellers">
                    <div className="bestsellersProduct">

                        <div className="cardproductMaster animationGrid">
                            <div className="productButtom">
                                <div className="productbuttomIcon"></div>
                            </div>
                            <a href="/producto"
                                style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
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
                                            <h1 className="productcardTitle">Lirex Tibolona 2,5 mg 30 Comprimidos</h1>
                                            <p className="productDiscountXl">-20%</p>
                                            <p className="productOldpriceXl">$31.590</p>
                                            <p className="productNewpriceXl">$25.272</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="cardproductMaster animationGrid">
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
                                        <h1 className="productcardTitle">Aceite De Ricino 99,5 Líquido 20 mL Genéricos</h1>
                                        <p className="productDiscountXl">-10%</p>
                                        <p className="productOldpriceXl">$4.340</p>
                                        <p className="productNewpriceXl">$3.906</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cardproductMaster animationGrid">
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
                                        <p className="productCategoriesXl bioequivalenteColor">Bioequivalente</p>
                                        <h1 className="productcardTitle">Lipoten Atorvastatina 40 mg 28 Comprimidos
                                            Recubiertos</h1>
                                        <p className="productDiscountXl">-26%</p>
                                        <p className="productOldpriceXl">$138.582</p>
                                        <p className="productNewpriceXl">$110.866</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cardproductMaster animationGrid">
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
                                        <h1 className="productcardTitle">Pantalla Solar Hipoalergénico 750 mL</h1>
                                        <p className="productDiscountXl">-23%</p>
                                        <p className="productOldpriceXl">$19.490</p>
                                        <p className="productNewpriceXl">$17.490</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cardproductMaster animationGrid">
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

                        <div className="cardproductMaster animationGrid">
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
                                        <h1 className="productcardTitle">Dolo Neurobionta Diclofenaco 50 mg 20 Comprimidos
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

            <div className="snapModule storeBelen">
                <div className="contentWrapper">
                    <div className="storebelenMaster">

                        <div className="imgPharmCont">
                            <img className="imageLocalPharm" src="/static/images/farmacia_08.jpg" alt="farmacia belen" />
                        </div>

                        <div className="storebelenContainer">

                            <div className="infoUbicationCard">

                                <div className="ubicationcardTop">

                                    <div className="iconUbicationsearch">
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </div>

                                    <div className="ubidataTopcont">
                                        <p className="ubicationTitleText">Tu Belén más cercana</p>
                                        <p className="ubicationComuna">Comuna de Conchalí</p>
                                    </div>

                                </div>
                                <div className="ubicationcardDown">

                                    <div className="ubidataContainer">
                                        <div className="ubidataContleft">
                                            <p className="ubicationInfoTitle">Dirección</p>
                                        </div>
                                        <div className="ubidataContright">
                                            <p className="ubicationTextBallon">Av. Independencia 4884</p>
                                        </div>
                                    </div>

                                    <div className="ubidataContainer">
                                        <div className="ubidataContleft">
                                            <p className="ubicationInfoTitle">Atención</p>
                                        </div>
                                        <div className="ubidataContright">
                                            <p className="ubicationTextBallon"> 09:00am</p>
                                            <p className="ubicationTextBallon"> 21:00pm</p>
                                        </div>
                                    </div>

                                    <div className="ubidataContainer">
                                        <div className="ubidataContleft">
                                            <p className="ubicationInfoTitle">Teléfono</p>
                                        </div>
                                        <div className="ubidataContright">
                                            <p className="ubicationTextBallon">(+56 2) 2771 2800</p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="mapPharmgoogle">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d857.7546906548039!2d-70.68099183830907!3d-33.38485368517333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c687c54608d1%3A0x10e9c8f2a837ab44!2sFarmacia%20Belen!5e0!3m2!1ses!2scl!4v1777333276297!5m2!1ses!2scl"
                                    width="100%" height="100%" style={{ border: '0' }} allowFullScreen loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="snapModule babyfferTitle">
                <div className="contentWrapper titleWrapper">
                    <div className="captionsMaster">
                        <div className="captionDisplay">
                            <div className="captionsIcon iconBabies"></div>
                            <p className="captionTitle">Ofertas en<span className="break"> Bebés</span></p>
                            <div className="moreButtom">
                                <p className="moreButtomtext">Ver más</p>
                                <div className="iconSeemore"></div>
                            </div>
                            <p className="captionLead">Te preparamos una selección de productos en bebés, con las
                                <strong>mejores ofertas y descuentos</strong> para tus hijos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="snapModule babyfferContent">
                <div className="contentWrapper">
                    <div className="offerBabyMaster">

                        <div className="sliderProduct slidebgBabies" id="slider-bebes" data-item-width-mobile="66"
                            data-item-width-tablet="50" data-item-width-pc="25" data-show-items-pc="3">

                            <button className="sliderBtn sliderPrev babiePrev" aria-label="Anterior slide">
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button className="sliderBtn sliderNext babieNext" aria-label="Siguiente slide">
                                <i className="bi bi-chevron-right"></i>
                            </button>

                            <div className="sliderTrack">

                                <div className="sliderItem">
                                    <div className="cardproductMaster heightSlider babyColorbg">
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
                                                    <h1 className="productcardTitle">Lirex Tibolona 2,5 mg 30
                                                        Comprimidos
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

            <div className="snapModule natlOfferTitle">
                <div className="contentWrapper">
                    <div className="captionsMaster">
                        <div className="captionDisplay">
                            <div className="captionsIcon iconNatural"></div>
                            <p className="captionTitle">Ofertas en <span className="break">Natural</span></p>
                            <div className="moreButtom">
                                <p className="moreButtomtext">Ver más</p>
                                <div className="iconSeemore"></div>
                            </div>
                            <p className="captionLead">Te preparamos una selección de productos naturales, con las
                                <strong>mejores ofertas y descuentos</strong> para ti.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="snapModule natlOfferContent">
                <div className="contentWrapper">
                    <div className="offerNaturalMaster">

                        <div className="sliderProduct slidebgNatural" id="slider-natural" data-item-width-mobile="66"
                            data-item-width-tablet="40" data-item-width-pc="25" data-show-items-pc="3">

                            <button className="sliderBtn sliderPrev naturalPrev" aria-label="Anterior slide">
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button className="sliderBtn sliderNext naturalNext" aria-label="Siguiente slide">
                                <i className="bi bi-chevron-right"></i>
                            </button>

                            <div className="sliderTrack">

                                <div className="sliderItem">
                                    <div className="cardproductMaster heightSlider naturalColorbg">
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

            <div className="snapModule promoAdOne">
                <div className="contentWrapper">
                    <div className="publicityMiddleMaster">
                        <div className="bannerMidlle">
                            <div className="bannermiddleCont">
                                <div className="bannermiddleImage">
                                    <img className="bannermidImageBg" src="/static/images/bannerMiddle_home.jpg" alt="" />
                                </div>
                                <div className="bannermiddleTextContainer">
                                    <div className="bannermiddleText">
                                        <div className="bannermiddleHeader">
                                            <div className="logoExpress"></div>
                                            <div className="containertextmiddleheader">
                                                <p className="bannermiddleTextTitle">Belén Express</p>
                                                <p className="bannermiddleTextSub">Farmacia Belén Online</p>
                                            </div>
                                        </div>
                                        <p className="bannermiddleTextLead"><strong>Hola! 👋</strong><br /> Creamos para ti un
                                            servicio de
                                            entrega express
                                            enfocándonos en la rapidez y seguridad de tu medicamentos.</p>
                                        <p className="bannermiddleTextLead">Nuestra marcha blanca empieza en...</p>
                                        <p className="bannermiddleTextLead">🥳 <strong>Independencia!!!</strong></p>
                                        <button className="bannermiddleButton">
                                            Conoce el Servicio
                                            <i className="bi bi-arrow-right-circle"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="snapModule bioOfferTitle">
                <div className="contentWrapper titleWrapper">
                    <div className="captionsMaster">
                        <div className="captionDisplay">
                            <div className="captionsIcon iconBioequivalence"></div>
                            <p className="captionTitle">Ofertas en<span className="break"> Bioequivalentes</span></p>
                            <div className="moreButtom">
                                <p className="moreButtomtext">Ver más</p>
                                <div className="iconSeemore"></div>
                            </div>
                            <p className="captionLead">Te preparamos una selección de productos en bioquequivalentes,
                                <strong>mismo remedio</strong> al mejor precio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="snapModule bioOfferContent">
                <div className="contentWrapper">
                    <div className="offerBioMaster">
                        <div className="sliderProduct slidebgEquivalente" id="slider-generico" data-item-width-mobile="66"
                            data-item-width-tablet="40" data-item-width-pc="25" data-show-items-pc="3">

                            <button className="sliderBtn sliderPrev equivalentePrev" aria-label="Anterior slide">
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button className="sliderBtn sliderNext equivalenteNext" aria-label="Siguiente slide">
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

            <div className="snapModule beautyOfferTitle">
                <div className="contentWrapper titleWrapper">
                    <div className="captionsMaster">
                        <div className="captionDisplay">
                            <div className="captionsIcon iconBeauty"></div>
                            <p className="captionTitle">Ofertas en<span className="break"> Belleza</span></p>
                            <div className="moreButtom">
                                <p className="moreButtomtext">Ver más</p>
                                <div className="iconSeemore"></div>
                            </div>
                            <p className="captionLead">Te preparamos una selección de productos en para el cuidado
                                <strong>de ti</strong> al mejor precio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="snapModule beautyOfferContent">
                <div className="contentWrapper">
                    <div className="offerBeautyMaster">
                        <div className="sliderProduct slidebgBeauty" id="slider-beauty" data-item-width-mobile="66"
                            data-item-width-tablet="40" data-item-width-pc="25" data-show-items-pc="3">

                            <button className="sliderBtn sliderPrev bellezaPrev" aria-label="Anterior slide">
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button className="sliderBtn sliderNext bellezaNext" aria-label="Siguiente slide">
                                <i className="bi bi-chevron-right"></i>
                            </button>

                            <div className="sliderTrack">

                                <div className="sliderItem">
                                    <div className="cardproductMaster heightSlider bellezaColorbg">
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
                                    <p className="noproductLead">No te preocupes si no aparecio, un llamado telefónico y
                                        nosotros te
                                        lo conseguimos con el mismo cariño y rapidez de siempre.</p>
                                </div>
                                <div className="imageContNoProduct">
                                    <img src="/static/images/Banner_sinProducto.png"
                                        alt="No se encontraron tu productos" />
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
                                <p className="linkInfolegal">Politicas de Privacidad</p>
                                <p className="linkInfolegal">Termino y Condiciones</p>
                            </div>
                            <div className="footerLegal colTwo">
                                <p className="linkInfolegal">Despacho</p>
                                <p className="linkInfolegal">Politicas de Privacidad</p>
                                <p className="linkInfolegal">Termino y Condiciones</p>
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
