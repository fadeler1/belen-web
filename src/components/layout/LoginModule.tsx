export default function LoginModule() {
  return (
    <div className="loginModule">
      <div className="loginContainer">
        <div className="loginHeader">
          <p className="loginTitle">
            <strong>Ingresa o Activa</strong>{" "}
            <span className="break">tu cuenta Belén</span>
          </p>
          <button className="loginCloseBtn" type="button" aria-label="Cerrar">
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
          <p className="loginSubtitle">
            Complete sus datos aquí y comience a ahorrar en sus remedios.
          </p>
        </div>

        <div className="loginSheet">
          <div className="loginTabs">
            <button
              className="loginTab active"
              type="button"
              data-tab="login"
            >
              Ingresar
            </button>
            <button className="loginTab" type="button" data-tab="register">
              Registrarme
            </button>
          </div>

          <div className="loginSliderContainer">
            <div className="loginSliderTrack">
              <div className="loginSlide" id="slide-login">
                <div className="loginFormContent">
                  <form id="loginForm" className="loginForm">
                    <div className="loginInputGroup">
                      <i className="bi bi-envelope loginInputIcon" aria-hidden="true" />
                      <div className="loginInputWrapper">
                        <label htmlFor="loginEmail" className="loginInputLabel">
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          id="loginEmail"
                          className="loginInputField"
                          placeholder="ejemplo@correo.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="loginInputGroup">
                      <i className="bi bi-lock loginInputIcon" aria-hidden="true" />
                      <div className="loginInputWrapper">
                        <label htmlFor="loginPassword" className="loginInputLabel">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          id="loginPassword"
                          className="loginInputField"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        className="loginPasswordToggle"
                        aria-label="Mostrar contraseña"
                      >
                        <i className="bi bi-eye" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="loginActionsRow">
                      <label className="loginRememberMe">
                        <input type="checkbox" id="loginRemember" />
                        <span className="checkboxText">Recordarme</span>
                      </label>
                      <a href="#" className="loginForgotLink">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>

                    <button type="submit" className="loginSubmitBtn">
                      Ingresar
                    </button>
                  </form>

                  <div className="loginDivider">
                    <span>O ingresar con</span>
                  </div>

                  <div className="loginSocialButtons">
                    <button type="button" className="loginSocialBtn google">
                      <i className="bi bi-google" aria-hidden="true" />
                      <span>Google</span>
                    </button>
                    <button type="button" className="loginSocialBtn facebook">
                      <i className="bi bi-facebook" aria-hidden="true" />
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="loginSlide" id="slide-register">
                <div className="loginFormContent loginFormScrollable">
                  <form id="registerForm" className="loginForm">
                    <div className="loginInputGroup">
                      <i className="bi bi-person loginInputIcon" aria-hidden="true" />
                      <div className="loginInputWrapper">
                        <label htmlFor="registerName" className="loginInputLabel">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          id="registerName"
                          className="loginInputField"
                          placeholder="Ej: María Teresa"
                          required
                        />
                      </div>
                    </div>
                    <p className="seniorHelpText">
                      <i className="bi bi-info-circle-fill" aria-hidden="true" />{" "}
                      Para saludarte por tu nombre y saber con quién conversamos.
                    </p>

                    <div className="loginInputGroup">
                      <i className="bi bi-card-text loginInputIcon" aria-hidden="true" />
                      <div className="loginInputWrapper">
                        <label htmlFor="registerRut" className="loginInputLabel">
                          RUT
                        </label>
                        <input
                          type="text"
                          id="registerRut"
                          className="loginInputField"
                          placeholder="Ej: 12.345.678-9"
                          required
                        />
                      </div>
                    </div>
                    <p className="seniorHelpText">
                      <i className="bi bi-info-circle-fill" aria-hidden="true" />{" "}
                      Para asociar tus recetas médicas y tus descuentos de Fonasa o
                      Isapre.
                    </p>

                    <div className="loginInputGroup">
                      <i className="bi bi-telephone loginInputIcon" aria-hidden="true" />
                      <div className="loginInputWrapper">
                        <label htmlFor="registerPhone" className="loginInputLabel">
                          Número de Celular
                        </label>
                        <input
                          type="tel"
                          id="registerPhone"
                          className="loginInputField"
                          placeholder="Ej: +56 9 1234 5678"
                          required
                        />
                      </div>
                    </div>
                    <p className="seniorHelpText">
                      <i className="bi bi-info-circle-fill" aria-hidden="true" />{" "}
                      Para avisarte cuando tu pedido vaya en camino a tu casa.
                    </p>

                    <div className="loginInputGroup">
                      <i className="bi bi-envelope loginInputIcon" aria-hidden="true" />
                      <div className="loginInputWrapper">
                        <label htmlFor="registerEmail" className="loginInputLabel">
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          id="registerEmail"
                          className="loginInputField"
                          placeholder="ejemplo@correo.com"
                          required
                        />
                      </div>
                    </div>
                    <p className="seniorHelpText">
                      <i className="bi bi-info-circle-fill" aria-hidden="true" />{" "}
                      Para enviarte tu boleta digital y el comprobante de compra.
                    </p>

                    <button
                      type="submit"
                      className="loginSubmitBtn"
                      style={{ marginTop: "1rem" }}
                    >
                      Registrarme y Activar Cuenta
                    </button>
                  </form>

                  <div className="loginDivider">
                    <span>O registrarme con</span>
                  </div>

                  <div className="loginSocialButtons">
                    <button type="button" className="loginSocialBtn google">
                      <i className="bi bi-google" aria-hidden="true" />
                      <span>Google</span>
                    </button>
                    <button type="button" className="loginSocialBtn facebook">
                      <i className="bi bi-facebook" aria-hidden="true" />
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="loginSlide" id="slide-success">
                <div className="successSlideContent">
                  <div className="successIconContainer">
                    <i className="bi bi-check-circle-fill" aria-hidden="true" />
                  </div>
                  <h3 className="successTitle" id="successMainTitle">
                    ¡Acceso Exitoso!
                  </h3>
                  <div className="successGreetingBox">
                    <p className="successHello">Buen día,</p>
                    <p className="successUserName" id="successDisplayName">
                      María Teresa
                    </p>
                  </div>
                  <p className="successSubtitle">
                    Tu cuenta de Farmacia Belén ya está lista y configurada para que
                    disfrutes de tus beneficios y convenios de Fonasa o Isapre.
                  </p>
                  <button
                    type="button"
                    className="loginSubmitBtn successCloseBtn"
                    id="btn-success-start"
                  >
                    Comenzar a Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
