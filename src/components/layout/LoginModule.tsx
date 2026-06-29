export default function LoginModule() {
  return (
    <div className="loginModule">
      <div className="loginContainer">
        <div className="loginHeader">
          <p className="loginTitle" id="loginHeaderTitle">
            <strong>Ingresa o Activa</strong>{" "}
            <span className="break">tu cuenta Belén</span>
          </p>
          <button className="loginCloseBtn" type="button" aria-label="Cerrar">
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
          <p className="loginSubtitle" id="loginHeaderSubtitle">
            Complete sus datos aquí y comience a ahorrar en sus remedios.
          </p>
        </div>

        <div className="loginSheet">
          <div id="loginSessionLoader" className="loginSessionLoader" hidden>
            <i className="bi bi-arrow-repeat" aria-hidden="true" />
            <p>Verificando tu sesión...</p>
          </div>

          <div id="loginSessionExpired" className="loginSessionExpired" hidden>
            <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" />
            <p>Tu sesión no es válida o expiró. Inicia sesión nuevamente.</p>
            <button
              type="button"
              className="loginSessionExpiredLink"
              id="btn-session-expired-login"
            >
              Iniciar sesión para continuar
            </button>
          </div>

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
                          minLength={8}
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

                    <p id="loginFormError" className="loginFormError" role="alert" hidden />

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
                          inputMode="text"
                          autoComplete="off"
                          maxLength={12}
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
                        <div className="loginPhoneRow">
                          <span className="loginPhonePrefix" aria-hidden="true">
                            +56
                          </span>
                          <input
                            type="tel"
                            id="registerPhone"
                            className="loginInputField loginPhoneField"
                            placeholder="9 1234 5678"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            maxLength={11}
                            required
                          />
                        </div>
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

                    <div className="loginInputGroup">
                      <i className="bi bi-lock loginInputIcon" aria-hidden="true" />
                      <div className="loginInputWrapper">
                        <label htmlFor="registerPassword" className="loginInputLabel">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          id="registerPassword"
                          className="loginInputField"
                          placeholder="Mínimo 8 caracteres"
                          minLength={8}
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
                    <p className="seniorHelpText">
                      <i className="bi bi-info-circle-fill" aria-hidden="true" />{" "}
                      Crea una clave segura de al menos 8 caracteres para proteger tu cuenta.
                    </p>

                    <p id="registerFormError" className="loginFormError" role="alert" hidden />

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

              <div className="loginSlide" id="slide-account">
                <div className="accountMenuContent">
                  <div className="successIconContainer">
                    <i className="bi bi-person-circle" aria-hidden="true" />
                  </div>
                  <h3 className="successTitle">Tu cuenta Belén</h3>
                  <div className="successGreetingBox">
                    <p className="successHello">Buen día,</p>
                    <p className="successUserName" id="accountDisplayName">
                      Invitado
                    </p>
                  </div>
                  <p className="successSubtitle" id="accountEmail">
                    Sesión activa
                  </p>

                  <nav className="accountSubmenu" aria-label="Opciones de cuenta">
                    <button type="button" className="accountSubmenuItem" id="btn-open-profile">
                      <i className="bi bi-pencil-square" aria-hidden="true" />
                      <span>Modificar mi perfil</span>
                      <i className="bi bi-chevron-right accountSubmenuArrow" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="accountSubmenuItem"
                      id="btn-account-orders"
                    >
                      <i className="bi bi-bag-check" aria-hidden="true" />
                      <span>Mis compras</span>
                      <i className="bi bi-chevron-right accountSubmenuArrow" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="accountSubmenuItem accountSubmenuItem--logout"
                      id="btn-account-logout"
                    >
                      <i className="bi bi-box-arrow-right" aria-hidden="true" />
                      <span>Cerrar sesión</span>
                    </button>
                  </nav>

                  <div
                    id="accountOrdersNotice"
                    className="accountComingSoonNotice"
                    role="status"
                    hidden
                  >
                    <i className="bi bi-hourglass-split" aria-hidden="true" />
                    <p>Pronto habilitado</p>
                  </div>

                  <button
                    type="button"
                    className="loginSubmitBtn successCloseBtn"
                    id="btn-account-continue"
                  >
                    Continuar comprando
                  </button>
                </div>
              </div>

              <div className="loginSlide" id="slide-profile">
                <div className="loginFormContent loginFormScrollable">
                  <form id="profileForm" className="loginForm">
                    <div className="loginInputGroup">
                      <i className="bi bi-person loginInputIcon" aria-hidden="true" />
                      <div className="loginInputWrapper">
                        <label htmlFor="profileFullName" className="loginInputLabel">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          id="profileFullName"
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
                        <label htmlFor="profileRut" className="loginInputLabel">
                          RUT
                        </label>
                        <input
                          type="text"
                          id="profileRut"
                          className="loginInputField"
                          placeholder="Ej: 12.345.678-9"
                          inputMode="text"
                          autoComplete="off"
                          maxLength={12}
                        />
                      </div>
                    </div>
                    <p className="seniorHelpText">
                      <i className="bi bi-info-circle-fill" aria-hidden="true" />{" "}
                      Para asociar tus recetas médicas y tus descuentos de Fonasa o Isapre.
                    </p>

                    <div className="loginInputGroup">
                      <i className="bi bi-envelope loginInputIcon" aria-hidden="true" />
                      <div className="loginInputWrapper">
                        <label htmlFor="profileEmail" className="loginInputLabel">
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          id="profileEmail"
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

                    <div className="loginInputGroup">
                      <i className="bi bi-lock loginInputIcon" aria-hidden="true" />
                      <div className="loginInputWrapper">
                        <label htmlFor="profilePassword" className="loginInputLabel">
                          Nueva contraseña
                        </label>
                        <input
                          type="password"
                          id="profilePassword"
                          className="loginInputField"
                          placeholder="Dejar en blanco para no cambiar"
                          minLength={8}
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
                    <p className="seniorHelpText">
                      <i className="bi bi-info-circle-fill" aria-hidden="true" />{" "}
                      Solo completa este campo si deseas cambiar tu clave de acceso.
                    </p>

                    <p id="profileFormError" className="loginFormError" role="alert" hidden />

                    <button
                      type="button"
                      className="loginProfileBackBtn"
                      id="btn-profile-back"
                    >
                      <i className="bi bi-arrow-left" aria-hidden="true" />
                      Volver a mi cuenta
                    </button>

                    <button
                      type="submit"
                      className="loginSubmitBtn"
                      style={{ marginTop: "0.75rem" }}
                    >
                      Guardar cambios
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
